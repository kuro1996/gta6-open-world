// Solara Nights — tuning constants and city layout.
// All distances are metres, all speeds metres per second, all angles radians.
export const PITCH = 58; // road centre to road centre (44 m block + 14 m road)
export const ROAD_WIDTH = 14;
export const GRID_K = 4; // road lines at k * PITCH for k in -4..4
export const CITY_HALF = GRID_K * PITCH + ROAD_WIDTH / 2; // 239
export const BLOCK = PITCH - ROAD_WIDTH; // 44

export const WORLD = {
  gravity: 22,
  playerWalk: 6,
  playerSprint: 10,
  playerJump: 8,
  playerRadius: 0.6,
  playerHealth: 100,
  carAccel: 16,
  carBrake: 34,
  carReverseMax: 12,
  carMaxSpeed: 38,
  carSportMax: 48,
  carTurn: 1.9,
  carRadius: 1.9,
  // Playable bounds: the ground plane ends at ±380 and the water starts at
  // x = 318, so cars and players stop short of both.
  boundMinX: -360,
  boundX: 308,
  boundMinZ: -360,
  boundZ: 360,
  // Edge governor: within this distance of a bound, a car pointed at the
  // bound is capped toward edgeSpeed, so a full-speed U-turn near the
  // sand's end tightens up instead of sweeping past the map edge.
  edgeMargin: 30,
  edgeSpeed: 20,
  trafficCount: 14,
  pedCount: 22,
  maxWanted: 5,
  pistolDamage: 34,
  pistolRange: 90,
  pistolMag: 12,
  pistolReload: 1.2,
  pistolRate: 0.22,
  // Round 4 — pistol damage falls off with range: full damage inside 25 m,
  // 24 inside 50 m, 16 beyond. Long-range pot-shots still count, but the
  // docks fight rewards closing in instead of plinking from the pier.
  pistolFalloffNear: 25,
  pistolFalloffMid: 50,
  pistolDamageMid: 24,
  pistolDamageFar: 16,
  // Round 4 — a guard who just took a hit flinches for 0.4 s and holds
  // fire, so landing shots actually suppresses the docks instead of
  // trading damage one-for-one with six rifles.
  guardFlinchTime: 0.4,
  // Day/night: the in-game clock runs 0.5 min per real second, so a full
  // 24 h cycle takes 48 real minutes; dusk starts at 18:00, dawn at 05:30.
  duskStart: 18 * 60,
  nightStart: 19.5 * 60,
  dawnStart: 5.5 * 60,
  dayStart: 6 * 60,
  // Round 4 — headlights switch on once the night factor passes 0.25, so
  // a night chase is lit by the player's own beam instead of darkness.
  headlightNightMin: 0.25,
  // Health regen: Ria recovers slowly once she has been out of danger.
  healthRegenDelay: 8, // seconds without damage before regen starts
  healthRegenRate: 2.5, // HP per second while regenerating
  // Police tiers: at 3+ stars the lead car tries a PIT spin instead of a
  // plain ram, and the whole force gets faster with the heat.
  policePitLevel: 3,
  policeTopSpeed: 50,
  copSprintLevel: 3,
  copSprintSpeed: 6.5,
  // Round 4 — at 5 stars the foot cops run faster still (7.5 m/s). Police
  // rams cost speed, not health: car health is for wall crashes, so a long
  // chase cannot total the car on rams alone. Re-verified in round 4
  // attempt 2 (22 Nov): the ram branch below still only multiplies
  // playerCar.speed (0.82) and the ramming car's own speed (0.55) — no
  // health is ever subtracted here, and the 2 s global ram immunity
  // (this.ramImmune) still blocks a second ram from any car.
  copSprintMaxSpeed: 7.5,
  // Round 4 — traffic respawn: a traffic car further than this from the
  // player is re-placed on a road near the player, so the streets around
  // Ria stay alive instead of emptying out after a long chase.
  trafficRespawnDist: 280,
  // Round 4 — pedestrians sidestep a car that closes within this distance,
  // at this multiple of their walk speed.
  pedDodgeDist: 7,
  pedDodgeMult: 2.2,
  // Round 4 attempt 2 — light rain weather: a shower rolls in on average
  // every ~4 minutes of play and lasts 40–90 s. Rain is visual first
  // (streaks + wet roads + a soft patter), and it costs a little grip:
  // cars accelerate 12% slower and brake 15% longer on wet asphalt, so a
  // chase in the rain genuinely feels different from one in the sun.
  rainEveryMin: 4, // average gap between showers, in game-minutes of play
  rainDurationMin: 40,
  rainDurationMax: 90,
  rainGrip: 0.88, // accel multiplier on wet roads
  rainBrake: 1.15, // brake distance multiplier on wet roads
  rainTrafficSlow: 0.85, // traffic top speed multiplier in the rain
  rainPedHurry: 1.5, // pedestrians walk faster when it rains
  // Round 4 attempt 2 — side jobs: optional paid work between story
  // missions. Each pays cash on completion and never blocks the story.
  sideJobRewardTaxi: 150,
  sideJobRewardCourier: 250,
  sideJobRewardStunt: 400,
  // Round 4 attempt 2 — guard patrol: a guard who has not seen Ria walks
  // a random patrol waypoint instead of standing still, and a guard who
  // spots her (or takes a bullet) radios the others within this radius.
  guardPatrolRange: 24,
  guardAlertRadius: 30,
  guardAlertSpeed: 4.6,
  // Round 4 attempt 2 — sprint stamina: Ria can sprint for ~6 s flat-out
  // before her legs give out; stamina comes back at this rate while she
  // walks or stands still.
  sprintStaminaMax: 6,
  sprintStaminaRegen: 1.2,
  // Round 4 attempt 3 — drifting: hold the handbrake and steer at speed
  // and the car slides. A slide only counts above this speed and this
  // angle between the velocity and the nose; points bank into cash when
  // the slide ends cleanly, so a chase can pay for itself.
  driftMinSpeed: 12, // m/s before a slide can score
  driftMinAngle: 0.35, // radians of slide angle before points start
  driftScoreRate: 22, // points per second at a full sideways slide
  driftChainTime: 1.5, // seconds without sliding before the chain banks
  driftBankRate: 2, // $1 per 2 drift points banked
  // Round 4 attempt 3 — police helicopter: at 5 stars the PD sends the
  // chopper. It orbits above Ria, keeps her lit by its searchlight, and
  // while it watches, the heat never cools — the only way out is to break
  // line of sight under cover or lose the stars another way.
  heliLevel: 5, // wanted level that calls the helicopter
  heliHeight: 55, // metres above the street
  heliOrbitRadius: 26, // metres out from the player
  heliSpeed: 0.55, // radians per second around the orbit
  heliSpotRange: 70, // searchlight reach in metres
  // Round 4 attempt 3 — roadblocks: at 4+ stars the PD parks two cruisers
  // across the road ahead of Ria. They sit still until she passes or the
  // heat drops; ramming through one costs speed and car health, like a wall.
  roadblockLevel: 4, // wanted level that starts roadblocks
  roadblockAhead: 46, // metres ahead of the player to set the block
  roadblockGap: 4.2, // half-distance between the two parked cruisers
  roadblockRespawn: 18, // seconds before a cleared block is set again
  roadblockClearDist: 70, // block despawns once the player is this far past it
  // Round 4 attempt 3 — damage zones: a wall hit is charged to the side
  // that took it, and each zone bites into the handling. Front damage
  // costs acceleration, side damage costs steering, rear damage costs top
  // speed — so a chase-wrecked car drives like a wrecked car until the
  // Voss Garage crew patches every zone back up.
  damageFrontAccel: 0.3, // accel lost at 100 front damage
  damageSideSteer: 0.25, // steering lost at 100 side damage
  damageRearTop: 0.2, // top speed lost at 100 rear damage
  // Round 4 attempt 3 — side-job chains: jobs come in chains of three
  // ("Mara's Errands", "Night Shift"). Finishing a whole chain pays this
  // bonus on top of the three job rewards, and a streak of jobs done
  // without a cancellation adds $25 per job in the streak.
  sideChainBonus: 500,
  sideStreakBonus: 25,
  // Round 4 attempt 3 — par-time bonus: every story mission pays a speed
  // bonus when it is finished under par, not just The Drop. Beating par
  // by 30 s or more pays the big bonus; finishing under par at all pays
  // the small one.
  parBonusBig: 200, // beating par by 30+ s
  parBonusSmall: 75, // finishing under par
  parBonusMargin: 30, // seconds under par for the big bonus
  // Round 4 attempt 3 — police coordination: the wing cars in a chase do
  // not all pile onto the player's bumper. They hold an offset to the
  // left and right of the player, so the force flanks instead of queuing.
  policeWingOffset: 7, // metres to each side for the flanking cars
  policeWingLevel: 2, // wanted level where flanking starts
  // Round 4 attempt 3 (second pass) — wet roads reward a slide: drifting
  // on rain-slick asphalt scores 25% faster, so a rainy chase is the
  // best time to bank drift cash.
  driftWetBonus: 1.25,
};

