export const DIG_SITES = [
  { id: 'old-beach', name: 'Old Beach', tier: 1, danger: 1, fee: 0, desc: 'Tourists lose things here every day' },
  { id: 'park', name: 'Central Park', tier: 1, danger: 0, fee: 0, desc: 'Coins under the swings' },
  { id: 'battlefield', name: 'Old Battlefield', tier: 3, danger: 2, fee: 20, desc: 'Relics from a forgotten war' },
  { id: 'ghost-town', name: 'Ghost Town', tier: 4, danger: 3, fee: 40, desc: 'Abandoned streets, buried secrets' },
  { id: 'shipwreck', name: 'Shipwreck Shore', tier: 4, danger: 4, fee: 50, desc: 'Treasure washed up from the deep' },
  { id: 'castle-ruins', name: 'Castle Ruins', tier: 5, danger: 3, fee: 60, desc: 'A ruined castle with a hidden vault' },
  { id: 'riverbank', name: 'Riverbank', tier: 2, danger: 1, fee: 5, desc: 'The river gives up its gold' },
  { id: 'forest-clearing', name: 'Forest Clearing', tier: 2, danger: 2, fee: 10, desc: 'An old campsite in the woods' },
  { id: 'desert-ruins', name: 'Desert Ruins', tier: 5, danger: 4, fee: 70, desc: 'Buried under the sand' },
  { id: 'mountain-pass', name: 'Mountain Pass', tier: 3, danger: 3, fee: 30, desc: 'A smugglers trail' },
  { id: 'old-church', name: 'Old Church', tier: 3, danger: 2, fee: 25, desc: 'Beneath the floorboards' },
  { id: 'pirate-cove', name: 'Pirate Cove', tier: 5, danger: 5, fee: 80, desc: 'X marks the spot' },
];

export const TREASURE_MAPS = [
  { id: 'beach-map', name: 'Beach Map', price: 20, tier: 1, clue: 'Where the tide meets the sand', desc: 'A faded map of the old beach' },
  { id: 'park-map', name: 'Park Map', price: 15, tier: 1, clue: 'Under the oldest oak', desc: 'A child\'s treasure map' },
  { id: 'river-map', name: 'River Map', price: 40, tier: 2, clue: 'Where the river bends twice', desc: 'A map in a bottle' },
  { id: 'forest-map', name: 'Forest Map', price: 50, tier: 2, clue: 'Beneath the fallen pine', desc: 'Carved on bark' },
  { id: 'battlefield-map', name: 'Battlefield Map', price: 100, tier: 3, clue: 'Where the cannon fell', desc: 'A military map' },
  { id: 'mountain-map', name: 'Mountain Map', price: 120, tier: 3, clue: 'Behind the third waterfall', desc: 'A climber\'s map' },
  { id: 'church-map', name: 'Church Map', price: 110, tier: 3, clue: 'Under the altar stone', desc: 'A priest\'s secret' },
  { id: 'ghost-town-map', name: 'Ghost Town Map', price: 200, tier: 4, clue: 'In the saloon cellar', desc: 'A map from a dead outlaw' },
  { id: 'shipwreck-map', name: 'Shipwreck Map', price: 250, tier: 4, clue: 'Where the mast broke', desc: 'A captain\'s chart' },
  { id: 'castle-map', name: 'Castle Map', price: 300, tier: 5, clue: 'Behind the throne room wall', desc: 'A royal map' },
  { id: 'desert-map', name: 'Desert Map', price: 350, tier: 5, clue: 'Where the sun sets twice', desc: 'A map on camel skin' },
  { id: 'pirate-map', name: 'Pirate Map', price: 500, tier: 5, clue: 'X marks the spot', desc: 'The real thing, maybe' },
];

export const DETECTORS = [
  { id: 'toy', name: 'Toy Detector', price: 0, depth: 2, discrimination: 1, sweep: 0.5, desc: 'Beeps at everything' },
  { id: 'basic', name: 'Basic Detector', price: 80, depth: 4, discrimination: 3, sweep: 0.8, desc: 'A decent starter' },
  { id: 'pro', name: 'Pro Detector', price: 250, depth: 6, discrimination: 5, sweep: 1, desc: 'Serious equipment' },
  { id: 'expert', name: 'Expert Detector', price: 600, depth: 8, discrimination: 7, sweep: 1.2, desc: 'Finds the deep stuff' },
  { id: 'master', name: 'Master Detector', price: 1200, depth: 10, discrimination: 9, sweep: 1.5, desc: 'The best money can buy' },
];

export const SHOVELS = [
  { id: 'hands', name: 'Bare Hands', price: 0, digPower: 2, desc: 'Slow and dirty' },
  { id: 'trowel', name: 'Garden Trowel', price: 15, digPower: 5, desc: 'A small step up' },
  { id: 'shovel', name: 'Digging Shovel', price: 40, digPower: 10, desc: 'A proper shovel' },
  { id: 'spade', name: 'Steel Spade', price: 90, digPower: 15, desc: 'Cuts through roots' },
  { id: 'excavator', name: 'Mini Excavator', price: 500, digPower: 30, desc: 'A tiny digger, huge power' },
];

