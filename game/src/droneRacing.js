// First-person-view quad racing over the bay: buy drones, fit parts, fly
// checkpoint tracks against rivals, land tricks, enter leagues, sign sponsors.
// Context supplies rng, cash access, a logger and the player position. The
// day/hour getters, heat adder and speed getter are present with defaults
// but this file never calls them. No weather getter exists.
export const DRONE_MODELS = [
  { id: 'starter', name: 'Sparrow Starter', cost: 0, topSpeed: 80, agility: 50, battery: 100, durability: 80, desc: 'A forgiving trainer quad, free with the club card.' },
  { id: 'dart', name: 'Bay Dart', cost: 400, topSpeed: 110, agility: 65, battery: 110, durability: 85, desc: 'Quick off the line, popular with weekend racers.' },
  { id: 'falcon', name: 'Falcon 5', cost: 900, topSpeed: 135, agility: 75, battery: 120, durability: 90, desc: 'A balanced racer with a strong climb.' },
  { id: 'hornet', name: 'Hornet X', cost: 1500, topSpeed: 155, agility: 82, battery: 125, durability: 95, desc: 'Aggressive handling for tight gate courses.' },
  { id: 'viper', name: 'Viper Pro', cost: 2400, topSpeed: 175, agility: 88, battery: 135, durability: 100, desc: 'Pro-grade speed with a stiff frame.' },
  { id: 'ghost', name: 'Ghost Runner', cost: 3200, topSpeed: 190, agility: 92, battery: 140, durability: 105, desc: 'Near-silent motors, very hard to catch.' },
  { id: 'tempest', name: 'Tempest 9', cost: 4500, topSpeed: 205, agility: 95, battery: 150, durability: 110, desc: 'The fastest quad the bay league allows.' },
  { id: 'aurora', name: 'Aurora One', cost: 6000, topSpeed: 220, agility: 98, battery: 160, durability: 120, desc: 'A championship machine, light as a feather.' },
];

export const DRONE_TRACKS = [
  { id: 'pier-loop', name: 'Pier Loop', gates: 8, laps: 3, difficulty: 2, par: 90, prize: 120, desc: 'An easy loop around the old pier.' },
  { id: 'marina-slalom', name: 'Marina Slalom', gates: 10, laps: 3, difficulty: 3, par: 110, prize: 180, desc: 'Slalom between the moored boats.' },
  { id: 'bridge-run', name: 'Bridge Run', gates: 12, laps: 3, difficulty: 5, par: 130, prize: 260, desc: 'Under and over the bay bridge spans.' },
  { id: 'harbour-dash', name: 'Harbour Dash', gates: 9, laps: 4, difficulty: 4, par: 120, prize: 220, desc: 'A fast dash through the container yard.' },
  { id: 'cliff-dive', name: 'Cliff Dive', gates: 14, laps: 3, difficulty: 7, par: 150, prize: 380, desc: 'A steep drop past the cliffs, not for beginners.' },
  { id: 'storm-gates', name: 'Storm Gates', gates: 16, laps: 3, difficulty: 8, par: 170, prize: 480, desc: 'Tight gates in the windiest corner of the bay.' },
  { id: 'lighthouse-ring', name: 'Lighthouse Ring', gates: 12, laps: 4, difficulty: 6, par: 160, prize: 420, desc: 'A long ring around the lighthouse rock.' },
  { id: 'grand-circuit', name: 'Grand Circuit', gates: 18, laps: 4, difficulty: 9, par: 200, prize: 650, desc: 'The full bay circuit, the league final track.' },
];

export const DRONE_PARTS = [
  { id: 'motor-a', name: 'Sport Motors', cost: 200, slot: 'motor', speed: 15, agility: 2, battery: -5, durability: 5, desc: 'Hotter motors, a little thirstier.' },
  { id: 'motor-b', name: 'Race Motors', cost: 600, slot: 'motor', speed: 30, agility: 4, battery: -10, durability: 0, desc: 'Top-end motors for serious speed.' },
  { id: 'prop-a', name: 'Carbon Props', cost: 150, slot: 'prop', speed: 8, agility: 6, battery: 0, durability: -2, desc: 'Light props that bite the air.' },
  { id: 'prop-b', name: 'Stealth Props', cost: 350, slot: 'prop', speed: 12, agility: 10, battery: 2, durability: 0, desc: 'Quiet, sharp, and quick to turn.' },
  { id: 'battery-a', name: 'Long Cell', cost: 250, slot: 'battery', speed: 0, agility: 0, battery: 25, durability: 3, desc: 'A bigger cell for longer heats.' },
  { id: 'battery-b', name: 'Turbo Cell', cost: 500, slot: 'battery', speed: 5, agility: 0, battery: 40, durability: 0, desc: 'Maximum flight time, some extra weight.' },
  { id: 'frame-a', name: 'Alloy Frame', cost: 300, slot: 'frame', speed: 4, agility: 3, battery: 0, durability: 20, desc: 'A tougher frame that survives crashes.' },
  { id: 'frame-b', name: 'Titanium Frame', cost: 700, slot: 'frame', speed: 6, agility: 5, battery: 0, durability: 35, desc: 'Light and nearly unbreakable.' },
  { id: 'camera', name: 'HD Camera', cost: 180, slot: 'camera', speed: 0, agility: 2, battery: -3, desc: 'Crisp video for the highlight reel.' },
  { id: 'gyro', name: 'Pro Gyro', cost: 400, slot: 'gyro', speed: 3, agility: 12, battery: 0, durability: 5, desc: 'Rock-steady handling in the wind.' },
];

