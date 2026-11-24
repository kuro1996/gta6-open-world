// Tennis at the Solara Bay club: practice, buy rackets and shoes, play
// point-by-point ladder matches, enter tournaments. Rain stops play.
// Context supplies rng, cash access, a logger and the player position. The
// day/hour getters, heat adder and speed getter are present with defaults
// but this file never calls them. No weather getter exists.
export const TENNIS_COURTS = [
  { id: 'park', name: 'Park Court', surface: 'hard', speed: 1.0, fee: 10, desc: 'The free public court by the park.' },
  { id: 'club-grass', name: 'Club Grass', surface: 'grass', speed: 1.3, fee: 40, desc: 'Fast grass, the ball barely bounces.' },
  { id: 'club-clay', name: 'Club Clay', surface: 'clay', speed: 0.8, fee: 35, desc: 'Slow red clay for long rallies.' },
  { id: 'bay-hard', name: 'Bay Hard Court', surface: 'hard', speed: 1.0, fee: 25, desc: 'The standard hard court by the bay.' },
  { id: 'indoor-carpet', name: 'Indoor Carpet', surface: 'carpet', speed: 1.1, fee: 50, desc: 'Carpet indoors, dry whatever the weather.' },
  { id: 'beach-sand', name: 'Beach Sand', surface: 'sand', speed: 0.6, fee: 15, desc: 'Soft sand, slow and tiring.' },
  { id: 'rooftop', name: 'Rooftop Court', surface: 'hard', speed: 1.05, fee: 60, desc: 'A windy court above the marina.' },
  { id: 'academy', name: 'Academy Centre', surface: 'grass', speed: 1.3, fee: 80, desc: 'The show court, centre of the club.' },
];

export const TENNIS_RACKETS = [
  { id: 'wood', name: 'Wooden Racket', cost: 0, power: 40, control: 40, spin: 30, weight: 380, desc: 'An old wooden racket, heavy but honest.' },
  { id: 'club', name: 'Club Racket', cost: 120, power: 55, control: 55, spin: 45, weight: 320, desc: 'A solid all-round club racket.' },
  { id: 'spin-pro', name: 'Spin Pro', cost: 300, power: 60, control: 65, spin: 85, weight: 300, desc: 'Built for heavy topspin.' },
  { id: 'power-x', name: 'Power X', cost: 450, power: 90, control: 50, spin: 50, weight: 310, desc: 'Raw power for big servers.' },
  { id: 'control-plus', name: 'Control Plus', cost: 500, power: 55, control: 90, spin: 60, weight: 295, desc: 'Pinpoint placement on every shot.' },
  { id: 'feather', name: 'Feather Lite', cost: 650, power: 65, control: 75, spin: 70, weight: 260, desc: 'So light it feels like part of your arm.' },
  { id: 'tournament', name: 'Tournament Spec', cost: 900, power: 80, control: 85, spin: 75, weight: 305, desc: 'The racket the pros use.' },
  { id: 'champion', name: 'Champion Signature', cost: 1500, power: 95, control: 90, spin: 85, weight: 300, desc: 'Signed by the bay champion, and it shows.' },
];

export const TENNIS_SHOES = [
  { id: 'sneakers', name: 'Street Sneakers', cost: 0, speed: 40, grip: 40, desc: 'Everyday sneakers, not made for courts.' },
  { id: 'court-lite', name: 'Court Lite', cost: 100, speed: 60, grip: 65, desc: 'Light court shoes with decent grip.' },
  { id: 'clay-grip', name: 'Clay Grip', cost: 180, speed: 65, grip: 90, desc: 'Deep tread for sliding on clay.' },
  { id: 'speed-pro', name: 'Speed Pro', cost: 320, speed: 90, grip: 80, desc: 'Built for chasing every ball down.' },
];

export const TENNIS_SHOTS = [
  { id: 'topspin', name: 'Topspin', baseChance: 0.55, staminaCost: 4, thrill: 0.5, risk: 0.2, desc: 'A heavy topspin forehand.' },
  { id: 'flat', name: 'Flat Drive', baseChance: 0.5, staminaCost: 3, thrill: 0.4, risk: 0.3, desc: 'A flat bullet down the line.' },
  { id: 'slice', name: 'Slice', baseChance: 0.6, staminaCost: 2, thrill: 0.3, risk: 0.1, desc: 'A low skidding slice.' },
  { id: 'volley', name: 'Volley', baseChance: 0.58, staminaCost: 3, thrill: 0.6, risk: 0.25, desc: 'A crisp volley at the net.' },
  { id: 'drop', name: 'Drop Shot', baseChance: 0.45, staminaCost: 2, thrill: 0.8, risk: 0.4, desc: 'A soft drop just over the net.' },
  { id: 'lob', name: 'Lob', baseChance: 0.52, staminaCost: 3, thrill: 0.5, risk: 0.2, desc: 'A high lob over the net rusher.' },
  { id: 'ace-serve', name: 'Ace Serve', baseChance: 0.4, staminaCost: 5, thrill: 0.9, risk: 0.45, desc: 'A huge serve, ace or double fault.' },
  { id: 'smash', name: 'Smash', baseChance: 0.62, staminaCost: 4, thrill: 0.7, risk: 0.2, desc: 'An overhead smash to finish the point.' },
];

