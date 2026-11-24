// Solara Nights — boot, the one loop, the state machine (title / playing /
// paused / wasted / busted / complete), mission wiring, and ?shot= staging
// for screenshots (stage a scene, step it forward, paint it, set __shotReady).
import * as THREE from 'three';
import { CITY_HALF, PLACES, WORLD } from './config.js';
import { makeRng, clamp } from './random.js';
import { buildCity, buildRooftopBeacons } from './city.js';
import { AudioEngine } from './audio.js';
import { Effects } from './effects.js';
import { Input, ACT_INTERACT, ACT_PAUSE, ACT_RELOAD, ACT_HORN, ACT_MUTE, ACT_SIDEJOB, ACT_TUTORIAL, ACT_MARKET, ACT_NIGHTOPS, ACT_RACE, ACT_SAFEHOUSE, ACT_FISH, ACT_PHOTO } from './input.js';
import { WeatherSystem } from './weather.js';
import { NightOps } from './nightops.js';
import { BlackMarket, MARKET_ITEMS } from './blackmarket.js';
// Round 4 attempt 5 — three all-new systems: the day/night shop economy,
// wanted-heat persistence with safehouses, and street races / time trials.
import { createEconomySystem, SHOPS } from './economy.js';
import { createSafehouseSystem, SAFEHOUSES } from './safehouse.js';
import { createStreetRaceSystem, ROUTES } from './streetrace.js';
// Round 4 attempt 6 — eleven all-new systems: shore fishing, the casino,
// buyable businesses, courier deliveries, stunt jumps, the in-car radio,
// photo mode, smuggling runs, the gym, the chop shop, and taxi shifts.
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
// Round 4 attempt 7 — three more all-new systems: the boardwalk arcade
// (arcade.js), bank-heist planning with a vault-crack minigame (bank.js),
// and the Voss Garage tuning shop (tuning.js).
import { createArcadeSystem, ARCADE_CABINETS } from './arcade.js';
import { createBankSystem, HEIST_TARGETS } from './bank.js';
import { createTuningSystem, TUNING_CATEGORIES } from './tuning.js';
// Round 6 attempt 8 — five more all-new systems: nightclubs, bounty
// hunting, car meets, real estate, and the fight club.
import { createNightclubSystem, NIGHTCLUBS } from './nightclub.js';
import { createBountySystem, BOUNTY_TARGETS } from './bounty.js';
import { createCarMeetSystem, CAR_MEETS } from './carmeet.js';
import { createRealEstateSystem, PROPERTIES } from './realestate.js';
import { createFightClubSystem, FIGHTERS } from './fightclub.js';
// Round 6 attempt 9 — six more all-new systems: street graffiti crews,
// the night market, the recording studio, private-eye cases, the
// courtroom lawyer, and film-studio stunt shoots.
import { createGraffitiSystem, GRAFFITI_DISTRICTS, SPRAY_BRANDS, RIVAL_CREWS } from './graffiti.js';
import { createNightMarketSystem, MARKET_GOODS } from './nightmarket.js';
import { createStudioSystem, STUDIO_GENRES, STUDIO_FEATURES, STUDIO_VENUES } from './studio.js';
import { createDetectiveSystem, EYE_CASES, TAIL_TARGETS } from './detective.js';
import { createLawyerSystem, LAWYERS, CHARGES } from './lawyer.js';
import { createFilmSystem, FILMS, STUNT_SCRIPTS, FILM_DRIVERS } from './film.js';
// Round 7 — subway, firefighter, barber, pet, bus driver, food truck,
// bowling, yacht, skatepark and karaoke, same factory pattern as before.
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
// Round 7b — eighteen more systems: casino royale, angling, courier, ghost
// hunting, golf, helicopter tours, prison break, surfing, treasure hunting,
// recycling, drone racing, tennis, hospital, restaurant, pawnshop, bodyguard,
// jetski, farming. (angling's FISHING_SPOTS is deliberately NOT imported:
// fishing.js already exports that name.)
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
// Round 7c — thirty-two more systems: hunting, mining, logging, apiary,
// paleontology, park ranger, storm chasing, horse ranch, scuba diving,
// skydiving, hot air balloon, ferry, kayaking, windsurfing, lifeguard,
// coast guard, brewery, bakery, sushi bar, coffee shop, butcher, fish
// market, donut shop, vineyard, museum, esports arena, comedy club,
// streaming, hotel, car wash, stock trading, politics. (esportsArena's
// TOURNAMENTS is imported aliased: angling.js already owns that name.)
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
import { Player } from './player.js';
import { Driving } from './driving.js';
import { TrafficSystem, spawnParkedCars, syncCarMesh, setCarGlow } from './vehicles.js';
import { PedestrianSystem } from './pedestrians.js';
import { WantedSystem, PoliceSystem } from './police.js';
import { Combat } from './combat.js';
import { MissionManager, MISSIONS, SideJobs } from './missions.js';
import { HUD } from './hud.js';
import { saveGame, loadGame, clearSave, hasSave, emptyStats } from './save.js';

const params = new URLSearchParams(window.location.search);
const shot = params.get('shot');
const seedParam = Number.parseInt(params.get('seed') ?? '', 10);
const seed = Number.isInteger(seedParam) ? seedParam : 7;
const rng = makeRng(seed);

const canvas = document.getElementById('game');
const statusEl = document.getElementById('status');
const hudEl = document.getElementById('hud');

// --- three.js setup ---------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87bfe8);
scene.fog = new THREE.Fog(0x9fc6e8, 220, 620);
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 1200);
camera.position.set(120, 45, 120);
const hemi = new THREE.HemisphereLight(0xbfd9ff, 0x8a7a5a, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff2d8, 1.6);
sun.position.set(180, 260, 120);
scene.add(sun);

