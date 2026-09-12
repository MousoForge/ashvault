const AV = {};
AV.TILE = 48;
AV.RARITY = ["common", "uncommon", "rare", "relic"];
AV.RARITY_COLOR = { common: "#cfc3b4", uncommon: "#6aa84f", rare: "#6ea8d4", relic: "#d4b06e" };
AV.STORY = { hearth: "A pocket of stable stone hanging over the wound. Housing is yours. Gates are not. Spend Cinders to line the pouch and widen the stash. Only extracted matter — or pouch matter — stays real.", cinderdeep: "Cinderdeep kept firing after the crew became the fuel. Slag rivers still move. Pattern-cores sleep in kiln-shrines. Cooling Gates open when the foundry notices you — or when you force the flues." };
AV.ITEMS = {
 rusty_cleaver: { id: "rusty_cleaver", name: "Rusty Cleaver", kind: "weapon", rarity: "common", dmg: 14, rate: 0.42, reach: 46, arc: 0.9, desc: "Foundry sidearm. Honest arc." },
 slag_hatchet: { id: "slag_hatchet", name: "Slag Hatchet", kind: "weapon", rarity: "uncommon", dmg: 18, rate: 0.36, reach: 44, arc: 1.0, desc: "Heavier bite. Slower recovery." },
 ember_pike: { id: "ember_pike", name: "Ember Pike", kind: "weapon", rarity: "rare", dmg: 16, rate: 0.48, reach: 62, arc: 0.55, desc: "Long point. Thin arc." },
 stillfurnace_fang: { id: "stillfurnace_fang", name: "Stillfurnace Fang", kind: "weapon", rarity: "relic", dmg: 24, rate: 0.4, reach: 50, arc: 0.85, brandBonus: 8, desc: "Keeps a coal in the tang." },
 ash_wraps: { id: "ash_wraps", name: "Ash Wraps", kind: "armor", rarity: "common", armor: 2, hp: 8, desc: "Cloth boiled in flue-dust." },
 kiln_mail: { id: "kiln_mail", name: "Kiln Mail", kind: "armor", rarity: "uncommon", armor: 5, hp: 16, desc: "Overlapping scale that still ticks when warm." },
 cooling_plate: { id: "cooling_plate", name: "Cooling Plate", kind: "armor", rarity: "rare", armor: 8, hp: 24, stam: 10, desc: "Draws heat off the wearer. Loud." },
 cinder_bead: { id: "cinder_bead", name: "Cinder Bead", kind: "relic", rarity: "uncommon", cinderFind: 0.15, desc: "Hums near slagglass." },
 pouch_liner: { id: "pouch_liner", name: "Pouch Liner", kind: "relic", rarity: "rare", pouchLuck: 1, desc: "A second skin for the Safe Pouch. Does not add slots." },
 flue_charm: { id: "flue_charm", name: "Flue Charm", kind: "relic", rarity: "rare", dashCd: 0.15, desc: "Shortens the step between dashes." },
 slagglass: { id: "slagglass", name: "Slagglass", kind: "mat", rarity: "common", stack: 20, desc: "Cooled wound-glass. Home currency feedstock." },
 pattern_core: { id: "pattern_core", name: "Pattern Core", kind: "mat", rarity: "uncommon", stack: 8, desc: "A kiln memory. Workbench food." },
 heat_seed: { id: "heat_seed", name: "Heat Seed", kind: "mat", rarity: "rare", stack: 4, desc: "Will not go out. Do not pocket against skin." },
 salve: { id: "salve", name: "Ash Salve", kind: "consumable", rarity: "common", stack: 5, heal: 28, desc: "Bitter. Works." },
 flare: { id: "flare", name: "Flue Flare", kind: "consumable", rarity: "uncommon", stack: 3, reveal: 1, desc: "Marks the nearest Cooling Gate for a few seconds." }
};
AV.START_LOADOUT = ["rusty_cleaver", "ash_wraps", "salve", "salve"];
AV.ENEMIES = {
 slag_mite: { id: "slag_mite", name: "Slag Mite", hp: 28, spd: 78, dmg: 7, range: 28, aggro: 220, cd: 0.7, radius: 10, xp: 4, color: "#6b5340", loot: [{ id: "slagglass", w: 60 }, { id: "salve", w: 8 }] },
 ember_hound: { id: "ember_hound", name: "Ember Hound", hp: 44, spd: 128, dmg: 11, range: 26, aggro: 260, cd: 0.55, radius: 12, xp: 8, color: "#c45a20", loot: [{ id: "slagglass", w: 50 }, { id: "cinder_bead", w: 6 }] },
 kiln_acolyte: { id: "kiln_acolyte", name: "Kiln Acolyte", hp: 52, spd: 70, dmg: 10, range: 210, aggro: 280, cd: 1.15, radius: 12, xp: 10, color: "#7a6a88", ranged: true, loot: [{ id: "pattern_core", w: 18 }, { id: "salve", w: 12 }, { id: "ash_wraps", w: 6 }] },
 slag_golem: { id: "slag_golem", name: "Slag Golem", hp: 160, spd: 48, dmg: 22, range: 36, aggro: 240, cd: 1.35, radius: 20, xp: 28, color: "#4a433c", elite: true, loot: [{ id: "kiln_mail", w: 20 }, { id: "slag_hatchet", w: 16 }, { id: "pattern_core", w: 40 }, { id: "heat_seed", w: 10 }] },
 ashwight: { id: "ashwight", name: "Ashwight", hp: 38, spd: 96, dmg: 9, range: 24, aggro: 200, cd: 0.5, radius: 11, xp: 7, color: "#9a9a9a", loot: [{ id: "slagglass", w: 40 }, { id: "flare", w: 8 }] },
 stillfurnace: { id: "stillfurnace", name: "The Still-Furnace", hp: 520, spd: 56, dmg: 18, range: 48, aggro: 9999, cd: 0.9, radius: 28, xp: 80, color: "#e85d04", boss: true, ranged: true, loot: [{ id: "stillfurnace_fang", w: 40 }, { id: "cooling_plate", w: 30 }, { id: "heat_seed", w: 50 }, { id: "ember_pike", w: 24 }] }
};
AV.META_SHOP = [
 { id: "pouch3", name: "Pouch slot III", cost: 40, req: null, apply: (s) => { s.pouchSize = Math.max(s.pouchSize, 3); } },
 { id: "pouch4", name: "Pouch slot IV", cost: 90, req: "pouch3", apply: (s) => { s.pouchSize = Math.max(s.pouchSize, 4); } },
 { id: "stash12", name: "Stash bays", cost: 35, req: null, apply: (s) => { s.stashSize = Math.max(s.stashSize, 12); } },
 { id: "stash18", name: "Deep stash", cost: 80, req: "stash12", apply: (s) => { s.stashSize = Math.max(s.stashSize, 18); } },
 { id: "vit1", name: "Hearth rations I", cost: 25, req: null, apply: (s) => { s.hpBonus = Math.max(s.hpBonus, 20); } },
 { id: "vit2", name: "Hearth rations II", cost: 60, req: "vit1", apply: (s) => { s.hpBonus = Math.max(s.hpBonus, 45); } },
 { id: "dash1", name: "Flue step", cost: 45, req: null, apply: (s) => { s.dashBonus = 0.18; } },
 { id: "house1", name: "Copper fittings", cost: 30, req: null, apply: (s) => { s.houseLevel = Math.max(s.houseLevel, 1); } },
 { id: "house2", name: "Second alcove", cost: 70, req: "house1", apply: (s) => { s.houseLevel = Math.max(s.houseLevel, 2); } }
];
AV.RECIPES = [
 { id: "salve3", name: "Brew 3 Ash Salve", in: { slagglass: 4 }, out: { salve: 3 } },
 { id: "liner", name: "Pouch Liner", in: { slagglass: 8, pattern_core: 2 }, out: { pouch_liner: 1 } },
 { id: "hatchet", name: "Slag Hatchet", in: { slagglass: 6, pattern_core: 1 }, out: { slag_hatchet: 1 } }
];
AV.uid = () => Math.random().toString(36).slice(2, 10);
AV.makeItem = (id, qty) => { const proto = AV.ITEMS[id]; if (!proto) return null; return { uid: AV.uid(), id: proto.id, qty: proto.stack ? (qty || 1) : 1 }; };
AV.itemName = (it) => { const p = AV.ITEMS[it.id]; if (!p) return it.id; return p.stack && it.qty > 1 ? p.name + " x" + it.qty : p.name; };
AV.rollLoot = (table, bonusRare) => { if (!table || !table.length) return null; const t = Math.random() * 100; let acc = 0; const bump = bonusRare || 0; for (const row of table) { acc += row.w + bump; if (t <= acc) return AV.makeItem(row.id); } return Math.random() < 0.35 ? AV.makeItem(table[0].id) : null; };
