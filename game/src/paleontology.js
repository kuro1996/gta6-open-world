export const FOSSIL_SITES = [
  { id: 'river', name: 'River Bank', value: 30, difficulty: 1, rarity: 0.3, depth: 1, era: 'Pleistocene', desc: 'Gravel bars where the river drops old bones.' },
  { id: 'chalk', name: 'Chalk Cliffs', value: 45, difficulty: 1, rarity: 0.25, depth: 1, era: 'Cretaceous', desc: 'White cliffs full of sea creatures.' },
  { id: 'tar', name: 'Tar Pits', value: 60, difficulty: 2, rarity: 0.2, depth: 2, era: 'Pleistocene', desc: 'Black tar that trapped giants whole.' },
  { id: 'cave', name: 'Bone Cave', value: 70, difficulty: 2, rarity: 0.18, depth: 2, era: 'Jurassic', desc: 'A dark cave floored with old bones.' },
  { id: 'badlands', name: 'Badlands', value: 90, difficulty: 3, rarity: 0.12, depth: 2, era: 'Cretaceous', desc: 'Striped hills where skulls weather out.' },
  { id: 'lakebed', name: 'Dry Lakebed', value: 50, difficulty: 1, rarity: 0.22, depth: 1, era: 'Miocene', desc: 'Cracked mud hiding fish and ferns.' },
  { id: 'quarry', name: 'Old Quarry', value: 80, difficulty: 2, rarity: 0.15, depth: 2, era: 'Jurassic', desc: 'Cut stone walls with bones in the layers.' },
  { id: 'volcano', name: 'Volcano Ash', value: 150, difficulty: 4, rarity: 0.05, depth: 3, era: 'Cretaceous', desc: 'Ash beds that buried nests whole.' },
  { id: 'glacier', name: 'Glacier Edge', value: 110, difficulty: 3, rarity: 0.08, depth: 3, era: 'Pleistocene', desc: 'Blue ice giving up frozen birds.' },
  { id: 'reef', name: 'Fossil Reef', value: 65, difficulty: 2, rarity: 0.16, depth: 1, era: 'Devonian', desc: 'An ancient reef turned to stone.' },
];

export const FOSSIL_FINDS = [
  { id: 'shell', name: 'Shell', value: 25, site: 'reef', rarity: 0.3, parts: 1, desc: 'A ridged shell from an old sea.' },
  { id: 'fish', name: 'Fish Fossil', value: 40, site: 'lakebed', rarity: 0.25, parts: 1, desc: 'A whole fish pressed flat in stone.' },
  { id: 'tooth', name: 'Tooth', value: 60, site: 'river', rarity: 0.2, parts: 1, desc: 'A sharp tooth, bigger than your thumb.' },
  { id: 'trilobite', name: 'Trilobite', value: 55, site: 'reef', rarity: 0.18, parts: 1, desc: 'A segmented bug from the oldest seas.' },
  { id: 'fern', name: 'Fern Imprint', value: 35, site: 'lakebed', rarity: 0.22, parts: 2, desc: 'A delicate fern pressed into shale.' },
  { id: 'tusk', name: 'Tusk', value: 150, site: 'tar', rarity: 0.08, parts: 2, desc: 'A curved tusk from a great mammoth.' },
  { id: 'skull', name: 'Skull', value: 200, site: 'badlands', rarity: 0.06, parts: 2, desc: 'A horned skull, heavy as a stone.' },
  { id: 'femur', name: 'Femur', value: 180, site: 'quarry', rarity: 0.07, parts: 2, desc: 'A thigh bone as long as your leg.' },
  { id: 'claw', name: 'Claw', value: 120, site: 'cave', rarity: 0.1, parts: 2, desc: 'A hooked claw from a night hunter.' },
  { id: 'egg', name: 'Fossil Egg', value: 300, site: 'volcano', rarity: 0.03, parts: 3, desc: 'A whole egg in ash, rarer than gold.' },
  { id: 'coral', name: 'Coral', value: 45, site: 'reef', rarity: 0.2, parts: 1, desc: 'Branching coral turned to rock.' },
  { id: 'bird', name: 'Bird Fossil', value: 160, site: 'glacier', rarity: 0.05, parts: 2, desc: 'A bird with feathers frozen in ice.' },
];

export const FOSSIL_SKELETONS = [
  { id: 'mammoth', name: 'Mammoth Skeleton', parts: ['tusk', 'tusk', 'femur'], value: 1200, desc: 'A towering mammoth, whole again.' },
  { id: 'sabre', name: 'Sabre Cat Skeleton', parts: ['skull', 'claw', 'claw'], value: 1100, desc: 'A sabre cat, teeth bared forever.' },
  { id: 'raptor', name: 'Raptor Skeleton', parts: ['claw', 'femur', 'skull'], value: 1500, desc: 'A swift raptor, posed mid-leap.' },
  { id: 'fish-school', name: 'Fish School Display', parts: ['fish', 'fish', 'fish'], value: 400, desc: 'Three fish caught in one slab.' },
  { id: 'ammonite-bed', name: 'Ammonite Bed', parts: ['shell', 'shell', 'shell'], value: 300, desc: 'A bed of coiled shells.' },
  { id: 'bird-link', name: 'Missing Link Bird', parts: ['bird', 'bird', 'fern'], value: 900, desc: 'A bird with feathers and a fern, side by side.' },
];

