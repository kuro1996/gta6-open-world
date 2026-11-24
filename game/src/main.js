// Solara Nights — main entry point.
// Wires the city, the player, the police, the story and eighty-eight small
// factory systems into one playable night. Everything here is built by hand
// from the interface brief; nothing is imported from the old file.

import * as THREE from 'three';
import { WORLD, PLACES } from './config.js';
import { buildCity, buildRooftopBeacons } from './city.js';
import { AudioEngine } from './audio.js';
import { Effects } from './effects.js';
import { Input } from './input.js';
import { Player } from './player.js';
import { TrafficSystem, spawnParkedCars, syncCarMesh, setCarGlow } from './vehicles.js';
import { PedestrianSystem } from './pedestrians.js';
import { WantedSystem } from './police.js';
import { PoliceSystem } from './police.js';
import { Combat } from './combat.js';
import { MissionManager, MISSIONS, SideJobs } from './missions.js';
import { Driving } from './driving.js';
import { HUD } from './hud.js';
import { WeatherSystem } from './weather.js';
import { NightOps } from './nightops.js';
import { BlackMarket, MARKET_ITEMS } from './blackmarket.js';
import { saveGame, loadGame, emptyStats } from './save.js';
import { createEconomySystem, SHOPS } from './economy.js';
import { createSafehouseSystem, SAFEHOUSES, heatToStars, nearSafehouse } from './safehouse.js';
import { createStreetRaceSystem, ROUTES } from './streetrace.js';
import { createFishingSystem, FISHING_SPOTS } from './fishing.js';
import { createCasinoSystem } from './casino.js';
import { createBusinessSystem, BUSINESS_TYPES } from './businesses.js';
import { createDeliverySystem } from './delivery.js';
import { createStuntSystem, STUNT_RAMPS } from './stunt.js';
import { createRadioSystem, STATIONS } from './radio.js';
import { createPhotoSystem } from './photo.js';
import { createSmugglingSystem } from './smuggling.js';
import { createGymSystem, EXERCISES } from './gym.js';
import { createChopShopSystem, CAR_VALUES } from './chopshop.js';
import { createTaxiSystem } from './taxi.js';
import { createArcadeSystem, ARCADE_CABINETS } from './arcade.js';
import { createBankSystem, HEIST_TARGETS } from './bank.js';
import { createTuningSystem, TUNING_CATEGORIES } from './tuning.js';
import { createNightclubSystem, NIGHTCLUBS } from './nightclub.js';
import { createBountySystem, BOUNTY_TARGETS } from './bounty.js';
import { createCarMeetSystem, CAR_MEETS } from './carmeet.js';
import { createRealEstateSystem, PROPERTIES } from './realestate.js';
import { createFightClubSystem, FIGHTERS } from './fightclub.js';
import { createGraffitiSystem, GRAFFITI_DISTRICTS, SPRAY_BRANDS, RIVAL_CREWS } from './graffiti.js';
import { createNightMarketSystem, MARKET_GOODS } from './nightmarket.js';
import { createStudioSystem, STUDIO_GENRES, STUDIO_FEATURES, STUDIO_VENUES } from './studio.js';
import { createDetectiveSystem, EYE_CASES, TAIL_TARGETS } from './detective.js';
import { createLawyerSystem, LAWYERS, CHARGES } from './lawyer.js';
import { createFilmSystem, FILMS, STUNT_SCRIPTS, FILM_DRIVERS } from './film.js';
import { createSubwaySystem, SUBWAY_STATIONS, SUBWAY_LINES } from './subway.js';
import { createFirefighterSystem, FIRE_TYPES, FIRE_RANKS } from './firefighter.js';
import { createBarberSystem, HAIRCUTS, TATTOOS } from './barber.js';
import { createPetSystem, PET_BREEDS, PET_TRICKS } from './pet.js';
import { createBusDriverSystem, BUS_ROUTES, BUS_MODELS } from './busdriver.js';
import { createFoodTruckSystem, FOOD_MENU, FOOD_TRUCK_SPOTS } from './foodtruck.js';
import { createBowlingSystem, BOWLING_LANES, BOWLING_OPPONENTS } from './bowling.js';
import { createYachtSystem, BOATS, SEA_ROUTES } from './yacht.js';
import { createSkateparkSystem, SKATE_PARKS, SKATE_TRICKS } from './skatepark.js';
import { createKaraokeSystem, KARAOKE_SONGS, KARAOKE_BATTLERS } from './karaoke.js';
import { createCasinoRoyaleSystem, CHIP_PACKS, SLOT_MACHINES, BLACKJACK_TABLES, VIP_TIERS, CASINO_MISSIONS } from './casinoroyale.js';
import { createAnglingSystem, FISH_SPECIES, RODS, BAITS, ANGLER_RANKS, TOURNAMENTS } from './angling.js';
import { createCourierSystem, DISTRICTS, PARCEL_TYPES, COURIER_VEHICLES, COURIER_RANKS, URGENCY } from './courier.js';
import { createGhostHuntingSystem, EVIDENCE_TYPES, GHOST_TYPES, HAUNTED_LOCATIONS, GHOST_EQUIPMENT, HUNTER_RANKS } from './ghosthunting.js';
import { createGolfSystem, CLUBS, GOLF_BALLS, COURSES, GOLF_OPPONENTS } from './golf.js';
import { createHeliTourSystem, HELICOPTERS, TOUR_ROUTES, PHOTO_SPOTS, PASSENGER_TYPES } from './helitours.js';
import { createPrisonBreakSystem, CELL_BLOCKS, ESCAPE_PLANS, CONTRABAND, CRAFT_RECIPES, GUARDS, ALLIES } from './prisonbreak.js';
import { createSurfingSystem, SURF_BEACHES, SURFBOARDS, SURF_TRICKS, WETSUITS, SURF_COMPS } from './surfing.js';
import { createTreasureHuntingSystem, DIG_SITES, TREASURE_MAPS, DETECTORS, SHOVELS, FIND_TABLE } from './treasurehunting.js';
import { createRecyclingSystem, RECYCLING_MATERIALS, RECYCLING_BINS, RECYCLING_ROUTES } from './recycling.js';
import { createDroneRacingSystem, DRONE_MODELS, DRONE_TRACKS, DRONE_PARTS } from './droneRacing.js';
import { createTennisSystem, TENNIS_COURTS, TENNIS_RACKETS, TENNIS_SHOES } from './tennis.js';
import { createHospitalSystem, HOSPITAL_WARDS, TRIAGE_LEVELS, HOSPITAL_CONDITIONS } from './hospital.js';
import { createRestaurantSystem, RESTAURANT_DISHES, RESTAURANT_INGREDIENTS, RESTAURANT_CUSTOMERS } from './restaurant.js';
import { createPawnshopSystem, PAWN_CATEGORIES, PAWN_CUSTOMERS, PAWN_AUCTIONS } from './pawnshop.js';
import { createBodyguardSystem, BODYGUARD_CLIENTS, BODYGUARD_ROUTES, BODYGUARD_THREATS } from './bodyguard.js';
import { createJetskiSystem, JETSKI_MODELS, JETSKI_COURSES, JETSKI_TRICKS } from './jetski.js';
import { createFarmingSystem, FARM_CROPS, FARM_ANIMALS, FARM_PLOTS } from './farming.js';
import { createHuntingSystem, HUNTING_ANIMALS } from './hunting.js';
import { createMiningSystem, MINING_ORES } from './mining.js';
import { createLoggingSystem, LOGGING_TREES } from './logging.js';
import { createApiarySystem, APIARY_HIVES } from './apiary.js';
import { createPaleontologySystem, FOSSIL_SITES } from './paleontology.js';
import { createParkRangerSystem, RANGER_PATROLS } from './parkRanger.js';
import { createStormChasingSystem, STORM_TYPES } from './stormChasing.js';
import { createHorseRanchSystem, HORSE_BREEDS } from './horseRanch.js';
import { createScubaDivingSystem, DIVE_SITES } from './scubaDiving.js';
import { createSkydivingSystem, DROP_ZONES } from './skydiving.js';
import { createHotAirBalloonSystem, BALLOON_ROUTES } from './hotAirBalloon.js';
import { createFerrySystem, FERRY_ROUTES } from './ferry.js';
import { createKayakingSystem, KAYAK_RIVERS } from './kayaking.js';
import { createWindsurfingSystem, WINDSURF_SPOTS } from './windsurfing.js';
import { createLifeguardSystem, BEACH_PATROLS } from './lifeguard.js';
import { createCoastGuardSystem, RESCUE_MISSIONS } from './coastGuard.js';
import { createBrewerySystem, BREW_RECIPES } from './brewery.js';
import { createBakerySystem, BAKED_GOODS } from './bakery.js';
import { createSushiBarSystem, SUSHI_MENU } from './sushiBar.js';
import { createCoffeeShopSystem, COFFEE_MENU } from './coffeeShop.js';
import { createButcherSystem, MEAT_CUTS } from './butcher.js';
import { createFishMarketSystem, MARKET_CATCH } from './fishMarket.js';
import { createDonutShopSystem, DONUT_FLAVORS } from './donutShop.js';
import { createVineyardSystem, WINE_VARIETALS } from './vineyard.js';
import { createMuseumSystem, EXHIBITS } from './museum.js';
import { createEsportsArenaSystem, TOURNAMENTS as ESPORTS_TOURNAMENTS } from './esportsArena.js';
import { createComedyClubSystem, COMEDY_ACTS } from './comedyClub.js';
import { createStreamingSystem, STREAM_CATEGORIES } from './streaming.js';
import { createHotelSystem, ROOM_TYPES } from './hotel.js';
import { createCarWashSystem, WASH_PACKAGES } from './carWash.js';
import { createStockTradingSystem, STOCKS } from './stockTrading.js';
import { createPoliticsSystem, CAMPAIGN_EVENTS } from './politics.js';