export const FIND_TABLE = [
  { id: 'bottle-cap', name: 'Bottle Cap', tier: 1, weight: 30, value: 1, kind: 'junk', desc: 'Every detectorist\'s nemesis' },
  { id: 'nail', name: 'Rusty Nail', tier: 1, weight: 25, value: 1, kind: 'junk', desc: 'Old and bent' },
  { id: 'coin-1', name: 'Penny', tier: 1, weight: 20, value: 5, kind: 'coin', desc: 'A lucky penny' },
  { id: 'coin-5', name: 'Old Nickel', tier: 1, weight: 15, value: 10, kind: 'coin', desc: 'From the last century' },
  { id: 'button', name: 'Brass Button', tier: 2, weight: 12, value: 15, kind: 'relic', desc: 'Off a soldier\'s coat' },
  { id: 'buckle', name: 'Belt Buckle', tier: 2, weight: 10, value: 20, kind: 'relic', desc: 'Engraved and old' },
  { id: 'silver-coin', name: 'Silver Coin', tier: 2, weight: 10, value: 50, kind: 'coin', desc: 'Real silver' },
  { id: 'gold-coin', name: 'Gold Coin', tier: 3, weight: 8, value: 300, kind: 'coin', desc: 'Shiny and heavy' },
  { id: 'ring', name: 'Gold Ring', tier: 3, weight: 6, value: 250, kind: 'jewellery', desc: 'Somebody lost this' },
  { id: 'brooch', name: 'Silver Brooch', tier: 3, weight: 5, value: 180, kind: 'jewellery', desc: 'Delicate work' },
  { id: 'sword', name: 'Old Sword', tier: 4, weight: 4, value: 800, kind: 'relic', desc: 'A battlefield relic' },
  { id: 'helmet', name: 'War Helmet', tier: 4, weight: 4, value: 600, kind: 'relic', desc: 'Dented but real' },
  { id: 'idol', name: 'Golden Idol', tier: 4, weight: 3, value: 1500, kind: 'artifact', desc: 'A small golden god' },
  { id: 'crown', name: 'Lost Crown', tier: 5, weight: 2, value: 5000, kind: 'artifact', desc: 'A king\'s crown' },
  { id: 'chest', name: 'Pirate Chest', tier: 5, weight: 2, value: 10000, kind: 'chest', desc: 'Full of gold and gems' },
  { id: 'gem', name: 'Raw Emerald', tier: 5, weight: 2, value: 3000, kind: 'jewellery', desc: 'Green and flawless' },
  { id: 'amulet', name: 'Ancient Amulet', tier: 4, weight: 3, value: 1200, kind: 'artifact', desc: 'Hums when you hold it' },
  { id: 'doubloon', name: 'Spanish Doubloon', tier: 4, weight: 4, value: 900, kind: 'coin', desc: 'Pirate gold' },
  { id: 'medal', name: 'War Medal', tier: 3, weight: 5, value: 200, kind: 'relic', desc: 'For bravery' },
  { id: 'key', name: 'Ornate Key', tier: 2, weight: 8, value: 40, kind: 'relic', desc: 'Opens something, somewhere' },
];

export const BUYERS = [
  { id: 'pawn', name: 'Pawn Shop', coin: 0.8, relic: 0.7, artifact: 0.6, jewellery: 0.75, chest: 0.5, junk: 0.5, desc: 'Fast cash, low prices' },
  { id: 'collector', name: 'Private Collector', coin: 1.2, relic: 1.3, artifact: 1.5, jewellery: 1.1, chest: 1.0, junk: 0.2, desc: 'Pays top dollar for the good stuff' },
  { id: 'museum', name: 'Museum', coin: 1.0, relic: 1.4, artifact: 1.6, jewellery: 0.9, chest: 0.8, junk: 0.1, desc: 'Loves relics and artifacts' },
  { id: 'black-market', name: 'Black Market', coin: 1.1, relic: 1.0, artifact: 1.2, jewellery: 1.3, chest: 1.4, junk: 0.3, desc: 'No questions, hot prices, some heat' },
];

export const RIVALS = [
  { id: 'digger-dan', name: 'Digger Dan', skill: 3, aggression: 2, desc: 'A friendly rival' },
  { id: 'gold-digger-gina', name: 'Gold Digger Gina', skill: 5, aggression: 3, desc: 'Finds gold everywhere' },
  { id: 'professor', name: 'The Professor', skill: 7, aggression: 1, desc: 'Knows the history of every site' },
  { id: 'big-joe', name: 'Big Joe', skill: 4, aggression: 5, desc: 'Will shove you off a good spot' },
  { id: 'lucky-larry', name: 'Lucky Larry', skill: 6, aggression: 2, desc: 'Unbelievably lucky' },
];

export const TREASURE_RANKS = [
  { id: 'hobbyist', name: 'Hobbyist', xpNeeded: 0, perk: 'Tier 1 and 2 sites' },
  { id: 'digger', name: 'Digger', xpNeeded: 150, perk: 'Tier 3 sites' },
  { id: 'hunter', name: 'Hunter', xpNeeded: 400, perk: 'Tier 4 sites' },
  { id: 'legend', name: 'Legend', xpNeeded: 900, perk: 'Tier 5 sites' },
  { id: 'master', name: 'Master', xpNeeded: 2000, perk: 'Every site, double value' },
];