export const FOSSIL_BUYERS = [
  { id: 'museum', name: 'The Museum', mult: 1.0, likes: ['skull', 'femur', 'egg'], dislikes: ['shell'], mood: 'steady', minRank: 0, desc: 'Buys good finds for the display halls.' },
  { id: 'university', name: 'The University', mult: 1.2, likes: ['trilobite', 'fern', 'fish'], dislikes: ['coral'], mood: 'busy', minRank: 1, desc: 'Pays well for study specimens.' },
  { id: 'collector', name: 'The Collector', mult: 1.4, likes: ['egg', 'bird', 'tusk'], dislikes: ['shell', 'fish'], mood: 'eager', minRank: 2, desc: 'Pays silly money for rare finds.' },
  { id: 'tourist', name: 'Tourist Shop', mult: 0.9, likes: ['shell', 'coral'], dislikes: ['egg'], mood: 'flat', minRank: 0, desc: 'Buys pretty stones for tourists.' },
  { id: 'blackmarket', name: 'Black Market', mult: 1.6, likes: ['egg', 'skull', 'bird'], dislikes: [], mood: 'shady', minRank: 3, desc: 'Pays the most, and asks no questions.' },
];

export const FOSSIL_UPGRADES = [
  { id: 'brush', name: 'Soft Brush', cost: 80, desc: 'A brush that cleans fossils without breaking them.', effect: 'clean' },
  { id: 'permit', name: 'Dig Permit', cost: 120, desc: 'A stamped permit for the bone beds.', effect: 'legal' },
  { id: 'sieve', name: 'Fine Sieve', cost: 160, desc: 'A sieve that catches the smallest finds.', effect: 'find' },
  { id: 'chisel', name: 'Rock Chisel', cost: 240, desc: 'A chisel that frees fossils from hard rock.', effect: 'dig' },
  { id: 'lab', name: 'Prep Lab', cost: 420, desc: 'A lab bench for cleaning and study.', effect: 'clean' },
  { id: 'scanner', name: 'Ground Scanner', cost: 550, desc: 'A scanner that sees bones through rock.', effect: 'dig' },
  { id: 'crane', name: 'Lifting Crane', cost: 800, desc: 'A crane for the heaviest slabs.', effect: 'lift' },
  { id: 'archive', name: 'Archive Room', cost: 1100, desc: 'An archive that earns grants from your collection.', effect: 'grant' },
];

export const FOSSIL_RANKS = [
  { level: 0, name: 'Rock Hound', xp: 0, perk: 'Learning the layers.' },
  { level: 1, name: 'Digger', xp: 120, perk: 'A steady trowel.' },
  { level: 2, name: 'Fossil Hunter', xp: 300, perk: 'The beds give up their secrets.' },
  { level: 3, name: 'Paleontologist', xp: 620, perk: 'The university knows your name.' },
  { level: 4, name: 'Master of Bone Beds', xp: 1100, perk: 'Every bed in the county is yours.' },
];

export const FOSSIL_EVENTS = [
  { id: 'flood-exposure', name: 'Flood Exposure', mult: 1.2, sites: ['river', 'lakebed'], desc: 'A flood washed fresh bones out of the banks.' },
  { id: 'rockfall', name: 'Rockfall', mult: 0.8, sites: [], desc: 'A rockfall closed half the beds.' },
  { id: 'grant-season', name: 'Grant Season', mult: 1.3, sites: [], desc: 'Grants are flowing for good finds.' },
  { id: 'expo', name: 'Museum Expo', mult: 1.2, sites: [], desc: 'The museum is buying for a new expo.' },
  { id: 'heat-wave', name: 'Heat Wave', mult: 0.9, sites: [], desc: 'The heat makes digging miserable.' },
  { id: 'tar-bubble', name: 'Tar Bubble', mult: 1.3, sites: ['tar'], desc: 'Bubbling tar brings up fresh bones.' },
];

export const FOSSIL_CONTRACTS = [
  { id: 'shells-10', name: 'Shells Ten', find: 'shell', qty: 6, pay: 240, days: 2, rep: 0, desc: 'Six shells for the school display.' },
  { id: 'fish-6', name: 'Fish Six', find: 'fish', qty: 4, pay: 320, days: 2, rep: 1, desc: 'Four fish fossils for the university.' },
  { id: 'tusk-2', name: 'Tusk Two', find: 'tusk', qty: 2, pay: 560, days: 3, rep: 2, desc: 'Two tusks for the museum.' },
  { id: 'skull-1', name: 'One Skull', find: 'skull', qty: 1, pay: 700, days: 3, rep: 3, desc: 'A single great skull.' },
  { id: 'femur-2', name: 'Femur Two', find: 'femur', qty: 2, pay: 800, days: 3, rep: 3, desc: 'Two femurs for the mammoth hall.' },
  { id: 'egg-1', name: 'One Egg', find: 'egg', qty: 1, pay: 1000, days: 3, rep: 3, desc: 'A single fossil egg, whole and perfect.' },
];

export const FOSSIL_HAZARDS = [
  { id: 'break', name: 'Break', chance: 0.1, damage: 2, desc: 'The fossil shatters in the rock.' },
  { id: 'collapse', name: 'Collapse', chance: 0.08, damage: 4, desc: 'The trench wall comes down.' },
  { id: 'tar-burn', name: 'Tar Burn', chance: 0.07, damage: 3, desc: 'Hot tar on bare skin.' },
  { id: 'dust', name: 'Dust', chance: 0.12, damage: 1, desc: 'Choking dust in the trench.' },
  { id: 'snake', name: 'Snake', chance: 0.05, damage: 2, desc: 'A snake curled in the shade.' },
];

export const FOSSIL_HELPERS = [
  { id: 'prepper', name: 'Prepper', wage: 35, skill: 'clean', bonus: 0.25, desc: 'Cleans fossils without breaking them.' },
  { id: 'scout', name: 'Scout', wage: 40, skill: 'find', bonus: 0.2, desc: 'Spots bone beds from a mile away.' },
  { id: 'hauler', name: 'Hauler', wage: 45, skill: 'carry', bonus: 0.4, desc: 'Carries slabs you could never lift.' },
  { id: 'professor', name: 'Professor', wage: 70, skill: 'grant', bonus: 0.3, desc: 'Writes grants that always get funded.' },
];