// ---------------------------------------------------------------------------
// Launch parameters, seeded chance, small numeric helpers
// ---------------------------------------------------------------------------

const query = new URLSearchParams(window.location.search);
const seedText = parseInt(query.get('seed'), 10);
const SEED = Number.isInteger(seedText) ? seedText : 7;
const SHOT = query.get('shot');

function mulberry32(a) {
  return function nextRand() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const seededRand = mulberry32(SEED);
function rngFn() { return seededRand(); }
const rngTool = {
  next: rngFn,
  range(lo, hi) { return lo + seededRand() * (hi - lo); },
};

function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
function clamp01(v) { return clamp(v, 0, 1); }
function lerp(a, b, t) { return a + (b - a) * t; }
function dist2d(ax, az, bx, bz) { return Math.hypot(ax - bx, az - bz); }
function fmtClock(minutes) {
  const total = Math.floor(minutes);
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

// Day-cycle boundaries. The world config owns the exact numbers; fall back to
// the familiar Solara rhythm when a field is absent.
const DAY_START = WORLD.dayStart ?? 5.5;
const DUSK_START = WORLD.duskStart ?? 18;
const NIGHT_START = WORLD.nightStart ?? 19.5;
const DAWN_END = WORLD.dawnEnd ?? 6;

function nightFactorFor(hour) {
  if (hour >= NIGHT_START || hour < DAY_START) return 1;
  if (hour >= DUSK_START) return (hour - DUSK_START) / (NIGHT_START - DUSK_START);
  if (hour >= DAY_START && hour < DAWN_END) return 1 - (hour - DAY_START) / (DAWN_END - DAY_START);
  return 0;
}

function phaseNameFor(hour) {
  if (hour >= NIGHT_START || hour < DAY_START) return 'night';
  if (hour < 8) return 'dawn';
  if (hour < DUSK_START) return 'day';
  return 'dusk';
}

// ---------------------------------------------------------------------------
// Page elements
// ---------------------------------------------------------------------------

const canvasEl = document.getElementById('game');
const statusEl = document.getElementById('status');
const hudEl = document.getElementById('hud');
const menuTitleEl = document.getElementById('menu-title');
const menuPauseEl = document.getElementById('menu-pause');
const menuOverEl = document.getElementById('menu-over');
const menuCompleteEl = document.getElementById('menu-complete');
const overTitleEl = document.getElementById('over-title');
const overTextEl = document.getElementById('over-text');
const howtoEl = document.getElementById('howto');
const btnContinue = document.getElementById('btn-continue');
const btnNew = document.getElementById('btn-new');
const btnHow = document.getElementById('btn-how');
const btnResume = document.getElementById('btn-resume');
const btnRestart = document.getElementById('btn-restart');
const btnMute = document.getElementById('btn-mute');
const btnQuit = document.getElementById('btn-quit');
const btnRetry = document.getElementById('btn-retry');
const btnOverTitle = document.getElementById('btn-over-title');
const btnFreeroam = document.getElementById('btn-freeroam');

// ---------------------------------------------------------------------------
// Renderer, scene, camera, lights
// ---------------------------------------------------------------------------

const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1026);
scene.fog = new THREE.Fog(0x0b1026, 60, 320);

const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 900);
camera.position.set(40, 26, 60);
camera.lookAt(0, 0, 0);

const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x1a2028, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe0b3, 1.1);
sun.position.set(80, 120, 40);
scene.add(sun);

const skyDay = new THREE.Color(0x87b5e0);
const skyNight = new THREE.Color(0x0b1026);
const fogDay = new THREE.Color(0x9db8cc);
const fogNight = new THREE.Color(0x0b1026);
const skyWork = new THREE.Color();
const fogWork = new THREE.Color();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------------------
// Clock and calendar state. lastGameHour mirrors the 17:40 start by hand
// because the minute counter is declared just below it.
// ---------------------------------------------------------------------------

let lastGameHour = 17;
let lastGameMinute = 40;
let lastDay = 1;
let gameMinutes = 17 * 60 + 40;
let nightF = 0;
let lastNightF = -1;
let titleOrbit = 0;

// Places the HUD minimap names, in config order.
const namedPlaces = Object.entries(PLACES || {}).map(([name, spot]) => ({
  name,
  x: spot.x ?? 0,
  z: spot.z ?? 0,
}));
const startPlace = PLACES.start || PLACES.playerStart || { x: 0, z: 0 };
const garagePlace = PLACES.garage || PLACES.Garage || { x: 0, z: 0 };
const docksPlace = PLACES.docks || PLACES.Docks || { x: 0, z: 0 };

// ---------------------------------------------------------------------------
// Live money / heat accessors. Factories only ever get these closures, never
// a snapshot, so spending in one system is visible everywhere at once.
// ---------------------------------------------------------------------------

function getCash() { return money; }
function addCash(amount) { money += amount; }
function getHeatLevel() { return wanted.level; }
function addHeat(amount) {
  wanted.heat = clamp(wanted.heat + amount, 0, 100);
  wanted.level = heatToStars(wanted.heat);
}
function getWantedLevel() { return wanted.level; }

// The status line writer, and the shared player-position reader. Both are
// plain function declarations so factory closures built before this point in
// the file can still reach them.
let lastAnnounce = '';
function announce(msg) {
  lastAnnounce = msg;
  if (statusEl) statusEl.textContent = msg;
}

function playerPos() {
  if (driving.inCar && driving.car) {
    const c = driving.car;
    return { x: c.x ?? c.pos?.x ?? 0, z: c.z ?? c.pos?.z ?? 0 };
  }
  return { x: player.pos.x, z: player.pos.z };
}

// ---------------------------------------------------------------------------
// Class-built core systems, in boot order
// ---------------------------------------------------------------------------

const city = buildCity(scene);
const audio = new AudioEngine();
const effects = new Effects(scene);
const input = new Input(canvasEl);
const player = new Player(scene, startPlace.x, startPlace.z);
const traffic = new TrafficSystem(scene, rngTool, city);
const peds = new PedestrianSystem(scene, rngTool, city);
const parkedCars = spawnParkedCars(scene, rngTool);
const wanted = new WantedSystem();
const police = new PoliceSystem(scene, rngTool, city, audio, effects);
const combat = new Combat(scene, audio, effects);
const missions = new MissionManager(scene, audio);
const sideJobs = new SideJobs(scene, audio);
const driving = new Driving(city, audio, effects);
const hud = new HUD();
const weather = new WeatherSystem(scene, rngTool, audio, effects);
const beacons = buildRooftopBeacons(scene);

function onMarketBuy(item) {
  stats.marketDeals++;
  hud.showBanner('Deal closed', item && item.name ? item.name : 'Black market');
  announce('Bought ' + (item && item.name ? item.name : 'an item') + ' at the docks.');
}

function onNightReward(pay, repGain, label) {
  const owlCut = Math.round(pay * (market.upgrades?.nightPay || 0));
  addCash(pay + owlCut);
  rep += repGain;
  stats.nightOps++;
  if (market.addRep) market.addRep(repGain, 'owls');
  hud.showBanner('Night work paid', (label || 'Contract') + ' +$' + (pay + owlCut));
  saveGame({ missionIndex, money, rep, stats, tutorialSeen });
}

function onNightFail() {
  stats.nightBurned++;
  hud.showBanner('Contract burned', 'The night saw too much.');
}

function onNightSpotted() {
  addHeat(15);
  hud.showBanner('Spotted', 'A watcher made you.');
}

const market = new BlackMarket(scene, rngTool, audio, { onBuy: onMarketBuy, announce });
const nightops = new NightOps(scene, rngTool, audio, effects, {
  announce,
  reward: onNightReward,
  fail: onNightFail,
  onSpotted: onNightSpotted,
});

// Mission completion callbacks. The reward handler pays out but deliberately
// does not save; the caller saves after the index has advanced. It is
// idempotent per mission object, so a manager that fires both callback
// spellings can never pay the same mission twice.
let storyDone = false;
let lastPaidMission = null;
function missionRewardHandler(mission, bonus) {
  const done = mission || missions.current || MISSIONS[missionIndex];
  if (!done || done === lastPaidMission) return;
  lastPaidMission = done;
  const extra = typeof bonus === 'number' ? bonus : (done.bonus || 0);
  const pay = (done.reward || 0) + extra;
  addCash(pay);
  hud.showBanner('Mission complete', done.title + '  +$' + pay);
}
missions.onComplete = missionRewardHandler;
missions.onMissionComplete = missionRewardHandler;
missions.onStoryComplete = () => { storyDone = true; };

