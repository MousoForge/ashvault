AV.Game = class {
  constructor() {
    this.save = AV.loadSave();
    this.eng = new AV.Engine(document.getElementById("view"));
    this.input = new AV.Input();
    this.ui = new AV.UI(this);
    this.home = new AV.Home(this);
    this.run = null;
    this.mode = "boot";
    this.paused = false;
    this.last = performance.now();
    this.input.bindStick(document.getElementById("stickBase"));
    document.getElementById("btnStart").addEventListener("click", () => this.toHome());
    document.getElementById("btnWipe").addEventListener("click", () => {
      AV.wipeSave();
      this.save = AV.loadSave();
      this.toast("Save wiped.");
    });
    document.getElementById("btnAtk").addEventListener("pointerdown", (e) => { e.preventDefault(); this.input.atk = true; });
    document.getElementById("btnDash").addEventListener("pointerdown", (e) => { e.preventDefault(); this.input.dash = true; });
    document.getElementById("btnSkill").addEventListener("pointerdown", (e) => { e.preventDefault(); this.input.skill = true; });
    document.getElementById("btnUse").addEventListener("pointerdown", (e) => { e.preventDefault(); this.input.use = true; });
    document.getElementById("btnInv").addEventListener("click", () => {
      if (this.mode === "run") this.ui.openPack();
      else if (this.mode === "home") this.ui.openStash();
    });
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
    requestAnimationFrame((t) => this.loop(t));
  }
  toast(m) { this.ui.toast(m); }
  toHome() {
    this.mode = "home";
    this.run = null;
    this.paused = false;
    this.home.enter();
    document.getElementById("boot").classList.add("hide");
    document.getElementById("hud").classList.remove("hide");
    document.getElementById("controls").classList.remove("hide");
    AV.audio.ensure();
  }
  startRun() {
    this.run = new AV.Run(this, Date.now() & 0xfffffff);
    this.mode = "run";
    this.paused = false;
    this.toast("Cinderdeep — pouch what you cannot lose.");
  }
  finishRun(ok) {
    const r = this.run;
    const recovered = [];
    const lost = [];
    const keepLists = ok ? [r.pouch, r.pack] : [r.pouch];
    if (!ok) lost.push(...r.pack);
    for (const list of keepLists) for (const it of list) recovered.push(it);
    let cinders = Math.floor(r.kills * 1.4 + r.floor * 6 + (ok ? 12 : 3));
    this.save.cinders += cinders;
    if (ok) this.save.stats.extracts += 1; else this.save.stats.deaths += 1;
    for (const it of recovered) {
      if (!AV.stackInto(this.save.stash, it, this.save.stashSize + recovered.length + 4)) this.save.stash.push(it);
    }
    AV.writeSave(this.save);
    this.ui.results(ok, recovered, lost, cinders);
  }
  loop(now) {
    const dt = AV.clamp((now - this.last) / 1000, 0, 0.05);
    this.last = now;
    if (!this.paused) {
      if (this.mode === "home") this.home.update(dt);
      if (this.mode === "run" && this.run) this.run.update(dt);
    }
    const c = this.eng.ctx;
    c.fillStyle = "#0b0807";
    c.fillRect(0, 0, this.eng.w, this.eng.h);
    if (this.mode === "home") this.home.draw(this.eng);
    if (this.mode === "run" && this.run) this.run.draw(this.eng);
    this.eng.tickParticles(dt);
    this.eng.drawParticles();
    this.ui.tick(dt);
    requestAnimationFrame((t) => this.loop(t));
  }
};
window.addEventListener("load", () => { AV.game = new AV.Game(); });