export const FOSSIL_CHALLENGES = [
  { id: 'finds-10', name: 'Ten Finds', target: 'finds', goal: 10, xp: 80, desc: 'Dig up ten fossils.' },
  { id: 'finds-50', name: 'Fifty Finds', target: 'finds', goal: 50, xp: 120, desc: 'Dig up fifty fossils.' },
  { id: 'skeleton-1', name: 'One Skeleton', target: 'skeletons', goal: 1, xp: 140, desc: 'Assemble one whole skeleton.' },
  { id: 'earn-1000', name: 'A Thousand Earned', target: 'earned', goal: 1000, xp: 120, desc: 'Earn a thousand from fossils.' },
  { id: 'grants-500', name: 'Five Hundred in Grants', target: 'grants', goal: 500, xp: 150, desc: 'Collect five hundred in grants.' },
  { id: 'contracts-5', name: 'Five Contracts', target: 'contractsDone', goal: 5, xp: 140, desc: 'Finish five fossil contracts.' },
  { id: 'egg-1', name: 'One Egg', target: 'bestValue', goal: 300, xp: 200, desc: 'Find something worth at least 300.' },
  { id: 'deep-3', name: 'Down to Three', target: 'deepest', goal: 3, xp: 150, desc: 'Reach depth three.' },
];

export const FOSSIL_ACHIEVEMENTS = [
  { id: 'first-find', name: 'First Find', check: (s) => s.finds >= 1, desc: 'Your first fossil.' },
  { id: 'first-skeleton', name: 'First Skeleton', check: (s) => s.skeletons >= 1 || s.skeletonsSold >= 1, desc: 'Your first assembled skeleton.' },
  { id: 'first-egg', name: 'First Egg', check: (s) => s.bestFind === 'egg', desc: 'You found a fossil egg.' },
  { id: 'rank-3', name: 'Paleontologist', check: (s) => s.rank >= 3, desc: 'Reach rank three.' },
  { id: 'rich-digger', name: 'Rich Digger', check: (s) => s.earned >= 1000, desc: 'Earn a thousand from fossils.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every fossil upgrade.' },
  { id: 'no-break', name: 'No Break', check: (s) => s.finds >= 10 && s.broken === 0, desc: 'Ten finds without breaking one.' },
  { id: 'mammoth', name: 'Mammoth!', check: (s) => s.skeletons >= 1, desc: 'You assembled a skeleton.' },
];

export const FOSSIL_TIPS = [
  { id: 'brush-first', name: 'Brush First', text: 'A soft brush saves fossils a chisel would shatter.' },
  { id: 'permit-first', name: 'Permit First', text: 'Buy the dig permit before you touch a bone bed.' },
  { id: 'skeleton', name: 'Build Skeletons', text: 'Whole skeletons are worth far more than loose bones.' },
  { id: 'river', name: 'River After Rain', text: 'Rain washes fresh bones out of the river banks.' },
  { id: 'lab', name: 'Use the Lab', text: 'A prep lab raises the value of every cleaned find.' },
  { id: 'egg', name: 'Eggs in Ash', text: 'Fossil eggs hide in the volcano ash beds.' },
  { id: 'black-market', name: 'Black Market', text: 'The black market pays most, but it brings heat.' },
  { id: 'grant', name: 'Chase Grants', text: 'An archive room turns your collection into grants.' },
];

export const FOSSIL_LEADERBOARD = [
  { name: 'Professor Ives', finds: 2400, desc: 'Dug up half the museum.' },
  { name: 'Scout Ben', finds: 1600, desc: 'Finds beds nobody else can.' },
  { name: 'Ria', finds: 0, desc: 'The new digger in town.' },
  { name: 'Prepper Ana', finds: 1100, desc: 'Cleans what others break.' },
  { name: 'Collector Vane', finds: 900, desc: 'Buys what he cannot dig.' },
];

export const FOSSIL_RECORDS = [
  { id: 'most-finds', name: 'Most Finds', stat: 'finds', unit: 'finds', desc: 'Fossils dug up in total.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Coin earned from fossils.' },
  { id: 'skeletons', name: 'Skeletons', stat: 'skeletons', unit: 'skeletons', desc: 'Skeletons assembled in total.' },
  { id: 'best-find', name: 'Best Find', stat: 'bestValue', unit: '$', desc: 'Most valuable single find.' },
  { id: 'grants', name: 'Grants', stat: 'grants', unit: '$', desc: 'Grants collected in total.' },
];

export const FOSSIL_QUICK_START = [
  'Buy the dig permit before you touch any bone bed.',
  'Start at the river bank; the gravel gives up easy finds.',
  'Brush every fossil out gently or it shatters.',
  'Save matching parts to assemble whole skeletons.',
  'Sell common finds to the museum, rare ones to the collector.',
  'Never sell a rare find to the tourist shop.',
];

export const FOSSIL_META = {
  system: 'paleontology',
  version: '7-B1',
  author: 'builder-1',
  sites: 10,
  finds: 12,
  note: 'Dig, clean, assemble, sell.',
};

export const FOSSIL_ERAS = [
  { id: 'devonian', name: 'Devonian', yearsAgo: '419 to 359 million years', desc: 'The age of fishes, when reefs ruled the seas.' },
  { id: 'jurassic', name: 'Jurassic', yearsAgo: '201 to 145 million years', desc: 'Giants walked the earth.' },
  { id: 'cretaceous', name: 'Cretaceous', yearsAgo: '145 to 66 million years', desc: 'The last age of the great dinosaurs.' },
  { id: 'miocene', name: 'Miocene', yearsAgo: '23 to 5 million years', desc: 'Warm seas and early mammals.' },
  { id: 'pleistocene', name: 'Pleistocene', yearsAgo: '2.6 million to 11,700 years', desc: 'Ice ages and mammoths.' },
];