// ---------------------------------------------------------------------------
// The three pre-registry factories. They are built before the shared time
// helpers exist, so each gets its own small inline hour reader instead.
// ---------------------------------------------------------------------------

const inlineHour = () => gameMinutes / 60;

const economy = createEconomySystem({
  getHour: inlineHour,
  getCash,
  addCash,
  notify: announce,
  addHeat,
  onBuy: onMarketBuy,
  startingCash: 0,
});

const safehouse = createSafehouseSystem({
  getStars: getHeatLevel,
  setStars(n) {
    wanted.heat = clamp(n * 20, 0, 100);
    wanted.level = clamp(n, 0, 5);
  },
  getCash,
  addCash,
  notify: announce,
  getPosition: playerPos,
  isChased() { return (police.cars && police.cars.length > 0) || combat.aliveCount > 0; },
  onHeatChange(heat, stars) {
    wanted.heat = clamp(heat, 0, 100);
    wanted.level = stars;
  },
});

const streetrace = createStreetRaceSystem({
  playerName: 'Ria',
  getPosition: playerPos,
  getCash,
  addCash,
  notify: announce,
  getSpeed() { return driving.inCar ? Math.abs(driving.speed || 0) : 0; },
  getHour: inlineHour,
  getDay() { return Math.floor(gameMinutes / 1440) + 1; },
  rng: rngFn,
});

// Shared time readers for every factory built from here on.
function hourFloat() { return gameMinutes / 60; }
function dayCount() { return Math.floor(gameMinutes / 1440) + 1; }

// One fresh context per factory. The common fields are the same live
// closures every time; the extras differ by what each system actually needs.
function baseCtx() {
  return {
    rng: rngFn,
    getDay: dayCount,
    getHour: hourFloat,
    getCash,
    addCash,
    addHeat,
    log: announce,
    getPlayerPos: playerPos,
    getWeather: () => (wxSummary ? wxSummary.condition : 'clear'),
  };
}

// ---------------------------------------------------------------------------
// Attempt 6 group — eleven systems
// ---------------------------------------------------------------------------

const fishing = createFishingSystem({
  ...baseCtx(),
  onBite() { if (typeof audio.blip === 'function') audio.blip(); },
  onCatch(fish) { announce('Caught a ' + (fish && fish.name ? fish.name : 'fish') + '.'); },
});
const casino = createCasinoSystem(baseCtx());
const businesses = createBusinessSystem({
  ...baseCtx(),
  reduceHeat(n) {
    wanted.heat = Math.max(0, wanted.heat - n);
    wanted.level = heatToStars(wanted.heat);
  },
});
const delivery = createDeliverySystem(baseCtx());
const stunt = createStuntSystem({
  ...baseCtx(),
  onCrash() {
    if (driving.car) driving.car.health = Math.max(10, (driving.car.health ?? 100) - 15);
  },
  isAirborne() { return !!(driving.inCar && driving.car && driving.car.airborne); },
});
const radio = createRadioSystem({
  rng: rngFn,
  log: announce,
  onStationChange(st) { announce('Radio: ' + (st && st.name ? st.name : '')); },
  onTrackChange() {},
  now() { return Date.now(); },
  getWanted: getWantedLevel,
  getHour: hourFloat,
});
const photo = createPhotoSystem({
  ...baseCtx(),
  isAirborne() { return !!(driving.inCar && driving.car && driving.car.airborne); },
  captureFrame() {
    try { return renderer.domElement.toDataURL('image/jpeg', 0.6); }
    catch (e) { return null; }
  },
});
const smuggling = createSmugglingSystem({
  ...baseCtx(),
  getDeliveryRep() {
    if (delivery && typeof delivery.stats === 'function') {
      const s = delivery.stats();
      return (s && s.rep) || 0;
    }
    return 0;
  },
  hasBusiness(id) {
    return typeof businesses.hasBusiness === 'function' ? businesses.hasBusiness(id) : false;
  },
});
const gym = createGymSystem(baseCtx());
const chopshop = createChopShopSystem(baseCtx());
const taxi = createTaxiSystem({
  rng: rngFn,
  log: announce,
  addCash,
  getPlayerPos: playerPos,
  getSpeed() { return driving.inCar ? Math.abs(driving.speed || 0) : 0; },
  getDay: dayCount,
  onPickup() { if (typeof audio.blip === 'function') audio.blip(); },
  onFareComplete(fare) { announce('Fare done.' + (fare ? ' +$' + (fare.total || fare.fare || 0) : '')); },
});

// ---------------------------------------------------------------------------
// Attempt 7 group — three systems
// ---------------------------------------------------------------------------

const arcade = createArcadeSystem(baseCtx());
const bank = createBankSystem(baseCtx());
const tuning = createTuningSystem(baseCtx());

// ---------------------------------------------------------------------------
// Attempt 8 group — five systems
// ---------------------------------------------------------------------------

const nightclub = createNightclubSystem({
  rng: rngFn,
  getCash,
  addCash,
  addHeat,
  log: announce,
  getHour: hourFloat,
});
const bounty = createBountySystem(baseCtx());
const carmeet = createCarMeetSystem(baseCtx());
const realestate = createRealEstateSystem(baseCtx());
const fightclub = createFightClubSystem({
  rng: rngFn,
  getCash,
  addCash,
  addHeat,
  log: announce,
});

// ---------------------------------------------------------------------------
// Attempt 9 group — six systems
// ---------------------------------------------------------------------------

const graffiti = createGraffitiSystem(baseCtx());
const nightmarket = createNightMarketSystem(baseCtx());
const studio = createStudioSystem(baseCtx());
const detective = createDetectiveSystem(baseCtx());
const lawyer = createLawyerSystem(baseCtx());
const film = createFilmSystem(baseCtx());

// ---------------------------------------------------------------------------
// Round 7 group — ten systems
// ---------------------------------------------------------------------------

const subway = createSubwaySystem(baseCtx());
const firefighter = createFirefighterSystem(baseCtx());
const barber = createBarberSystem(baseCtx());
const pet = createPetSystem(baseCtx());
const busdriver = createBusDriverSystem(baseCtx());
const foodtruck = createFoodTruckSystem(baseCtx());
const bowling = createBowlingSystem(baseCtx());
const yacht = createYachtSystem(baseCtx());
const skatepark = createSkateparkSystem(baseCtx());
const karaoke = createKaraokeSystem(baseCtx());

// ---------------------------------------------------------------------------
// Round 7b group — eighteen systems. The first nine report a summary
// instead of stats, so each gets a stats alias right after it is built.
// ---------------------------------------------------------------------------

const casinoroyale = createCasinoRoyaleSystem(baseCtx());
casinoroyale.stats = () => casinoroyale.summary();
const angling = createAnglingSystem(baseCtx());
angling.stats = () => angling.summary();
const courier = createCourierSystem(baseCtx());
courier.stats = () => courier.summary();
const ghosthunting = createGhostHuntingSystem(baseCtx());
ghosthunting.stats = () => ghosthunting.summary();
const golf = createGolfSystem(baseCtx());
golf.stats = () => golf.summary();
const helitours = createHeliTourSystem(baseCtx());
helitours.stats = () => helitours.summary();
const prisonbreak = createPrisonBreakSystem(baseCtx());
prisonbreak.stats = () => prisonbreak.summary();
const surfing = createSurfingSystem(baseCtx());
surfing.stats = () => surfing.summary();
const treasurehunting = createTreasureHuntingSystem(baseCtx());
treasurehunting.stats = () => treasurehunting.summary();

const recycling = createRecyclingSystem(baseCtx());
const droneRacing = createDroneRacingSystem(baseCtx());
const tennis = createTennisSystem(baseCtx());
const hospital = createHospitalSystem(baseCtx());
const restaurant = createRestaurantSystem(baseCtx());
const pawnshop = createPawnshopSystem(baseCtx());
const bodyguard = createBodyguardSystem(baseCtx());
const jetski = createJetskiSystem(baseCtx());
const farming = createFarmingSystem(baseCtx());

// ---------------------------------------------------------------------------
// Round 7c group — thirty-two systems
// ---------------------------------------------------------------------------

const hunting = createHuntingSystem(baseCtx());
const mining = createMiningSystem(baseCtx());
const logging = createLoggingSystem(baseCtx());
const apiary = createApiarySystem(baseCtx());
const paleontology = createPaleontologySystem(baseCtx());
const parkRanger = createParkRangerSystem(baseCtx());
const stormChasing = createStormChasingSystem(baseCtx());
const horseRanch = createHorseRanchSystem(baseCtx());
const scubaDiving = createScubaDivingSystem(baseCtx());
const skydiving = createSkydivingSystem(baseCtx());
const hotAirBalloon = createHotAirBalloonSystem(baseCtx());
const ferry = createFerrySystem(baseCtx());
const kayaking = createKayakingSystem(baseCtx());
const windsurfing = createWindsurfingSystem(baseCtx());
const lifeguard = createLifeguardSystem(baseCtx());
const coastGuard = createCoastGuardSystem(baseCtx());
const brewery = createBrewerySystem(baseCtx());
const bakery = createBakerySystem(baseCtx());
const sushiBar = createSushiBarSystem(baseCtx());
const coffeeShop = createCoffeeShopSystem(baseCtx());
const butcher = createButcherSystem(baseCtx());
const fishMarket = createFishMarketSystem(baseCtx());
const donutShop = createDonutShopSystem(baseCtx());
const vineyard = createVineyardSystem(baseCtx());
const museum = createMuseumSystem(baseCtx());
const esportsArena = createEsportsArenaSystem(baseCtx());
const comedyClub = createComedyClubSystem(baseCtx());
const streaming = createStreamingSystem(baseCtx());
const hotel = createHotelSystem(baseCtx());
const carWash = createCarWashSystem(baseCtx());
const stockTrading = createStockTradingSystem(baseCtx());
const politics = createPoliticsSystem(baseCtx());