export const TREASURE_MISSIONS = [
  { id: 'first-find', name: 'First Find', desc: 'Dig up your first find', reward: 50 },
  { id: 'gold-coin', name: 'Gold Coin', desc: 'Find a gold coin', reward: 200 },
  { id: 'lost-crown', name: 'Lost Crown', desc: 'Find the lost crown', reward: 1000 },
  { id: 'chest-find', name: 'Pirate Chest', desc: 'Find a pirate chest', reward: 1500 },
  { id: 'museum-5', name: 'Museum Donor', desc: 'Donate 5 artifacts to the museum', reward: 300 },
  { id: 'earn-5000', name: 'Five Thousand', desc: 'Earn 5000 from selling finds', reward: 400 },
  { id: 'rival-beaten', name: 'Rival Beaten', desc: 'Beat a rival to a find', reward: 150 },
  { id: 'find-20', name: 'Twenty Finds', desc: 'Dig up 20 finds', reward: 250 },
  { id: 'collection-10', name: 'Collector', desc: 'Collect 10 different finds', reward: 300 },
  { id: 'map-master', name: 'Map Master', desc: 'Use 5 maps', reward: 200 },
];

export const FAMOUS_TREASURES = [
  { name: 'The Lost Crown', value: 5000, found: false, note: 'Still buried somewhere' },
  { name: 'The Pirate Chest', value: 10000, found: false, note: 'X marks the spot' },
  { name: 'The Golden Idol', value: 1500, found: true, note: 'Found in 1987' },
  { name: 'The Spanish Galleon', value: 50000, found: false, note: 'Under the sea' },
  { name: 'The Amber Room', value: 100000, found: false, note: 'Lost in the war' },
];

export const MAP_FRAGMENTS = [
  { id: 'frag-a', name: 'Map Fragment A', mapId: 'pirate-map', desc: 'The top left corner' },
  { id: 'frag-b', name: 'Map Fragment B', mapId: 'pirate-map', desc: 'The top right corner' },
  { id: 'frag-c', name: 'Map Fragment C', mapId: 'pirate-map', desc: 'The bottom left corner' },
  { id: 'frag-d', name: 'Map Fragment D', mapId: 'pirate-map', desc: 'The bottom right corner' },
  { id: 'frag-e', name: 'Map Fragment E', mapId: 'castle-map', desc: 'The castle gate' },
  { id: 'frag-f', name: 'Map Fragment F', mapId: 'castle-map', desc: 'The throne room' },
];

export const APPRAISAL_NOTES = [
  'Condition is everything.',
  'A little dirt adds to the story.',
  'Never clean a coin with acid.',
  'Provenance doubles the price.',
  'The museum pays for history, not metal.',
  'A cracked artifact is still an artifact.',
  'The black market pays for silence.',
];

export const SITE_LORE = [
  { site: 'old-beach', note: 'Tourists have lost rings here for a century.' },
  { site: 'battlefield', note: 'The battle lasted three days.' },
  { site: 'ghost-town', note: 'Everyone left in one night.' },
  { site: 'shipwreck', note: 'The ship went down in a storm.' },
  { site: 'castle-ruins', note: 'The king hid his gold before the siege.' },
  { site: 'pirate-cove', note: 'Blackbeard himself buried something here.' },
  { site: 'riverbank', note: 'Gold panners worked this river.' },
  { site: 'desert-ruins', note: 'A city swallowed by sand.' },
];

export const RIVAL_DOSSIERS = [
  { rival: 'digger-dan', tip: 'He always works the beach at dawn.' },
  { rival: 'gold-digger-gina', tip: 'She follows the old maps.' },
  { rival: 'professor', tip: 'He reads the history books first.' },
  { rival: 'big-joe', tip: 'Avoid him, he shoves.' },
  { rival: 'lucky-larry', tip: 'He is lucky, not skilled. Outwork him.' },
];

export const RARE_FINDS = [
  { id: 'phoenix-feather', name: 'Phoenix Feather', tier: 5, weight: 1, value: 20000, kind: 'artifact', desc: 'Warm to the touch' },
  { id: 'dragon-egg', name: 'Dragon Egg', tier: 5, weight: 1, value: 50000, kind: 'artifact', desc: 'It hums' },
  { id: 'moonstone', name: 'Moonstone', tier: 4, weight: 2, value: 8000, kind: 'jewellery', desc: 'Glows at night' },
  { id: 'viking-axe', name: 'Viking Axe', tier: 4, weight: 2, value: 5000, kind: 'relic', desc: 'Still sharp' },
  { id: 'roman-coin', name: 'Roman Gold Coin', tier: 3, weight: 3, value: 2000, kind: 'coin', desc: 'Two thousand years old' },
  { id: 'emerald-skull', name: 'Emerald Skull', tier: 5, weight: 1, value: 30000, kind: 'artifact', desc: 'Do not look into its eyes' },
];

export const DIGGING_TIPS = [
  'Sweep slowly, the signal tells you everything.',
  'A signal of 88 or more means dig.',
  'Good detectors ignore junk.',
  'Dig carefully, you might break it.',
  'Map bonuses apply when the map points at your site.',
  'Rivals steal finds, watch your back.',
];

export const DETECTING_CLUBS = [
  { id: 'beach-club', name: 'Beach Detecting Club', members: 40, desc: 'Beach hunters' },
  { id: 'relic-club', name: 'Relic Hunters Club', members: 25, desc: 'History buffs' },
  { id: 'gold-club', name: 'Gold Prospectors Club', members: 15, desc: 'Serious gold hunters' },
  { id: 'weekend-club', name: 'Weekend Diggers', members: 60, desc: 'Casual weekend fun' },
];