// --- systems ------------------------------------------------------------------
const city = buildCity(scene, rng);
const audio = new AudioEngine();
const effects = new Effects(scene);
const input = new Input(canvas);
const player = new Player(scene, PLACES.playerStart.x, PLACES.playerStart.z);
const traffic = new TrafficSystem(scene, rng, city);
const peds = new PedestrianSystem(scene, rng, city);
let parked = spawnParkedCars(scene, rng);
const wanted = new WantedSystem();
const police = new PoliceSystem(scene, rng, city, audio, effects);
const combat = new Combat(scene, audio, effects);
const missions = new MissionManager(scene, audio);
const sideJobs = new SideJobs(scene, audio);
const driving = new Driving(city, audio, effects);
const hud = new HUD();
// Round 4 attempt 4 — the night economy: a weather system that owns the
// sky, Night Shift contracts that only open after dark, and the Black
// Market stall by the docks. All three are built once, here, and the
// frame loop below drives them.
const beacons = buildRooftopBeacons(scene, rng);
const weather = new WeatherSystem(scene, rng, audio, effects);
let rep = 0;
const market = new BlackMarket(scene, rng, audio, {
  announce,
  onBuy: (item, price) => {
    stats.marketDeals += 1;
    hud.showBanner('DEAL CLOSED', `${item.name} — $${price}. ${item.blurb}`, 3500);
    announce(`Bought ${item.name} for $${price}.`);
  },
});
const nightops = new NightOps(scene, rng, audio, effects, {
  announce,
  reward: (pay, repGain, label) => {
    const bonus = Math.round(pay * market.upgrades.nightPay);
    money += pay + bonus;
    rep += repGain;
    stats.nightOps += 1;
    stats.rep = rep;
    market.addRep(Math.ceil(repGain / 4), 'owls');
    hud.showBanner('NIGHT SHIFT PAID', `${label} — +$${pay}${bonus ? ` (+$${bonus} Owl cut)` : ''} · +${repGain} rep`, 4000);
    saveGame({ missionIndex: missions.index, money, rep, stats: { ...stats, kills: combat.kills }, tutorialSeen });
  },
  fail: (reason) => {
    stats.nightBurned += 1;
    hud.showBanner('CONTRACT BURNED', reason, 4000);
  },
  onSpotted: () => {
    wanted.addHeat(15);
    hud.showBanner('SPOTTED', 'A watcher made you — the cops got a tip.', 3000);
  },
});
// Round 4 attempt 5 — the day/night economy, safehouses and street races.
// Each system owns its own state and only touches the game through the
// small hooks below; money/wanted are read live so the HUD never lies.
const economy = createEconomySystem({
  getHour: () => (Math.floor(gameMinutes / 60) % 24) + ((gameMinutes % 60) / 60),
  getCash: () => money,
  addCash: (d) => { money += d; },
  notify: announce,
  addHeat: (n) => wanted.addHeat(n),
});
const safehouse = createSafehouseSystem({
  getStars: () => wanted.level,
  setStars: (s) => { wanted.heat = s * 20; wanted.level = s; },
  getCash: () => money,
  addCash: (d) => { money += d; },
  notify: announce,
  getPosition: () => playerPos(),
  isChased: () => police.cars.length > 0 || police.cops.length > 0,
});
const streetrace = createStreetRaceSystem({
  getPosition: () => playerPos(),
  getSpeed: () => (player.inCar ? Math.abs(player.inCar.speed) : 0),
  getCash: () => money,
  addCash: (d) => { money += d; },
  notify: announce,
  addHeat: (n) => wanted.addHeat(n),
  playerName: 'Ria',
});
// Round 4 attempt 6 — eleven more systems, same pattern: each owns its
// state and only touches the game through the small hooks below.
const hourFloat = () => (Math.floor(gameMinutes / 60) % 24) + ((gameMinutes % 60) / 60);
const dayCount = () => Math.floor(gameMinutes / 1440) + 1;
const fishing = createFishingSystem({
  rng: () => rng.next(), getHour: hourFloat, getCash: () => money, addCash: (d) => { money += d; },
  log: announce, onBite: () => audio.blip(),
});
const casino = createCasinoSystem({
  getCash: () => money, addCash: (d) => { money += d; }, log: announce,
  addHeat: (n) => wanted.addHeat(n),
});
const businesses = createBusinessSystem({
  rng: () => rng.next(), getHour: hourFloat, getHeatLevel: () => wanted.level,
  getCash: () => money, addCash: (d) => { money += d; }, log: announce,
  reduceHeat: (n) => { wanted.heat = Math.max(0, wanted.heat - n); },
});
const delivery = createDeliverySystem({
  rng: () => rng.next(), getPlayerPos: playerPos, getCash: () => money,
  addCash: (d) => { money += d; }, log: announce,
});
const stunt = createStuntSystem({
  rng: () => rng.next(), getPlayerPos: playerPos,
  getSpeed: () => (player.inCar ? Math.abs(player.inCar.speed) : 0),
  isAirborne: () => !!(player.inCar && player.inCar.airborne),
  addCash: (d) => { money += d; }, log: announce,
  onCrash: () => { if (player.inCar) player.inCar.health = Math.max(10, (player.inCar.health || 100) - 15); },
});
const radio = createRadioSystem({
  rng: () => rng.next(), getWanted: () => wanted.level, getHour: hourFloat,
  log: announce, now: () => Date.now(),
});
const photo = createPhotoSystem({
  getPlayerPos: playerPos, getHour: hourFloat, getWanted: () => wanted.level,
  getSpeed: () => (player.inCar ? Math.abs(player.inCar.speed) : 0),
  isAirborne: () => !!(player.inCar && player.inCar.airborne),
  log: announce,
  captureFrame: () => { try { return renderer.domElement.toDataURL('image/jpeg', 0.6); } catch { return null; } },
});
const smuggling = createSmugglingSystem({
  rng: () => rng.next(), getPlayerPos: playerPos, getHeatLevel: () => wanted.level,
  getWanted: () => wanted.level, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n),
  log: announce, getDeliveryRep: () => delivery.stats().rep,
  hasBusiness: (id) => businesses.hasPerk(id),
});
const gym = createGymSystem({
  getDay: dayCount, getCash: () => money, addCash: (d) => { money += d; },
  log: announce,
});
const chopshop = createChopShopSystem({
  getDay: dayCount, getHeatLevel: () => wanted.level,
  getCash: () => money, addCash: (d) => { money += d; },
  addHeat: (n) => wanted.addHeat(n), log: announce,
});
const taxi = createTaxiSystem({
  rng: () => rng.next(), getPlayerPos: playerPos, getDay: dayCount,
  getSpeed: () => (player.inCar ? Math.abs(player.inCar.speed) : 0),
  getCash: () => money, addCash: (d) => { money += d; }, log: announce,
});
// Round 4 attempt 7 — arcade, bank heists and tuning, same factory pattern.
const arcade = createArcadeSystem({
  rng: () => rng.next(), getCash: () => money, addCash: (d) => { money += d; }, log: announce,
});
const bank = createBankSystem({
  rng: () => rng.next(), getCash: () => money, addCash: (d) => { money += d; },
  addHeat: (n) => wanted.addHeat(n), log: announce,
});
const tuning = createTuningSystem({
  rng: () => rng.next(), getCash: () => money, addCash: (d) => { money += d; }, log: announce,
});
// Round 6 attempt 8 — nightclubs, bounty hunting, car meets, real estate
// and the fight club, same factory pattern as the attempt-7 systems.
const nightclub = createNightclubSystem({
  rng: () => rng.next(), getHour: hourFloat, getDay: dayCount,
  getCash: () => money, addCash: (d) => { money += d; },
  addHeat: (n) => wanted.addHeat(n), log: announce,
});
const bounty = createBountySystem({
  rng: () => rng.next(), getDay: dayCount,
  getCash: () => money, addCash: (d) => { money += d; },
  addHeat: (n) => wanted.addHeat(n), log: announce,
});
const carmeet = createCarMeetSystem({
  rng: () => rng.next(), getHour: hourFloat, getDay: dayCount,
  getCash: () => money, addCash: (d) => { money += d; },
  addHeat: (n) => wanted.addHeat(n), log: announce,
});
const realestate = createRealEstateSystem({
  rng: () => rng.next(), getDay: dayCount,
  getCash: () => money, addCash: (d) => { money += d; }, log: announce,
});
const fightclub = createFightClubSystem({
  rng: () => rng.next(), getCash: () => money, addCash: (d) => { money += d; },
  addHeat: (n) => wanted.addHeat(n), log: announce,
});
// Round 6 attempt 9 — graffiti crews, night market, studio, detective,
// lawyer and film shoots, same factory pattern as the attempt-8 systems.
const graffiti = createGraffitiSystem({
  getHour: hourFloat, getDay: dayCount, rng: () => rng.next(),
  addCash: (d) => { money += d; }, getCash: () => money,
  log: announce, addHeat: (n) => wanted.addHeat(n),
});
const nightmarket = createNightMarketSystem({
  getDay: dayCount, getCash: () => money, rng: () => rng.next(),
  log: announce, addCash: (d) => { money += d; },
});
const studio = createStudioSystem({
  rng: () => rng.next(), getCash: () => money, log: announce,
  getDay: dayCount, addCash: (d) => { money += d; },
});
const detective = createDetectiveSystem({
  rng: () => rng.next(), addHeat: (n) => wanted.addHeat(n), getDay: dayCount,
  log: announce, getCash: () => money, addCash: (d) => { money += d; },
});
const lawyer = createLawyerSystem({
  getHeatLevel: () => wanted.level, log: announce, rng: () => rng.next(),
  getDay: dayCount, getCash: () => money,
  addHeat: (n) => wanted.addHeat(n), addCash: (d) => { money += d; },
});
const film = createFilmSystem({
  getDay: dayCount, addHeat: (n) => wanted.addHeat(n), rng: () => rng.next(),
  addCash: (d) => { money += d; }, log: announce, getCash: () => money,
});
// Round 7 — ten more systems, same factory pattern as the attempt-9 ones.
const subway = createSubwaySystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const firefighter = createFirefighterSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const barber = createBarberSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const pet = createPetSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const busdriver = createBusDriverSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getSpeed: () => (player.inCar ? Math.abs(player.inCar.speed) : 0),
});
const foodtruck = createFoodTruckSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const bowling = createBowlingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const yacht = createYachtSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const skatepark = createSkateparkSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
const karaoke = createKaraokeSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos,
});
// Round 7b — eighteen more systems, same factory pattern as the Round 7 ones.
// The nine attempt-A systems expose summary() instead of stats(), so wire a
// stats alias at the seam; their tick/hudLine/serialize shapes already match.
const casinoroyale = createCasinoRoyaleSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
casinoroyale.stats = () => casinoroyale.summary();
const angling = createAnglingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
angling.stats = () => angling.summary();
const courier = createCourierSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
courier.stats = () => courier.summary();
const ghosthunting = createGhostHuntingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
ghosthunting.stats = () => ghosthunting.summary();
const golf = createGolfSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
golf.stats = () => golf.summary();
const helitours = createHeliTourSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
helitours.stats = () => helitours.summary();
const prisonbreak = createPrisonBreakSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
prisonbreak.stats = () => prisonbreak.summary();
const surfing = createSurfingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
surfing.stats = () => surfing.summary();
const treasurehunting = createTreasureHuntingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
treasurehunting.stats = () => treasurehunting.summary();
const recycling = createRecyclingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const droneRacing = createDroneRacingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const tennis = createTennisSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const hospital = createHospitalSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const restaurant = createRestaurantSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const pawnshop = createPawnshopSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const bodyguard = createBodyguardSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const jetski = createJetskiSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const farming = createFarmingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
// Round 7c — thirty-two more systems, same factory pattern as the Round 7b
// ones. All 32 expose stats() natively, so no summary() alias is needed.
const hunting = createHuntingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const mining = createMiningSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const logging = createLoggingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const apiary = createApiarySystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const paleontology = createPaleontologySystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const parkRanger = createParkRangerSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const stormChasing = createStormChasingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const horseRanch = createHorseRanchSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const scubaDiving = createScubaDivingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const skydiving = createSkydivingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const hotAirBalloon = createHotAirBalloonSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const ferry = createFerrySystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const kayaking = createKayakingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const windsurfing = createWindsurfingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const lifeguard = createLifeguardSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const coastGuard = createCoastGuardSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const brewery = createBrewerySystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const bakery = createBakerySystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const sushiBar = createSushiBarSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const coffeeShop = createCoffeeShopSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const butcher = createButcherSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const fishMarket = createFishMarketSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const donutShop = createDonutShopSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const vineyard = createVineyardSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const museum = createMuseumSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const esportsArena = createEsportsArenaSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const comedyClub = createComedyClubSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const streaming = createStreamingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const hotel = createHotelSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const carWash = createCarWashSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const stockTrading = createStockTradingSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const politics = createPoliticsSystem({
  rng: () => rng.next(), getDay: dayCount, getHour: hourFloat, getCash: () => money,
  addCash: (d) => { money += d; }, addHeat: (n) => wanted.addHeat(n), log: announce,
  getPlayerPos: playerPos, getWeather: () => wxSummary.condition,
});
const NEW_SYSTEMS = { fishing, casino, businesses, delivery, stunt, radio, photo, smuggling, gym, chopshop, taxi, arcade, bank, tuning, nightclub, bounty, carmeet, realestate, fightclub, graffiti, nightmarket, studio, detective, lawyer, film, subway, firefighter, barber, pet, busdriver, foodtruck, bowling, yacht, skatepark, karaoke, casinoroyale, angling, courier, ghosthunting, golf, helitours, prisonbreak, surfing, treasurehunting, recycling, droneRacing, tennis, hospital, restaurant, pawnshop, bodyguard, jetski, farming, hunting, mining, logging, apiary, paleontology, parkRanger, stormChasing, horseRanch, scubaDiving, skydiving, hotAirBalloon, ferry, kayaking, windsurfing, lifeguard, coastGuard, brewery, bakery, sushiBar, coffeeShop, butcher, fishMarket, donutShop, vineyard, museum, esportsArena, comedyClub, streaming, hotel, carWash, stockTrading, politics };
// NOTE: gameMinutes is declared below (17:40 start); mirror its initial
// hour here instead of reading it, or the TDZ throws at boot.
let lastGameHour = Math.floor((17 * 60 + 40) / 60);
// Round 6 attempt 8 — the game starts on day 1; the day-change hook below
// settles clubs, property rent and bounty contracts once per day.
let lastDay = 1;
function systemsHudLine() {
  const lines = [];
  for (const s of Object.values(NEW_SYSTEMS)) {
    if (typeof s.hudLine === 'function') {
      const line = s.hudLine();
      if (line) lines.push(line);
    }
  }
  return lines.slice(0, 2).join('  ');
}
function saveNewSystems() {
  const out = {};
  for (const [name, s] of Object.entries(NEW_SYSTEMS)) {
    if (typeof s.serialize === 'function') out[name] = s.serialize();
  }
  return out;
}
function restoreNewSystems(data) {
  if (!data) return;
  for (const [name, s] of Object.entries(NEW_SYSTEMS)) {
    if (data[name] && typeof s.deserialize === 'function') s.deserialize(data[name]);
  }
}
// Round 4 attempt 2 — weather: rain rolls in on a timer (game-minutes of
// play), lasts 40–90 s, then clears. rainF eases in/out over ~5 s so the
// shower never pops in or out in a single frame.
let rainF = 0;
let rainTarget = 0;
let rainTimer = 90 + rng.range(0, 60); // first shower ~2–3 min in
let rainLeft = 0;
// Attempt 4 — latest weather summary (refreshed every stepWorld) and
// the shot counter Night Shift last saw, so a fired shot counts once.
let wxSummary = { condition: 'clear', rain: 0, fog: 0, visibility: 320 };
let nightShotSeq = 0;
// Round 4 attempt 2 — tutorial: three short steps for a first-time player
// (move, enter a car, follow the beacon). Done once, remembered in the save.
let tutorialStep = -1; // -1 = off (returning player or skipped)
let tutorialSeen = false;
const TUTORIAL_STEPS = [
  'WASD to move — Shift to sprint (watch your stamina)',
  'Walk to a gold car on the minimap and press E to get in',
  'Follow the yellow beacon — that is your next job. Press T to skip these tips',
];