// ---------------------------------------------------------------------------
// The registry: 85 factory systems, in build order.
// ---------------------------------------------------------------------------

const NEW_SYSTEMS = {
  fishing, casino, businesses, delivery, stunt, radio, photo, smuggling, gym, chopshop, taxi,
  arcade, bank, tuning,
  nightclub, bounty, carmeet, realestate, fightclub,
  graffiti, nightmarket, studio, detective, lawyer, film,
  subway, firefighter, barber, pet, busdriver, foodtruck, bowling, yacht, skatepark, karaoke,
  casinoroyale, angling, courier, ghosthunting, golf, helitours, prisonbreak, surfing, treasurehunting,
  recycling, droneRacing, tennis, hospital, restaurant, pawnshop, bodyguard, jetski, farming,
  hunting, mining, logging, apiary, paleontology, parkRanger, stormChasing, horseRanch, scubaDiving,
  skydiving, hotAirBalloon, ferry, kayaking, windsurfing, lifeguard, coastGuard, brewery, bakery,
  sushiBar, coffeeShop, butcher, fishMarket, donutShop, vineyard, museum, esportsArena, comedyClub,
  streaming, hotel, carWash, stockTrading, politics,
};

// Slices used by the frame and day loops, in registry order.
const frameTickSystems = Object.values(NEW_SYSTEMS).slice(-60);
const dayTickSystems = Object.values(NEW_SYSTEMS).slice(-50);
const round7Systems = [subway, firefighter, barber, pet, busdriver, foodtruck, bowling, yacht, skatepark, karaoke];

// ---------------------------------------------------------------------------
// Rain timers, weather summary, tutorial and game state, money, stats
// ---------------------------------------------------------------------------

let rainTimer = 120;
let rainDuration = 0;
let rainTarget = 0;
let rainFactor = 0;
let effRain = 0;

// Declared after every factory is built. Nothing reads it during
// construction; the getWeather closures only touch it while ticking.
let wxSummary = null;
function refreshWeather() {
  if (weather && typeof weather.summary === 'function') wxSummary = weather.summary();
}
refreshWeather();

let state = 'title';
let money = 0;
let rep = 0;
let stats = emptyStats();
let tutorialSeen = false;
let tutorialStep = 0;
let tutorialMoved = false;
let missionIndex = 0;
let missionPhase = 'go';
let nextMissionTimer = 0;
let failTimer = 0;
let shotFired = false;
let lastShot = '';
let lastShotPoint = null;
let lastDamage = 0;
let shotSeq = 0;
let driftBanked = 0;
let sneakHeld = false;
let photoMode = false;
let stuntJump = null;
let playerStartX = startPlace.x || 0;
let playerStartZ = startPlace.z || 0;

// ---------------------------------------------------------------------------
// Save / load
// ---------------------------------------------------------------------------

function saveNewSystems() {
  const out = {};
  for (const [name, sys] of Object.entries(NEW_SYSTEMS)) {
    if (sys && typeof sys.serialize === 'function') out[name] = sys.serialize();
  }
  return out;
}

function restoreNewSystems(data) {
  if (!data) return;
  for (const [name, saved] of Object.entries(data)) {
    const sys = NEW_SYSTEMS[name];
    if (sys && typeof sys.deserialize === 'function' && saved) sys.deserialize(saved);
  }
}

function applySave(saved) {
  money = typeof saved.money === 'number' ? saved.money : 0;
  stats = { ...emptyStats(), ...(saved.stats || {}) };
  tutorialSeen = !!saved.tutorialSeen;
  rep = typeof saved.rep === 'number' ? saved.rep : (stats.rep || 0);
  if (saved.market && typeof market.restore === 'function') market.restore(saved.market);
  if (saved.nightops && typeof nightops.restore === 'function') nightops.restore(saved.nightops);
  if (saved.weather && typeof weather.restore === 'function') weather.restore(saved.weather);
  if (saved.economy && typeof economy.deserialize === 'function') economy.deserialize(saved.economy);
  if (saved.safehouse && typeof safehouse.deserialize === 'function') safehouse.deserialize(saved.safehouse);
  if (saved.streetrace && typeof streetrace.deserialize === 'function') streetrace.deserialize(saved.streetrace);
  restoreNewSystems(saved.newSystems);
  missionIndex = clamp(saved.missionIndex || 0, 0, MISSIONS.length - 1);
  tutorialStep = tutorialSeen ? 3 : 0;
}

function resetProgress() {
  money = 0;
  rep = 0;
  stats = emptyStats();
  tutorialSeen = false;
  tutorialStep = 0;
  tutorialMoved = false;
  missionIndex = 0;
  missionPhase = 'go';
  nextMissionTimer = 0;
  failTimer = 0;
  storyDone = false;
  combat.clearEnemies();
  if (driving.inCar && typeof driving.exitCar === 'function') driving.exitCar();
  player.health = 100;
  wanted.heat = 0;
  wanted.level = 0;
  player.x = playerStartX;
  player.z = playerStartZ;
}

// ---------------------------------------------------------------------------
// Menus
// ---------------------------------------------------------------------------

function hideAllMenus() {
  for (const el of [menuTitleEl, menuPauseEl, menuOverEl, menuCompleteEl]) {
    if (el) el.style.display = 'none';
  }
  if (howtoEl) howtoEl.style.display = 'none';
}

function showMenu(el) {
  hideAllMenus();
  if (el) el.style.display = '';
}

function refreshContinueButton() {
  if (!btnContinue) return;
  let has = false;
  try { has = !!loadGame(); } catch (e) { has = false; }
  btnContinue.style.display = has ? '' : 'none';
}

function pauseGame() {
  if (state !== 'playing') return;
  state = 'paused';
  showMenu(menuPauseEl);
}

function resumeGame() {
  if (state !== 'paused') return;
  state = 'playing';
  hideAllMenus();
}

function gameOver(kind) {
  state = 'over';
  money = Math.floor(money * 0.9);
  if (overTitleEl) overTitleEl.textContent = kind === 'busted' ? 'BUSTED' : 'WASTED';
  if (overTextEl) {
    overTextEl.textContent = kind === 'busted'
      ? 'The Solara PD finally caught up with Ria.'
      : 'Ria went down in the streets of Solara.';
  }
  showMenu(menuOverEl);
}

function quitToTitle() {
  saveGame({ missionIndex, money, stats });
  state = 'title';
  refreshContinueButton();
  showMenu(menuTitleEl);
}

// ---------------------------------------------------------------------------
// Missions
// ---------------------------------------------------------------------------

function startMission(i) {
  if (i >= MISSIONS.length) {
    state = 'complete';
    showMenu(menuCompleteEl);
    return;
  }
  missionIndex = i;
  lastPaidMission = null;
  sideJobs.cancel();
  const m = MISSIONS[i];
  missionPhase = m.id === 'hotwheels' ? 'steal' : m.id === 'payback' ? 'clear' : 'go';
  missions.start(i);
  if (m.id === 'thedrop') addHeat(55);
  if (m.id === 'payback') {
    const spots = [];
    for (let k = 0; k < 6; k++) {
      const ang = (k / 6) * Math.PI * 2;
      spots.push([docksPlace.x + Math.cos(ang) * 10, docksPlace.z + Math.sin(ang) * 10]);
    }
    combat.spawnEnemies(spots);
  }
  missions.begin();
  hud.showBanner((i + 1) + ' — ' + m.title, m.briefing || '');
  announce(m.objective || '');
}

function completeMission() {
  const m = missions.current;
  if (!m) return;
  const finished = missions.complete();
  missionIndex = typeof missions.index === 'number' ? missions.index : missionIndex + 1;
  stats.missions++;
  if (finished || storyDone) {
    state = 'complete';
    showMenu(menuCompleteEl);
    saveGame({
      missionIndex, money, rep, stats,
      market: typeof market.serialize === 'function' ? market.serialize() : undefined,
      nightops: typeof nightops.serialize === 'function' ? nightops.serialize() : undefined,
      weather: typeof weather.serialize === 'function' ? weather.serialize() : undefined,
      economy: typeof economy.serialize === 'function' ? economy.serialize() : undefined,
      safehouse: typeof safehouse.serialize === 'function' ? safehouse.serialize() : undefined,
      streetrace: typeof streetrace.serialize === 'function' ? streetrace.serialize() : undefined,
      newSystems: saveNewSystems(),
    });
    return;
  }
  saveGame({ missionIndex, money, stats, newSystems: saveNewSystems() });
  nextMissionTimer = 2.5;
}