export const DRONE_TRICKS = [
  { id: 'barrel-roll', name: 'Barrel Roll', points: 50, risk: 0.2, desc: 'A full roll through the gates.' },
  { id: 'flip', name: 'Back Flip', points: 70, risk: 0.3, desc: 'A clean flip over the pier.' },
  { id: 'power-loop', name: 'Power Loop', points: 90, risk: 0.35, desc: 'A big loop with full throttle.' },
  { id: 'split-s', name: 'Split S', points: 80, risk: 0.3, desc: 'Half roll, half loop, all style.' },
  { id: 'matty-flip', name: 'Matty Flip', points: 110, risk: 0.45, desc: 'A double flip that wows the crowd.' },
  { id: 'inverted-hover', name: 'Inverted Hover', points: 60, risk: 0.25, desc: 'Hang upside down for a breath.' },
  { id: 'dive-bomb', name: 'Dive Bomb', points: 100, risk: 0.4, desc: 'A steep dive past the cliff face.' },
  { id: 'gate-weave', name: 'Gate Weave', points: 40, risk: 0.15, desc: 'Weave two gates without a wobble.' },
  { id: 'orbit', name: 'Orbit', points: 55, risk: 0.2, desc: 'Circle the lighthouse in one smooth turn.' },
  { id: 'triple-spin', name: 'Triple Spin', points: 130, risk: 0.55, desc: 'Three spins, one very nervous pilot.' },
];

export const DRONE_RIVALS = [
  { id: 'vex', name: 'Vex', skill: 55, style: 'aggressive', taunt: 'Try to keep up, rookie.' },
  { id: 'mira', name: 'Mira', skill: 65, style: 'smooth', taunt: 'I fly like the wind, you fly like a brick.' },
  { id: 'jax', name: 'Jax', skill: 72, style: 'reckless', taunt: 'Gates are suggestions, not rules.' },
  { id: 'luna', name: 'Luna', skill: 80, style: 'precise', taunt: 'Every gate, every time, perfect.' },
  { id: 'kato', name: 'Kato', skill: 88, style: 'aggressive', taunt: 'You should have stayed home.' },
  { id: 'nova', name: 'Nova', skill: 95, style: 'champion', taunt: 'I am the bay. Beat the bay.' },
];

export const DRONE_LEAGUES = [
  { id: 'rookie-cup', name: 'Rookie Cup', minRank: 0, entryFee: 100, races: 3, prize: 500, desc: 'First steps into league racing.' },
  { id: 'bay-series', name: 'Bay Series', minRank: 1, entryFee: 250, races: 4, prize: 1200, desc: 'The regular bay championship.' },
  { id: 'pro-circuit', name: 'Pro Circuit', minRank: 2, entryFee: 600, races: 5, prize: 3000, desc: 'Fast pilots only, big money.' },
  { id: 'grand-championship', name: 'Grand Championship', minRank: 3, entryFee: 1500, races: 6, prize: 8000, desc: 'The title every pilot wants.' },
];

export const DRONE_RANKS = [
  { level: 0, name: 'Rookie', xp: 0, perk: 'Fly club tracks and rookie leagues.' },
  { level: 1, name: 'Club Pilot', xp: 150, perk: 'Better sponsors and bay series entry.' },
  { level: 2, name: 'Pro Pilot', xp: 400, perk: 'Pro circuit entry and top parts.' },
  { level: 3, name: 'Ace', xp: 800, perk: 'Championship entry and elite sponsors.' },
  { level: 4, name: 'Bay Legend', xp: 1500, perk: 'The fastest name on the bay.' },
];

export const DRONE_SPONSORS = [
  { id: 'bay-batteries', name: 'Bay Batteries', pay: 200, need: 'races', goal: 5, desc: 'Pays for every five races flown.' },
  { id: 'prop-shop', name: 'Prop Shop', pay: 300, need: 'tricks', goal: 10, desc: 'Pays for every ten tricks landed.' },
  { id: 'sky-drinks', name: 'Sky Drinks', pay: 500, need: 'wins', goal: 3, desc: 'Pays for every three wins.' },
  { id: 'aero-wear', name: 'Aero Wear', pay: 1000, need: 'leagues', goal: 1, desc: 'Pays for every league title.' },
];

export const DRONE_FREESTYLE_SPOTS = [
  { id: 'pier', name: 'Old Pier', mult: 1.0, desc: 'A friendly spot for first tricks.' },
  { id: 'lighthouse', name: 'Lighthouse Rock', mult: 1.3, desc: 'Big air, big points.' },
  { id: 'cliff', name: 'Cliff Edge', mult: 1.5, desc: 'The crowd loves the danger.' },
  { id: 'bridge', name: 'Bridge Span', mult: 1.2, desc: 'Echoes under the bridge.' },
];