export const TENNIS_OPPONENTS = [
  { id: 'champion', name: 'The Champion', rank: 1, skill: 95, style: 'complete', stamina: 95, weakness: 'drop', desc: 'The bay champion, unbeaten in years.' },
  { id: 'marco', name: 'Marco', rank: 2, skill: 88, style: 'power', stamina: 85, weakness: 'slice', desc: 'A huge server with a short temper.' },
  { id: 'sofia', name: 'Sofia', rank: 3, skill: 82, style: 'baseline', stamina: 90, weakness: 'volley', desc: 'Never misses from the back of the court.' },
  { id: 'diego', name: 'Diego', rank: 4, skill: 76, style: 'serve-volley', stamina: 80, weakness: 'lob', desc: 'Rushes the net at every chance.' },
  { id: 'emma', name: 'Emma', rank: 5, skill: 70, style: 'counter', stamina: 85, weakness: 'flat', desc: 'Turns your power against you.' },
  { id: 'leo', name: 'Leo', rank: 6, skill: 64, style: 'aggressive', stamina: 75, weakness: 'topspin', desc: 'Goes for winners on every ball.' },
  { id: 'nina', name: 'Nina', rank: 7, skill: 58, style: 'steady', stamina: 80, weakness: 'ace-serve', desc: 'Steady as a rock, rarely rattled.' },
  { id: 'omar', name: 'Omar', rank: 8, skill: 52, style: 'defensive', stamina: 70, weakness: 'smash', desc: 'Gets everything back, somehow.' },
  { id: 'pia', name: 'Pia', rank: 9, skill: 46, style: 'varied', stamina: 65, weakness: 'slice', desc: 'A tricky junior with odd spins.' },
  { id: 'tom', name: 'Tom', rank: 10, skill: 40, style: 'beginner', stamina: 60, weakness: 'topspin', desc: 'New to the club, keen but raw.' },
];

export const TENNIS_TOURNAMENTS = [
  { id: 'park-open', name: 'Park Open', entryFee: 50, rounds: 2, prize: 300, minRank: 10, surface: 'hard', desc: 'The friendly park tournament.' },
  { id: 'clay-classic', name: 'Clay Classic', entryFee: 120, rounds: 3, prize: 700, minRank: 8, surface: 'clay', desc: 'A slow grind on the red clay.' },
  { id: 'grass-cup', name: 'Grass Cup', entryFee: 200, rounds: 3, prize: 1000, minRank: 6, surface: 'grass', desc: 'Fast points on the club grass.' },
  { id: 'bay-masters', name: 'Bay Masters', entryFee: 400, rounds: 4, prize: 2500, minRank: 4, surface: 'hard', desc: 'The big bay event.' },
  { id: 'night-lights', name: 'Night Lights', entryFee: 300, rounds: 3, prize: 1500, minRank: 5, surface: 'carpet', desc: 'Indoor carpet under the lights.' },
  { id: 'championship', name: 'Bay Championship', entryFee: 800, rounds: 4, prize: 6000, minRank: 2, surface: 'grass', desc: 'The title, against the very best.' },
];

export const TENNIS_TRAINING = [
  { id: 'serve-practice', name: 'Serve Practice', cost: 30, xp: 12, staminaCost: 10, skill: 'serve', desc: 'Bucket after bucket of serves.' },
  { id: 'rally-drills', name: 'Rally Drills', cost: 30, xp: 12, staminaCost: 12, skill: 'rally', desc: 'Long rallies until your legs burn.' },
  { id: 'sprint-work', name: 'Sprint Work', cost: 25, xp: 10, staminaCost: 15, skill: 'speed', desc: 'Court sprints and footwork ladders.' },
  { id: 'endurance-run', name: 'Endurance Run', cost: 20, xp: 10, staminaCost: 18, skill: 'stamina', desc: 'A long run along the bay.' },
  { id: 'tactics-class', name: 'Tactics Class', cost: 40, xp: 14, staminaCost: 5, skill: 'tactics', desc: 'Study the game, then play it smarter.' },
  { id: 'private-coach', name: 'Private Coach', cost: 150, xp: 30, staminaCost: 20, skill: 'all', desc: 'A full session with the club coach.' },
];

export const TENNIS_RANKS = [
  { level: 0, name: 'Beginner', xp: 0, ladder: 12, perk: 'Play ladder matches and park events.' },
  { level: 1, name: 'Club Player', xp: 150, ladder: 10, perk: 'Enter the bay series events.' },
  { level: 2, name: 'Contender', xp: 400, ladder: 7, perk: 'Grass and clay cups open up.' },
  { level: 3, name: 'Star', xp: 800, ladder: 4, perk: 'The masters events take notice.' },
  { level: 4, name: 'Bay Champion', xp: 1500, ladder: 1, perk: 'Top of the ladder, top of the bay.' },
];

export const TENNIS_SPONSORS = [
  { id: 'racket-co', name: 'Racket Co', pay: 200, need: 'matches', goal: 5, desc: 'Pays for every five matches played.' },
  { id: 'string-lab', name: 'String Lab', pay: 350, need: 'wins', goal: 3, desc: 'Pays for every three wins.' },
  { id: 'court-drinks', name: 'Court Drinks', pay: 600, need: 'titles', goal: 1, desc: 'Pays for every title won.' },
  { id: 'ace-energy', name: 'Ace Energy', pay: 400, need: 'aces', goal: 10, desc: 'Pays for every ten aces served.' },
];

export const TENNIS_DRILLS = [
  { id: 'wall-rally', name: 'Wall Rally', xp: 8, staminaCost: 6, desc: 'A hundred balls against the wall.' },
  { id: 'target-serve', name: 'Target Serve', xp: 10, staminaCost: 8, desc: 'Hit the corner targets, ten in a row.' },
  { id: 'footwork-ladder', name: 'Footwork Ladder', xp: 7, staminaCost: 10, desc: 'Quick feet through the ladder.' },
  { id: 'volley-net', name: 'Volley at Net', xp: 9, staminaCost: 7, desc: 'Soft hands at the net.' },
  { id: 'shadow-swings', name: 'Shadow Swings', xp: 5, staminaCost: 4, desc: 'Perfect the swing with no ball.' },
];