function failMission(reason) {
  hud.showBanner('Mission failed', reason || 'Try again, Ria.');
  failTimer = 2.5;
}

function resetMissionWorld() {
  combat.clearEnemies();
  if (driving.inCar && typeof driving.exitCar === 'function') driving.exitCar();
  player.x = playerStartX;
  player.z = playerStartZ;
  player.health = 100;
  wanted.heat = 0;
  wanted.level = 0;
}

function startGame(useSave) {
  const saved = useSave ? loadGame() : null;
  if (saved) applySave(saved);
  else resetProgress();
  hideAllMenus();
  state = 'playing';
  startMission(missionIndex);
}

function checkMissionProgress() {
  const m = missions.current;
  if (!m) return;
  const p = playerPos();
  if (m.id === 'homecoming' && missionPhase === 'go') {
    if (missions.atWaypoint(p.x, p.z, 10)) completeMission();
    return;
  }
  if (m.id === 'hotwheels') {
    if (missionPhase === 'escape' && wanted.level === 0 && missions.atWaypoint(p.x, p.z, 10)) completeMission();
    return;
  }
  if (m.id === 'thedrop') {
    if (missions.atWaypoint(p.x, p.z, 9)) completeMission();
    return;
  }
  if (m.id === 'payback') {
    if (missionPhase === 'clear' && combat.aliveCount === 0) {
      missionPhase = 'escape';
      addHeat(80);
      missions.setWaypoint(garagePlace.x, garagePlace.z);
      announce('Docks clear. Get back to the garage.');
      hud.showBanner('Payback', 'All guards down — lose the heat and get home.');
    } else if (missionPhase === 'escape' && missions.atWaypoint(p.x, p.z, 10)) {
      completeMission();
    }
  }
}

// ---------------------------------------------------------------------------
// Interaction: fishing first, then registry systems, then the nearest car
// ---------------------------------------------------------------------------

function nearestParkedCar(maxDist) {
  const p = playerPos();
  let best = null;
  let bestD = maxDist;
  for (const car of parkedCars) {
    const cx = car.x ?? car.pos?.x ?? 0;
    const cz = car.z ?? car.pos?.z ?? 0;
    const d = dist2d(p.x, p.z, cx, cz);
    if (d < bestD) { bestD = d; best = car; }
  }
  return best;
}

function fishingAction() {
  const phase = fishing.state ? fishing.state.phase : null;
  if (phase === 'bite') {
    fishing.strike();
    return true;
  }
  const p = playerPos();
  let spot = null;
  let bestD = 14;
  for (const s of FISHING_SPOTS) {
    const d = dist2d(p.x, p.z, s.x, s.z);
    if (d < bestD) { bestD = d; spot = s; }
  }
  if (spot) {
    const res = fishing.startFishing(spot);
    return !!(res && res.ok);
  }
  return false;
}

function handleInteract() {
  if (fishingAction()) return;
  for (const sys of Object.values(NEW_SYSTEMS)) {
    if (sys && typeof sys.interact === 'function') {
      let res = null;
      try { res = sys.interact(); } catch (e) { res = null; }
      if (res && res.ok) return;
    }
  }
  const car = nearestParkedCar(4.5);
  if (!car) return;
  const m = missions.current;
  const model = car.model || car.name || '';
  if (m && m.id === 'hotwheels' && missionPhase === 'steal' && model === 'Comet GT') {
    if (typeof driving.enterCar === 'function') driving.enterCar(car);
    addHeat(45);
    missionPhase = 'escape';
    announce('Comet GT stolen. Lose the heat, then get to the garage.');
    hud.showBanner('Hotwheels', 'Stolen. Now disappear.');
    return;
  }
  if (typeof driving.enterCar === 'function') driving.enterCar(car);
  if (model !== 'Voss Sedan') addHeat(25);
}

function handleSafehouseToggle() {
  const inside = typeof safehouse.inside === 'function' ? safehouse.inside() : null;
  if (inside) {
    safehouse.exitSafehouse();
    return;
  }
  const p = playerPos();
  const found = nearSafehouse(p.x, p.z, 48);
  if (found && found.house) safehouse.enterSafehouse(found.house);
  else if (found) safehouse.enterSafehouse(found);
}

function handleMarketDigit(digit) {
  const item = MARKET_ITEMS.find((it) => String(it.key) === String(digit));
  if (!item) return;
  const res = market.buy(item.id, money, rep);
  if (res && res.ok) {
    money -= res.price || 0;
    if (typeof item.rep === 'number') rep -= item.rep;
    saveGame({ missionIndex, money, rep, stats, tutorialSeen });
  } else if (res && res.reason) {
    announce(res.reason);
  }
}

// The systems HUD line: at most two registry lines ever reach the screen.
function systemsHudLine() {
  const lines = [];
  for (const sys of Object.values(NEW_SYSTEMS)) {
    if (sys && typeof sys.hudLine === 'function') {
      let line = '';
      try { line = sys.hudLine(); } catch (e) { line = ''; }
      if (line) lines.push(line);
    }
    if (lines.length >= 2) break;
  }
  return lines.join('  ');
}

function refreshClockAndSky() {
  const hour = hourFloat();
  nightF = nightFactorFor(hour);
  const sunI = lerp(1.25, 0.12, nightF);
  const hemiI = lerp(1.0, 0.25, nightF);
  sun.intensity = sunI;
  hemi.intensity = hemiI;
  skyWork.copy(skyDay).lerp(skyNight, nightF);
  fogWork.copy(fogDay).lerp(fogNight, nightF);
  scene.background = skyWork;
  if (scene.fog) scene.fog.color.copy(fogWork);
  if (Math.abs(nightF - lastNightF) > 0.02) {
    if (city && typeof city.setNightFactor === 'function') city.setNightFactor(nightF);
    lastNightF = nightF;
  }
}

// ---------------------------------------------------------------------------
// One-shot input actions, in the order the frame consumes them
// ---------------------------------------------------------------------------

function handleFrameActions(actions) {
  if (!actions) return;
  if (actions.pause) {
    if (state === 'playing') pauseGame();
    else if (state === 'paused') resumeGame();
  }
  if (actions.interact) handleInteract();
  if (actions.reload && typeof combat.reload === 'function') combat.reload();
  if (actions.acceptJob && sideJobs.offered) sideJobs.accept();
  if (actions.skipTutorial) {
    tutorialSeen = true;
    tutorialStep = 3;
    hud.setTutorial('');
    saveGame({ missionIndex, money, stats, tutorialSeen });
  }
  if (actions.toggleMarket && typeof market.toggleShop === 'function') market.toggleShop();
  if (actions.acceptNightOps && nightops.hasOffer) nightops.acceptOffer();
  if (actions.fish) fishingAction();
  if (actions.togglePhoto) photoMode = !photoMode;
  if (actions.startRace) {
    if (typeof streetrace.startRace === 'function') streetrace.startRace();
    else if (typeof streetrace.start === 'function') streetrace.start();
  }
  if (actions.safehouse) handleSafehouseToggle();
  if (actions.digit >= 1 && actions.digit <= 9) handleMarketDigit(actions.digit);
  sneakHeld = !!actions.sneak;
  if (player) player.sneaking = sneakHeld;
  if (actions.horn && typeof driving.horn === 'function') driving.horn();
  if (actions.mute) {
    if (typeof audio.toggleMute === 'function') audio.toggleMute();
    else audio.muted = !audio.muted;
  }
}

function runDay(sys, method, d) {
  if (sys && typeof sys[method] === 'function') sys[method](d);
}

function tickIf(sys, dt) {
  if (sys && typeof sys.tick === 'function') sys.tick(dt);
}

// ---------------------------------------------------------------------------
// The world step — eighteen stages, in order, once per frame while playing
// ---------------------------------------------------------------------------