// --- game state ---------------------------------------------------------------
let state = 'title'; // title | playing | paused | over | complete
let money = 0;
let missionPhase = 'go';
let nextMissionTimer = 0;
let failTimer = 0;
let failReason = '';
let orbitAngle = 0.6;
let gameMinutes = 17 * 60 + 40;
let muted = false;
let lastHurtFlash = false;
let lastShotResult = null; // debug handle only: result of the last pistol shot
let shotSeq = 0; // debug handle only: counts pistol shots (1 per fired round)
// Round-4 stats (save v3): kills, missions completed, best Drop time left.
let stats = emptyStats();

// Read-only playtest handle: automated runs (and curious players in the
// console) can watch live state without touching the simulation. It never
// writes anything and the game plays exactly the same with or without it.
window.__solara = {
  get state() { return state; },
  get money() { return money; },
  get missionIndex() { return missions.index; },
  get missionPhase() { return missionPhase; },
  get missionStage() { return missions.stage; },
  get objective() { return missions.objective; },
  get waypoint() { return missions.waypoint; },
  get timeLeft() { return missions.timeLeft; },
  get wanted() { return { heat: wanted.heat, level: wanted.level }; },
  get health() { return player.health; },
  get ammo() { return combat.ammo; },
  get lastShot() { return lastShotResult; },
  get lastShotPoint() { return combat.lastHit; },
  get lastDamage() { return combat.lastDamage; },
  get shotSeq() { return shotSeq; },
  get alive() { return combat.aliveCount; },
  get kills() { return combat.kills; },
  get dayPhase() { return dayPhase; },
  get nightF() { return nightF; },
  get clock() { return clockText(); },
  get police() { return police.cars.length + police.cops.length; },
  get carHealth() { return player.inCar ? player.inCar.health : null; },
  get headlight() { return !!(driving.headlight && driving.headlight.visible); },
  get stats() { return { ...stats, kills: combat.kills }; },
  get parked() { return parked.map((c) => ({ name: c.name, x: c.x, z: c.z })); },
  // Round 4 attempt 3 handles: drift chain, helicopter, roadblocks,
  // damage zones, side-job chains.
  get drift() { return { score: Math.floor(driving.driftScore), banked: driving.bankedTotal, drifting: driving.drifting }; },
  get heli() { return police.heliActive; },
  get heliPos() { return police.heli ? { x: police.heli.x, z: police.heli.z } : null; },
  get roadblocks() { return police.roadblocks.map((c) => ({ x: c.x, z: c.z })); },
  get damage() { return driving.damageZones; },
  get chain() { return sideJobs.chainStatus(); },
  get rain() { return rainF; },
  get raining() { return rainF > 0.3; },
  get sideJob() { return sideJobs.active ? { id: sideJobs.active.id, stage: sideJobs.stage, objective: sideJobs.objective } : null; },
  get sideOffer() { return sideJobs.offered ? sideJobs.offered.id : null; },
  // Round 4 attempt 4 handles: weather, Night Shift, Black Market, rep.
  get weather() { return { condition: weather.condition, rain: weather.rainLevel, fog: weather.fogLevel, storms: weather.stormsSeen, strikes: weather.strikesSeen }; },
  get nightops() { return { active: nightops.active, offer: nightops.offer, noise: nightops.noise, eyes: nightops.eyes, done: nightops.contractsDone, burned: nightops.contractsBurned }; },
  get market() { return { near: market.nearStall, open: market.open, standing: { ...market.standing }, upgrades: { ...market.upgrades }, deals: market.deals }; },
  // Round 4 attempt 5 handles: economy, safehouses, street races.
  get economy() { return economy.summary(); },
  get economyShops() { return SHOPS.map((s) => s.id); },
  get safehouse() { return safehouse.status(); },
  get safehouses() { return SAFEHOUSES.map((s) => s.id); },
  get streetrace() { return streetrace.hud(); },
  get raceBoard() { return ROUTES.map((r) => ({ id: r.id, best: streetrace.bestTime(r.id) })); },
  // Round 4 attempt 6 handles: the eleven new systems, live stats each,
  // plus a debug dispatcher (act) so a playtest can drive them.
  get systems() {
    const out = {};
    for (const [name, s] of Object.entries(NEW_SYSTEMS)) {
      out[name] = typeof s.stats === 'function' ? s.stats() : null;
    }
    return out;
  },
  get systemsOk() {
    return Object.values(NEW_SYSTEMS).every((s) => s && typeof s.stats === 'function')
      && FISHING_SPOTS.length === 5 && BUSINESS_TYPES.length === 5
      && STUNT_RAMPS.length === 6 && STATIONS.length === 5
      && EXERCISES.length === 6 && CAR_VALUES.length === 10
      && ARCADE_CABINETS.length === 4 && HEIST_TARGETS.length === 3
      && TUNING_CATEGORIES.length === 5
      && NIGHTCLUBS.length === 4 && BOUNTY_TARGETS.length === 6
      && CAR_MEETS.length === 4 && PROPERTIES.length === 6
      && FIGHTERS.length === 5
      && GRAFFITI_DISTRICTS.length === 8 && SPRAY_BRANDS.length === 4
      && RIVAL_CREWS.length === 4 && MARKET_GOODS.length === 10
      && STUDIO_GENRES.length === 5 && STUDIO_FEATURES.length === 6
      && STUDIO_VENUES.length === 4 && EYE_CASES.length === 6
      && TAIL_TARGETS.length === 6 && LAWYERS.length === 3
      && CHARGES.length === 6 && FILMS.length === 4
      && STUNT_SCRIPTS.length === 6 && FILM_DRIVERS.length === 4
      && SUBWAY_STATIONS.length === 8 && SUBWAY_LINES.length === 3
      && FIRE_TYPES.length === 8 && FIRE_RANKS.length === 5
      && HAIRCUTS.length === 10 && TATTOOS.length === 12
      && PET_BREEDS.length === 6 && PET_TRICKS.length === 10
      && BUS_ROUTES.length === 5 && BUS_MODELS.length === 5
      && FOOD_MENU.length === 10 && FOOD_TRUCK_SPOTS.length === 7
      && BOWLING_LANES.length === 6 && BOWLING_OPPONENTS.length === 6
      && BOATS.length === 7 && SEA_ROUTES.length === 8
      && SKATE_PARKS.length === 4 && SKATE_TRICKS.length === 20
      && KARAOKE_SONGS.length === 17 && KARAOKE_BATTLERS.length === 5
      && CHIP_PACKS.length === 4 && SLOT_MACHINES.length === 4
      && BLACKJACK_TABLES.length === 3 && VIP_TIERS.length === 5
      && CASINO_MISSIONS.length === 10 && FISH_SPECIES.length === 18
      && RODS.length === 5 && BAITS.length === 7 && ANGLER_RANKS.length === 6
      && TOURNAMENTS.length === 3 && DISTRICTS.length === 12
      && PARCEL_TYPES.length === 20 && COURIER_VEHICLES.length === 6
      && COURIER_RANKS.length === 5 && URGENCY.length === 4
      && EVIDENCE_TYPES.length === 8 && GHOST_TYPES.length === 14
      && HAUNTED_LOCATIONS.length === 12 && GHOST_EQUIPMENT.length === 14
      && HUNTER_RANKS.length === 5 && CLUBS.length === 12
      && GOLF_BALLS.length === 5 && COURSES.length === 5
      && GOLF_OPPONENTS.length === 8 && HELICOPTERS.length === 6
      && TOUR_ROUTES.length === 12 && PHOTO_SPOTS.length === 16
      && PASSENGER_TYPES.length === 8 && CELL_BLOCKS.length === 8
      && ESCAPE_PLANS.length === 10 && CONTRABAND.length === 15
      && CRAFT_RECIPES.length === 8 && GUARDS.length === 8
      && ALLIES.length === 8 && SURF_BEACHES.length === 12
      && SURFBOARDS.length === 10 && SURF_TRICKS.length === 20
      && WETSUITS.length === 5 && SURF_COMPS.length === 8
      && DIG_SITES.length === 12 && TREASURE_MAPS.length === 12
      && DETECTORS.length === 5 && SHOVELS.length === 5
      && FIND_TABLE.length === 20 && RECYCLING_MATERIALS.length === 12
      && RECYCLING_BINS.length === 9 && RECYCLING_ROUTES.length === 8
      && DRONE_MODELS.length === 8 && DRONE_TRACKS.length === 8
      && DRONE_PARTS.length === 10 && TENNIS_COURTS.length === 8
      && TENNIS_RACKETS.length === 8 && TENNIS_SHOES.length === 4
      && HOSPITAL_WARDS.length === 8 && TRIAGE_LEVELS.length === 5
      && HOSPITAL_CONDITIONS.length === 16 && RESTAURANT_DISHES.length === 12
      && RESTAURANT_INGREDIENTS.length === 12 && RESTAURANT_CUSTOMERS.length === 8
      && PAWN_CATEGORIES.length === 16 && PAWN_CUSTOMERS.length === 8
      && PAWN_AUCTIONS.length === 6 && BODYGUARD_CLIENTS.length === 10
      && BODYGUARD_ROUTES.length === 8 && BODYGUARD_THREATS.length === 10
      && JETSKI_MODELS.length === 8 && JETSKI_COURSES.length === 8
      && JETSKI_TRICKS.length === 10 && FARM_CROPS.length === 14
      && FARM_ANIMALS.length === 8 && FARM_PLOTS.length === 8
      && HUNTING_ANIMALS.length === 12 && MINING_ORES.length === 12
      && LOGGING_TREES.length === 10 && APIARY_HIVES.length === 10
      && FOSSIL_SITES.length === 10 && RANGER_PATROLS.length === 10
      && STORM_TYPES.length === 10 && HORSE_BREEDS.length === 12
      && DIVE_SITES.length === 10 && DROP_ZONES.length === 10
      && BALLOON_ROUTES.length === 10 && FERRY_ROUTES.length === 12
      && KAYAK_RIVERS.length === 10 && WINDSURF_SPOTS.length === 10
      && BEACH_PATROLS.length === 10 && RESCUE_MISSIONS.length === 10
      && BREW_RECIPES.length === 12 && BAKED_GOODS.length === 12
      && SUSHI_MENU.length === 12 && COFFEE_MENU.length === 12
      && MEAT_CUTS.length === 10 && MARKET_CATCH.length === 12
      && DONUT_FLAVORS.length === 12 && WINE_VARIETALS.length === 10
      && EXHIBITS.length === 12 && ESPORTS_TOURNAMENTS.length === 10
      && COMEDY_ACTS.length === 12 && STREAM_CATEGORIES.length === 12
      && ROOM_TYPES.length === 10 && WASH_PACKAGES.length === 10
      && STOCKS.length === 12 && CAMPAIGN_EVENTS.length === 10;
  },
  get fishingSpots() { return FISHING_SPOTS.map((s) => s.id); },
  get businessTypes() { return BUSINESS_TYPES.map((b) => b.id); },
  get radioStations() { return STATIONS.map((s) => s.id); },
  act(system, method, ...args) {
    const s = NEW_SYSTEMS[system];
    if (!s || typeof s[method] !== 'function') return { ok: false, reason: 'no-such-system-method' };
    try { return s[method](...args); } catch (e) { return { ok: false, reason: String(e).slice(0, 120) }; }
  },
  get rep() { return rep; },
  get sneaking() { return player.sneaking; },
  get tutorial() { return tutorialStep; },
  get stamina() { return player.stamina01; },
  get player() {
    const car = player.inCar;
    // Effective position: the car's, while driving — the on-foot x/z go stale
    // the moment the player gets in, and a playtest reader would chase a ghost.
    return {
      x: car ? car.x : player.x, z: car ? car.z : player.z,
      heading: player.heading, camYaw: player.camYaw, camPitch: player.camPitch,
      inCar: !!car,
      car: car ? { name: car.name, x: car.x, z: car.z, heading: car.heading, speed: car.speed, health: car.health } : null,
    };
  },
  get enemies() { return combat.enemies.map((e) => ({ x: e.x, z: e.z, alive: e.alive, health: e.health })); },
  get audio() {
    return {
      ctx: !!audio.ctx, running: audio.ctx ? audio.ctx.state === 'running' : false,
      musicStep: audio.musicStep, siren: audio.sirenOn, engine: !!audio.engineOsc,
    };
  },
};