export const MAP_DEALERS = [
  { id: 'old-sam', name: 'Old Sam', maps: ['beach-map', 'park-map', 'river-map'], desc: 'Sells maps from his stall' },
  { id: 'antique-shop', name: 'Antique Shop', maps: ['forest-map', 'battlefield-map', 'church-map'], desc: 'Old maps, high prices' },
  { id: 'black-market-dealer', name: 'Black Market Dealer', maps: ['ghost-town-map', 'shipwreck-map', 'pirate-map'], desc: 'No questions, high prices' },
  { id: 'professor-shop', name: 'Professor\'s Shop', maps: ['mountain-map', 'castle-map', 'desert-map'], desc: 'Maps with footnotes' },
];

export const TREASURE_SLANG = [
  'A plug is a neat circle of turf you cut to dig.',
  'A signal is what your detector beeps at.',
  'A keeper is a find worth keeping.',
  'Trash is what you dig up most of the time.',
  'A hoard is a big stash of coins in one spot.',
];

export const FINDS_LOG = [
  { find: 'Gold Coin', year: 2019, site: 'old-beach', note: 'Found by a tourist with a toy detector' },
  { find: 'Silver Coin', year: 2020, site: 'riverbank', note: 'A whole purse of them' },
  { find: 'War Medal', year: 2021, site: 'battlefield', note: 'Returned to the family' },
  { find: 'Golden Idol', year: 1987, site: 'ghost-town', note: 'The biggest find of the decade' },
  { find: 'Pirate Chest', year: 1995, site: 'pirate-cove', note: 'Never confirmed' },
  { find: 'Lost Crown', year: 2005, site: 'castle-ruins', note: 'A replica, sadly' },
];

export const DETECTING_ETIQUETTE = [
  'Fill your holes.',
  'Take your trash with you.',
  'Ask permission before you dig.',
  'Report important finds.',
  'Share the site, share the finds.',
];

export const FAMOUS_HUNTERS = [
  { name: 'Mel Fisher', find: 'Atocha treasure', year: 1985, note: 'Found a Spanish galleon' },
  { name: 'Heinrich Schliemann', find: 'Troy', year: 1873, note: 'Dug up a legend' },
  { name: 'Howard Carter', find: 'Tutankhamun', year: 1922, note: 'The boy king\'s tomb' },
  { name: 'Terry Herbert', find: 'Staffordshire Hoard', year: 2009, note: 'The biggest Anglo-Saxon hoard' },
];

export const DIG_PERMITS = [
  { site: 'old-beach', permit: 'none', cost: 0, note: 'Open access' },
  { site: 'battlefield', permit: 'heritage', cost: 50, note: 'Heritage permit required' },
  { site: 'castle-ruins', permit: 'heritage', cost: 80, note: 'Heritage permit required' },
  { site: 'pirate-cove', permit: 'crown', cost: 100, note: 'Crown land permit' },
];

export const TREASURE_FILMS = [
  { title: 'Raiders of the Lost Ark', year: 1981, note: 'The greatest treasure hunt film' },
  { title: 'National Treasure', year: 2004, note: 'A map on the Declaration of Independence' },
  { title: 'The Goonies', year: 1985, note: 'Kids, a map and a pirate ship' },
  { title: 'Treasure Island', year: 1950, note: 'The classic' },
];

export const TREASURE_MOTTOS = [
  'X marks the spot.',
  'The ground keeps what men lose.',
  'Every beep is a maybe.',
  'Dig slow, find gold.',
];

export const FAMOUS_SHIPWRECKS = [
  { name: 'Atocha', year: 1622, value: 400000000, note: 'The richest wreck ever found' },
  { name: 'Titanic', year: 1912, value: 100000000, note: 'Famous, but mostly history' },
  { name: 'Mary Rose', year: 1545, value: 50000000, note: 'Raised from the Solent' },
];

export const TREASURE_PROVERBS = [
  'One man\'s trash is another man\'s treasure.',
  'The early digger gets the gold.',
  'A map is only as good as its reader.',
  'Patience digs deeper than any shovel.',
];

export const FAMOUS_MAPS = [
  { name: 'Piri Reis Map', year: 1513, note: 'An ancient map of the world' },
  { name: 'Treasure Island Map', year: 1883, note: 'X marks the spot' },
  { name: 'Oak Island Map', year: 1795, note: 'The money pit' },
];

function siteById(id) {
  return DIG_SITES.find((s) => s.id === id);
}

function mapById(id) {
  return TREASURE_MAPS.find((m) => m.id === id);
}

function detectorById(id) {
  return DETECTORS.find((d) => d.id === id) || DETECTORS[0];
}

function shovelById(id) {
  return SHOVELS.find((s) => s.id === id) || SHOVELS[0];
}

function findById(id) {
  return FIND_TABLE.find((f) => f.id === id);
}

function buyerById(id) {
  return BUYERS.find((b) => b.id === id);
}

function rivalById(id) {
  return RIVALS.find((r) => r.id === id);
}

function rankById(id) {
  return TREASURE_RANKS.find((r) => r.id === id) || TREASURE_RANKS[0];
}

function rankIndex(id) {
  const i = TREASURE_RANKS.findIndex((r) => r.id === id);
  return i < 0 ? 0 : i;
}

export function findValue(find, buyerId, rankMultValue) {
  const buyer = buyerById(buyerId);
  const mult = buyer ? buyer[find.kind] || 1 : 1;
  return Math.max(1, Math.round(find.value * mult * (rankMultValue || 1)));
}

export function assembleMap(ownedFragmentIds, mapId) {
  const needed = MAP_FRAGMENTS.filter((f) => f.mapId === mapId);
  const held = needed.filter((f) => ownedFragmentIds.includes(f.id)).length;
  return { complete: held >= needed.length && needed.length > 0, held, needed: needed.length, mapId };
}