export const FOSSIL_TOOLS = [
  { id: 'trowel', name: 'Trowel', cost: 20, desc: 'A small trowel for careful digging.' },
  { id: 'pick', name: 'Geology Pick', cost: 60, desc: 'A pick for splitting rock.' },
  { id: 'brush-set', name: 'Brush Set', cost: 40, desc: 'Soft brushes of every size.' },
  { id: 'sieve-set', name: 'Sieve Set', cost: 50, desc: 'Sieves for the smallest teeth.' },
  { id: 'plaster', name: 'Plaster Kit', cost: 70, desc: 'Plaster jackets for fragile bones.' },
  { id: 'field-kit', name: 'Field Kit', cost: 90, desc: 'Everything a digger carries.' },
  { id: 'lamp', name: 'Head Lamp', cost: 45, desc: 'Light for the dark cave digs.' },
  { id: 'gps', name: 'GPS Unit', cost: 110, desc: 'Marks every bed you find.' },
];

export const FOSSIL_FIELD_NOTES = [
  { id: 'layer', name: 'Read the Layer', text: 'The layer tells you the age before the bone does.' },
  { id: 'label', name: 'Label Everything', text: 'A fossil without a label is just a rock.' },
  { id: 'plaster', name: 'Plaster the Fragile', text: 'Jacket a fragile find before you lift it.' },
  { id: 'sieve', name: 'Sieve the Dirt', text: 'The smallest teeth hide in the sieve.' },
  { id: 'patience', name: 'Patience', text: 'A rushed dig breaks more than it finds.' },
  { id: 'rain', name: 'After the Rain', text: 'Rain washes the beds clean and shows fresh bone.' },
];

export function paleontologyRankFor(xp) {
  let rank = 0;
  FOSSIL_RANKS.forEach((r, i) => {
    if (xp >= r.xp) rank = i;
  });
  return rank;
}

export function paleontologyPriceFor(find, rank, upgrades) {
  if (!find) return 1;
  const owned = upgrades || [];
  let price = find.value * (1 + 0.1 * rank);
  if (owned.includes('lab')) price *= 1.25;
  return Math.max(1, Math.round(price));
}

export function paleontologyBuyerPrice(find, buyerId, rank, upgrades) {
  const buyer = FOSSIL_BUYERS.find((b) => b.id === buyerId);
  if (!buyer || !find) return 0;
  let price = paleontologyPriceFor(find, rank, upgrades) * buyer.mult;
  if (buyer.likes.includes(find.id)) price *= 1.1;
  if (buyer.dislikes.includes(find.id)) price *= 0.9;
  if (find.rarity <= 0.05) price *= 1.15;
  if (find.rarity >= 0.25) price *= 1.05;
  return Math.max(1, Math.round(price));
}

export function paleontologyDigTier(upgrades) {
  const owned = upgrades || [];
  let tier = 1;
  if (owned.includes('chisel')) tier += 1;
  if (owned.includes('scanner')) tier += 1;
  return tier;
}

export function fossilEraFor(eraId) {
  return FOSSIL_ERAS.find((e) => e.id === eraId) || null;
}

export function fossilToolFor(toolId) {
  return FOSSIL_TOOLS.find((t) => t.id === toolId) || null;
}

export function fossilEraOfSite(siteId) {
  const site = FOSSIL_SITES.find((s) => s.id === siteId);
  if (!site) return null;
  return FOSSIL_ERAS.find((e) => e.name === site.era) || null;
}

export function fossilAgeDescription(findId) {
  const find = FOSSIL_FINDS.find((f) => f.id === findId);
  if (!find) return null;
  const era = fossilEraOfSite(find.site);
  if (era) {
    return { find: find.id, name: find.name, site: find.site, era: era.name, yearsAgo: era.yearsAgo };
  }
  const site = FOSSIL_SITES.find((s) => s.id === find.site);
  return { find: find.id, name: find.name, site: find.site, era: site ? site.era : 'unknown', yearsAgo: 'unknown years' };
}

export function fossilFieldNoteFor(noteId) {
  return FOSSIL_FIELD_NOTES.find((n) => n.id === noteId) || null;
}

const FOSSIL_STATE_KEYS = [
  'xp', 'rank', 'digs', 'finds', 'broken', 'skeletons', 'skeletonsSold', 'earned',
  'spent', 'grants', 'fines', 'finesPaid', 'inventory', 'upgrades', 'site',
  'siteTimeLeft', 'digging', 'digProgress', 'lastDay', 'activeContract',
  'contractProgress', 'contractsDone', 'contractsFailed', 'bestFind', 'bestValue',
  'dailyFinds', 'dailyEarned', 'currentEvent', 'archiveValue', 'deepest',
];

function fossilChallengeAmount(target, st) {
  const table = {
    finds: st.finds,
    skeletons: st.skeletons,
    earned: st.earned,
    grants: st.grants,
    contractsDone: st.contractsDone,
    bestValue: st.bestValue,
    deepest: st.deepest,
  };
  return table[target] !== undefined ? table[target] : 0;
}

export function paleontologyHelperBonus(ids, skill) {
  let sum = 0;
  for (const id of ids || []) {
    const helper = FOSSIL_HELPERS.find((h) => h.id === id);
    if (helper && helper.skill === skill) sum += helper.bonus;
  }
  return sum;
}

export function paleontologyChallengeProgress(challenge, state) {
  const amount = Math.floor(fossilChallengeAmount(challenge.target, state));
  return { id: challenge.id, name: challenge.name, amount, goal: challenge.goal, done: amount >= challenge.goal };
}

export function paleontologyTipFor(day) {
  const idx = ((day || 0) % FOSSIL_TIPS.length + FOSSIL_TIPS.length) % FOSSIL_TIPS.length;
  return FOSSIL_TIPS[idx];
}

export function paleontologyLeaderboardWith(finds) {
  const rows = FOSSIL_LEADERBOARD.map((row) => ({
    name: row.name,
    finds: row.name === 'Ria' ? finds : row.finds,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.finds - a.finds);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, finds: row.finds, desc: row.desc }));
}

export function paleontologyEfficiency(finds, digs) {
  if (!digs) return 0;
  return Math.round((finds / digs) * 100) / 100;
}