input.onFirstGesture = () => {
  audio.ensure();
  audio.startMusic();
};

function announce(message) {
  statusEl.textContent = message;
}

function $(id) {
  return document.getElementById(id);
}

function showOnly(id) {
  for (const m of ['menu-title', 'menu-pause', 'menu-over', 'menu-complete']) {
    $(m).classList.toggle('hidden', m !== id);
  }
  if (!id) {
    for (const m of ['menu-title', 'menu-pause', 'menu-over', 'menu-complete']) $(m).classList.add('hidden');
  }
}

function clockText() {
  const h = Math.floor(gameMinutes / 60) % 24;
  const m = Math.floor(gameMinutes % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Day/night cycle: the clock drives sun, sky, fog and the streetlight glow,
// so a chase at 19:00 feels different from one at noon. gameMinutes runs
// 0.5 min per real second; dusk 18:00–19:30, night 19:30–05:30, dawn 05:30–06:00.
const DAY_SKY = new THREE.Color(0x87bfe8);
const NIGHT_SKY = new THREE.Color(0x0e1626);
const DAY_FOG = new THREE.Color(0x9fc6e8);
const NIGHT_FOG = new THREE.Color(0x0e1626);
const _sky = new THREE.Color();
const _fog = new THREE.Color();
let dayPhase = 'day';
let nightF = 0;
let lastNightF = -1;

function applyDayNight() {
  const mins = gameMinutes % 1440;
  let f;
  let phase;
  if (mins >= WORLD.dayStart && mins < WORLD.duskStart) {
    f = 0;
    phase = 'day';
  } else if (mins >= WORLD.duskStart && mins < WORLD.nightStart) {
    f = (mins - WORLD.duskStart) / (WORLD.nightStart - WORLD.duskStart);
    phase = 'dusk';
  } else if (mins >= WORLD.nightStart || mins < WORLD.dawnStart) {
    f = 1;
    phase = 'night';
  } else {
    f = 1 - (mins - WORLD.dawnStart) / (WORLD.dayStart - WORLD.dawnStart);
    phase = 'dawn';
  }
  dayPhase = phase;
  nightF = f;
  sun.intensity = 1.6 - 1.25 * f;
  hemi.intensity = 0.9 - 0.55 * f;
  scene.background.copy(_sky.copy(DAY_SKY).lerp(NIGHT_SKY, f));
  scene.fog.color.copy(_fog.copy(DAY_FOG).lerp(NIGHT_FOG, f));
  if (Math.abs(f - lastNightF) > 0.02) {
    lastNightF = f;
    city.setNight(f);
  }
}

function playerPos() {
  if (player.inCar) return { x: player.inCar.x, z: player.inCar.z };
  return { x: player.x, z: player.z };
}

function resetMissionWorld() {
  if (player.inCar) {
    driving.exit();
    player.mesh.visible = true;
    player.inCar = null;
  }
  player.reset(PLACES.playerStart.x, PLACES.playerStart.z, WORLD.playerHealth);
  player.camYaw = Math.PI;
  wanted.heat = 0;
  wanted.level = 0;
  police.clear();
  combat.clearEnemies();
  combat.ammo = WORLD.pistolMag;
  combat.reloadTimer = 0;
  combat.shotCooldown = 0; // a stale cooldown must not swallow the first shot after a retry
  for (const car of parked) scene.remove(car.mesh);
  parked = spawnParkedCars(scene, rng);
  missionPhase = 'go';
}

function startMission(index) {
  const m = missions.start(index);
  // A story mission cancels any side job or offer: the two never fight
  // over the beacon, and the player is never paid for a job the story
  // interrupted.
  sideJobs.cancel();
  if (!m) {
    missions.objective = 'Free roam — Solara Bay is yours.';
    return;
  }
  // Each mission's phase is what the step loop waits on: homecoming and
  // thedrop just walk/drive to the waypoint ('go'), hotwheels waits for the
  // Comet GT theft ('steal'), payback waits for the docks to be cleared.
  missionPhase = m.id === 'hotwheels' ? 'steal' : m.id === 'payback' ? 'clear' : 'go';
  missions.begin();
  if (m.id === 'thedrop') wanted.addHeat(55);
  if (m.id === 'payback') {
    combat.spawnEnemies([
      [-160, 250], [-132, 250], [-104, 250], [-76, 250], [-146, 268], [-90, 268],
    ]);
  }
  // A retry shows its attempt number, so the grind reads in the banner.
  const attempt = missions.attemptsFor(m.id);
  hud.showBanner(m.title, `${m.briefing}${attempt > 1 ? ` (Attempt ${attempt})` : ''}`, 6000);
  announce(`${m.title}. ${m.objective}`);
}

function completeMission() {
  // Capture the Drop clock before complete() clears the mission state.
  const dropLeft = missions.current && missions.current.id === 'thedrop' ? missions.timeLeft : 0;
  const finishedStory = missions.complete();
  stats.missions += 1;
  if (dropLeft > 0) stats.bestDrop = Math.max(stats.bestDrop, Math.ceil(dropLeft));
  if (finishedStory) {
    state = 'complete';
    hudEl.classList.add('hidden');
    input.unlockPointer();
    showOnly('menu-complete');
    audio.engine(null);
    audio.siren(false);
    saveGame({ missionIndex: MISSIONS.length, money, rep, stats: { ...stats, kills: combat.kills }, market: market.serialize(), nightops: nightops.serialize(), weather: weather.serialize(), economy: economy.serialize(), safehouse: safehouse.serialize(), streetrace: streetrace.serialize(), newSystems: saveNewSystems() });
    announce('Story complete. Free roam continues.');
    return;
  }
  // Save AFTER missions.complete() bumped the index, so Continue resumes at
  // the next mission instead of replaying the one just finished.
  saveGame({ missionIndex: missions.index, money, stats: { ...stats, kills: combat.kills }, newSystems: saveNewSystems() });
  nextMissionTimer = 2.5;
}

function failMission(reason) {
  failReason = reason;
  hud.showBanner('MISSION FAILED', reason, 3000);
  audio.fail();
  failTimer = 2.2;
}

missions.onMissionComplete = (m) => {
  money += m.reward + (m.bonus || 0);
  hud.showBanner('MISSION COMPLETE', `${m.title} — +$${m.reward}${m.bonus ? ` (+$${m.bonus} speed bonus)` : ''}`, 3500);
  // No save here: completeMission() saves after the index has advanced.
};

function startGame(fresh) {
  clearSaveIfFresh(fresh);
  const save = fresh ? null : loadGame();
  money = save ? save.money || 0 : 0;
  stats = save && save.stats ? { ...emptyStats(), ...save.stats } : emptyStats();
  tutorialSeen = save ? !!save.tutorialSeen : false;
  // Attempt 4 — restore the night economy: crew reputation, market
  // upgrades and standing, night contracts, and the weather record.
  rep = save && typeof save.rep === 'number' ? save.rep : (stats.rep || 0);
  if (save && save.market) market.restore(save.market);
  if (save && save.nightops) nightops.restore(save.nightops);
  if (save && save.weather) weather.restore(save.weather);
  // Attempt 5 — restore the day/night economy, safehouses and race board.
  if (save && save.economy) economy.deserialize(save.economy);
  if (save && save.safehouse) safehouse.deserialize(save.safehouse);
  if (save && save.streetrace) streetrace.deserialize(save.streetrace);
  // Attempt 6 — restore the eleven new systems (fishing, casino, ...).
  if (save && save.newSystems) restoreNewSystems(save.newSystems);
  // Tutorial (attempt 2): first-time players get the three steps; a
  // returning player (or one who skipped) never sees them again.
  tutorialStep = tutorialSeen ? -1 : 0;
  const missionIndex = save ? Math.min(save.missionIndex || 0, MISSIONS.length - 1) : 0;
  resetMissionWorld();
  showOnly(null);
  hudEl.classList.remove('hidden');
  state = 'playing';
  input.lockPointer();
  startMission(missionIndex);
  announce('Playing. Follow the yellow beacon.');
}

function clearSaveIfFresh(fresh) {
  if (fresh) clearSave();
}

function gameOver(kind, text) {
  state = 'over';
  money = Math.floor(money * 0.9);
  audio.engine(null);
  audio.siren(false);
  audio.fail();
  input.unlockPointer();
  $('over-title').textContent = kind;
  $('over-text').textContent = text;
  showOnly('menu-over');
  announce(`${kind}. ${text}`);
}

function quitToTitle() {
  saveGame({ missionIndex: Math.min(missions.index, MISSIONS.length - 1), money, stats: { ...stats, kills: combat.kills } });
  state = 'title';
  hudEl.classList.add('hidden');
  audio.engine(null);
  audio.siren(false);
  showOnly('menu-title');
  $('btn-continue').style.display = hasSave() ? '' : 'none';
}

// --- interaction ---------------------------------------------------------------
function nearestParked(maxDist) {
  let best = null;
  let bestD = maxDist;
  for (const car of parked) {
    const d = Math.hypot(car.x - player.x, car.z - player.z);
    if (d < bestD) {
      bestD = d;
      best = car;
    }
  }
  return best;
}

function handleInteract() {
  if (player.inCar) {
    const car = player.inCar;
    const speed = Math.abs(car.speed);
    if (speed > 3) return;
    driving.exit();
    player.inCar = null;
    player.x = car.x + Math.cos(car.heading) * 2.4;
    player.z = car.z - Math.sin(car.heading) * 2.4;
    player.mesh.visible = true;
    player.mesh.position.set(player.x, 0, player.z);
    player.snapCamera(camera);
    audio.doorSlam();
    audio.blip();
    return;
  }
  // Attempt 6 — E at the water starts fishing, or strikes on a bite.
  if (fishing.state.phase === 'bite') { fishing.strike(); return; }
  if (fishing.state.phase === 'idle') {
    const spot = FISHING_SPOTS.find((s) => Math.hypot(s.x - player.x, s.z - player.z) < 14);
    if (spot) {
      const res = fishing.startFishing(spot);
      if (!res.ok) hud.showBanner('FISHING', res.reason === 'no-bait-money' ? 'Not enough cash for bait.' : 'Already fishing.', 2500);
      return;
    }
  }
  // Round 7 — the ten new systems answer E near their own places (metro
  // platforms, Station 7, the barbershop, Rex, the depot, the truck, the
  // lanes, the marina, the skatepark, the karaoke bar). Each one returns
  // false when the player is nowhere near it, so cars still work.
  for (const s of Object.values(NEW_SYSTEMS)) {
    if (typeof s.interact === 'function' && s.interact()) return;
  }
  const car = nearestParked(4.5);
  if (!car) return;
  const m = missions.current;
  if (m && m.id === 'hotwheels' && missionPhase === 'steal' && car.name === 'Comet GT') {
    driving.enter(car);
    player.inCar = car;
    player.mesh.visible = false;
    wanted.addHeat(45);
    missionPhase = 'escape';
    missions.objective = 'Lose the cops, then return to Voss Garage';
    missions.setWaypoint(PLACES.garage.x, PLACES.garage.z - 14);
    hud.showBanner('CAR STOLEN', 'The Comet GT is yours — now lose the cops!', 3500);
    announce('Car stolen. Lose the cops, then return to the garage.');
    return;
  }
  if (car.parked && car.name !== 'Voss Sedan') {
    wanted.addHeat(25);
    hud.showBanner('STOLEN CAR', 'Someone saw you take it — the heat is on.', 2500);
  }
  driving.enter(car);
  player.inCar = car;
  player.mesh.visible = false;
  audio.doorSlam();
  audio.blip();
}

function hittables() {
  const list = [];
  for (const c of traffic.cars) list.push({ mesh: c.mesh, kind: 'car' });
  for (const c of parked) list.push({ mesh: c.mesh, kind: 'car' });
  for (const p of peds.peds) list.push({ mesh: p.group, kind: 'ped' });
  return list;
}

// --- per-frame simulation -------------------------------------------------------
function stepWorld(dt) {
  gameMinutes += dt * 0.5;
  applyDayNight();
  driving.setNight(nightF);
  // Weather (attempt 2): a shower rolls in every few minutes of play and
  // lasts 40–90 s. The factor eases in and out; every system that cares
  // (rain streaks, wet roads, grip, traffic, pedestrians, rain audio)
  // reads the same rainF, so the shower is one coherent state.
  rainTimer -= dt;
  if (rainTarget <= 0 && rainTimer <= 0) {
    rainTarget = 1;
    rainLeft = rng.range(WORLD.rainDurationMin, WORLD.rainDurationMax);
  } else if (rainTarget > 0) {
    rainLeft -= dt;
    if (rainLeft <= 0) {
      rainTarget = 0;
      rainTimer = rng.range(WORLD.rainEveryMin * 60 * 0.7, WORLD.rainEveryMin * 60 * 1.3);
    }
  }
  rainF += clamp(rainTarget - rainF, -dt / 5, dt / 5);
  const pos = playerPos();
  // Attempt 4 — dynamic weather: the storm cycle owns the sky now, and
  // the old timer shower just feeds the same rain level. The weather's
  // own rain wins when it is heavier; storms dim the streets too.
  wxSummary = weather.update(dt, pos.x, pos.z);
  const effRain = Math.max(rainF, wxSummary.rain);
  city.setStorm(wxSummary.condition === 'storm' ? 1 : wxSummary.condition === 'drizzle' ? 0.4 : 0);
  effects.setRain(effRain, pos.x, pos.z);
  city.setWet(effRain);
  driving.setRain(effRain);
  traffic.setRain(effRain);
  // Attempt 3 — night underglow: the fast cars' neon brightens with the
  // night factor, traffic and parked alike.
  traffic.setNight(nightF);
  for (const c of parked) setCarGlow(c.mesh, nightF);
  audio.setRainLevel(effRain);
  // Attempt 4 — night economy, per frame: rooftop beacons blink, the
  // market stall watches for the player, and Night Shift runs its
  // noise/eyes meters. A shot fired this frame counts as noise.
  beacons.update(dt);
  market.update(dt, pos.x, pos.z, nightF);
  const shotFired = shotSeq !== nightShotSeq;
  nightShotSeq = shotSeq;
  if (state === 'playing') {
    const speedNow = player.inCar ? Math.abs(player.inCar.speed) : (player.moving ? 3 : 0);
    nightops.update(dt, {
      playerX: pos.x,
      playerZ: pos.z,
      speed: speedNow,
      sneaking: player.sneaking,
      nightF,
      visibility: wxSummary.visibility,
      shotFired,
      inCar: !!player.inCar,
    });
  }
  // Attempt 5 — the new systems, per frame: the economy restocks on game
  // time (the clock runs 0.5 game-minutes per real second), the safehouse
  // mirrors the wanted heat and only cools it while Ria hides inside
  // (the shed heat is written back, so the HUD stars follow), and the
  // street race runs its clock while the player is racing.
  economy.update(dt / 120);
  safehouse.syncHeat(wanted.heat);
  if (safehouse.inside()) {
    safehouse.update(dt);
    wanted.heat = safehouse.heat;
    wanted.level = Math.min(WORLD.maxWanted, Math.floor(wanted.heat / 20));
  }
  if (state === 'playing') streetrace.update(dt);
  // Attempt 6 — the eleven new systems, per frame: fishing (Space reels
  // while a fish fights), the delivery / smuggling / taxi job clocks, the
  // radio (chase flips the station), and the gym needle. Businesses and
  // the chop shop settle once per in-game hour, on the hour change.
  if (state === 'playing') {
    fishing.tick(dt, { reel: input.down('Space') });
    delivery.tick(dt);
    smuggling.tick(dt);
    taxi.tick(dt);
    radio.tick(dt, { wanted: wanted.level, hour: hourFloat() });
    gym.tick(dt);
    // Round 7 — the ten new systems, per frame: metro trains run, fires
    // spread, walk-in clients lose patience, Rex follows, bus passengers
    // wait, food truck orders cook, bowling and pool sit idle until played,
    // charters sail, skate runs tick down, karaoke songs play out.
    subway.tick(dt);
    firefighter.tick(dt);
    barber.tick(dt);
    pet.tick(dt);
    busdriver.tick(dt);
    foodtruck.tick(dt);
    bowling.tick(dt);
    yacht.tick(dt);
    skatepark.tick(dt);
    karaoke.tick(dt);
    // Round 7b — the eighteen new systems tick per frame too.
    casinoroyale.tick(dt);
    angling.tick(dt);
    courier.tick(dt);
    ghosthunting.tick(dt);
    golf.tick(dt);
    helitours.tick(dt);
    prisonbreak.tick(dt);
    surfing.tick(dt);
    treasurehunting.tick(dt);
    recycling.tick(dt);
    droneRacing.tick(dt);
    tennis.tick(dt);
    hospital.tick(dt);
    restaurant.tick(dt);
    pawnshop.tick(dt);
    bodyguard.tick(dt);
    jetski.tick(dt);
    farming.tick(dt);
    // Round 7c — the thirty-two new systems tick per frame too.
    hunting.tick(dt);
    mining.tick(dt);
    logging.tick(dt);
    apiary.tick(dt);
    paleontology.tick(dt);
    parkRanger.tick(dt);
    stormChasing.tick(dt);
    horseRanch.tick(dt);
    scubaDiving.tick(dt);
    skydiving.tick(dt);
    hotAirBalloon.tick(dt);
    ferry.tick(dt);
    kayaking.tick(dt);
    windsurfing.tick(dt);
    lifeguard.tick(dt);
    coastGuard.tick(dt);
    brewery.tick(dt);
    bakery.tick(dt);
    sushiBar.tick(dt);
    coffeeShop.tick(dt);
    butcher.tick(dt);
    fishMarket.tick(dt);
    donutShop.tick(dt);
    vineyard.tick(dt);
    museum.tick(dt);
    esportsArena.tick(dt);
    comedyClub.tick(dt);
    streaming.tick(dt);
    hotel.tick(dt);
    carWash.tick(dt);
    stockTrading.tick(dt);
    politics.tick(dt);
    if (player.inCar && player.inCar.airborne && !stunt.state.airborne) {
      const ramp = STUNT_RAMPS.find((r) => Math.hypot(r.x - player.inCar.x, r.z - player.inCar.z) < 40) || null;
      stunt.startJump(ramp);
    }
    if (stunt.state.airborne && player.inCar) {
      if (player.inCar.airborne) stunt.tickAir(dt);
      else stunt.land(0.85);
    }
    const hourNow = Math.floor(gameMinutes / 60);
    if (hourNow !== lastGameHour) {
      lastGameHour = hourNow;
      businesses.tickHour(hourFloat());
      chopshop.tickHour();
      // Round 6 attempt 8 — once per in-game day: settle the nightclubs,
      // drift the property market and pay rent, and let bounty contracts
      // go cold. (settleDay/tickDay are idempotent per day, so a double
      // call on a save-load boundary is harmless.)
      const dayNow = dayCount();
      if (dayNow !== lastDay) {
        lastDay = dayNow;
        nightclub.settleDay(dayNow);
        realestate.tickDay(dayNow);
        bounty.tickDay(dayNow);
        // Attempt 9 — graffiti turf, market stalls, studio royalties,
        // eye cases, court dates and film shoots settle once a day too.
        graffiti.settleDay(dayNow);
        nightmarket.tickDay(dayNow);
        studio.tickDay(dayNow);
        detective.tickDay(dayNow);
        lawyer.tickDay(dayNow);
        film.tickDay(dayNow);
        // Round 7 — metro passes and delays, firehouse restock, barber
        // trends, Rex's overnight needs, depot service, truck restock,
        // alley reset, marina fees, sponsor pay and voice rest, once a day.
        subway.tickDay(dayNow);
        firefighter.tickDay(dayNow);
        barber.tickDay(dayNow);
        pet.tickDay(dayNow);
        busdriver.tickDay(dayNow);
        foodtruck.tickDay(dayNow);
        bowling.tickDay(dayNow);
        yacht.tickDay(dayNow);
        skatepark.tickDay(dayNow);
        karaoke.tickDay(dayNow);
        // Round 7b — the eighteen new systems settle once a day where they
        // support it (the nine B systems expose tickDay; the A ones do not).
        // Round 7c — the thirty-two new systems all expose tickDay, and the
        // same guard covers them.
        for (const s of [casinoroyale, angling, courier, ghosthunting, golf, helitours, prisonbreak, surfing, treasurehunting, recycling, droneRacing, tennis, hospital, restaurant, pawnshop, bodyguard, jetski, farming, hunting, mining, logging, apiary, paleontology, parkRanger, stormChasing, horseRanch, scubaDiving, skydiving, hotAirBalloon, ferry, kayaking, windsurfing, lifeguard, coastGuard, brewery, bakery, sushiBar, coffeeShop, butcher, fishMarket, donutShop, vineyard, museum, esportsArena, comedyClub, streaming, hotel, carWash, stockTrading, politics]) {
          if (typeof s.tickDay === 'function') s.tickDay(dayNow);
        }
      }
    }
  }
  const m = missions.current;

  // Mission timers and waypoint checks.
  if (state === 'playing' && m && missions.stage === 'active') {
    const timeout = missions.update(dt);
    if (timeout === 'timeout') {
      failMission('The package never arrived — time ran out.');
    } else {
      const pos = playerPos();
      if (m.id === 'homecoming' && missionPhase === 'go' && missions.atWaypoint(pos.x, pos.z, 10)) {
        completeMission();
      } else if (m.id === 'hotwheels' && missionPhase === 'escape' && wanted.level === 0 && missions.atWaypoint(pos.x, pos.z, 10)) {
        completeMission();
      } else if (m.id === 'thedrop' && missionPhase === 'go' && missions.atWaypoint(pos.x, pos.z, 9)) {
        completeMission();
      } else if (m.id === 'payback') {
        if (missionPhase === 'clear' && combat.aliveCount === 0) {
          missionPhase = 'escape';
          wanted.addHeat(80);
          missions.objective = 'Escape to Voss Garage — the whole city is looking';
          missions.setWaypoint(PLACES.garage.x, PLACES.garage.z - 14);
          hud.showBanner('DOCKS CLEAR', 'Silas Crown is finished — now disappear!', 3500);
        } else if (missionPhase === 'escape' && missions.atWaypoint(pos.x, pos.z, 10)) {
          completeMission();
        } else if (missionPhase === 'clear') {
          missions.objective = `Clear the docks of Crown guards (${combat.aliveCount} left)`;
        }
      }
    }
  }

  // Player / driving.
  if (state === 'playing') {
    if (player.inCar) driving.update(dt, input, traffic);
    else player.update(dt, input, city);
    // Attempt 3 — drift payout: a banked drift chain pays cash, $1 per 2
    // points, the moment the chain ends. The banner names the amount so
    // the payout is never silent money.
    if (player.inCar) {
      const bankedPoints = driving.takeBanked();
      if (bankedPoints > 0) {
        const cash = Math.floor(bankedPoints / WORLD.driftBankRate);
        if (cash > 0) {
          money += cash;
          hud.showBanner('DRIFT BANKED', `Clean slides paid +$${cash}`, 2500);
        }
      }
    }
    // Health comes back slowly once Ria has been out of danger a while.
    player.regen(dt, effects);
    combat.update(dt);
    // Shooting.
    if (!player.inCar && input.mouseDown) {
      const result = combat.shoot(camera, hittables());
      if (result) {
        lastShotResult = result;
        shotSeq += 1;
        wanted.addHeat(4);
        peds.scare(player.x, player.z, 40);
        if (result === 'ped') {
          wanted.addHeat(30);
          hud.showBanner('CIVILIAN DOWN', 'The cops will come for that.', 2500);
        } else if (result === 'car') wanted.addHeat(10);
      }
    }
    // (Reload is handled in frame(), next to the other one-shot actions.)
  }

  traffic.update(dt, player.inCar);
  // Pedestrians sidestep cars that close in: the player's car, traffic and
  // police all count as hazards. The rain factor is passed along, so a
  // shower makes them hurry instead of strolling.
  peds.update(dt, [
    ...(player.inCar ? [player.inCar] : []),
    ...traffic.cars,
    ...police.cars,
  ], rainF);
  effects.update(dt);

  // Enemies shoot back. The radio relay runs first, so a guard who just
  // spotted Ria (or took a bullet) tips off his neighbours this frame.
  if (state === 'playing') {
    combat.relayAlerts();
    for (const e of combat.enemies) {
      const shotInfo = e.update(dt, player, audio, effects);
      if (shotInfo) {
        audio.enemyShot();
        const hitChance = shotInfo.distance < 18 ? 0.55 : shotInfo.distance < 32 ? 0.32 : 0.14;
        if (Math.random() < hitChance) {
          player.damage(shotInfo.damage);
          lastHurtFlash = true;
        }
      }
    }
  }

  // Police + wanted.
  const px = player.inCar ? player.inCar.x : player.x;
  const pz = player.inCar ? player.inCar.z : player.z;
  const near = police.update(dt, wanted, player, player.inCar);
  wanted.update(dt, near);
  if (state === 'playing' && police.bustTimer > 1.5) {
    gameOver('BUSTED', 'The Solara PD caught up with Ria. Time in a cell — or a retry.');
    return;
  }
  if (state === 'playing' && player.health <= 0) {
    gameOver('WASTED', 'Ria went down. The city keeps moving.');
    return;
  }

  // Cameras.
  if (state === 'playing') {
    if (player.inCar) driving.placeCamera(camera, dt);
    else player.placeCamera(camera, dt);
  }

  // Prompts.
  if (state === 'playing') {
    if (sideJobs.offered && !sideJobs.active) {
      // The side-job offer (set above) keeps its prompt: Q is the only way
      // to take it, and the enter-car prompt would hide it.
    } else if (player.inCar) {
      hud.setPrompt(Math.abs(player.inCar.speed) < 3 ? 'E — Exit car' : '');
      hud.setCrosshair(false);
    } else {
      const car = nearestParked(4.5);
      hud.setPrompt(car ? `E — Enter the ${car.name}` : '');
      hud.setCrosshair(true);
    }
  }

  // Delayed mission starts / restarts.
  if (nextMissionTimer > 0) {
    nextMissionTimer -= dt;
    if (nextMissionTimer <= 0) startMission(missions.index);
  }
  if (failTimer > 0) {
    failTimer -= dt;
    if (failTimer <= 0) {
      resetMissionWorld();
      startMission(missions.index);
    }
  }

  // Side jobs (attempt 2): offered only while no story mission is active
  // and the player is on foot or driving in free play; a story mission
  // starting cancels any job or offer, so the two never fight over the
  // beacon. Q accepts an offer; arrival pays cash and saves.
  const storyFree = !m || missions.stage !== 'active';
  sideJobs.update(dt, state === 'playing' && storyFree);
  if (state === 'playing' && sideJobs.active) {
    const p = playerPos();
    const speed = player.inCar ? player.inCar.speed : 0;
    const done = sideJobs.checkArrival(p.x, p.z, speed);
    if (done === 'picked') {
      hud.showBanner('PICKED UP', 'Now deliver it — follow the cyan diamond.', 2500);
    } else if (done) {
      // Attempt 3 — a finished job pays its reward plus the streak bonus
      // and, when it completes a chain, the $500 chain bonus on top.
      const jobBonus = (done.streakBonus || 0) + (done.chainBonus || 0);
      money += done.reward + jobBonus;
      stats.sideJobs += 1;
      stats.sideEarned += done.reward + jobBonus;
      hud.showBanner('SIDE JOB DONE', `${done.title} — +$${done.reward}${jobBonus ? ` (+$${jobBonus} bonus)` : ''}${done.chainComplete ? ` — ${done.chainComplete} complete!` : ''}`, 3500);
      saveGame({ missionIndex: missions.index, money, stats: { ...stats, kills: combat.kills } });
    }
  }
  if (state === 'playing' && sideJobs.offered && !sideJobs.active) {
    hud.setPrompt(`Q — Accept side job: ${sideJobs.offered.title} ($${sideJobs.offered.reward})`);
  }

  // Tutorial (attempt 2): one short step at a time, advancing on what the
  // player actually does — move, then get in a car, then reach the beacon.
  if (state === 'playing' && tutorialStep >= 0) {
    const step = tutorialStep;
    if (step === 0 && (input.down('KeyW') || input.down('KeyA') || input.down('KeyS') || input.down('KeyD'))) {
      tutorialStep = 1;
      audio.chime();
    } else if (step === 1 && player.inCar) {
      tutorialStep = 2;
      audio.chime();
    } else if (step === 2 && missions.waypoint && missions.atWaypoint(playerPos().x, playerPos().z, 12)) {
      tutorialStep = -1;
      tutorialSeen = true;
      audio.chime();
      saveGame({ missionIndex: missions.index, money, stats: { ...stats, kills: combat.kills }, tutorialSeen: true });
    }
    hud.setTutorial(tutorialStep >= 0 ? `${TUTORIAL_STEPS[tutorialStep]}  (T to skip)` : '');
  }

  // HUD.
  if (state === 'playing') {
    const mapCars = [];
    for (const c of traffic.cars) mapCars.push({ x: c.x, z: c.z, police: false });
    for (const c of police.cars) mapCars.push({ x: c.x, z: c.z, police: true });
    hud.update(dt, {
      money,
      health: player.health,
      wanted: wanted.level,
      speed: player.inCar ? player.inCar.speed : 0,
      inCar: !!player.inCar,
      carHealth: player.inCar ? player.inCar.health : 100,
      ammo: combat.ammo,
      reloading: combat.reloadTimer > 0,
      missionTitle: m ? m.title : 'FREE ROAM',
      objective: missions.stage === 'active' ? missions.objective : missions.message,
      waypointDist: missions.waypoint ? Math.hypot(missions.waypoint.x - px, missions.waypoint.z - pz) : 0,
      timeLeft: m && m.id === 'thedrop' && missions.stage === 'active' ? missions.timeLeft : 0,
      clock: clockText(),
      dayPhase,
      hurt: player.hurtTimer > 0,
      px,
      pz,
      heading: player.inCar ? player.inCar.heading : player.heading,
      waypoint: missions.waypoint,
      cars: mapCars,
      parked: parked.map((c) => ({ x: c.x, z: c.z })),
      // Attempt 2 HUD state: rain icon, side-job diamond, named places.
      raining: rainF > 0.3,
      // Attempt 4 HUD state: weather outlook, night contract line, and
      // the Black Market line (stall prompt or open catalogue).
      outlook: weather.outlook(),
      nightops: [nightops.statusLine(), systemsHudLine()].filter(Boolean).join('  '),
      market: market.open ? market.statusLine(money, rep) : (market.nearStall ? market.statusLine(money, rep) : ''),
      sideWaypoint: sideJobs.waypoint,
      // Attempt 3 HUD state: drift meter, heli warning, roadblocks and
      // heli on the minimap, chain progress, worst damage zone.
      drift: driving.driftScore,
      drifting: driving.drifting,
      driftBanked: driving.bankedTotal,
      heli: police.heliActive,
      heliPos: police.heli ? { x: police.heli.x, z: police.heli.z } : null,
      roadblocks: police.roadblocks.map((c) => ({ x: c.x, z: c.z })),
      chain: sideJobs.chainStatus(),
      damage: driving.damageZones,
      places: [
        { x: PLACES.garage.x, z: PLACES.garage.z, name: 'Garage' },
        { x: PLACES.plaza.x, z: PLACES.plaza.z, name: 'Plaza' },
        { x: PLACES.marina.x, z: PLACES.marina.z, name: 'Marina' },
        { x: PLACES.docks.x, z: PLACES.docks.z, name: 'Docks' },
        { x: PLACES.hospital.x, z: PLACES.hospital.z, name: 'Hospital' },
        { x: PLACES.beach.x, z: PLACES.beach.z, name: 'Beach' },
      ],
    });
  }
  lastHurtFlash = false;
}

// --- menus ----------------------------------------------------------------------
$('btn-continue').addEventListener('click', () => startGame(false));
$('btn-new').addEventListener('click', () => startGame(true));
$('btn-how').addEventListener('click', () => $('howto').classList.toggle('hidden'));
$('btn-resume').addEventListener('click', () => {
  state = 'playing';
  showOnly(null);
  input.lockPointer();
});
$('btn-restart').addEventListener('click', () => {
  resetMissionWorld();
  startMission(missions.index);
  state = 'playing';
  showOnly(null);
  hudEl.classList.remove('hidden');
  input.lockPointer();
});
$('btn-mute').addEventListener('click', () => {
  muted = !muted;
  audio.setMuted(muted);
  $('btn-mute').textContent = `Mute: ${muted ? 'On' : 'Off'}`;
});
$('btn-quit').addEventListener('click', quitToTitle);
$('btn-retry').addEventListener('click', () => {
  resetMissionWorld();
  startMission(missions.index);
  state = 'playing';
  showOnly(null);
  hudEl.classList.remove('hidden');
  input.lockPointer();
});
$('btn-over-title').addEventListener('click', quitToTitle);
$('btn-freeroam').addEventListener('click', () => {
  state = 'playing';
  showOnly(null);
  hudEl.classList.remove('hidden');
  input.lockPointer();
  missions.objective = 'Free roam — Solara Bay is yours.';
  announce('Free roam.');
});
$('btn-continue').style.display = hasSave() ? '' : 'none';

document.addEventListener('visibilitychange', () => {
  if (document.hidden && state === 'playing') {
    state = 'paused';
    showOnly('menu-pause');
    audio.engine(null);
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- main loop --------------------------------------------------------------------
let last = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (state === 'playing') {
    const actions = input.takeActions();
    if (actions & ACT_PAUSE) {
      state = 'paused';
      showOnly('menu-pause');
      audio.engine(null);
      input.unlockPointer();
    } else if (actions & ACT_INTERACT) {
      handleInteract();
    }
    // Reload is checked here, next to the other one-shot actions: stepWorld
    // used to check it with a second takeActions(), but frame() had already
    // consumed the queue, so R never reloaded anything (found by playtest:
    // the pistol could only reload by firing the magazine dry).
    if (actions & ACT_RELOAD) combat.reload();
    // Q accepts an offered side job (attempt 2): the job's waypoint takes
    // over the cyan minimap diamond and the HUD objective line.
    if (actions & ACT_SIDEJOB && sideJobs.offered) {
      const job = sideJobs.accept();
      if (job) hud.showBanner(job.title, `${job.text}${job.chainNote ? ` (${job.chainNote})` : ''} Follow the cyan diamond on the minimap.`, 4000);
    }
    // T skips the tutorial (attempt 2) and remembers the skip in the save.
    if (actions & ACT_TUTORIAL && tutorialStep >= 0) {
      tutorialStep = -1;
      tutorialSeen = true;
      hud.setTutorial('');
      saveGame({ missionIndex: missions.index, money, stats: { ...stats, kills: combat.kills }, tutorialSeen: true });
    }
    // B opens/closes the Black Market while standing at the stall; N
    // takes the burner-phone contract when one is offered at night.
    if (actions & ACT_MARKET) {
      if (market.toggleShop()) hud.showBanner('BLACK MARKET', 'Press 1-9 to buy, B to leave. Prices move with crew standing.', 4000);
    }
    if (actions & ACT_NIGHTOPS && nightops.hasOffer) {
      nightops.acceptOffer();
    }
    // J casts / strikes while fishing (attempt 6); V toggles photo mode.
    if (actions & ACT_FISH) {
      if (fishing.state.phase === 'bite' || fishing.state.phase === 'waiting') fishing.strike();
      else if (fishing.state.phase === 'idle') {
        const spot = FISHING_SPOTS.find((s) => Math.hypot(s.x - playerPos().x, s.z - playerPos().z) < 14);
        if (spot) fishing.startFishing(spot);
        else hud.showBanner('FISHING', 'No fishing spot nearby — head to the waterfront.', 2500);
      }
    }
    if (actions & ACT_PHOTO) {
      if (photo.state.active) photo.exit();
      else photo.enter();
    }
    // G starts a street race when the player is in a car near a route
    // start (attempt 5); U slips into / out of an owned safehouse.
    if (actions & ACT_RACE && player.inCar) {
      const p = playerPos();
      let best = null;
      let bestD = 60;
      for (const r of ROUTES) {
        const d = Math.hypot(r.start.x - p.x, r.start.y - p.z);
        if (d < bestD) {
          bestD = d;
          best = r;
        }
      }
      if (best) {
        const res = streetrace.startRace(best.id);
        if (!res.ok) hud.showBanner('NO RACE', `Cannot start ${best.name}: ${res.reason}.`, 3000);
      } else {
        hud.showBanner('NO RACE', 'No race start line nearby — find a start on the map.', 3000);
      }
    }
    if (actions & ACT_SAFEHOUSE) {
      if (safehouse.inside()) {
        safehouse.exitSafehouse();
      } else {
        const p = playerPos();
        let best = null;
        let bestD = 48;
        for (const s of SAFEHOUSES) {
          const d = Math.hypot(s.x - p.x, s.y - p.z);
          if (d < bestD) {
            bestD = d;
            best = s;
          }
        }
        if (!best) hud.showBanner('NO SAFEHOUSE', 'No safehouse door nearby.', 2500);
        else {
          const res = safehouse.enterSafehouse(best.id);
          if (!res.ok) hud.showBanner('SAFEHOUSE', res.reason === 'not-owned' ? `${best.name} costs $${best.price} — buy it first.` : `Cannot hide: ${res.reason}.`, 3000);
        }
      }
    }
    // Digits 1-9 buy from the open shop; the digit queue holds one key.
    if (market.open) {
      const digit = input.takeDigit();
      if (digit >= 1 && digit <= 9) {
        const item = MARKET_ITEMS[digit - 1];
        if (item) {
          const result = market.buy(item.id, money, rep);
          if (result.ok) {
            money -= result.price;
            saveGame({ missionIndex: missions.index, money, rep, stats: { ...stats, kills: combat.kills }, tutorialSeen });
          } else {
            hud.showBanner('NO DEAL', `${item.name}: ${result.reason}.`, 3000);
          }
        }
      }
    }
    // C is sneak (attempt 4): crouch-walk on foot, half speed, half
    // noise — the Night Shift way to move. Driving never sneaks.
    player.setSneak(!player.inCar && input.down('KeyC'));
    if (actions & ACT_HORN && player.inCar) audio.horn();
    if (actions & ACT_MUTE) {
      muted = !muted;
      audio.setMuted(muted);
      $('btn-mute').textContent = `Mute: ${muted ? 'On' : 'Off'}`;
    }
    stepWorld(dt);
  } else if (state === 'title') {
    orbitAngle += dt * 0.045;
    camera.position.set(29 + Math.cos(orbitAngle) * 150, 48, 29 + Math.sin(orbitAngle) * 150);
    camera.lookAt(29, 10, 29);
    traffic.update(dt, null);
    peds.update(dt);
    effects.update(dt);
  }
  renderer.render(scene, camera);
}

// --- screenshot staging -------------------------------------------------------------
const fakeDriveInput = {
  moveAxes: () => ({ forward: 1, strafe: 0 }),
  down: () => false,
  takeMouseDelta: () => ({ dx: 0, dy: 0 }),
  takeActions: () => 0,
  mouseDown: false,
};

function stepFor(seconds) {
  const steps = Math.round(seconds * 60);
  for (let i = 0; i < steps; i += 1) stepWorld(1 / 60);
}

function runShot(name) {
  showOnly(null);
  hudEl.classList.remove('hidden');
  state = 'playing';
  money = 1250;
  if (name === 'start') {
    state = 'title';
    showOnly('menu-title');
    hudEl.classList.add('hidden');
    orbitAngle = 0.6;
    camera.position.set(29 + Math.cos(orbitAngle) * 150, 48, 29 + Math.sin(orbitAngle) * 150);
    camera.lookAt(29, 10, 29);
    stepFor(3);
  } else if (name === 'onfoot') {
    resetMissionWorld();
    startMission(0);
    player.x = 38;
    player.z = 48;
    player.heading = Math.PI * 0.9;
    player.camYaw = Math.PI * 0.95;
    player.mesh.position.set(player.x, 0, player.z);
    player.mesh.rotation.y = player.heading;
    player.snapCamera(camera);
    stepFor(3);
  } else if (name === 'drive') {
    resetMissionWorld();
    startMission(0);
    const comet = parked.find((c) => c.name === 'Comet GT');
    comet.x = 0;
    comet.z = 140;
    comet.heading = Math.PI;
    comet.speed = 26;
    driving.enter(comet);
    player.inCar = comet;
    player.mesh.visible = false;
    driving.snapCamera(camera);
    for (let i = 0; i < 150; i += 1) {
      driving.update(1 / 60, fakeDriveInput, traffic);
      traffic.update(1 / 60, comet);
      peds.update(1 / 60);
      driving.placeCamera(camera, 1 / 60);
    }
    hud.update(1 / 60, {
      money,
      health: player.health,
      wanted: wanted.level,
      speed: comet.speed,
      inCar: true,
      carHealth: comet.health,
      ammo: combat.ammo,
      reloading: false,
      missionTitle: '1 — Homecoming',
      objective: missions.objective,
      waypointDist: missions.waypoint ? Math.hypot(missions.waypoint.x - comet.x, missions.waypoint.z - comet.z) : 0,
      timeLeft: 0,
      clock: clockText(),
      dayPhase,
      hurt: false,
      px: comet.x,
      pz: comet.z,
      heading: comet.heading,
      waypoint: missions.waypoint,
      cars: [...traffic.cars.map((c) => ({ x: c.x, z: c.z, police: false })), ...police.cars.map((c) => ({ x: c.x, z: c.z, police: true }))],
      parked: parked.map((c) => ({ x: c.x, z: c.z })),
    });
  } else if (name === 'chase') {
    resetMissionWorld();
    // Stage this one at dusk (18:45) so the shot shows the day/night cycle
    // and the headlights, which switch on past a night factor of 0.25.
    gameMinutes = 18 * 60 + 45;
    applyDayNight();
    driving.setNight(nightF);
    missions.start(1);
    missions.begin();
    missionPhase = 'escape';
    missions.objective = 'Lose the cops, then return to Voss Garage';
    missions.setWaypoint(PLACES.garage.x, PLACES.garage.z - 14);
    wanted.addHeat(65);
    const comet = parked.find((c) => c.name === 'Comet GT');
    comet.x = 0;
    comet.z = 140;
    comet.heading = Math.PI;
    comet.speed = 30;
    driving.enter(comet);
    player.inCar = comet;
    player.mesh.visible = false;
    driving.snapCamera(camera);
    for (let i = 0; i < 210; i += 1) {
      driving.update(1 / 60, fakeDriveInput, traffic);
      traffic.update(1 / 60, comet);
      peds.update(1 / 60);
      const near = police.update(1 / 60, wanted, player, comet);
      wanted.update(1 / 60, near);
      driving.placeCamera(camera, 1 / 60);
    }
    // Stage the nearest police car ahead on the road so the chase reads in frame.
    if (police.cars.length) {
      let nearest = police.cars[0];
      let best = Infinity;
      for (const c of police.cars) {
        const d = Math.hypot(c.x - comet.x, c.z - comet.z);
        if (d < best) {
          best = d;
          nearest = c;
        }
      }
      nearest.x = comet.x - 4;
      nearest.z = comet.z - 32;
      nearest.heading = 0;
      nearest.speed = 12;
      syncCarMesh(nearest);
    }
    hud.update(1 / 60, {
      money,
      health: player.health,
      wanted: wanted.level,
      speed: comet.speed,
      inCar: true,
      carHealth: comet.health,
      ammo: combat.ammo,
      reloading: false,
      missionTitle: '2 — Hot Wheels',
      objective: missions.objective,
      waypointDist: missions.waypoint ? Math.hypot(missions.waypoint.x - comet.x, missions.waypoint.z - comet.z) : 0,
      timeLeft: 0,
      clock: clockText(),
      dayPhase,
      hurt: false,
      px: comet.x,
      pz: comet.z,
      heading: comet.heading,
      waypoint: missions.waypoint,
      cars: [...traffic.cars.map((c) => ({ x: c.x, z: c.z, police: false })), ...police.cars.map((c) => ({ x: c.x, z: c.z, police: true }))],
      parked: parked.map((c) => ({ x: c.x, z: c.z })),
    });
  }
  let painted = 0;
  function paint() {
    renderer.render(scene, camera);
    painted += 1;
    if (painted < 2) requestAnimationFrame(paint);
    else window.__shotReady = true;
  }
  requestAnimationFrame(paint);
}

if (shot) runShot(shot);
else {
  announce('Solara Nights. Choose New Game or Continue.');
  requestAnimationFrame(frame);
}
