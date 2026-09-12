AV.Home = class {
  constructor(game) { this.game = game; this.map = AV.buildHome(game.save.houseLevel); this.player = { x: this.map.spawnX, y: this.map.spawnY, r: 12, facing: 0, vx: 0, vy: 0 }; this.prompt = ""; this.near = null; }
  enter() { this.map = AV.buildHome(this.game.save.houseLevel); this.player.x = this.map.spawnX; this.player.y = this.map.spawnY; }
  update(dt) {
    const [ax, ay] = this.game.input.axis(); const spd = 150; this.player.vx = ax * spd; this.player.vy = ay * spd;
    if (ax || ay) this.player.facing = Math.atan2(ay, ax);
    const [nx, ny] = AV.resolveMove(this.map, this.player.x, this.player.y, this.player.vx * dt, this.player.vy * dt, this.player.r);
    this.player.x = nx; this.player.y = ny;
    const tile = AV.tileAt(this.map, this.player.x, this.player.y);
    this.near = null; this.prompt = "";
    if (tile === AV.T.PORTAL) { this.near = "portal"; this.prompt = "USE — open Cinderdeep"; }
    else if (tile === AV.T.STASH) { this.near = "stash"; this.prompt = "USE — stash / loadout"; }
    else if (tile === AV.T.BENCH) { this.near = "bench"; this.prompt = "USE — workbench & hearth shop"; }
    else if (tile === AV.T.BED) { this.near = "bed"; this.prompt = "USE — rest (flavor)"; }
    else if (tile === AV.T.SEALED) { this.prompt = "Sealed rift. Another realm, another build."; }
    if (this.game.input.consume("use") && this.near) {
      if (this.near === "portal") this.game.ui.confirmDelve();
      if (this.near === "stash") this.game.ui.openStash();
      if (this.near === "bench") this.game.ui.openBench();
      if (this.near === "bed") this.game.toast("The Hearth holds. No clock runs here.");
    }
  }
  draw(eng) {
    eng.follow(this.player.x, this.player.y, 1 / 30);
    AV.drawMap(eng, this.map, "home");
    const c = eng.ctx; const [sx, sy] = eng.worldToScreen(this.player.x, this.player.y);
    c.fillStyle = "#e8d7c3"; c.beginPath(); c.arc(sx, sy, this.player.r, 0, Math.PI * 2); c.fill();
    c.strokeStyle = "#c47a3a"; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + Math.cos(this.player.facing) * 16, sy + Math.sin(this.player.facing) * 16); c.stroke();
    c.fillStyle = "#9a8773"; c.font = "11px sans-serif";
    for (const [tx, ty, lab] of [[5,8,"STASH"],[8,8,"BENCH"],[5,5,"COT"],[16,10,"CINDERDEEP"]]) {
      const [lx, ly] = eng.worldToScreen(tx * AV.TILE + 6, ty * AV.TILE - 6); c.fillText(lab, lx, ly);
    }
  }
};