export const DRONE_CHALLENGES = [
  { id: 'first-flight', name: 'First Flight', target: 'racesFlown', goal: 1, xp: 20, desc: 'Fly your first race.' },
  { id: 'first-win', name: 'First Win', target: 'wins', goal: 1, xp: 50, desc: 'Win a race.' },
  { id: 'trick-ten', name: 'Trick Ten', target: 'tricksLanded', goal: 10, xp: 60, desc: 'Land ten tricks.' },
  { id: 'combo-king', name: 'Combo King', target: 'bestCombo', goal: 5, xp: 70, desc: 'Reach a five-trick combo.' },
  { id: 'track-master', name: 'Track Master', target: 'tracksWon', goal: 4, xp: 80, desc: 'Win on four different tracks.' },
  { id: 'rival-hunter', name: 'Rival Hunter', target: 'rivalsBeaten', goal: 3, xp: 90, desc: 'Beat three different rivals.' },
  { id: 'league-champ', name: 'League Champ', target: 'leagueTitles', goal: 1, xp: 120, desc: 'Win a league title.' },
  { id: 'trial-blazer', name: 'Trial Blazer', target: 'timeTrials', goal: 5, xp: 50, desc: 'Fly five time trials.' },
  { id: 'podium-ten', name: 'Podium Ten', target: 'podiums', goal: 10, xp: 100, desc: 'Reach ten podiums.' },
  { id: 'rich-pilot', name: 'Rich Pilot', target: 'earned', goal: 2000, xp: 110, desc: 'Earn two thousand from racing.' },
];

export const DRONE_NIGHT_TRACKS = [
  { id: 'night-pier', name: 'Night Pier', gates: 8, laps: 3, difficulty: 4, par: 100, prize: 200, desc: 'The pier under floodlights.' },
  { id: 'neon-slalom', name: 'Neon Slalom', gates: 10, laps: 3, difficulty: 5, par: 120, prize: 280, desc: 'Neon gates through the marina.' },
  { id: 'moon-bridge', name: 'Moon Bridge', gates: 12, laps: 3, difficulty: 6, par: 140, prize: 360, desc: 'The bridge run by moonlight.' },
  { id: 'dark-harbour', name: 'Dark Harbour', gates: 9, laps: 4, difficulty: 6, par: 135, prize: 340, desc: 'Container stacks in the dark.' },
  { id: 'starlight-ring', name: 'Starlight Ring', gates: 12, laps: 4, difficulty: 7, par: 170, prize: 460, desc: 'Around the lighthouse at night.' },
  { id: 'midnight-circuit', name: 'Midnight Circuit', gates: 16, laps: 4, difficulty: 9, par: 210, prize: 700, desc: 'The full circuit after midnight.' },
];

export const DRONE_WEATHER = [
  { id: 'calm', name: 'Calm', speedMult: 1.0, riskMult: 1.0, desc: 'Perfect still air.' },
  { id: 'breeze', name: 'Breeze', speedMult: 0.98, riskMult: 1.1, desc: 'A light push from the sea.' },
  { id: 'wind', name: 'Wind', speedMult: 0.92, riskMult: 1.3, desc: 'Gusts that shove the quad around.' },
  { id: 'rain', name: 'Rain', speedMult: 0.88, riskMult: 1.5, desc: 'Wet props and slick gates.' },
  { id: 'storm', name: 'Storm', speedMult: 0.75, riskMult: 2.0, desc: 'Only fools fly in a storm.' },
];

export const DRONE_CREWS = [
  { id: 'sam', name: 'Sam', wage: 30, skill: 'repair', value: 10, desc: 'A mechanic who patches frames fast.' },
  { id: 'ivy', name: 'Ivy', wage: 40, skill: 'tuning', value: 12, desc: 'Tunes motors for extra speed.' },
  { id: 'leo', name: 'Leo', wage: 35, skill: 'spotter', value: 8, desc: 'Calls gates before you see them.' },
  { id: 'ana', name: 'Ana', wage: 45, skill: 'coach', value: 15, desc: 'A former champion with sharp eyes.' },
];

export const DRONE_TIPS = [
  { id: 'tip-gates', name: 'Gate Flow', tip: 'Fly smooth lines through gates, not sharp turns.' },
  { id: 'tip-battery', name: 'Watch Battery', tip: 'A dead battery mid-race is a crash, land early.' },
  { id: 'tip-tricks', name: 'Trick Timing', tip: 'Tricks pay more inside a combo, chain them.' },
  { id: 'tip-parts', name: 'Fit Parts', tip: 'Parts only help the active drone, so pick one main quad.' },
  { id: 'tip-leagues', name: 'League Points', tip: 'Six points per race on average wins a league title.' },
  { id: 'tip-repair', name: 'Repair Early', tip: 'Racing under thirty durability is not allowed.' },
  { id: 'tip-sponsors', name: 'Sponsors Pay', tip: 'Sponsors pay when their milestone hits, check them often.' },
  { id: 'tip-night', name: 'Night Flying', tip: 'Night tracks are five percent slower but pay more.' },
];

export const DRONE_LEADERBOARD = [
  { name: 'Nova', points: 980, desc: 'The bay champion.' },
  { name: 'Kato', points: 860, desc: 'Always second, always angry.' },
  { name: 'Luna', points: 790, desc: 'Precision personified.' },
  { name: 'Jax', points: 640, desc: 'Fast, wild, unforgettable.' },
  { name: 'Mira', points: 520, desc: 'Smooth and steady.' },
  { name: 'Ria', points: 0, desc: 'The new pilot on the field.' },
];