function stepWorld(dt, actions) {
  const p = playerPos();
  const hour = hourFloat();

  // 1. Clock and day-night cycle.
  gameMinutes += dt * 0.5;
  refreshClockAndSky();

  // 2. Rain timer: start a shower when the timer lapses, end it when its
  //    duration runs out, and ease the rain factor toward its target.
  rainTimer -= dt;
  if (rainTarget === 0 && rainTimer <= 0) {
    rainTarget = 1;
    rainDuration = 20 + rngFn() * 40;
    rainTimer = rainDuration;
  } else if (rainTarget === 1 && rainTimer <= 0) {
    rainTarget = 0;
    rainTimer = 90 + rngFn() * 150;
  }
  rainFactor += clamp(rainTarget - rainFactor, -dt * 0.2, dt * 0.2);

  // 3. Dynamic weather, then fan the effective rain out to every system
  //    that cares: city storm and wetness, rain effects, grip, traffic,
  //    parked-car glow and the rain audio bed.
  if (typeof weather.update === 'function') weather.update(dt, p);
  refreshWeather();
  effRain = Math.max(rainFactor, (weather.rain || 0));
  if (city && typeof city.setStorm === 'function') city.setStorm(effRain);
  if (city && typeof city.setWetness === 'function') city.setWetness(effRain);
  if (typeof effects.setRain === 'function') effects.setRain(effRain);
  if (typeof driving.setGrip === 'function') driving.setGrip(1 - effRain * 0.35);
  if (traffic) {
    traffic.rainFactor = effRain;
    traffic.nightFactor = nightF;
  }
  if (typeof audio.setRainLevel === 'function') audio.setRainLevel(effRain);
  for (const car of parkedCars) {
    if (typeof setCarGlow === 'function') setCarGlow(car, nightF > 0.4);
  }

  // 4. Beacons, the market stall, and night work.
  if (beacons && typeof beacons.update === 'function') beacons.update(dt, nightF);
  if (market && typeof market.update === 'function') market.update(dt, p.x, p.z, nightF);
  if (nightops && typeof nightops.update === 'function') {
    const visibility = Math.max(20, 100 - effRain * 50 - nightF * 15);
    nightops.update(dt, {
      playerX: p.x,
      playerZ: p.z,
      nightF,
      visibility,
      speed: Math.abs(driving.speed || 0),
      sneaking: sneakHeld,
      shotFired,
      inCar: !!driving.inCar,
    });
  }
  shotFired = false;

  // 5. Shop economy, safehouse cooling, street racing.
  if (typeof economy.update === 'function') economy.update(dt / 120);
  if (typeof safehouse.syncHeat === 'function') safehouse.syncHeat(wanted.heat);
  if (typeof safehouse.inside === 'function' && safehouse.inside()) {
    if (typeof safehouse.update === 'function') safehouse.update(dt);
    const st = safehouse.status();
    wanted.heat = st.heat;
    wanted.level = st.stars;
  }
  if (typeof streetrace.update === 'function') streetrace.update(dt);

  // 6. Per-frame system ticks, then stunt jumps.
  if (typeof fishing.tick === 'function') fishing.tick(dt, { reel: !!(actions && actions.space) });
  tickIf(delivery, dt);
  tickIf(smuggling, dt);
  tickIf(taxi, dt);
  if (typeof radio.tick === 'function') radio.tick(dt, { wanted: wanted.level, hour: hourFloat() });
  tickIf(gym, dt);
  for (const sys of frameTickSystems) tickIf(sys, dt);
  if (driving.inCar && driving.car && driving.car.airborne) {
    if (!stuntJump) {
      let ramp = null;
      let bestD = 14;
      const cp = playerPos();
      for (const r of STUNT_RAMPS) {
        const d = dist2d(cp.x, cp.z, r.x, r.z);
        if (d < bestD) { bestD = d; ramp = r; }
      }
      if (ramp) stuntJump = { ramp, air: 0 };
    } else {
      stuntJump.air += dt;
    }
  } else if (stuntJump) {
    const done = stuntJump;
    stuntJump = null;
    if (typeof stunt.scoreJump === 'function') stunt.scoreJump(done.ramp, done.air);
    else if (typeof stunt.landJump === 'function') stunt.landJump(done.ramp, done.air);
  }

  // 7. Hour change, then — nested inside it — the day change.
  const wholeHour = Math.floor(gameMinutes / 60);
  if (wholeHour !== lastGameHour) {
    lastGameHour = wholeHour;
    if (typeof businesses.settleHour === 'function') businesses.settleHour(wholeHour);
    if (typeof chopshop.settleHour === 'function') chopshop.settleHour(wholeHour);
    const d = dayCount();
    if (d !== lastDay) {
      lastDay = d;
      runDay(nightclub, 'settleDay', d);
      runDay(realestate, 'tickDay', d);
      runDay(bounty, 'tickDay', d);
      runDay(graffiti, 'settleDay', d);
      runDay(nightmarket, 'tickDay', d);
      runDay(studio, 'tickDay', d);
      runDay(detective, 'tickDay', d);
      runDay(lawyer, 'tickDay', d);
      runDay(film, 'tickDay', d);
      for (const sys of round7Systems) runDay(sys, 'tickDay', d);
      for (const sys of dayTickSystems) runDay(sys, 'tickDay', d);
    }
  }

  // 8. Story mission timer and waypoint checks.
  if (missions.current) {
    const timedOut = missions.update(dt);
    if (timedOut === 'timeout') failMission('Out of time.');
    else checkMissionProgress();
  }

  // 9. Move the player or the car, bank finished drift, heal slowly,
  //    and fire the pistol while the mouse is held on foot.
  if (driving.inCar) {
    if (typeof driving.update === 'function') driving.update(dt, input);
  } else if (typeof player.update === 'function') {
    player.update(dt, input);
  }
  const driftPts = driving.driftPoints || 0;
  if (!driving.drifting && driftPts > 0) {
    const payout = Math.floor(driftPts / 2);
    addCash(payout);
    driftBanked = payout;
    if (typeof driving.clearDrift === 'function') driving.clearDrift();
    else driving.driftPoints = 0;
  }
  if (player.health < 100) player.health = Math.min(100, player.health + dt * 1.5);
  const here = playerPos();
  if (dist2d(here.x, here.z, playerStartX, playerStartZ) > 2) tutorialMoved = true;
  if (typeof combat.update === 'function') combat.update(dt);
  if (actions && actions.mouse && !driving.inCar) {
    const hittables = [];
    for (const c of parkedCars) if (c.mesh) hittables.push(c.mesh);
    if (traffic.cars) for (const c of traffic.cars) if (c.mesh) hittables.push(c.mesh);
    const res = combat.shoot(camera, hittables);
    if (res) {
      shotSeq++;
      shotFired = true;
      lastShot = res;
      lastShotPoint = combat.lastHitPoint || null;
      lastDamage = combat.lastDamage || 0;
      addHeat(1);
      if (res === 'car' || res === 'pedestrian') addHeat(3);
    }
  }

  // 10. Traffic, pedestrians and effects.
  if (typeof traffic.update === 'function') traffic.update(dt);
  if (typeof peds.update === 'function') {
    peds.update(dt, {
      car: driving.car || null,
      traffic: traffic.cars || [],
      police: police.cars || [],
    }, effRain);
  }
  if (typeof effects.update === 'function') effects.update(dt);

  // 11. Guards relay alerts, then each living guard takes its turn.
  if (typeof combat.relayAlerts === 'function') combat.relayAlerts();
  for (const enemy of combat.enemies) {
    const shot = enemy.update(dt, player, audio, effects);
    if (!shot) continue;
    if (typeof audio.enemyShot === 'function') audio.enemyShot();
    const d = shot.distance ?? 20;
    const chance = d < 18 ? 0.55 : d < 32 ? 0.32 : 0.14;
    if (rngFn() < chance) {
      player.health -= shot.damage;
      lastDamage = shot.damage;
    }
  }

  // 12. Police and wanted, then the two game-over checks.
  if (typeof police.update === 'function') police.update(dt, playerPos(), wanted.level);
  if (typeof wanted.update === 'function') wanted.update(dt, playerPos());
  if (wanted.bustTimer > 1.5) { gameOver('busted'); return; }
  if (player.health <= 0) { gameOver('wasted'); return; }

  // 13. Camera follows the car or the player on foot.
  if (driving.inCar) {
    if (typeof driving.updateCamera === 'function') driving.updateCamera(camera);
    else {
      const cp = playerPos();
      const heading = player.heading || 0;
      camera.position.set(cp.x - Math.sin(heading) * 11, 6, cp.z - Math.cos(heading) * 11);
      camera.lookAt(cp.x, 1.6, cp.z);
    }
  } else {
    const pp = playerPos();
    const heading = player.heading || 0;
    camera.position.set(pp.x - Math.sin(heading) * 9, 5.5, pp.z - Math.cos(heading) * 9);
    camera.lookAt(pp.x, 1.6, pp.z);
  }

  // 14. Interaction prompt. A side-job offer wins over everything else.
  if (sideJobs.offered) {
    hud.setPrompt('Side job: ' + (sideJobs.offered.title || 'work') + ' — take it?');
  } else if (driving.inCar && Math.abs(driving.speed || 0) < 2) {
    hud.setPrompt('Exit car');
  } else if (nearestParkedCar(4.5)) {
    hud.setPrompt('Enter car');
  } else {
    hud.setPrompt('');
  }
  hud.setCrosshair(!driving.inCar);

  // 15. Delayed timers: next mission, and the fail-and-retry timer.
  if (nextMissionTimer > 0) {
    nextMissionTimer -= dt;
    if (nextMissionTimer <= 0) startMission(missionIndex);
  }
  if (failTimer > 0) {
    failTimer -= dt;
    if (failTimer <= 0) {
      resetMissionWorld();
      startMission(missionIndex);
    }
  }

  // 16. Side jobs: offer while free, pay out on arrival.
  const free = !missions.current;
  if (typeof sideJobs.update === 'function') sideJobs.update(dt, free);
  if (sideJobs.active && typeof sideJobs.checkArrival === 'function') {
    const done = sideJobs.checkArrival(playerPos(), Math.abs(driving.speed || 0));
    if (done && done !== 'picked') {
      const streakBonus = 25 * Math.max(0, (sideJobs.streak || 1) - 1);
      const chainBonus = sideJobs.lastChainBonus || 0;
      const pay = (done.reward || 0) + streakBonus + chainBonus;
      addCash(pay);
      stats.sideJobs++;
      stats.sideEarned += pay;
      hud.showBanner('Side job done', (done.title || 'Job') + '  +$' + pay);
      saveGame({ missionIndex, money, stats });
    }
  }

  // 17. Tutorial, one real action at a time.
  if (!tutorialSeen) {
    if (tutorialStep === 0) {
      hud.setTutorial('Move with WASD');
      if (tutorialMoved) tutorialStep = 1;
    } else if (tutorialStep === 1) {
      hud.setTutorial('Get in a car');
      if (driving.inCar) tutorialStep = 2;
    } else if (tutorialStep === 2) {
      hud.setTutorial('Reach the waypoint');
      const wd = typeof missions.waypointDistance === 'function' ? missions.waypointDistance(playerPos().x, playerPos().z) : null;
      if (wd !== null && wd !== undefined && wd < 12) {
        tutorialSeen = true;
        tutorialStep = 3;
        hud.setTutorial('');
        saveGame({ missionIndex, money, stats, tutorialSeen });
      }
    }
  }

  // 18. The HUD gets the whole picture at once.
  const cur = missions.current;
  const pp = playerPos();
  hud.update(dt, {
    money,
    health: player.health,
    wanted: wanted.level,
    speed: Math.abs(driving.speed || 0),
    inCar: !!driving.inCar,
    ammo: combat.ammo,
    reloading: combat.reloading || false,
    carHealth: driving.car ? (driving.car.health ?? 100) : 0,
    damageZones: driving.damageZones || {},
    missionTitle: cur ? cur.title : 'Free roam',
    objective: cur ? (cur.objective || '') : (sideJobs.objective || ''),
    waypointDist: typeof missions.waypointDistance === 'function' ? missions.waypointDistance(pp.x, pp.z) : null,
    timeLeft: missions.timeLeft,
    dayPhase: phaseNameFor(hourFloat()),
    clock: fmtClock(gameMinutes),
    raining: effRain > 0.05,
    heli: !!police.heli,
    outlook: wxSummary ? (wxSummary.outlook || '') : '',
    nightops: typeof nightops.statusLine === 'function' ? nightops.statusLine() : '',
    market: typeof market.statusLine === 'function' ? market.statusLine() : '',
    drift: driving.driftPoints || 0,
    driftBanked,
    drifting: !!driving.drifting,
    chain: typeof sideJobs.chainStatus === 'function' ? sideJobs.chainStatus() : null,
    places: namedPlaces,
    cars: traffic.cars || [],
    parked: parkedCars,
    roadblocks: police.roadblocks || [],
    heliPos: police.heliPos || null,
    playerX: pp.x,
    playerZ: pp.z,
    heading: player.heading || 0,
    hurt: player.health < 30,
    systems: systemsHudLine(),
  });
}