export const COLORS = {
  sky: 0x87bfe8,
  fog: 0x9fc6e8,
  sun: 0xfff2d8,
  ground: 0x8f8a7c,
  sidewalk: 0xb8b2a4,
  road: 0x2e2e33,
  sand: 0xe8d29a,
  ocean: 0x1e6f9e,
  buildingPalette: [0xd8c9a3, 0xc9b8a8, 0xa8c4d4, 0xd4a8a8, 0xb8d4b0, 0xe0d8c8, 0x9fb8cc, 0xe8c98a],
  carPalette: [0xc23b2e, 0x2e6fc2, 0xe8c33a, 0x3aa655, 0xe8e8e8, 0x222226, 0x7a4ac2, 0xd4762e],
};

// Named places in Solara Bay (world x, z). South is +z, east is +x (ocean).
export const PLACES = {
  garage: { x: -203.5, z: 203.5, name: 'Voss Garage' },
  plaza: { x: 29, z: 29, name: 'Solara Plaza' },
  marina: { x: 0, z: 262, name: 'Marina' },
  docks: { x: -120, z: 262, name: 'Crown Docks' },
  hospital: { x: 203.5, z: -203.5, name: 'Solara General' },
  beach: { x: 262, z: 0, name: 'Solara Beach' },
  playerStart: { x: -190, z: 190 },
};

export const SAVE_KEY = 'solara-nights-save-v1';