export const DRONE_RECORDS = [
  { id: 'races', name: 'Races Flown', field: 'racesFlown', unit: 'races', desc: 'All races flown.' },
  { id: 'wins', name: 'Wins', field: 'wins', unit: 'wins', desc: 'All races won.' },
  { id: 'tricks', name: 'Tricks Landed', field: 'tricksLanded', unit: 'tricks', desc: 'All tricks landed.' },
  { id: 'best-combo', name: 'Best Combo', field: 'bestCombo', unit: 'combo', desc: 'Longest trick combo.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned from racing.' },
];

export const DRONE_SEASONAL_EVENTS = [
  { id: 'spring-cup', name: 'Spring Cup', season: 'spring', prize: 800, desc: 'The spring opener.' },
  { id: 'summer-splash', name: 'Summer Splash', season: 'summer', prize: 1200, desc: 'The big summer race.' },
  { id: 'autumn-gale', name: 'Autumn Gale', season: 'autumn', prize: 900, desc: 'Racing in the autumn wind.' },
  { id: 'winter-lights', name: 'Winter Lights', season: 'winter', prize: 1000, desc: 'Night racing under the lights.' },
];

export const DRONE_QUICK_START = [
  'Pick a track and start your first race.',
  'Pass gates to advance laps and finish.',
  'Land tricks mid-race to build a combo.',
  'Buy a faster drone when you can afford it.',
  'Enter a league once your rank allows it.',
  'Sign sponsors and let milestones pay you.',
];

export const DRONE_GEAR_GUIDE = [
  { slot: 'motor', advice: 'Motors buy speed first, everything else second.' },
  { slot: 'prop', advice: 'Props trade a little durability for agility.' },
  { slot: 'battery', advice: 'Bigger cells mean longer heats and fewer dead sticks.' },
  { slot: 'frame', advice: 'A strong frame forgives the crashes you will have.' },
  { slot: 'camera', advice: 'A camera is for the reel, not the race, but it helps.' },
];

export const DRONE_META = {
  system: 'drone racing',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 932,
  features: ['races', 'tricks', 'leagues', 'sponsors', 'parts', 'trials'],
};

function pickModel(id) { return DRONE_MODELS.find((m) => m.id === id); }
function pickTrack(id) { return DRONE_TRACKS.find((t) => t.id === id) || DRONE_NIGHT_TRACKS.find((t) => t.id === id); }
function pickPart(id) { return DRONE_PARTS.find((p) => p.id === id); }
function pickRival(id) { return DRONE_RIVALS.find((r) => r.id === id); }
function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