export const TENNIS_PARTNERS = [
  { id: 'mia', name: 'Mia', skill: 70, style: 'baseline', chemistry: 80, desc: 'Steady from the back, great at the net too.' },
  { id: 'ken', name: 'Ken', skill: 75, style: 'power', chemistry: 65, desc: 'Big serve, big forehand, big heart.' },
  { id: 'ana', name: 'Ana', skill: 68, style: 'volley', chemistry: 85, desc: 'Lives at the net, poaches everything.' },
  { id: 'rui', name: 'Rui', skill: 80, style: 'complete', chemistry: 70, desc: 'A former singles star trying doubles.' },
  { id: 'bea', name: 'Bea', skill: 60, style: 'steady', chemistry: 90, desc: 'Never misses, always in the right spot.' },
  { id: 'sam', name: 'Sam', skill: 55, style: 'aggressive', chemistry: 60, desc: 'Goes for broke on every return.' },
  { id: 'liv', name: 'Liv', skill: 72, style: 'serve-volley', chemistry: 75, desc: 'Serves and charges, every single time.' },
  { id: 'max', name: 'Max', skill: 65, style: 'counter', chemistry: 78, desc: 'Reads the game two shots ahead.' },
];

export const TENNIS_DOUBLES_TEAMS = [
  { id: 'twin-aces', name: 'Twin Aces', skill: 60, style: 'power', desc: 'Two big servers, no patience.' },
  { id: 'net-rushers', name: 'Net Rushers', skill: 70, style: 'volley', desc: 'Both at the net before you blink.' },
  { id: 'wall-pair', name: 'Wall Pair', skill: 65, style: 'defensive', desc: 'They get everything back, twice.' },
  { id: 'spin-twins', name: 'Spin Twins', skill: 75, style: 'spin', desc: 'Balls that curve like they are alive.' },
  { id: 'veterans', name: 'Veterans', skill: 80, style: 'crafty', desc: 'Old, slow, and impossible to beat.' },
  { id: 'champ-pair', name: 'Champ Pair', skill: 90, style: 'complete', desc: 'The reigning doubles champions.' },
];

export const TENNIS_EXHIBITIONS = [
  { id: 'charity-night', name: 'Charity Night', fee: 200, crowd: 150, desc: 'A friendly night for a good cause.' },
  { id: 'club-gala', name: 'Club Gala', fee: 350, crowd: 300, desc: 'The annual club showcase.' },
  { id: 'beach-show', name: 'Beach Show', fee: 300, crowd: 250, desc: 'An exhibition on the sand court.' },
  { id: 'kids-clinic', name: 'Kids Clinic', fee: 150, crowd: 100, desc: 'Teach the juniors, charm the parents.' },
  { id: 'pro-am', name: 'Pro-Am Day', fee: 500, crowd: 500, desc: 'Play alongside a real pro.' },
];

export const TENNIS_COURT_SLOTS = [
  { id: 'morning', name: 'Morning', hour: 8, mult: 0.8, desc: 'Early and cheap, dew on the lines.' },
  { id: 'midday', name: 'Midday', hour: 12, mult: 1.0, desc: 'Standard midday slot.' },
  { id: 'afternoon', name: 'Afternoon', hour: 15, mult: 1.1, desc: 'Warm courts, busy club.' },
  { id: 'evening', name: 'Evening', hour: 18, mult: 1.3, desc: 'Prime time under the lights.' },
  { id: 'night', name: 'Night', hour: 21, mult: 1.5, desc: 'Late night, floodlit and quiet.' },
];

export const TENNIS_TIPS = [
  { id: 'tip-serve', name: 'Serve Smart', tip: 'An ace serve risks a double fault, use it sparingly.' },
  { id: 'tip-weakness', name: 'Find Weakness', tip: 'Every rival has a weak shot, hit it often.' },
  { id: 'tip-stamina', name: 'Save Stamina', tip: 'Low stamina drains faster, rest between matches.' },
  { id: 'tip-surface', name: 'Surface Matters', tip: 'Grass loves volleys, clay loves topspin.' },
  { id: 'tip-train', name: 'Train Daily', tip: 'Six practices a day is the cap, use them all.' },
  { id: 'tip-ladder', name: 'Climb Slowly', tip: 'Beating a better-ranked rival jumps your ladder.' },
  { id: 'tip-rain', name: 'Rain Delay', tip: 'Rain closes the courts, wait for the next day.' },
  { id: 'tip-sponsors', name: 'Sponsors Pay', tip: 'Sponsors pay when their milestone hits.' },
];

export const TENNIS_RECORDS = [
  { name: 'The Champion', wins: 120, titles: 18, desc: 'Unbeaten for three seasons.' },
  { name: 'Marco', wins: 95, titles: 9, desc: 'The big server.' },
  { name: 'Sofia', wins: 88, titles: 7, desc: 'The baseline wall.' },
  { name: 'Diego', wins: 70, titles: 4, desc: 'The net rusher.' },
  { name: 'Emma', wins: 61, titles: 3, desc: 'The counter-puncher.' },
  { name: 'Ria', wins: 0, titles: 0, desc: 'The new player at the club.' },
];

export const TENNIS_RECORDS_TABLE = [
  { id: 'matches', name: 'Matches Played', field: 'matchesPlayed', unit: 'matches', desc: 'All matches played.' },
  { id: 'wins', name: 'Matches Won', field: 'matchesWon', unit: 'wins', desc: 'All matches won.' },
  { id: 'titles', name: 'Titles', field: 'titles', unit: 'titles', desc: 'All tournaments won.' },
  { id: 'aces', name: 'Aces', field: 'aces', unit: 'aces', desc: 'All aces served.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned from tennis.' },
];