// ---------------------------------------------------------------------------
// The frame loop
// ---------------------------------------------------------------------------

const threeClock = new THREE.Clock();

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(threeClock.getDelta(), 0.05);
  if (state === 'playing') {
    const actions = input.consumeActions();
    handleFrameActions(actions);
    stepWorld(dt, actions);
  } else if (state === 'title') {
    titleOrbit += dt * 0.05;
    camera.position.set(Math.sin(titleOrbit) * 70, 32, Math.cos(titleOrbit) * 70);
    camera.lookAt(0, 0, 0);
    if (typeof traffic.update === 'function') traffic.update(dt);
    if (typeof peds.update === 'function') {
      peds.update(dt, { car: null, traffic: traffic.cars || [], police: police.cars || [] }, 0);
    }
    if (typeof effects.update === 'function') effects.update(dt);
  }
  renderer.render(scene, camera);
}

// ---------------------------------------------------------------------------
// Playtest handle. Read-only getters plus one dispatcher into the registry.
// ---------------------------------------------------------------------------

window.__solara = {
  get state() { return state; },
  get money() { return money; },
  get missionIndex() { return missionIndex; },
  get missionPhase() { return missionPhase; },
  get missionStage() { return missions.stage; },
  get objective() {
    const cur = missions.current;
    if (cur) return cur.objective || '';
    return sideJobs.objective || '';
  },
  get waypoint() { return missions.waypoint || null; },
  get timeLeft() { return missions.timeLeft; },
  get wanted() { return wanted.level; },
  get health() { return player.health; },
  get ammo() { return combat.ammo; },
  get lastShot() { return lastShot; },
  get lastShotPoint() { return lastShotPoint; },
  get lastDamage() { return lastDamage; },
  get shotSeq() { return shotSeq; },
  get alive() { return player.health > 0 && state !== 'over'; },
  get kills() { return combat.kills; },
  get dayPhase() { return phaseNameFor(hourFloat()); },
  get nightF() { return nightF; },
  get clock() { return fmtClock(gameMinutes); },
  get police() { return police.cars ? police.cars.length : 0; },
  get carHealth() { return driving.car ? (driving.car.health ?? 0) : 0; },
  get headlight() { return !!driving.headlight; },
  get stats() { return stats; },
  get parked() { return parkedCars.length; },
  get drift() { return driving.driftPoints || 0; },
  get heli() { return !!police.heli; },
  get heliPos() { return police.heliPos || null; },
  get roadblocks() { return police.roadblocks || []; },
  get damage() { return driving.damageZones || {}; },
  get chain() { return typeof sideJobs.chainStatus === 'function' ? sideJobs.chainStatus() : null; },
  get rain() { return effRain; },
  get raining() { return effRain > 0.05; },
  get sideJob() { return sideJobs.active || null; },
  get sideOffer() { return sideJobs.offered || null; },
  get weather() { return wxSummary ? wxSummary.condition : 'clear'; },
  get nightops() { return typeof nightops.statusLine === 'function' ? nightops.statusLine() : ''; },
  get market() { return typeof market.statusLine === 'function' ? market.statusLine() : ''; },
  get economy() { return typeof economy.summary === 'function' ? economy.summary() : null; },
  get economyShops() { return typeof economy.openShops === 'function' ? economy.openShops() : []; },
  get safehouse() { return typeof safehouse.status === 'function' ? safehouse.status() : null; },
  get safehouses() { return SAFEHOUSES; },
  get streetrace() { return typeof streetrace.status === 'function' ? streetrace.status() : null; },
  get raceBoard() { return streetrace.board || streetrace.leaderboard || []; },
  get systems() { return NEW_SYSTEMS; },
  get systemsOk() {
    const statsOk = Object.values(NEW_SYSTEMS).every((s) => s && typeof s.stats === 'function');
    return statsOk
      // Attempt 6 data
      && FISHING_SPOTS.length === 5 && BUSINESS_TYPES.length === 5 && STUNT_RAMPS.length === 6
      && STATIONS.length === 5 && EXERCISES.length === 6 && CAR_VALUES.length === 10
      // Attempt 7 data
      && ARCADE_CABINETS.length === 4 && HEIST_TARGETS.length === 3 && TUNING_CATEGORIES.length === 5
      // Attempt 8 data
      && NIGHTCLUBS.length === 4 && BOUNTY_TARGETS.length === 6 && CAR_MEETS.length === 4
      && PROPERTIES.length === 6 && FIGHTERS.length === 5
      // Attempt 9 data
      && GRAFFITI_DISTRICTS.length === 8 && SPRAY_BRANDS.length === 4 && RIVAL_CREWS.length === 4
      && MARKET_GOODS.length === 10 && STUDIO_GENRES.length === 5 && STUDIO_FEATURES.length === 6
      && STUDIO_VENUES.length === 4 && EYE_CASES.length === 6 && TAIL_TARGETS.length === 6
      && LAWYERS.length === 3 && CHARGES.length === 6 && FILMS.length === 4
      && STUNT_SCRIPTS.length === 6 && FILM_DRIVERS.length === 4
      // Round 7 data
      && SUBWAY_STATIONS.length === 8 && SUBWAY_LINES.length === 3 && FIRE_TYPES.length === 8
      && FIRE_RANKS.length === 5 && HAIRCUTS.length === 10 && TATTOOS.length === 12
      && PET_BREEDS.length === 6 && PET_TRICKS.length === 10 && BUS_ROUTES.length === 5
      && BUS_MODELS.length === 5 && FOOD_MENU.length === 10 && FOOD_TRUCK_SPOTS.length === 7
      && BOWLING_LANES.length === 6 && BOWLING_OPPONENTS.length === 6 && BOATS.length === 7
      && SEA_ROUTES.length === 8 && SKATE_PARKS.length === 4 && SKATE_TRICKS.length === 20
      && KARAOKE_SONGS.length === 17 && KARAOKE_BATTLERS.length === 5
      // Round 7b data
      && CHIP_PACKS.length === 4 && SLOT_MACHINES.length === 4 && BLACKJACK_TABLES.length === 3
      && VIP_TIERS.length === 5 && CASINO_MISSIONS.length === 10
      && FISH_SPECIES.length === 18 && RODS.length === 5 && BAITS.length === 7
      && ANGLER_RANKS.length === 6 && TOURNAMENTS.length === 3
      && DISTRICTS.length === 12 && PARCEL_TYPES.length === 20 && COURIER_VEHICLES.length === 6
      && COURIER_RANKS.length === 5 && URGENCY.length === 4
      && EVIDENCE_TYPES.length === 8 && GHOST_TYPES.length === 14 && HAUNTED_LOCATIONS.length === 12
      && GHOST_EQUIPMENT.length === 14 && HUNTER_RANKS.length === 5
      && CLUBS.length === 12 && GOLF_BALLS.length === 5 && COURSES.length === 5 && GOLF_OPPONENTS.length === 8
      && HELICOPTERS.length === 6 && TOUR_ROUTES.length === 12 && PHOTO_SPOTS.length === 16
      && PASSENGER_TYPES.length === 8
      && CELL_BLOCKS.length === 8 && ESCAPE_PLANS.length === 10 && CONTRABAND.length === 15
      && CRAFT_RECIPES.length === 8 && GUARDS.length === 8 && ALLIES.length === 8
      && SURF_BEACHES.length === 12 && SURFBOARDS.length === 10 && SURF_TRICKS.length === 20
      && WETSUITS.length === 5 && SURF_COMPS.length === 8
      && DIG_SITES.length === 12 && TREASURE_MAPS.length === 12 && DETECTORS.length === 5
      && SHOVELS.length === 5 && FIND_TABLE.length === 20
      && RECYCLING_MATERIALS.length === 12 && RECYCLING_BINS.length === 9 && RECYCLING_ROUTES.length === 8
      && DRONE_MODELS.length === 8 && DRONE_TRACKS.length === 8 && DRONE_PARTS.length === 10
      && TENNIS_COURTS.length === 8 && TENNIS_RACKETS.length === 8 && TENNIS_SHOES.length === 4
      && HOSPITAL_WARDS.length === 8 && TRIAGE_LEVELS.length === 5 && HOSPITAL_CONDITIONS.length === 16
      && RESTAURANT_DISHES.length === 12 && RESTAURANT_INGREDIENTS.length === 12
      && RESTAURANT_CUSTOMERS.length === 8
      && PAWN_CATEGORIES.length === 16 && PAWN_CUSTOMERS.length === 8 && PAWN_AUCTIONS.length === 6
      && BODYGUARD_CLIENTS.length === 10 && BODYGUARD_ROUTES.length === 8 && BODYGUARD_THREATS.length === 10
      && JETSKI_MODELS.length === 8 && JETSKI_COURSES.length === 8 && JETSKI_TRICKS.length === 10
      && FARM_CROPS.length === 14 && FARM_ANIMALS.length === 8 && FARM_PLOTS.length === 8
      // Round 7c data
      && HUNTING_ANIMALS.length === 12 && MINING_ORES.length === 12 && LOGGING_TREES.length === 10
      && APIARY_HIVES.length === 10 && FOSSIL_SITES.length === 10 && RANGER_PATROLS.length === 10
      && STORM_TYPES.length === 10 && HORSE_BREEDS.length === 12 && DIVE_SITES.length === 10
      && DROP_ZONES.length === 10 && BALLOON_ROUTES.length === 10 && FERRY_ROUTES.length === 12
      && KAYAK_RIVERS.length === 10 && WINDSURF_SPOTS.length === 10 && BEACH_PATROLS.length === 10
      && RESCUE_MISSIONS.length === 10 && BREW_RECIPES.length === 12 && BAKED_GOODS.length === 12
      && SUSHI_MENU.length === 12 && COFFEE_MENU.length === 12 && MEAT_CUTS.length === 10
      && MARKET_CATCH.length === 12 && DONUT_FLAVORS.length === 12 && WINE_VARIETALS.length === 10
      && EXHIBITS.length === 12 && ESPORTS_TOURNAMENTS.length === 10 && COMEDY_ACTS.length === 12
      && STREAM_CATEGORIES.length === 12 && ROOM_TYPES.length === 10 && WASH_PACKAGES.length === 10
      && STOCKS.length === 12 && CAMPAIGN_EVENTS.length === 10;
  },
  get fishingSpots() { return FISHING_SPOTS; },
  get businessTypes() { return BUSINESS_TYPES; },
  get radioStations() { return STATIONS; },
  get rep() { return rep; },
  get sneaking() { return sneakHeld; },
  get tutorial() { return { seen: tutorialSeen, step: tutorialStep }; },
  get stamina() { return player.stamina ?? 100; },
  get player() {
    const pp = playerPos();
    return { x: pp.x, z: pp.z, health: player.health, heading: player.heading || 0 };
  },
  get enemies() {
    return combat.enemies.map((e) => ({
      x: e.x ?? e.pos?.x ?? 0,
      z: e.z ?? e.pos?.z ?? 0,
      health: e.health ?? 0,
      alive: !!e.alive,
    }));
  },
  get audio() { return audio; },
  act(systemName, methodName, ...args) {
    const sys = NEW_SYSTEMS[systemName];
    if (!sys) return { ok: false, reason: 'unknown system: ' + systemName };
    const fn = sys[methodName];
    if (typeof fn !== 'function') return { ok: false, reason: 'unknown method: ' + methodName };
    try { return fn.apply(sys, args); }
    catch (e) { return { ok: false, reason: e && e.message ? e.message : String(e) }; }
  },
};