export function paleontologyProfitPerDay(earned, digs) {
  if (!digs) return 0;
  return Math.round((earned / digs) * 10) / 10;
}

export function paleontologyGrade(finds, broken, skeletons) {
  if (!finds) return 'D';
  const score = finds - broken * 10 + skeletons * 30;
  if (score >= 80) return 'S';
  if (score >= 45) return 'A';
  if (score >= 25) return 'B';
  if (score >= 10) return 'C';
  return 'D';
}

function fossilRecordValue(stat, state) {
  const table = {
    finds: state.finds,
    earned: Math.round(state.earned),
    skeletons: state.skeletons,
    bestValue: state.bestValue,
    grants: state.grants,
  };
  return table[stat] !== undefined ? table[stat] : 0;
}

export function paleontologyRecordFor(id, state) {
  const rec = FOSSIL_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: fossilRecordValue(rec.stat, state), unit: rec.unit };
}

export function paleontologyAllRecords(state) {
  return FOSSIL_RECORDS.map((rec) => ({
    id: rec.id,
    name: rec.name,
    value: fossilRecordValue(rec.stat, state),
    unit: rec.unit,
    desc: rec.desc,
  }));
}

export function paleontologySummary(state) {
  const rankName = FOSSIL_RANKS[state.rank] ? FOSSIL_RANKS[state.rank].name : 'Rock Hound';
  return `${rankName} — ${state.finds} finds, ${state.skeletons} skeletons, $${Math.round(state.earned)} earned, $${state.grants} in grants.`;
}

export function paleontologyNextGoal(state) {
  if (state.finds < 10) return 'Dig up ten fossils.';
  if (state.skeletons < 1) return 'Assemble your first whole skeleton.';
  if (state.rank < 2) return 'Reach rank 2 and become a Fossil Hunter.';
  return 'Find a fossil egg in the volcano ash.';
}

export function paleontologyQuickStart(step) {
  if (step < 0 || step >= FOSSIL_QUICK_START.length) return null;
  return FOSSIL_QUICK_START[step];
}