export function bestBuyerFor(find) {
  let best = null;
  let bestPrice = -1;
  for (const buyer of BUYERS) {
    const price = findValue(find, buyer.id, 1);
    if (price > bestPrice) { bestPrice = price; best = buyer; }
  }
  return { buyer: best, price: bestPrice };
}

export function siteTierForRank(rankId) {
  if (rankId === 'hobbyist') return 2;
  if (rankId === 'digger') return 3;
  if (rankId === 'hunter') return 4;
  return 5;
}

export function findRarity(find) {
  if (find.value >= 10000) return 'legendary';
  if (find.value >= 2500) return 'epic';
  if (find.value >= 500) return 'rare';
  if (find.value >= 50) return 'uncommon';
  return 'common';
}

export function inventoryValue(inventory, buyerId, rankMultValue) {
  return inventory.reduce((s, f) => s + findValue(f, buyerId, rankMultValue), 0);
}

export function collectionKindCount(collection, kind) {
  return collection[kind] || 0;
}

export function detectorRecommendation(cash, targetTier) {
  const depth = targetTier * 2;
  const fitting = DETECTORS.filter((d) => d.depth >= depth);
  const afford = fitting.filter((d) => d.price <= cash);
  if (afford.length) return afford.sort((a, b) => a.price - b.price)[0];
  if (fitting.length) return fitting.sort((a, b) => a.price - b.price)[0];
  return DETECTORS[0];
}

export function shovelRecommendation(cash, neededDepth) {
  const fitting = SHOVELS.filter((s) => s.digPower * 3 >= neededDepth);
  const afford = fitting.filter((s) => s.price <= cash);
  if (afford.length) return afford.sort((a, b) => a.price - b.price)[0];
  if (fitting.length) return fitting.sort((a, b) => b.digPower - a.digPower)[0];
  return SHOVELS.slice().sort((a, b) => b.digPower - a.digPower)[0];
}

export function rivalOdds(rivalId, rankId) {
  const rival = rivalById(rivalId);
  if (!rival) return 0.5;
  const chance = (rankIndex(rankId) + 2) / (rival.skill + rankIndex(rankId) + 2);
  return Math.max(0.1, Math.min(0.9, chance));
}

export function mapValueEstimate(mapId) {
  const map = mapById(mapId);
  if (!map) return 0;
  const pool = FIND_TABLE.filter((f) => f.tier <= map.tier + 1);
  if (!pool.length) return 0;
  const avg = pool.reduce((s, f) => s + f.value, 0) / pool.length;
  return Math.round(avg * 3);
}

export function digsToDepth(neededDepth, shovelId) {
  const shovel = shovelById(shovelId);
  return Math.ceil(neededDepth / shovel.digPower);
}

export function dealerForMap(mapId) {
  return MAP_DEALERS.find((d) => d.maps.includes(mapId)) || null;
}

export function clubForSite(siteId) {
  if (siteId === 'old-beach' || siteId === 'pirate-cove' || siteId === 'shipwreck') {
    return DETECTING_CLUBS.find((c) => c.id === 'beach-club');
  }
  if (siteId === 'battlefield' || siteId === 'ghost-town' || siteId === 'old-church') {
    return DETECTING_CLUBS.find((c) => c.id === 'relic-club');
  }
  return DETECTING_CLUBS.find((c) => c.id === 'gold-club');
}

export function findsLogForSite(siteId) {
  return FINDS_LOG.filter((f) => f.site === siteId);
}

export function mapDealerPrice(mapId, dealerId) {
  const map = mapById(mapId);
  if (!map) return 0;
  if (dealerId === 'black-market-dealer') return Math.round(map.price * 1.5);
  return map.price;
}

export function totalClubMembers() {
  return DETECTING_CLUBS.reduce((s, c) => s + c.members, 0);
}

export function permitForSite(siteId) {
  return DIG_PERMITS.find((p) => p.site === siteId) || { site: siteId, permit: 'none', cost: 0, note: 'No permit needed' };
}

export function hunterForFind(findName) {
  return FAMOUS_HUNTERS.find((h) => h.find === findName) || null;
}

export function filmForYearTreasure(year) {
  return TREASURE_FILMS.find((f) => f.year === year) || null;
}

export function mottoForHunterTreasure(index) {
  return TREASURE_MOTTOS[((index % TREASURE_MOTTOS.length) + TREASURE_MOTTOS.length) % TREASURE_MOTTOS.length];
}

export function shipwreckValue(name) {
  const w = FAMOUS_SHIPWRECKS.find((x) => x.name === name);
  return w ? w.value : 0;
}

export function proverbTreasure(index) {
  return TREASURE_PROVERBS[((index % TREASURE_PROVERBS.length) + TREASURE_PROVERBS.length) % TREASURE_PROVERBS.length];
}

export function famousMapFor(name) {
  return FAMOUS_MAPS.find((m) => m.name === name) || null;
}

