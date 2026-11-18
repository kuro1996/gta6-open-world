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
  trafficCount: 14,
  pedCount: 22,
  maxWanted: 5,
  pistolDamage: 34,
  pistolRange: 90,
  pistolMag: 12,
  pistolReload: 1.2,
  pistolRate: 0.22,
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