window.__shotReady = false;

// ---------------------------------------------------------------------------
// Screenshot staging. Runs instead of the normal loop when ?shot= is set.
// ---------------------------------------------------------------------------

function stageShot(kind) {
  resetProgress();
  money = 1250;
  hideAllMenus();
  state = 'playing';
  startMission(0);
  if (kind === 'onfoot') {
    player.x = 38;
    player.z = 48;
  }
  if (kind === 'drive' || kind === 'chase') {
    const comet = parkedCars.find((c) => (c.model || c.name || '') === 'Comet GT') || parkedCars[0];
    if (comet && typeof driving.enterCar === 'function') {
      driving.enterCar(comet);
      const targetSpeed = kind === 'chase' ? 30 : 26;
      if (typeof driving.setSpeed === 'function') driving.setSpeed(targetSpeed);
      else driving.speed = targetSpeed;
    }
    const fakeInput = {
      held(key) { return key === 'forward' || key === 'KeyW' || key === 'ArrowUp'; },
      sneak: false,
      mouse: false,
    };
    for (let f = 0; f < 150; f++) {
      if (typeof driving.update === 'function') driving.update(1 / 60, fakeInput);
    }
    if (kind === 'chase') {
      gameMinutes = 18 * 60 + 45;
      addHeat(65);
      for (let f = 0; f < 210; f++) {
        if (typeof police.update === 'function') police.update(1 / 60, playerPos(), wanted.level);
      }
      const pp = playerPos();
      let nearest = null;
      let bestD = Infinity;
      for (const pc of (police.cars || [])) {
        const d = dist2d(pp.x, pp.z, pc.x ?? pc.pos?.x ?? 0, pc.z ?? pc.pos?.z ?? 0);
        if (d < bestD) { bestD = d; nearest = pc; }
      }
      if (nearest) {
        const heading = player.heading || 0;
        const nx = pp.x + Math.sin(heading) * 12;
        const nz = pp.z + Math.cos(heading) * 12;
        if ('x' in nearest) { nearest.x = nx; nearest.z = nz; }
        else if (nearest.pos) { nearest.pos.x = nx; nearest.pos.z = nz; }
        if (typeof syncCarMesh === 'function') syncCarMesh(nearest);
      }
    }
  }
  refreshClockAndSky();
  renderer.render(scene, camera);
  renderer.render(scene, camera);
  window.__shotReady = true;
}

// ---------------------------------------------------------------------------
// Buttons, visibility auto-pause, boot
// ---------------------------------------------------------------------------

document.addEventListener('visibilitychange', () => {
  if (document.hidden && state === 'playing') pauseGame();
});

if (btnContinue) btnContinue.addEventListener('click', () => startGame(true));
if (btnNew) btnNew.addEventListener('click', () => startGame(false));
if (btnHow) btnHow.addEventListener('click', () => {
  if (howtoEl) howtoEl.style.display = howtoEl.style.display === 'none' ? '' : 'none';
});
if (btnResume) btnResume.addEventListener('click', resumeGame);
if (btnRestart) btnRestart.addEventListener('click', () => startGame(false));
if (btnMute) btnMute.addEventListener('click', () => {
  if (typeof audio.toggleMute === 'function') audio.toggleMute();
  else audio.muted = !audio.muted;
});
if (btnQuit) btnQuit.addEventListener('click', quitToTitle);
if (btnRetry) btnRetry.addEventListener('click', () => startGame(false));
if (btnOverTitle) btnOverTitle.addEventListener('click', () => {
  state = 'title';
  refreshContinueButton();
  showMenu(menuTitleEl);
});
if (btnFreeroam) btnFreeroam.addEventListener('click', () => {
  resetProgress();
  hideAllMenus();
  state = 'playing';
  missionIndex = MISSIONS.length;
  missions.index = MISSIONS.length;
});

refreshContinueButton();

if (SHOT) stageShot(SHOT);
else requestAnimationFrame(frame);