export function createTreasureHuntingSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getPlayerPos = typeof deps.getPlayerPos === 'function' ? deps.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    xp: 0,
    rank: 'hobbyist',
    detectorId: 'toy',
    detectorsOwned: ['toy'],
    shovelId: 'hands',
    shovelsOwned: ['hands'],
    mapsOwned: [],
    activeMap: null,
    currentSite: null,
    sweep: null,
    dig: null,
    inventory: [],
    museumDonations: 0,
    totalFinds: 0,
    totalEarned: 0,
    totalSold: 0,
    rivalsBeaten: 0,
    rivalsLost: 0,
    missionsDone: {},
    day: 1,
    digsToday: 0,
    bestFind: null,
    collection: {},
    sitesVisited: {},
  };

  function rankMultValue() {
    return 1 + rankIndex(state.rank) * 0.1;
  }

  function refreshRank() {
    let current = TREASURE_RANKS[0];
    for (const r of TREASURE_RANKS) {
      if (state.xp >= r.xpNeeded) current = r;
    }
    state.rank = current.id;
  }

  function gainXp(amount) {
    state.xp += amount;
    refreshRank();
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = TREASURE_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-find') done = state.totalFinds >= 1;
    else if (id === 'gold-coin') done = (state.collection['gold-coin'] || 0) >= 1 || (state.bestFind && state.bestFind.value >= 300);
    else if (id === 'lost-crown') done = (state.collection['crown'] || 0) >= 1;
    else if (id === 'chest-find') done = (state.collection['chest'] || 0) >= 1;
    else if (id === 'museum-5') done = state.museumDonations >= 5;
    else if (id === 'earn-5000') done = state.totalEarned >= 5000;
    else if (id === 'rival-beaten') done = state.rivalsBeaten >= 1;
    else if (id === 'find-20') done = state.totalFinds >= 20;
    else if (id === 'collection-10') done = Object.keys(state.collection).filter((k) => state.collection[k] > 0).length >= 10;
    else if (id === 'map-master') done = state.mapsOwned.length >= 5;
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(mission.reward);
    log(`Mission complete: ${mission.name}`);
  }

  function resolveFind() {
    const dig = state.dig;
    const site = siteById(state.currentSite);
    const tier = dig.siteTier;
    const pool = FIND_TABLE.filter((f) => f.tier <= tier + 1).map((f) => {
      const w = f.tier === tier ? f.weight * 1.5 : f.tier > tier ? f.weight * 0.4 : f.weight;
      return { find: f, weight: w };
    });
    const total = pool.reduce((s, p) => s + p.weight, 0);
    let roll = rng() * total;
    let picked = pool[0].find;
    for (const entry of pool) {
      roll -= entry.weight;
      if (roll <= 0) { picked = entry.find; break; }
    }
    const quality = Math.round((0.8 + rng() * 0.5) * 100) / 100;
    let value = Math.round(picked.value * quality);
    if (state.activeMap && state.activeMap.siteId === state.currentSite) value = Math.round(value * 1.5);
    const found = {
      ...picked,
      value,
      quality,
      siteId: state.currentSite,
      day: getDay(),
    };
    state.inventory.push(found);
    state.totalFinds += 1;
    state.collection[found.id] = (state.collection[found.id] || 0) + 1;
    state.collection[found.kind] = (state.collection[found.kind] || 0) + 1;
    const xpByKind = { junk: 2, coin: 10, relic: 15, jewellery: 20, artifact: 40, chest: 100 };
    gainXp(xpByKind[found.kind] || 5);
    if (!state.bestFind || found.value > state.bestFind.value) state.bestFind = found;
    if (state.rivalAtSite) {
      const rival = state.rivalAtSite;
      const rivalRoll = rng() * rival.skill + 1;
      const playerRoll = rng() * (rankIndex(state.rank) + 2);
      if (rivalRoll > playerRoll && found.kind !== 'junk') {
        state.inventory = state.inventory.filter((f) => f !== found);
        state.totalFinds -= 1;
        state.rivalsLost += 1;
        state.rivalAtSite = null;
        state.dig = null;
        state.sweep = null;
        refreshRank();
        log(`${rival.name} stole your ${found.name}!`);
        return { ok: true, event: 'stolen', find: found, rival: rival.name };
      }
      state.rivalsBeaten += 1;
      checkMission('rival-beaten');
    }
    state.rivalAtSite = null;
    state.dig = null;
    state.sweep = null;
    refreshRank();
    checkMission('first-find');
    checkMission('gold-coin');
    checkMission('lost-crown');
    checkMission('chest-find');
    checkMission('find-20');
    checkMission('collection-10');
    log(`Found ${found.name} worth ${found.value}`);
    return { ok: true, event: 'found', find: found, xp: xpByKind[found.kind] || 5 };
  }

  const system = {
    state,

    buyDetector(detectorId) {
      const detector = DETECTORS.find((d) => d.id === detectorId);
      if (!detector) return { ok: false, error: 'unknown detector' };
      if (state.detectorsOwned.includes(detectorId)) {
        state.detectorId = detectorId;
        return { ok: true, equipped: detectorId };
      }
      if (getCash() < detector.price) return { ok: false, error: 'not enough cash' };
      addCash(-detector.price);
      state.detectorsOwned.push(detectorId);
      state.detectorId = detectorId;
      log(`Bought detector: ${detector.name}`);
      return { ok: true, detector };
    },

    buyShovel(shovelId) {
      const shovel = SHOVELS.find((s) => s.id === shovelId);
      if (!shovel) return { ok: false, error: 'unknown shovel' };
      if (state.shovelsOwned.includes(shovelId)) {
        state.shovelId = shovelId;
        return { ok: true, equipped: shovelId };
      }
      if (getCash() < shovel.price) return { ok: false, error: 'not enough cash' };
      addCash(-shovel.price);
      state.shovelsOwned.push(shovelId);
      state.shovelId = shovelId;
      log(`Bought shovel: ${shovel.name}`);
      return { ok: true, shovel };
    },

    buyMap(mapId) {
      const map = mapById(mapId);
      if (!map) return { ok: false, error: 'unknown map' };
      if (state.mapsOwned.includes(mapId)) return { ok: false, error: 'already owned' };
      if (map.tier > siteTierForRank(state.rank)) return { ok: false, error: 'rank too low for this map' };
      if (getCash() < map.price) return { ok: false, error: 'not enough cash' };
      addCash(-map.price);
      state.mapsOwned.push(mapId);
      log(`Bought map: ${map.name}. Clue: ${map.clue}`);
      checkMission('map-master');
      return { ok: true, map };
    },

    useMap(mapId) {
      if (!state.mapsOwned.includes(mapId)) return { ok: false, error: 'map not owned' };
      const map = mapById(mapId);
      const sites = DIG_SITES.filter((s) => s.tier === map.tier || s.tier === map.tier + 1);
      const site = sites[Math.floor(rng() * sites.length)];
      state.activeMap = { mapId, siteId: site.id, clue: map.clue, tier: map.tier };
      log(`Map points to ${site.name}: ${map.clue}`);
      return { ok: true, activeMap: state.activeMap, site };
    },

    goToSite(siteId) {
      const site = siteById(siteId);
      if (!site) return { ok: false, error: 'unknown site' };
      if (site.tier > siteTierForRank(state.rank)) return { ok: false, error: 'rank too low for this site' };
      if (getCash() < site.fee) return { ok: false, error: 'not enough cash' };
      if (site.fee > 0) addCash(-site.fee);
      state.currentSite = siteId;
      state.sweep = null;
      state.dig = null;
      state.sitesVisited[siteId] = (state.sitesVisited[siteId] || 0) + 1;
      let rival = null;
      if (site.tier >= 3 && rng() < 0.35) {
        rival = RIVALS[Math.floor(rng() * RIVALS.length)];
        state.rivalAtSite = rival;
      } else {
        state.rivalAtSite = null;
      }
      log(`Arrived at ${site.name}`);
      return { ok: true, site, rival };
    },

    startSweep() {
      if (!state.currentSite) return { ok: false, error: 'no site chosen' };
      if (state.sweep) return { ok: false, error: 'already sweeping' };
      const detector = detectorById(state.detectorId);
      const target = {
        x: Math.floor(rng() * 10),
        y: Math.floor(rng() * 10),
        depth: 1 + Math.floor(rng() * detector.depth),
      };
      const grid = [];
      for (let i = 0; i < 10; i++) grid.push(new Array(10).fill(0));
      state.sweep = { siteId: state.currentSite, target, signal: 0, sweeps: 0, found: false, grid };
      log('Started sweeping');
      return { ok: true, signal: 0, sweeps: 0 };
    },

    sweepAt(x, y) {
      const sweep = state.sweep;
      if (!sweep) return { ok: false, error: 'no sweep started' };
      const cx = Math.max(0, Math.min(9, x));
      const cy = Math.max(0, Math.min(9, y));
      const dist = Math.abs(cx - sweep.target.x) + Math.abs(cy - sweep.target.y);
      const signal = Math.max(0, Math.min(100, 100 - dist * 12));
      sweep.grid[cy][cx] = signal;
      sweep.sweeps += 1;
      sweep.signal = signal;
      sweep.lastX = cx;
      sweep.lastY = cy;
      let hint = 'Nothing here.';
      if (signal >= 90) hint = 'A very strong signal! Dig here!';
      else if (signal >= 70) hint = 'A strong signal, getting close.';
      else if (signal >= 45) hint = 'A faint signal.';
      else if (signal >= 20) hint = 'Barely a whisper.';
      const detector = detectorById(state.detectorId);
      if (detector.discrimination >= 5 && signal > 0 && signal < 45) hint += ' Probably junk.';
      if (signal >= 88) sweep.found = true;
      return { ok: true, x: cx, y: cy, signal, hint, sweeps: sweep.sweeps, found: sweep.found };
    },

    startDig() {
      if (!state.sweep) return { ok: false, error: 'no sweep started' };
      if (!state.sweep.found) return { ok: false, error: 'signal peak not found yet' };
      if (state.dig) return { ok: false, error: 'already digging' };
      const site = siteById(state.currentSite);
      state.dig = {
        depthNeeded: state.sweep.target.depth * 10,
        depthDug: 0,
        siteTier: site.tier,
        target: { ...state.sweep.target },
        hits: 0,
      };
      log('Started digging');
      return { ok: true, depthNeeded: state.dig.depthNeeded, depthDug: 0 };
    },

    digOnce() {
      const dig = state.dig;
      if (!dig) return { ok: false, error: 'no dig started' };
      const shovel = shovelById(state.shovelId);
      dig.depthDug += shovel.digPower;
      dig.hits += 1;
      state.digsToday += 1;
      const site = siteById(state.currentSite);
      if (site.danger >= 3 && rng() < 0.08) {
        dig.depthDug = Math.max(0, dig.depthDug - 5);
        return { ok: true, depthDug: dig.depthDug, depthNeeded: dig.depthNeeded, event: 'collapse' };
      }
      if (dig.depthDug >= dig.depthNeeded) return resolveFind();
      return { ok: true, depthDug: dig.depthDug, depthNeeded: dig.depthNeeded, event: 'digging' };
    },

    sellFind(index, buyerId) {
      if (typeof index !== 'number' || index < 0 || index >= state.inventory.length) {
        return { ok: false, error: 'invalid find index' };
      }
      const buyer = buyerById(buyerId);
      if (!buyer) return { ok: false, error: 'unknown buyer' };
      const find = state.inventory.splice(index, 1)[0];
      const price = findValue(find, buyerId, rankMultValue());
      addCash(price);
      state.totalSold += 1;
      state.totalEarned += price;
      if (buyerId === 'museum' && find.kind === 'artifact') state.museumDonations += 1;
      if (buyerId === 'black-market') addHeat(1);
      log(`Sold ${find.name} to ${buyer.name} for ${price}`);
      checkMission('museum-5');
      checkMission('earn-5000');
      return { ok: true, find, price, buyer: buyer.name };
    },

    sellAllJunk(buyerId) {
      const junk = state.inventory.filter((f) => f.kind === 'junk');
      if (junk.length === 0) return { ok: false, error: 'no junk in inventory' };
      const buyer = buyerById(buyerId);
      if (!buyer) return { ok: false, error: 'unknown buyer' };
      const total = junk.reduce((s, f) => s + findValue(f, buyerId, rankMultValue()), 0);
      state.inventory = state.inventory.filter((f) => f.kind !== 'junk');
      state.totalSold += junk.length;
      state.totalEarned += total;
      addCash(total);
      log(`Sold ${junk.length} junk finds for ${total}`);
      checkMission('earn-5000');
      return { ok: true, sold: junk.length, earned: total };
    },

    appraise(index) {
      if (typeof index !== 'number' || !Number.isFinite(index) || index < 0 || index >= state.inventory.length) {
        return { ok: false, error: 'invalid find index' };
      }
      const find = state.inventory[index];
      const prices = BUYERS.map((b) => ({ buyer: b.name, buyerId: b.id, price: findValue(find, b.id, rankMultValue()) }));
      prices.sort((a, b) => b.price - a.price);
      return { ok: true, find, prices, best: prices[0] };
    },

    missions() {
      return TREASURE_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.day) {
        state.day = day;
        state.digsToday = 0;
        state.activeMap = null;
      }
      const hour = getHour();
      const night = hour >= 22 || hour < 4;
      if (night && state.currentSite && !state.sweep && rng() < 0.02 * (dt || 0)) {
        log('You hear footsteps in the dark...');
      }
    },

    hudLine() {
      if (state.totalFinds === 0 && !state.currentSite) return '';
      const rank = rankById(state.rank);
      const site = state.currentSite ? siteById(state.currentSite).name : '-';
      let line = `Treasure ${rank.name} | ${site} | finds ${state.totalFinds} | pack ${state.inventory.length}`;
      if (state.sweep) line += ` | signal ${state.sweep.signal}%`;
      if (state.dig) line += ` | digging ${state.dig.depthDug}/${state.dig.depthNeeded}cm`;
      return line;
    },

    summary() {
      return {
        xp: state.xp,
        rank: state.rank,
        totalFinds: state.totalFinds,
        totalEarned: state.totalEarned,
        totalSold: state.totalSold,
        inventory: state.inventory.length,
        bestFind: state.bestFind,
        museumDonations: state.museumDonations,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
      return {
        xp: state.xp,
        rank: state.rank,
        detectorId: state.detectorId,
        detectorsOwned: [...state.detectorsOwned],
        shovelId: state.shovelId,
        shovelsOwned: [...state.shovelsOwned],
        mapsOwned: [...state.mapsOwned],
        inventory: state.inventory.map((f) => ({ ...f })),
        museumDonations: state.museumDonations,
        totalFinds: state.totalFinds,
        totalEarned: state.totalEarned,
        totalSold: state.totalSold,
        rivalsBeaten: state.rivalsBeaten,
        rivalsLost: state.rivalsLost,
        missionsDone: { ...state.missionsDone },
        bestFind: state.bestFind ? { ...state.bestFind } : null,
        collection: { ...state.collection },
        sitesVisited: { ...state.sitesVisited },
      };
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      if (typeof saved.xp === 'number') state.xp = saved.xp;
      if (typeof saved.rank === 'string') state.rank = saved.rank;
      if (typeof saved.detectorId === 'string') state.detectorId = saved.detectorId;
      if (typeof saved.shovelId === 'string') state.shovelId = saved.shovelId;
      if (Array.isArray(saved.detectorsOwned)) state.detectorsOwned = [...saved.detectorsOwned];
      if (Array.isArray(saved.shovelsOwned)) state.shovelsOwned = [...saved.shovelsOwned];
      if (Array.isArray(saved.mapsOwned)) state.mapsOwned = [...saved.mapsOwned];
      if (Array.isArray(saved.inventory)) state.inventory = saved.inventory.map((f) => ({ ...f }));
      const numeric = ['museumDonations', 'totalFinds', 'totalEarned', 'totalSold', 'rivalsBeaten', 'rivalsLost'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
      if (saved.missionsDone && typeof saved.missionsDone === 'object') state.missionsDone = { ...saved.missionsDone };
      if (saved.bestFind && typeof saved.bestFind === 'object') state.bestFind = { ...saved.bestFind };
      if (saved.collection && typeof saved.collection === 'object') state.collection = { ...saved.collection };
      if (saved.sitesVisited && typeof saved.sitesVisited === 'object') state.sitesVisited = { ...saved.sitesVisited };
    },
  };

  return system;
}