export function createPaleontologySystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const getDay = ctx.getDay || (() => 1);
  const getHour = ctx.getHour || (() => 12);
  const getCash = ctx.getCash || (() => 0);
  const addCash = ctx.addCash || (() => {});
  const addHeat = ctx.addHeat || (() => {});
  const log = ctx.log || (() => {});
  const getPlayerPos = ctx.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = ctx.getWeather || (() => ({ condition: 'clear' }));

  const seedInventory = () => {
    const inventory = {};
    for (const f of FOSSIL_FINDS) inventory[f.id] = 0;
    return inventory;
  };

  const sys = {
    xp: 0,
    rank: 0,
    digs: 0,
    finds: 0,
    broken: 0,
    skeletons: 0,
    skeletonsSold: 0,
    earned: 0,
    spent: 0,
    grants: 0,
    fines: 0,
    finesPaid: 0,
    inventory: seedInventory(),
    upgrades: [],
    site: null,
    siteTimeLeft: 0,
    digging: null,
    digProgress: 0,
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestFind: null,
    bestValue: 0,
    dailyFinds: 0,
    dailyEarned: 0,
    currentEvent: null,
    archiveValue: 0,
    deepest: 1,
  };

  function awardXp(amount) {
    sys.xp += amount;
    const next = paleontologyRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log(`Rank up! You are now ${FOSSIL_RANKS[next].name}.`);
    }
  }

  function stop(reason) {
    return { ok: false, reason };
  }

  function go(extra) {
    return { ok: true, ...extra };
  }

  function activeEvent() {
    return sys.currentEvent
      ? FOSSIL_EVENTS.find((e) => e.id === sys.currentEvent) || null
      : null;
  }

  function pickFind(siteId) {
    const pool = FOSSIL_FINDS.filter((f) => f.site === siteId);
    if (!pool.length) return null;
    const ev = activeEvent();
    let total = 0;
    const weights = pool.map((f) => {
      let w = f.rarity;
      if (sys.upgrades.includes('sieve')) w *= 1.3;
      if (ev && ev.sites.includes(siteId)) w *= ev.mult;
      total += w;
      return w;
    });
    let roll = rng() * total;
    for (let i = 0; i < pool.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  function settleContract(findId) {
    if (!sys.activeContract || sys.activeContract.find !== findId) return;
    sys.contractProgress += 1;
    if (sys.contractProgress < sys.activeContract.qty) return;
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    log(`Contract done: ${sys.activeContract.name} paid $${pay}.`);
    sys.activeContract = null;
    sys.contractProgress = 0;
    awardXp(60);
  }

  sys.enterSite = function enterSite(siteId) {
    const site = FOSSIL_SITES.find((s) => s.id === siteId);
    if (!site) return stop('unknown-site');
    if (sys.site) return stop('already-digging');
    if (site.depth === 3 && sys.rank < 2) return stop('rank-too-low');
    const hour = getHour();
    if (hour >= 22 || hour <= 4) return stop('night');
    sys.site = siteId;
    sys.siteTimeLeft = 6 * 60 * 60;
    if (site.depth > sys.deepest) sys.deepest = site.depth;
    log(`At the ${site.name}, ${site.era} beds.`);
    return go({ site: siteId, era: site.era });
  };

  sys.startDig = function startDig() {
    if (!sys.site) return stop('no-site');
    if (sys.digging) return stop('already-digging');
    const site = FOSSIL_SITES.find((s) => s.id === sys.site);
    const find = pickFind(sys.site);
    if (!find) return stop('no-finds');
    const tier = paleontologyDigTier(sys.upgrades);
    if (site.difficulty > tier + 1) return stop('too-hard');
    sys.digging = find.id;
    sys.digProgress = 0;
    return go({ find: find.id, name: find.name, difficulty: site.difficulty });
  };

  sys.dig = function dig() {
    if (!sys.digging) return stop('no-dig');
    const find = FOSSIL_FINDS.find((f) => f.id === sys.digging);
    const site = FOSSIL_SITES.find((s) => s.id === sys.site);
    const tier = paleontologyDigTier(sys.upgrades);
    sys.digProgress += tier;
    const need = site.difficulty * 3;
    if (sys.digProgress < need) {
      if (rng() < 0.15) {
        const hazard = FOSSIL_HAZARDS[Math.floor(rng() * FOSSIL_HAZARDS.length)];
        if (hazard.id === 'break' && !sys.upgrades.includes('brush')) {
          sys.broken += 1;
          sys.digging = null;
          sys.digProgress = 0;
          log(`The ${find.name} shattered in the rock!`);
          return go({ broken: true, find: find.id });
        }
        log(`Hazard while digging: ${hazard.name}.`);
      }
      return go({ done: false, progress: sys.digProgress, needed: need });
    }
    sys.digging = null;
    sys.digProgress = 0;
    sys.inventory[find.id] += 1;
    sys.finds += 1;
    sys.dailyFinds += 1;
    sys.digs += 1;
    awardXp(Math.round(10 + (1 - find.rarity) * 20));
    if (find.value > sys.bestValue) {
      sys.bestValue = find.value;
      sys.bestFind = find.id;
    }
    if (find.rarity <= 0.05) {
      sys.grants += 50;
      sys.earned += 50;
      sys.dailyEarned += 50;
      addCash(50);
      log(`A very rare find! A $50 grant arrives on the spot.`);
    }
    settleContract(find.id);
    log(`Dug out a ${find.name} worth $${find.value}.`);
    return go({ done: true, find: find.id, name: find.name, value: find.value });
  };

  sys.leaveSite = function leaveSite() {
    if (!sys.site) return stop('no-site');
    const done = sys.site;
    sys.site = null;
    sys.siteTimeLeft = 0;
    sys.digging = null;
    sys.digProgress = 0;
    return go({ site: done });
  };

  sys.cleanFind = function cleanFind(findId, qty) {
    const find = FOSSIL_FINDS.find((f) => f.id === findId);
    if (!find) return stop('unknown-find');
    if ((sys.inventory[findId] || 0) < qty) return stop('not-enough');
    const mult = sys.upgrades.includes('lab') ? 1.25 : 1.1;
    const value = Math.round(paleontologyPriceFor(find, sys.rank, sys.upgrades) * mult * qty);
    awardXp(qty * 5);
    log(`Cleaned ${qty} ${find.name}(s), valued at $${value}.`);
    return go({ quantity: qty, value });
  };

  sys.assembleSkeleton = function assembleSkeleton(skeletonId) {
    const skeleton = FOSSIL_SKELETONS.find((s) => s.id === skeletonId);
    if (!skeleton) return stop('unknown-skeleton');
    const needed = {};
    for (const part of skeleton.parts) needed[part] = (needed[part] || 0) + 1;
    for (const part of Object.keys(needed)) {
      const held = sys.inventory[part] || 0;
      if (held < needed[part]) {
        return { ok: false, reason: 'missing-part', part, held, needed: needed[part] };
      }
    }
    for (const part of Object.keys(needed)) sys.inventory[part] -= needed[part];
    sys.skeletons += 1;
    sys.archiveValue += skeleton.value;
    awardXp(100);
    log(`Assembled a ${skeleton.name} worth $${skeleton.value}.`);
    return go({ skeleton: skeletonId, value: skeleton.value });
  };

  sys.sellSkeleton = function sellSkeleton(skeletonId) {
    const skeleton = FOSSIL_SKELETONS.find((s) => s.id === skeletonId);
    if (!skeleton) return stop('unknown-skeleton');
    if (sys.skeletons <= 0) return stop('none-assembled');
    sys.skeletons -= 1;
    sys.skeletonsSold += 1;
    const value = skeleton.value + 100 * sys.rank;
    sys.earned += value;
    sys.dailyEarned += value;
    addCash(value);
    awardXp(80);
    return go({ value, skeleton: skeletonId });
  };

  sys.sellFind = function sellFind(buyerId, findId, qty) {
    const buyer = FOSSIL_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return stop('unknown-buyer');
    if (sys.rank < buyer.minRank) return stop('rank-too-low');
    const find = FOSSIL_FINDS.find((f) => f.id === findId);
    if (!find) return stop('unknown-find');
    if ((sys.inventory[findId] || 0) < qty) return stop('not-enough');
    const unitPrice = paleontologyBuyerPrice(find, buyerId, sys.rank, sys.upgrades);
    const total = unitPrice * qty;
    sys.inventory[findId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    awardXp(qty * 2);
    if (buyerId === 'blackmarket') {
      addHeat(3);
      log('Sold on the black market. That will draw attention.');
    }
    return go({ total, unitPrice, quantity: qty });
  };

  sys.sellAll = function sellAll(buyerId) {
    const buyer = FOSSIL_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return stop('unknown-buyer');
    if (sys.rank < buyer.minRank) return stop('rank-too-low');
    const lines = [];
    let total = 0;
    let count = 0;
    for (const find of FOSSIL_FINDS) {
      const qty = sys.inventory[find.id] || 0;
      if (qty > 0) {
        const unitPrice = paleontologyBuyerPrice(find, buyerId, sys.rank, sys.upgrades);
        const lineTotal = unitPrice * qty;
        lines.push({ id: find.id, quantity: qty, total: lineTotal });
        total += lineTotal;
        count += qty;
        sys.inventory[find.id] = 0;
      }
    }
    if (!lines.length) return stop('nothing-to-sell');
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    awardXp(count);
    if (buyerId === 'blackmarket') addHeat(3);
    return go({ total, count, lines });
  };

  sys.buyUpgrade = function buyUpgrade(upgradeId) {
    const upgrade = FOSSIL_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return stop('unknown-upgrade');
    if (sys.upgrades.includes(upgradeId)) return stop('already-owned');
    if (getCash() < upgrade.cost) return stop('not-enough-cash');
    addCash(-upgrade.cost);
    sys.spent += upgrade.cost;
    sys.upgrades.push(upgradeId);
    awardXp(20);
    return go({ id: upgradeId });
  };

  sys.takeContract = function takeContract(contractId) {
    const contract = FOSSIL_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return stop('unknown-contract');
    if (sys.activeContract) return stop('contract-active');
    if (sys.rank < contract.rep) return stop('rank-too-low');
    const day = getDay();
    sys.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    sys.contractProgress = 0;
    return go({ contract: sys.activeContract });
  };

  sys.deliverContract = function deliverContract() {
    if (!sys.activeContract) return stop('no-contract');
    if (sys.contractProgress < sys.activeContract.qty) return stop('not-ready');
    if ((sys.inventory[sys.activeContract.find] || 0) < sys.activeContract.qty) return stop('not-enough');
    sys.inventory[sys.activeContract.find] -= sys.activeContract.qty;
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    sys.activeContract = null;
    sys.contractProgress = 0;
    awardXp(60);
    return go({ pay });
  };

  sys.abandonContract = function abandonContract() {
    if (!sys.activeContract) return stop('no-contract');
    sys.activeContract = null;
    sys.contractProgress = 0;
    sys.contractsFailed += 1;
    return go({});
  };

  sys.payFine = function payFine() {
    if (sys.fines <= 0) return stop('no-fines');
    if (getCash() < sys.fines) return stop('not-enough-cash');
    const amount = sys.fines;
    addCash(-amount);
    sys.spent += amount;
    sys.finesPaid += amount;
    sys.fines = 0;
    return go({ amount });
  };

  sys.collectGrant = function collectGrant() {
    if (!sys.upgrades.includes('archive')) return stop('no-archive');
    const grant = Math.floor(sys.archiveValue * 0.05);
    if (grant <= 0) return stop('no-grant');
    sys.grants += grant;
    sys.earned += grant;
    sys.dailyEarned += grant;
    addCash(grant);
    return go({ grant });
  };

  sys.priceBoard = function priceBoard() {
    return FOSSIL_FINDS.map((f) => ({
      id: f.id,
      name: f.name,
      price: paleontologyPriceFor(f, sys.rank, sys.upgrades),
      stock: sys.inventory[f.id] || 0,
      rarity: f.rarity,
      site: f.site,
    }));
  };

  sys.siteReport = function siteReport() {
    return FOSSIL_SITES.map((s) => ({
      id: s.id,
      name: s.name,
      era: s.era,
      difficulty: s.difficulty,
      depth: s.depth,
      finds: FOSSIL_FINDS.filter((f) => f.site === s.id).map((f) => f.id),
    }));
  };

  sys.dailyEvent = function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = FOSSIL_EVENTS[Math.floor(rng() * FOSSIL_EVENTS.length)];
      sys.currentEvent = ev.id;
      log(`Today's event: ${ev.name}.`);
      return go({ event: ev.id, name: ev.name });
    }
    if (roll < 0.3) {
      const find = FOSSIL_FINDS[Math.floor(rng() * FOSSIL_FINDS.length)];
      sys.inventory[find.id] += 1;
      sys.finds += 1;
      sys.currentEvent = null;
      return go({ event: 'gift', find: find.id, name: 'Gift' });
    }
    sys.currentEvent = null;
    return go({ event: 'none', name: 'None' });
  };

  sys.tick = function tick(dt) {
    const step = dt || 0;
    if (sys.site) {
      sys.siteTimeLeft -= step;
      if (sys.siteTimeLeft <= 0) {
        sys.site = null;
        sys.siteTimeLeft = 0;
        sys.digging = null;
        sys.digProgress = 0;
        log('The light fails at the bone beds; time to pack up.');
      }
    }
  };

  sys.tickDay = function tickDay(day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    sys.dailyFinds = 0;
    sys.dailyEarned = 0;
    if (sys.activeContract && day > sys.activeContract.deadline && sys.contractProgress < sys.activeContract.qty) {
      sys.contractsFailed += 1;
      log(`Contract failed: ${sys.activeContract.name}.`);
      sys.activeContract = null;
      sys.contractProgress = 0;
    }
    if (!sys.upgrades.includes('permit') && sys.site && rng() < 0.2) {
      sys.fines += 150;
      addHeat(2);
      log('The warden fined you $150 for digging without a permit.');
    }
    sys.dailyEvent();
  };

  sys.serialize = function serialize() {
    const out = {};
    for (const key of FOSSIL_STATE_KEYS) {
      out[key] = JSON.parse(JSON.stringify(sys[key]));
    }
    return out;
  };

  sys.deserialize = function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of FOSSIL_STATE_KEYS) {
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const f of FOSSIL_FINDS) {
      if (sys.inventory[f.id] === undefined) sys.inventory[f.id] = 0;
    }
    const next = paleontologyRankFor(sys.xp);
    if (next > sys.rank) sys.rank = next;
  };

  sys.stats = function stats() {
    return {
      rank: FOSSIL_RANKS[sys.rank].name,
      xp: sys.xp,
      digs: sys.digs,
      finds: sys.finds,
      broken: sys.broken,
      skeletons: sys.skeletons,
      skeletonsSold: sys.skeletonsSold,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      grants: sys.grants,
      fines: sys.fines,
      upgrades: sys.upgrades.length,
      site: sys.site,
      digging: sys.digging,
      activeContract: sys.activeContract ? sys.activeContract.id : null,
      contractsDone: sys.contractsDone,
      contractsFailed: sys.contractsFailed,
      bestFind: sys.bestFind,
      bestValue: sys.bestValue,
      dailyFinds: sys.dailyFinds,
      dailyEarned: Math.round(sys.dailyEarned),
      archiveValue: sys.archiveValue,
      deepest: sys.deepest,
      event: sys.currentEvent,
    };
  };

  sys.hudLine = function hudLine() {
    if (sys.digging) {
      const find = FOSSIL_FINDS.find((f) => f.id === sys.digging);
      return `Digging ${find.name} — ${sys.digProgress} done`;
    }
    if (sys.site) {
      const site = FOSSIL_SITES.find((s) => s.id === sys.site);
      return `At ${site.name} — start a dig`;
    }
    if (sys.skeletons > 0) {
      return sys.skeletons === 1
        ? '1 skeleton ready to sell'
        : `${sys.skeletons} skeletons ready to sell`;
    }
    if (sys.activeContract) {
      return `Contract ${sys.activeContract.name} ${sys.contractProgress}/${sys.activeContract.qty}`;
    }
    let total = 0;
    for (const f of FOSSIL_FINDS) total += sys.inventory[f.id] || 0;
    if (total > 0) return `${total} fossils to clean or sell`;
    return '';
  };

  sys.interact = function interact() {
    const pos = getPlayerPos();
    const dx = (pos.x || 0) - 520;
    const dz = (pos.z || 0) - 480;
    if (Math.hypot(dx, dz) > 40) return false;
    if (!sys.site) {
      sys.enterSite('river');
      return true;
    }
    if (!sys.digging) {
      sys.startDig();
      return true;
    }
    sys.dig();
    return true;
  };

  return sys;
}