export const TENNIS_SEASONAL_EVENTS = [
  { id: 'spring-open', name: 'Spring Open', season: 'spring', prize: 600, desc: 'The spring season opener.' },
  { id: 'summer-smash', name: 'Summer Smash', season: 'summer', prize: 1000, desc: 'The big summer event.' },
  { id: 'autumn-cup', name: 'Autumn Cup', season: 'autumn', prize: 700, desc: 'Autumn leaves on the clay.' },
  { id: 'winter-indoor', name: 'Winter Indoor', season: 'winter', prize: 800, desc: 'Indoor carpet in the cold months.' },
];

export const TENNIS_QUICK_START = [
  'Train a skill, then challenge the lowest ladder rival.',
  'Play points with the shot that matches the rival weakness.',
  'Win matches to climb the ladder, smaller numbers are better.',
  'Enter a tournament once your ladder qualifies.',
  'Rest to recover stamina between matches.',
  'Buy a better racket when your old one holds you back.',
];

export const TENNIS_META = {
  system: 'tennis',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 1003,
  features: ['matches', 'tournaments', 'training', 'rackets', 'doubles', 'sponsors'],
};

function findRacket(id) { return TENNIS_RACKETS.find((r) => r.id === id); }
function findShoes(id) { return TENNIS_SHOES.find((s) => s.id === id); }
function findShot(id) { return TENNIS_SHOTS.find((s) => s.id === id); }
function findOpp(id) { return TENNIS_OPPONENTS.find((o) => o.id === id); }
function findCourt(id) { return TENNIS_COURTS.find((c) => c.id === id); }
function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