export function droneRankFor(xp) {
  let out = 0;
  for (const r of DRONE_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function droneStatsFor(modelId, ownedParts) {
  const model = pickModel(modelId);
  if (!model) return { topSpeed: 0, agility: 0, battery: 0, durability: 0 };
  const parts = (ownedParts || []).map(pickPart).filter(Boolean);
  let topSpeed = model.topSpeed;
  let agility = model.agility;
  let battery = model.battery;
  let durability = model.durability;
  for (const p of parts) {
    topSpeed += p.speed || 0;
    agility += p.agility || 0;
    battery += p.battery || 0;
    durability += p.durability || 0;
  }
  return {
    topSpeed: clampNum(topSpeed, 20, 220),
    agility: clampNum(agility, 10, 100),
    battery: clampNum(battery, 30, 200),
    durability: clampNum(durability, 20, 200),
  };
}

export function droneRaceTime(track, droneStats, rng) {
  const wobble = 0.95 + (rng ? rng() : Math.random()) * 0.1;
  const time = track.par * (120 / droneStats.topSpeed) * (1.1 - droneStats.agility / 500) * wobble;
  return Math.round(time * 10) / 10;
}

export function droneRivalTime(rival, track, rng) {
  const wobble = 0.95 + (rng ? rng() : Math.random()) * 0.1;
  const time = track.par * (1.15 - rival.skill / 200) * wobble;
  return Math.round(time * 10) / 10;
}

export function dronePrizeFor(track, rank, place) {
  const mult = place === 1 ? 1 : place === 2 ? 0.5 : place === 3 ? 0.25 : 0.1;
  return Math.round(track.prize * (1 + rank * 0.1) * mult);
}

export function droneFreestyleScore(trickIds, spotId) {
  let sum = 0;
  for (const id of trickIds) {
    const t = DRONE_TRICKS.find((x) => x.id === id);
    if (t) sum += t.points;
  }
  const spot = DRONE_FREESTYLE_SPOTS.find((s) => s.id === spotId);
  return Math.round(sum * (spot ? spot.mult : 1));
}

export function droneSeasonStandings(results) {
  const table = {};
  for (const r of results) {
    const pts = r.place === 1 ? 10 : r.place === 2 ? 6 : r.place === 3 ? 4 : 1;
    table[r.pilot] = (table[r.pilot] || 0) + pts;
  }
  return Object.keys(table).map((p) => ({ pilot: p, points: table[p] })).sort((a, b) => b.points - a.points);
}

export function droneWeatherPenalty(condition) {
  if (condition === 'storm') return 0.75;
  if (condition === 'rain') return 0.88;
  if (condition === 'wind') return 0.92;
  return 1;
}

export function droneChallengeProgress(challenge, state) {
  let current = state[challenge.target] || 0;
  if (challenge.target === 'tracksWon') current = Object.keys(state.bestTimes || {}).length;
  if (challenge.target === 'rivalsBeaten') current = Object.keys(state.rivalBeaten || {}).filter((k) => state.rivalBeaten[k] > 0).length;
  return { id: challenge.id, name: challenge.name, current, goal: challenge.goal, done: current >= challenge.goal };
}

export function droneNightRaceTime(track, droneStats, rng) {
  return Math.round(droneRaceTime(track, droneStats, rng) * 1.05 * 10) / 10;
}

export function droneRepairCost(current, max, crewBonus) {
  if (current >= max) return 0;
  return Math.max(0, Math.round((max - current) * 2 - (crewBonus || 0)));
}

export function droneSeasonPoints(races, wins, titles) {
  return races * 2 + wins * 10 + titles * 100;
}

export function droneBestTrack(bestTimes) {
  const keys = Object.keys(bestTimes || {});
  if (!keys.length) return null;
  let best = keys[0];
  for (const k of keys) if (bestTimes[k] < bestTimes[best]) best = k;
  return { track: best, time: bestTimes[best] };
}

export function droneTipFor(day) {
  return DRONE_TIPS[((day % DRONE_TIPS.length) + DRONE_TIPS.length) % DRONE_TIPS.length];
}

export function droneLeaderboardWith(playerPoints) {
  const rows = DRONE_LEADERBOARD.map((r) => ({ ...r, points: r.name === 'Ria' ? playerPoints : r.points }));
  rows.sort((a, b) => b.points - a.points);
  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}

export function droneBatteryDrain(gates, laps, tricks) {
  return Math.round((gates * laps * 0.4 + tricks * 1.5) * 10) / 10;
}

export function droneCrashCost(durabilityLost) {
  return Math.ceil(durabilityLost * 2);
}

export function droneBestPartFor(slot, budget) {
  let best = null;
  for (const p of DRONE_PARTS) {
    if (p.slot !== slot || p.cost > budget) continue;
    const score = (p.speed || 0) + (p.agility || 0);
    if (!best || score > (best.speed || 0) + (best.agility || 0)) best = p;
  }
  return best;
}

export function droneRivalTaunt(rivalId) {
  const r = pickRival(rivalId);
  return r ? r.taunt : 'Good luck out there, pilot.';
}

export function droneTrackDifficultyLabel(difficulty) {
  if (difficulty <= 2) return 'Easy';
  if (difficulty <= 4) return 'Medium';
  if (difficulty <= 6) return 'Hard';
  if (difficulty <= 8) return 'Expert';
  return 'Insane';
}

export function droneRecordFor(recordId, state) {
  const rec = DRONE_RECORDS.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function droneAllRecords(state) {
  return DRONE_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function droneWinRate(wins, races) {
  if (!races) return 0;
  return Math.round((wins / races) * 1000) / 10;
}

export function droneCrashRate(crashes, races) {
  if (!races) return 0;
  return Math.round((crashes / races) * 100) / 100;
}

export function dronePilotGrade(wins, races, bestCombo) {
  const rate = droneWinRate(wins, races);
  if (rate >= 70 && bestCombo >= 8) return 'S';
  if (rate >= 55 && bestCombo >= 5) return 'A';
  if (rate >= 40) return 'B';
  if (rate >= 20) return 'C';
  return 'D';
}

export function droneSeasonalEvent(seasonId) {
  return DRONE_SEASONAL_EVENTS.find((e) => e.season === seasonId) || null;
}

export function droneEventPrize(eventId, place) {
  const ev = DRONE_SEASONAL_EVENTS.find((e) => e.id === eventId);
  if (!ev) return 0;
  return Math.round(ev.prize * (place === 1 ? 1 : place === 2 ? 0.5 : 0.25));
}

export function droneLapTimeAverage(totalTime, laps) {
  if (!laps) return 0;
  return Math.round((totalTime / laps) * 10) / 10;
}

export function droneGateAccuracy(gatesDone, gatesTotal) {
  if (!gatesTotal) return 100;
  return Math.round((gatesDone / gatesTotal) * 100);
}

export function droneQuickStart(step) {
  if (step < 0 || step >= DRONE_QUICK_START.length) return null;
  return DRONE_QUICK_START[step];
}

export function droneTotalValue(state) {
  return state.owned.length * 500 + state.parts.length * 200;
}

export function droneProgressPercent(state) {
  const total = state.racesFlown + state.timeTrials;
  if (!total) return 0;
  return Math.round((state.wins / total) * 1000) / 10;
}

export function droneSummary(state) {
  const rankName = DRONE_RANKS[state.rank].name;
  return `${rankName} Ria flew ${state.racesFlown} races, won ${state.wins}, landed ${state.tricksLanded} tricks and earned ${Math.round(state.earned)}.`;
}

export function droneNextGoal(state) {
  if (state.racesFlown < 3) return 'Fly 3 races to hit your first goal.';
  if (state.wins < 1) return 'Win your first race to hit your next goal.';
  if (state.leagueTitles < 1) return 'Win your first league title to hit your next goal.';
  return 'Reach the top rank and become a Bay Legend.';
}

export function droneMeta() {
  return { ...DRONE_META, features: [...DRONE_META.features] };
}

export function droneGearAdvice(slot) {
  const g = DRONE_GEAR_GUIDE.find((x) => x.slot === slot);
  return g ? g.advice : 'Fly safe, keep your battery up and your frame straight.';
}

export function droneUpgradePath(budget) {
  return DRONE_PARTS.filter((p) => p.cost <= budget).map((p) => p.id);
}

export function createDroneRacingSystem(ctx) {
  const {
    rng = Math.random,
    getDay = () => 1,
    getHour = () => 12,
    getCash = () => 0,
    addCash = () => {},
    addHeat = () => {},
    getSpeed = () => 0,
    log = () => {},
    getPlayerPos = () => ({ x: 0, y: 0, z: 0 }),
  } = ctx || {};

  const state = {
    xp: 0, rank: 0, owned: ['starter'], active: 'starter', parts: [], installed: {},
    racesFlown: 0, wins: 0, podiums: 0, bestTimes: {}, totalTricks: 0, tricksLanded: 0,
    crashes: 0, repairsPaid: 0, earned: 0, spent: 0, combo: 0, bestCombo: 0,
    comboPoints: 0, race: null, gate: 0, lap: 1, raceTime: 0, batteryLeft: 100,
    durability: 100, league: null, leagueRace: 0, leaguePoints: 0, leagueWins: 0,
    leagueTitles: 0, sponsors: [], sponsorProgress: {}, timeTrials: 0, bestTrial: {},
    lastDay: 1, dailyRaces: 0, rivalBeaten: {}, repairsNeeded: 0,
  };

  function refreshRank() {
    const next = droneRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  }
  function gainXp(n) { state.xp += n; refreshRank(); }
  function fail(reason) { return { ok: false, reason }; }
  function statsNow() { return droneStatsFor(state.active, state.parts); }
  function leagueDef() { return state.league ? DRONE_LEAGUES.find((l) => l.id === state.league) : null; }

  function checkSponsors() {
    for (const sid of state.sponsors) {
      const sp = DRONE_SPONSORS.find((s) => s.id === sid);
      if (!sp) continue;
      const metric = sp.need === 'races' ? state.racesFlown
        : sp.need === 'tricks' ? state.tricksLanded
        : sp.need === 'wins' ? state.wins
        : state.leagueTitles;
      state.sponsorProgress[sid] = metric;
      if (metric >= sp.goal) {
        addCash(sp.pay);
        state.earned += sp.pay;
        state.sponsorProgress[sid] = 0;
        log(`Sponsor ${sp.name} paid ${sp.pay}.`);
      }
    }
  }

  function buyDrone(droneId) {
    const model = pickModel(droneId);
    if (!model) return fail('unknown drone');
    if (state.owned.includes(droneId)) return fail('already owned');
    if (getCash() < model.cost) return fail('not enough cash');
    addCash(-model.cost);
    state.spent += model.cost;
    state.owned.push(droneId);
    gainXp(25);
    return { ok: true, id: droneId };
  }

  function selectDrone(droneId) {
    if (!state.owned.includes(droneId)) return fail('drone not owned');
    state.active = droneId;
    const s = statsNow();
    state.durability = s.durability;
    state.batteryLeft = 100;
    return { ok: true, id: droneId, stats: s };
  }

  function buyPart(partId) {
    const part = pickPart(partId);
    if (!part) return fail('unknown part');
    if (state.parts.includes(partId)) return fail('already owned');
    if (getCash() < part.cost) return fail('not enough cash');
    addCash(-part.cost);
    state.spent += part.cost;
    state.parts.push(partId);
    state.installed[part.slot] = partId;
    gainXp(15);
    return { ok: true, id: partId, stats: statsNow() };
  }

  function removePart(slot) {
    const partId = state.installed[slot];
    if (!partId) return fail('slot empty');
    delete state.installed[slot];
    state.parts = state.parts.filter((p) => p !== partId);
    return { ok: true, removed: partId, stats: statsNow() };
  }

  function startRace(trackId, rivalId) {
    const track = pickTrack(trackId);
    if (!track) return fail('unknown track');
    if (state.race) return fail('race already active');
    if (state.durability < 30) return fail('durability too low');
    if (state.batteryLeft < 40) return fail('battery too low');
    state.race = { track: trackId, rival: rivalId || null, trial: false, night: !!DRONE_NIGHT_TRACKS.find((t) => t.id === trackId) };
    state.gate = 0;
    state.lap = 1;
    state.raceTime = 0;
    state.combo = 0;
    state.comboPoints = 0;
    return { ok: true, track: trackId, rival: rivalId || null };
  }

  function passGate() {
    if (!state.race) return fail('no race active');
    const track = pickTrack(state.race.track);
    state.gate += 1;
    state.batteryLeft = Math.max(0, state.batteryLeft - 2);
    state.raceTime = Math.round((state.raceTime + (track.par / (track.gates * track.laps)) * (0.9 + rng() * 0.2)) * 10) / 10;
    if (state.gate >= track.gates) {
      state.gate = 0;
      state.lap += 1;
      if (state.lap > track.laps) return finishRace();
    }
    return { ok: true, gate: state.gate, lap: state.lap, time: Math.round(state.raceTime * 10) / 10 };
  }

  function doTrick(trickId) {
    const trick = DRONE_TRICKS.find((t) => t.id === trickId);
    if (!trick) return fail('unknown trick');
    if (!state.race) return fail('no race active');
    const s = statsNow();
    const crashChance = trick.risk * (1 - s.agility / 150);
    if (rng() < Math.max(0.02, crashChance)) {
      state.crashes += 1;
      state.combo = 0;
      state.durability = Math.max(0, state.durability - 15);
      state.repairsNeeded += 1;
      return { ok: true, crashed: true, trick: trickId, points: 0, combo: 0 };
    }
    state.combo += 1;
    if (state.combo > state.bestCombo) state.bestCombo = state.combo;
    const points = trick.points * state.combo;
    state.comboPoints += points;
    state.totalTricks += 1;
    state.tricksLanded += 1;
    gainXp(6);
    return { ok: true, crashed: false, trick: trickId, points, combo: state.combo };
  }

  function finishRace() {
    if (!state.race) return fail('no race active');
    const track = pickTrack(state.race.track);
    const s = statsNow();
    const time = droneRaceTime(track, s, rng);
    let rivalTime = null;
    let place = 1;
    if (state.race.rival) {
      const rival = pickRival(state.race.rival);
      rivalTime = droneRivalTime(rival, track, rng);
      place = time <= rivalTime ? 1 : 2;
    }
    if (rng() < 0.15 && place < 3) place += 1;
    const prize = dronePrizeFor(track, state.rank, place) + Math.floor(state.comboPoints / 10);
    const comboPoints = state.comboPoints;
    state.race = null;
    state.combo = 0;
    state.comboPoints = 0;
    state.racesFlown += 1;
    state.dailyRaces += 1;
    state.batteryLeft = Math.max(0, state.batteryLeft - 15);
    if (place === 1) state.wins += 1;
    if (place <= 3) state.podiums += 1;
    if (!state.bestTimes[track.id] || time < state.bestTimes[track.id]) state.bestTimes[track.id] = time;
    addCash(prize);
    state.earned += prize;
    gainXp(place === 1 ? 50 : 25);
    const league = leagueDef();
    if (league) {
      state.leagueRace += 1;
      state.leaguePoints += place === 1 ? 10 : place === 2 ? 6 : place === 3 ? 4 : 1;
      if (place === 1) state.leagueWins += 1;
      if (state.leagueRace >= league.races) {
        if (state.leaguePoints >= league.races * 6) {
          state.leagueTitles += 1;
          addCash(league.prize);
          state.earned += league.prize;
          log(`League title won: ${league.name}.`);
        }
        state.league = null;
        state.leagueRace = 0;
        state.leaguePoints = 0;
        state.leagueWins = 0;
      }
    }
    checkSponsors();
    return { ok: true, time, rivalTime, place, prize, comboPoints };
  }

  function forfeitRace() {
    if (!state.race) return fail('no race active');
    state.race = null;
    state.combo = 0;
    state.comboPoints = 0;
    return { ok: true };
  }

  function startTimeTrial(trackId) {
    const track = pickTrack(trackId);
    if (!track) return fail('unknown track');
    if (state.race) return fail('race already active');
    state.race = { track: trackId, rival: null, trial: true, night: false };
    state.gate = 0;
    state.lap = 1;
    state.raceTime = 0;
    return { ok: true, track: trackId };
  }

  function finishTrial() {
    if (!state.race || !state.race.trial) return fail('no trial active');
    const track = pickTrack(state.race.track);
    const time = droneRaceTime(track, statsNow(), rng);
    const improved = !state.bestTrial[track.id] || time < state.bestTrial[track.id];
    if (improved) state.bestTrial[track.id] = time;
    state.race = null;
    state.timeTrials += 1;
    const bonus = improved ? 60 + 20 * state.rank : 10;
    addCash(bonus);
    state.earned += bonus;
    gainXp(10);
    return { ok: true, time, improved, bonus };
  }

  function enterLeague(leagueId) {
    const league = DRONE_LEAGUES.find((l) => l.id === leagueId);
    if (!league) return fail('unknown league');
    if (state.league) return fail('league already active');
    if (state.rank < league.minRank) return fail('rank too low for this league');
    if (getCash() < league.entryFee) return fail('not enough cash');
    addCash(-league.entryFee);
    state.spent += league.entryFee;
    state.league = leagueId;
    state.leagueRace = 0;
    state.leaguePoints = 0;
    state.leagueWins = 0;
    return { ok: true, league: leagueId };
  }

  function signSponsor(sponsorId) {
    const sp = DRONE_SPONSORS.find((s) => s.id === sponsorId);
    if (!sp) return fail('unknown sponsor');
    if (state.sponsors.includes(sponsorId)) return fail('already signed');
    if (sponsorId !== DRONE_SPONSORS[0].id && state.rank < 1) return fail('rank too low for this sponsor');
    state.sponsors.push(sponsorId);
    state.sponsorProgress[sponsorId] = 0;
    return { ok: true, id: sponsorId };
  }

  function repair() {
    const s = statsNow();
    if (state.durability >= s.durability) return fail('no damage to repair');
    const cost = droneRepairCost(state.durability, s.durability, 0);
    if (getCash() < cost) return fail('not enough cash');
    addCash(-cost);
    state.spent += cost;
    state.repairsPaid += cost;
    state.durability = s.durability;
    state.repairsNeeded = 0;
    return { ok: true, cost };
  }

  function recharge() {
    if (state.batteryLeft >= 100) return fail('battery already full');
    const cost = Math.ceil((100 - state.batteryLeft) / 10);
    if (getCash() < cost) return fail('not enough cash');
    addCash(-cost);
    state.spent += cost;
    state.batteryLeft = 100;
    return { ok: true, cost };
  }

  function tick(dt) {
    if (!state.race) return;
    state.raceTime += dt;
    state.batteryLeft = Math.max(0, state.batteryLeft - 0.4 * dt);
    if (state.batteryLeft <= 0) {
      log('Battery dead, drone crashed out of the race.');
      state.crashes += 1;
      state.race = null;
      state.combo = 0;
      state.comboPoints = 0;
      state.durability = Math.max(0, state.durability - 20);
      state.repairsNeeded += 1;
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyRaces = 0;
    state.batteryLeft = 100;
    if (rng() < 0.3) {
      const track = DRONE_TRACKS[Math.floor(rng() * DRONE_TRACKS.length)];
      log(`Double prize on ${track.name} today.`);
    }
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of Object.keys(saved)) {
      if (key in state) state[key] = saved[key];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: DRONE_RANKS[state.rank].name, xp: state.xp, active: state.active,
      owned: state.owned.length, parts: state.parts.length, racesFlown: state.racesFlown,
      wins: state.wins, podiums: state.podiums, tricksLanded: state.tricksLanded,
      bestCombo: state.bestCombo, crashes: state.crashes, earned: Math.round(state.earned),
      spent: state.spent, repairsPaid: state.repairsPaid, league: state.league,
      leagueTitles: state.leagueTitles, sponsors: state.sponsors.length,
      timeTrials: state.timeTrials, battery: Math.round(state.batteryLeft),
      durability: Math.round(state.durability), racing: !!state.race,
      gate: state.gate, lap: state.lap, dailyRaces: state.dailyRaces,
    };
  }

  function hudLine() {
    if (state.race) {
      const track = pickTrack(state.race.track);
      return `Racing ${track.name}: lap ${state.lap}, gate ${state.gate}, battery ${Math.round(state.batteryLeft)}%.`;
    }
    if (state.league) {
      const league = leagueDef();
      return `League ${league.name}: race ${state.leagueRace + 1}, ${state.leaguePoints} points.`;
    }
    if (state.durability < 40) return `${state.active} needs repair.`;
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - 60;
    const dz = (pos.z || 0) - (-140);
    if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
    if (state.race) { passGate(); return true; }
    return false;
  }

  function trackList() {
    return DRONE_TRACKS.map((t) => ({
      id: t.id, name: t.name, gates: t.gates, laps: t.laps, difficulty: t.difficulty,
      prize: t.prize, best: state.bestTimes[t.id] || null,
    }));
  }

  function hangar() {
    return DRONE_MODELS.map((m) => ({
      id: m.id, name: m.name, cost: m.cost, owned: state.owned.includes(m.id),
      stats: droneStatsFor(m.id, m.id === state.active ? state.parts : []),
    }));
  }

  function currentStats() {
    return statsNow();
  }

  return {
    state, buyDrone, selectDrone, buyPart, removePart, startRace, passGate, doTrick,
    finishRace, forfeitRace, startTimeTrial, finishTrial, enterLeague, signSponsor,
    repair, recharge, tick, tickDay, serialize, deserialize, stats, hudLine, interact,
    trackList, hangar, currentStats,
  };
}

export function createDroneCrew(system) {
  const st = system.state;
  let members = [];
  let wagesPaid = 0;

  function fail(reason) { return { ok: false, reason }; }

  function hire(crewId) {
    const c = DRONE_CREWS.find((x) => x.id === crewId);
    if (!c) return fail('unknown crew');
    if (members.includes(crewId)) return fail('already hired');
    members.push(crewId);
    return { ok: true, id: crewId, name: c.name, wage: c.wage };
  }

  function fire(crewId) {
    if (!members.includes(crewId)) return fail('not hired');
    members = members.filter((x) => x !== crewId);
    return { ok: true, id: crewId };
  }

  function payWages() {
    let due = 0;
    for (const id of members) {
      const c = DRONE_CREWS.find((x) => x.id === id);
      if (c) due += c.wage;
    }
    wagesPaid += due;
    return { ok: true, due, crew: [...members], totalPaid: wagesPaid };
  }

  function bonus(skill) {
    let total = 0;
    for (const id of members) {
      const c = DRONE_CREWS.find((x) => x.id === id);
      if (c && c.skill === skill) total += c.value;
    }
    return total;
  }

  function challenges() {
    return DRONE_CHALLENGES.map((c) => droneChallengeProgress(c, st));
  }

  function nightRace(trackId) {
    const track = DRONE_NIGHT_TRACKS.find((t) => t.id === trackId);
    if (!track) return fail('unknown night track');
    if (st.race) return fail('race already active');
    if (st.durability < 30) return fail('durability too low');
    st.race = { track: trackId, rival: null, trial: false, night: true };
    st.gate = 0;
    st.lap = 1;
    st.raceTime = 0;
    st.combo = 0;
    st.comboPoints = 0;
    return { ok: true, track: trackId, night: true, gates: track.gates, laps: track.laps };
  }

  return {
    hire, fire, payWages, bonus, challenges, nightRace,
    get members() { return [...members]; },
    get paid() { return wagesPaid; },
  };
}