export function createPaleontologyExtras(system) {
  const sys = system;
  let hired = [];
  let claimed = [];
  let wagesPaid = 0;

  function stop(reason) {
    return { ok: false, reason };
  }

  function go(extra) {
    return { ok: true, ...extra };
  }

  const extras = {
    hireHelper(id) {
      const helper = FOSSIL_HELPERS.find((h) => h.id === id);
      if (!helper) return stop('unknown-helper');
      if (hired.includes(id)) return stop('already-hired');
      hired.push(id);
      return go({ id, name: helper.name, wage: helper.wage });
    },
    fireHelper(id) {
      if (!hired.includes(id)) return stop('not-hired');
      hired = hired.filter((h) => h !== id);
      return go({ id });
    },
    payWages() {
      let due = 0;
      for (const id of hired) {
        const helper = FOSSIL_HELPERS.find((h) => h.id === id);
        if (helper) due += helper.wage;
      }
      wagesPaid += due;
      return go({ due, helpers: [...hired], wagesPaid });
    },
    helperBonus(skill) {
      let sum = 0;
      for (const id of hired) {
        const helper = FOSSIL_HELPERS.find((h) => h.id === id);
        if (helper && helper.skill === skill) sum += helper.bonus;
      }
      return sum;
    },
    challenges() {
      return FOSSIL_CHALLENGES.map((c) => paleontologyChallengeProgress(c, sys));
    },
    claimChallenge(id) {
      const challenge = FOSSIL_CHALLENGES.find((c) => c.id === id);
      if (!challenge) return stop('unknown-challenge');
      if (claimed.includes(id)) return stop('already-claimed');
      const progress = paleontologyChallengeProgress(challenge, sys);
      if (!progress.done) return stop('not-done');
      claimed.push(id);
      return go({ id, xp: challenge.xp });
    },
    achievements() {
      return FOSSIL_ACHIEVEMENTS.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        done: !!a.check(sys),
      }));
    },
    identify(findId) {
      const find = FOSSIL_FINDS.find((f) => f.id === findId);
      if (!find) return stop('unknown-find');
      return go({ find: find.id, value: find.value, rarity: find.rarity, site: find.site, desc: find.desc });
    },
    inventoryValue() {
      let value = 0;
      for (const f of FOSSIL_FINDS) {
        value += (sys.inventory[f.id] || 0) * f.value;
      }
      return go({ value: Math.round(value) });
    },
    skeletonOptions() {
      return FOSSIL_SKELETONS.map((s) => {
        const needed = {};
        for (const part of s.parts) needed[part] = (needed[part] || 0) + 1;
        const ready = Object.keys(needed).every((part) => (sys.inventory[part] || 0) >= needed[part]);
        return { id: s.id, name: s.name, value: s.value, ready, parts: needed };
      });
    },
    get helpers() {
      return [...hired];
    },
    get claimed() {
      return [...claimed];
    },
    get wagesPaid() {
      return wagesPaid;
    },
  };

  return extras;
}