export function tennisRankFor(xp) {
  let out = 0;
  for (const r of TENNIS_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function tennisPointLabel(points) {
  if (points <= 0) return '0';
  if (points === 1) return '15';
  if (points === 2) return '30';
  return '40';
}

export function tennisGameScore(playerPoints, oppPoints) {
  if (playerPoints >= 3 && oppPoints >= 3) {
    if (playerPoints === oppPoints) return 'Deuce';
    if (playerPoints > oppPoints) return 'Advantage Ria';
    return 'Advantage Opponent';
  }
  return `${tennisPointLabel(playerPoints)}-${tennisPointLabel(oppPoints)}`;
}

export function tennisShotWinChance(shot, racket, shoes, playerSkill, oppSkill, staminaFrac, surfaceSpeed) {
  let chance = shot.baseChance;
  chance += (playerSkill - oppSkill) / 200;
  if (racket) chance += (racket.power - 50) / 200;
  if (shoes) chance += (shoes.speed - 50) / 300;
  chance += (staminaFrac - 0.5) * 0.2;
  chance += (surfaceSpeed - 1) * 0.1;
  return clampNum(chance, 0.05, 0.95);
}

export function tennisMatchPrize(opponent, rank, tournament) {
  let prize = 40 + opponent.skill * 2;
  prize *= 1 + rank * 0.1;
  if (tournament) prize *= 1.5;
  return Math.round(prize);
}

export function tennisDrillXp(drillId, streak) {
  const d = TENNIS_DRILLS.find((x) => x.id === drillId);
  if (!d) return 0;
  return d.xp + Math.min(streak, 5);
}

export function tennisSurfaceBonus(surface, shotId) {
  if (surface === 'grass' && shotId === 'volley') return 0.08;
  if (surface === 'grass' && shotId === 'ace-serve') return 0.05;
  if (surface === 'clay' && shotId === 'topspin') return 0.08;
  if (surface === 'sand' && shotId === 'drop') return 0.08;
  if (surface === 'carpet' && shotId === 'flat') return 0.08;
  return 0;
}

export function tennisLadderAfterWin(current, oppRank) {
  return oppRank < current ? oppRank : current;
}

export function tennisSeasonPoints(wins, titles, finals) {
  return wins * 10 + titles * 100 + finals * 25;
}

export function tennisCrowdReaction(thrill, won) {
  if (!won) return 'murmur';
  if (thrill >= 0.8) return 'roar';
  if (thrill >= 0.5) return 'cheer';
  return 'applause';
}

export function tennisDoublesWinChance(playerSkill, partnerSkill, chemistry, teamSkill) {
  const raw = (playerSkill + partnerSkill + chemistry + teamSkill) / 400;
  return clampNum(raw, 0.1, 0.9);
}

export function tennisSlotPrice(fee, slotId) {
  const slot = TENNIS_COURT_SLOTS.find((s) => s.id === slotId);
  if (!slot) return fee;
  return Math.round(fee * slot.mult);
}

export function tennisExhibitionPay(exhibition, crowdFavour) {
  return Math.round(exhibition.fee * (1 + crowdFavour / 100));
}

export function tennisPracticeMatch(playerSkill, oppSkill, rng) {
  const chance = clampNum(0.5 + (playerSkill - oppSkill) / 200, 0.05, 0.95);
  const won = (rng ? rng() : Math.random()) < chance;
  return { won, chance: Math.round(chance * 100) / 100 };
}

export function tennisFitnessScore(stamina, speed, serve) {
  return Math.round(stamina * 0.4 + speed * 0.3 + serve * 0.3);
}

export function tennisRivalryLevel(matches, wins) {
  if (!matches) return 'new';
  const rate = wins / matches;
  if (rate >= 0.7) return 'dominant';
  if (wins === 0 && matches >= 3) return 'nemesis';
  return 'even';
}

export function tennisSeasonSummary(matches, wins, titles, aces) {
  return {
    matches, wins, titles, aces,
    winRate: matches ? Math.round((wins / matches) * 1000) / 10 : 0,
    points: tennisSeasonPoints(wins, titles, 0),
  };
}

export function tennisTipFor(day) {
  return TENNIS_TIPS[((day % TENNIS_TIPS.length) + TENNIS_TIPS.length) % TENNIS_TIPS.length];
}

export function tennisRecordsWith(playerWins, playerTitles) {
  const rows = TENNIS_RECORDS.map((r) => ({ ...r, wins: r.name === 'Ria' ? playerWins : r.wins, titles: r.name === 'Ria' ? playerTitles : r.titles }));
  rows.sort((a, b) => b.wins - a.wins);
  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}

export function tennisMatchLengthEstimate(sets, gamesPerSet) {
  return sets * gamesPerSet * 6;
}

export function tennisStaminaCost(shotId, rallies) {
  const shot = findShot(shotId);
  if (!shot) return 0;
  return shot.staminaCost * rallies;
}

export function tennisBestShotFor(oppId) {
  const opp = findOpp(oppId);
  return opp ? opp.weakness : null;
}

export function tennisCourtSpeedLabel(surface) {
  if (surface === 'grass') return 'Very fast';
  if (surface === 'hard') return 'Fast';
  if (surface === 'carpet') return 'Medium-fast';
  if (surface === 'clay') return 'Slow';
  return 'Very slow';
}

export function tennisRecordFor(recordId, state) {
  const rec = TENNIS_RECORDS_TABLE.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function tennisAllRecords(state) {
  return TENNIS_RECORDS_TABLE.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function tennisWinRate(wins, matches) {
  if (!matches) return 0;
  return Math.round((wins / matches) * 1000) / 10;
}

export function tennisAceRate(aces, matches) {
  if (!matches) return 0;
  return Math.round((aces / matches) * 10) / 10;
}

export function tennisPlayerGrade(wins, matches, titles) {
  const rate = tennisWinRate(wins, matches);
  if (rate >= 70 && titles >= 3) return 'S';
  if (rate >= 60 || titles >= 2) return 'A';
  if (rate >= 45) return 'B';
  if (rate >= 30) return 'C';
  return 'D';
}

export function tennisSeasonalEvent(seasonId) {
  return TENNIS_SEASONAL_EVENTS.find((e) => e.season === seasonId) || null;
}

export function tennisEventPrize(eventId, place) {
  const ev = TENNIS_SEASONAL_EVENTS.find((e) => e.id === eventId);
  if (!ev) return 0;
  return Math.round(ev.prize * (place === 1 ? 1 : place === 2 ? 0.5 : 0.25));
}

export function tennisSetLengthEstimate(gamesWon, gamesLost) {
  return (gamesWon + gamesLost) * 5;
}

export function tennisBreakPoints(won, total) {
  if (!total) return 0;
  return Math.round((won / total) * 100);
}

export function tennisQuickStart(step) {
  if (step < 0 || step >= TENNIS_QUICK_START.length) return null;
  return TENNIS_QUICK_START[step];
}

export function tennisTotalValue(state) {
  return state.ownedRackets.length * 300 + state.ownedShoes.length * 150;
}

export function tennisProgressPercent(state) {
  if (!state.matchesPlayed) return 0;
  return Math.round((state.matchesWon / state.matchesPlayed) * 1000) / 10;
}

export function tennisSummary(state) {
  const rankName = TENNIS_RANKS[state.rank].name;
  return `${rankName} Ria is ladder ${state.ladder}, ${state.matchesWon}/${state.matchesPlayed} wins, ${state.titles} titles and ${state.aces} aces.`;
}

export function tennisNextGoal(state) {
  if (state.matchesPlayed < 3) return 'Play 3 matches to hit your first goal.';
  if (state.matchesWon < 1) return 'Win your first match to hit your next goal.';
  if (state.titles < 1) return 'Win your first title to hit your next goal.';
  return 'Beat the champion to hit your final goal.';
}

export function tennisMeta() {
  return { ...TENNIS_META, features: [...TENNIS_META.features] };
}

export function createTennisSystem(ctx) {
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
    xp: 0, rank: 0, ladder: 12, serve: 50, rally: 50, speed: 50, stamina: 70,
    tactics: 50, currentStamina: 100, ownedRackets: ['wood'], activeRacket: 'wood',
    ownedShoes: ['sneakers'], activeShoes: 'sneakers', matchesPlayed: 0, matchesWon: 0,
    setsWon: 0, gamesWon: 0, pointsWon: 0, aces: 0, doubleFaults: 0, titles: 0,
    finalsLost: 0, earned: 0, spent: 0, match: null, tournament: null,
    tournamentRound: 0, tournamentWins: 0, sponsors: [], sponsorProgress: {},
    practiceToday: 0, bestWinStreak: 0, winStreak: 0, rainDelay: false, lastDay: 1,
    dailyMatches: 0, beaten: {}, rivalries: {}, crowdFavour: 0, injuries: 0, restDays: 0,
  };

  function playerSkill() {
    return Math.round((state.serve + state.rally + state.speed + state.tactics) / 4);
  }
  function refreshRank() {
    const next = tennisRankFor(state.xp);
    if (next > state.rank) {
      state.rank = next;
      const ladderForRank = TENNIS_RANKS[next].ladder;
      if (ladderForRank < state.ladder) state.ladder = ladderForRank;
    }
  }
  function gainXp(n) { state.xp += n; refreshRank(); }
  function fail(reason) { return { ok: false, reason }; }
  function currentRacket() { return findRacket(state.activeRacket) || TENNIS_RACKETS[0]; }
  function currentShoes() { return findShoes(state.activeShoes) || TENNIS_SHOES[0]; }
  function currentCourt() { return state.match ? findCourt(state.match.court) || TENNIS_COURTS[0] : TENNIS_COURTS[0]; }

  function checkSponsors() {
    for (const sid of state.sponsors) {
      const sp = TENNIS_SPONSORS.find((s) => s.id === sid);
      if (!sp) continue;
      const metric = sp.need === 'matches' ? state.matchesPlayed
        : sp.need === 'wins' ? state.matchesWon
        : sp.need === 'titles' ? state.titles
        : state.aces;
      state.sponsorProgress[sid] = metric;
      if (metric >= sp.goal) {
        addCash(sp.pay);
        state.earned += sp.pay;
        state.sponsorProgress[sid] = 0;
        log(`Sponsor ${sp.name} paid ${sp.pay}.`);
      }
    }
  }

  function tourneyMatchWon() {
    const t = state.tournament;
    state.tournamentWins += 1;
    if (state.tournamentWins >= t.rounds) {
      state.titles += 1;
      addCash(t.prize);
      state.earned += t.prize;
      log(`Tournament won: ${t.name}, prize ${t.prize}.`);
      state.tournament = null;
      state.tournamentRound = 0;
      state.tournamentWins = 0;
    } else {
      state.tournamentRound += 1;
    }
  }

  function tourneyMatchLost() {
    state.finalsLost += 1;
    state.tournament = null;
    state.tournamentRound = 0;
    state.tournamentWins = 0;
  }

  function finishMatch() {
    const m = state.match;
    const opp = findOpp(m.opponent);
    const won = m.sets > m.oppSets;
    state.matchesPlayed += 1;
    state.dailyMatches += 1;
    let prize = 0;
    if (won) {
      state.matchesWon += 1;
      state.winStreak += 1;
      if (state.winStreak > state.bestWinStreak) state.bestWinStreak = state.winStreak;
      state.beaten[m.opponent] = (state.beaten[m.opponent] || 0) + 1;
      state.rivalries[m.opponent] = (state.rivalries[m.opponent] || 0) + 1;
      state.ladder = tennisLadderAfterWin(state.ladder, opp.rank);
      state.ladder = tennisLadderAfterWin(state.ladder, opp.rank);
      prize = tennisMatchPrize(opp, state.rank, m.tournament);
      addCash(prize);
      state.earned += prize;
      gainXp(40);
    } else {
      state.winStreak = 0;
      state.rivalries[m.opponent] = (state.rivalries[m.opponent] || 0) + 1;
      gainXp(15);
    }
    if (m.tournament) {
      if (won) tourneyMatchWon();
      else tourneyMatchLost();
    }
    state.match = null;
    checkSponsors();
    return { won, sets: m.sets, oppSets: m.oppSets, prize };
  }

  function checkGame() {
    const m = state.match;
    const p = m.points;
    const o = m.oppPoints;
    if (!((p >= 4 || o >= 4) && Math.abs(p - o) >= 2)) return null;
    const winner = p > o ? 'player' : 'opponent';
    if (winner === 'player') { m.games += 1; state.gamesWon += 1; }
    else m.oppGames += 1;
    m.points = 0;
    m.oppPoints = 0;
    m.serving = !m.serving;
    const game = { winner, games: m.games, oppGames: m.oppGames, setWon: false, matchWon: false };
    const set = checkSet();
    if (set) {
      game.setWon = true;
      game.setWinner = set.winner;
      if (set.match) { game.matchWon = true; game.match = set.match; }
    }
    return game;
  }

  function checkSet() {
    const m = state.match;
    if (!((m.games >= 6 || m.oppGames >= 6) && Math.abs(m.games - m.oppGames) >= 2)) return null;
    const winner = m.games > m.oppGames ? 'player' : 'opponent';
    if (winner === 'player') { m.sets += 1; state.setsWon += 1; }
    else m.oppSets += 1;
    m.games = 0;
    m.oppGames = 0;
    const out = { winner, sets: m.sets, oppSets: m.oppSets, match: null };
    if (m.sets >= 2 || m.oppSets >= 2) out.match = finishMatch();
    return out;
  }

  function buyRacket(racketId) {
    const r = findRacket(racketId);
    if (!r) return fail('unknown racket');
    if (state.ownedRackets.includes(racketId)) return fail('already owned');
    if (getCash() < r.cost) return fail('not enough cash');
    addCash(-r.cost);
    state.spent += r.cost;
    state.ownedRackets.push(racketId);
    gainXp(15);
    return { ok: true, id: racketId };
  }

  function selectRacket(racketId) {
    if (!state.ownedRackets.includes(racketId)) return fail('racket not owned');
    state.activeRacket = racketId;
    return { ok: true, id: racketId, racket: currentRacket() };
  }

  function buyShoes(shoesId) {
    const s = findShoes(shoesId);
    if (!s) return fail('unknown shoes');
    if (state.ownedShoes.includes(shoesId)) return fail('already owned');
    if (getCash() < s.cost) return fail('not enough cash');
    addCash(-s.cost);
    state.spent += s.cost;
    state.ownedShoes.push(shoesId);
    gainXp(10);
    return { ok: true, id: shoesId };
  }

  function selectShoes(shoesId) {
    if (!state.ownedShoes.includes(shoesId)) return fail('shoes not owned');
    state.activeShoes = shoesId;
    return { ok: true, id: shoesId };
  }

  function train(trainingId) {
    const t = TENNIS_TRAINING.find((x) => x.id === trainingId);
    if (!t) return fail('unknown training');
    if (state.currentStamina < t.staminaCost + 5) return fail('not enough stamina');
    if (getCash() < t.cost) return fail('not enough cash');
    if (state.practiceToday >= 6) return fail('daily practice cap reached');
    addCash(-t.cost);
    state.spent += t.cost;
    state.currentStamina -= t.staminaCost;
    state.practiceToday += 1;
    if (t.skill === 'all') {
      for (const k of ['serve', 'rally', 'speed', 'tactics']) state[k] = Math.min(99, state[k] + 1);
    } else {
      state[t.skill] = Math.min(99, state[t.skill] + 2);
    }
    gainXp(t.xp);
    return { ok: true, id: trainingId, xp: t.xp, skill: playerSkill() };
  }

  function startMatch(opponentId, courtId) {
    const opp = findOpp(opponentId);
    if (!opp) return fail('unknown opponent');
    if (state.match) return fail('match already active');
    if (state.currentStamina < 25) return fail('not enough stamina');
    if (state.rainDelay) return fail('rain delay, courts closed');
    const court = findCourt(courtId || 'park') || TENNIS_COURTS[0];
    if (getCash() < court.fee) return fail('not enough cash for the court fee');
    addCash(-court.fee);
    state.spent += court.fee;
    state.match = {
      opponent: opponentId, court: court.id, points: 0, oppPoints: 0,
      games: 0, oppGames: 0, sets: 0, oppSets: 0, serving: true,
      log: [], tournament: !!state.tournament,
    };
    return { ok: true, opponent: opponentId, court: court.id };
  }

  function playPoint(shotId) {
    const shot = findShot(shotId);
    if (!state.match) return fail('no match active');
    if (!shot) return fail('unknown shot');
    const m = state.match;
    const opp = findOpp(m.opponent);
    const court = currentCourt();
    let chance = tennisShotWinChance(shot, currentRacket(), currentShoes(), playerSkill(), opp.skill, state.currentStamina / 100, court.speed);
    chance += tennisSurfaceBonus(court.surface, shotId);
    if (shotId === opp.weakness) chance += 0.1;
    if (shotId === 'ace-serve' && m.serving) chance += 0.05;
    chance = clampNum(chance, 0.05, 0.95);
    state.currentStamina = Math.max(0, state.currentStamina - shot.staminaCost * (100 / state.stamina));
    const won = rng() < chance;
    let ace = false;
    let doubleFault = false;
    if (shotId === 'ace-serve') {
      if (won) { state.aces += 1; ace = true; }
      else { state.doubleFaults += 1; doubleFault = true; }
    }
    if (won) { m.points += 1; state.pointsWon += 1; }
    else m.oppPoints += 1;
    m.log.push({ shot: shotId, won, chance: Math.round(chance * 100) / 100 });
    if (m.log.length > 40) m.log = m.log.slice(-40);
    const game = checkGame();
    const finished = !state.match;
    const gameScore = finished ? null : tennisGameScore(m.points, m.oppPoints);
    return {
      ok: true, won, ace, doubleFault, chance: Math.round(chance * 100) / 100,
      gameScore,
      gamesScore: `${m.games}-${m.oppGames}`,
      setsScore: `${m.sets}-${m.oppSets}`,
      game,
      stamina: Math.round(state.currentStamina * 10) / 10,
    };
  }

  function forfeitMatch() {
    if (!state.match) return fail('no match active');
    state.match = null;
    state.matchesPlayed += 1;
    state.winStreak = 0;
    return { ok: true };
  }

  function enterTournament(tournamentId) {
    const t = TENNIS_TOURNAMENTS.find((x) => x.id === tournamentId);
    if (!t) return fail('unknown tournament');
    if (state.tournament) return fail('tournament already active');
    if (state.ladder > t.minRank) return fail('ladder too low for this tournament');
    if (getCash() < t.entryFee) return fail('not enough cash');
    addCash(-t.entryFee);
    state.spent += t.entryFee;
    state.tournament = { ...t };
    state.tournamentRound = 1;
    state.tournamentWins = 0;
    return { ok: true, tournament: tournamentId, rounds: t.rounds };
  }

  function tourneyNextOpponent() {
    if (!state.tournament) return fail('no tournament active');
    const pool = TENNIS_OPPONENTS.filter((o) => o.rank >= state.ladder - 2 && o.rank <= state.ladder + 4);
    const opp = pool[Math.floor(rng() * pool.length)] || TENNIS_OPPONENTS[TENNIS_OPPONENTS.length - 1];
    const court = TENNIS_COURTS.find((c) => c.surface === state.tournament.surface) || TENNIS_COURTS[0];
    return startMatch(opp.id, court.id);
  }

  function signSponsor(sponsorId) {
    const sp = TENNIS_SPONSORS.find((s) => s.id === sponsorId);
    if (!sp) return fail('unknown sponsor');
    if (state.sponsors.includes(sponsorId)) return fail('already signed');
    if (sponsorId !== TENNIS_SPONSORS[0].id && state.rank < 1) return fail('rank too low for this sponsor');
    state.sponsors.push(sponsorId);
    state.sponsorProgress[sponsorId] = 0;
    return { ok: true, id: sponsorId };
  }

  function rest() {
    state.currentStamina = 100;
    state.restDays += 1;
    return { ok: true, stamina: 100 };
  }

  function setRainDelay(on) {
    state.rainDelay = !!on;
    if (on) log('Rain delay, courts closed.');
    return { ok: true, rainDelay: state.rainDelay };
  }

  function tick(dt) {
    if (state.match) {
      state.currentStamina = Math.max(0, state.currentStamina - 0.05 * dt);
    } else {
      state.currentStamina = Math.min(100, state.currentStamina + 0.2 * dt);
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.practiceToday = 0;
    state.dailyMatches = 0;
    state.currentStamina = 100;
    const wasRaining = state.rainDelay;
    state.rainDelay = rng() < 0.2;
    if (state.tournament && rng() < 0.3) log('Tournament draw moved indoors.');
    if (!wasRaining && state.rainDelay) log('Rain delay today.');
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
      rank: TENNIS_RANKS[state.rank].name, xp: state.xp, ladder: state.ladder,
      skill: playerSkill(), serve: state.serve, rally: state.rally, speed: state.speed,
      stamina: state.stamina, tactics: state.tactics,
      currentStamina: Math.round(state.currentStamina),
      racket: state.activeRacket, shoes: state.activeShoes,
      matchesPlayed: state.matchesPlayed, matchesWon: state.matchesWon,
      setsWon: state.setsWon, gamesWon: state.gamesWon, pointsWon: state.pointsWon,
      aces: state.aces, doubleFaults: state.doubleFaults, titles: state.titles,
      finalsLost: state.finalsLost, earned: Math.round(state.earned), spent: state.spent,
      winStreak: state.winStreak, bestWinStreak: state.bestWinStreak,
      tournament: state.tournament ? state.tournament.id : null,
      tournamentRound: state.tournamentRound, sponsors: state.sponsors.length,
      crowdFavour: state.crowdFavour, rainDelay: state.rainDelay,
      inMatch: !!state.match,
      gameScore: state.match ? tennisGameScore(state.match.points, state.match.oppPoints) : null,
    };
  }

  function hudLine() {
    if (state.match) {
      const opp = findOpp(state.match.opponent);
      return `vs ${opp.name}: ${tennisGameScore(state.match.points, state.match.oppPoints)}, games ${state.match.games}-${state.match.oppGames}, sets ${state.match.sets}-${state.match.oppSets}.`;
    }
    if (state.tournament) return `Tournament ${state.tournament.name}, round ${state.tournamentRound}.`;
    if (state.rainDelay) return 'Courts closed, rain delay.';
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - (-40);
    const dz = (pos.z || 0) - (-90);
    if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
    if (state.match) { playPoint('topspin'); return true; }
    return false;
  }

  function ladderBoard() {
    return [...TENNIS_OPPONENTS].sort((a, b) => a.rank - b.rank).map((o) => ({
      rank: o.rank, name: o.name, skill: o.skill, style: o.style,
      beaten: state.beaten[o.id] || 0, rivalry: state.rivalries[o.id] || 0,
    }));
  }

  function courtList() {
    return TENNIS_COURTS.map((c) => ({ id: c.id, name: c.name, surface: c.surface, fee: c.fee }));
  }

  return {
    state, buyRacket, selectRacket, buyShoes, selectShoes, train, startMatch,
    playPoint, forfeitMatch, enterTournament, tourneyNextOpponent, signSponsor,
    rest, setRainDelay, tick, tickDay, serialize, deserialize, stats, hudLine,
    interact, ladderBoard, courtList, playerSkill, currentRacket, currentShoes,
  };
}

export function createTennisDoubles(system) {
  const st = system.state;
  let partner = null;
  let doublesMatches = 0;
  let doublesWins = 0;
  let doublesTitles = 0;
  let exhibitionsPlayed = 0;
  let exhibitionsEarned = 0;
  let bookings = [];

  function fail(reason) { return { ok: false, reason }; }

  function pickPartner(partnerId) {
    const p = TENNIS_PARTNERS.find((x) => x.id === partnerId);
    if (!p) return fail('unknown partner');
    partner = partnerId;
    return { ok: true, partner: partnerId, name: p.name };
  }

  function playDoubles(teamId) {
    const team = TENNIS_DOUBLES_TEAMS.find((t) => t.id === teamId);
    if (!team) return fail('unknown team');
    if (!partner) return fail('no partner picked');
    const p = TENNIS_PARTNERS.find((x) => x.id === partner);
    const chance = tennisDoublesWinChance(system.playerSkill(), p.skill, p.chemistry, team.skill);
    const won = Math.random() < chance;
    doublesMatches += 1;
    if (won) {
      doublesWins += 1;
      const prize = Math.round(50 + team.skill);
      return { ok: true, won: true, prize, chance: Math.round(chance * 100) / 100 };
    }
    return { ok: true, won: false, prize: 0, chance: Math.round(chance * 100) / 100 };
  }

  function playExhibition(exhibitionId) {
    const ex = TENNIS_EXHIBITIONS.find((e) => e.id === exhibitionId);
    if (!ex) return fail('unknown exhibition');
    const pay = tennisExhibitionPay(ex, st.crowdFavour);
    exhibitionsPlayed += 1;
    exhibitionsEarned += pay;
    return { ok: true, exhibition: exhibitionId, pay, crowd: ex.crowd };
  }

  function bookCourt(courtId, slotId) {
    const court = TENNIS_COURTS.find((c) => c.id === courtId);
    if (!court) return fail('unknown court');
    const slot = TENNIS_COURT_SLOTS.find((s) => s.id === slotId);
    if (!slot) return fail('unknown slot');
    const price = tennisSlotPrice(court.fee, slotId);
    const booking = { court: courtId, slot: slotId, price, day: st.lastDay };
    bookings.push(booking);
    return { ok: true, booking };
  }

  function doublesRecord() {
    return {
      partner, matches: doublesMatches, wins: doublesWins, titles: doublesTitles,
      exhibitionsPlayed, exhibitionsEarned, bookings: bookings.length,
    };
  }

  function winDoublesTitle() {
    doublesTitles += 1;
    return { ok: true, titles: doublesTitles };
  }

  return {
    pickPartner, playDoubles, playExhibition, bookCourt, doublesRecord, winDoublesTitle,
    get partner() { return partner; },
  };
}