export function createPaleontologyJournal(system) {
  const sys = system;
  const entries = [];
  let pages = 0;

  function stop(reason) {
    return { ok: false, reason };
  }

  function go(extra) {
    return { ok: true, ...extra };
  }

  const journal = {
    addEntry(text) {
      entries.push({ day: sys.lastDay || 1, site: sys.site || null, text });
      pages += 1;
      return go({ count: entries.length });
    },
    logFind(findId) {
      const find = FOSSIL_FINDS.find((f) => f.id === findId);
      if (!find) return stop('unknown-find');
      const age = fossilAgeDescription(findId);
      const line = age
        ? `Found a ${find.name} (${age.era}, ${age.yearsAgo}).`
        : `Found a ${find.name}.`;
      return journal.addEntry(line);
    },
    logSkeleton(skeletonId) {
      const skeleton = FOSSIL_SKELETONS.find((s) => s.id === skeletonId);
      if (!skeleton) return stop('unknown-skeleton');
      return journal.addEntry(`Assembled a ${skeleton.name}.`);
    },
    readEntries(limit) {
      const n = limit === undefined ? entries.length : limit;
      return entries.slice(-n);
    },
    collectionSummary() {
      let total = 0;
      for (const f of FOSSIL_FINDS) total += sys.inventory[f.id] || 0;
      return {
        finds: sys.finds,
        skeletons: sys.skeletons,
        total,
        bestFind: sys.bestFind,
        archiveValue: sys.archiveValue,
      };
    },
    get entries() {
      return [...entries];
    },
    get pages() {
      return pages;
    },
  };

  return journal;
}
