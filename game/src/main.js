// Solara Nights — boot, the one loop, the state machine (title / playing /
// paused / wasted / busted / complete), mission wiring, and ?shot= staging
// for screenshots (stage a scene, step it forward, paint it, set __shotReady).
import * as THREE from 'three';
import { CITY_HALF, PLACES, WORLD } from './config.js';
import { makeRng, clamp } from './random.js';
import { buildCity } from './city.js';
import { AudioEngine } from './audio.js';
import { Effects } from './effects.js';
import { Input, ACT_INTERACT, ACT_PAUSE, ACT_RELOAD, ACT_HORN, ACT_MUTE } from './input.js';
import { Player } from './player.js';
import { Driving } from './driving.js';
import { TrafficSystem, spawnParkedCars, syncCarMesh } from './vehicles.js';
import { PedestrianSystem } from './pedestrians.js';
import { WantedSystem, PoliceSystem } from './police.js';
import { Combat } from './combat.js';
import { MissionManager, MISSIONS } from './missions.js';
import { HUD } from './hud.js';
import { saveGame, loadGame, clearSave, hasSave } from './save.js';

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
const driving = new Driving(city, audio, effects);
const hud = new HUD();

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
  get shotSeq() { return shotSeq; },
  get alive() { return combat.aliveCount; },
  get kills() { return combat.kills; },
  get dayPhase() { return dayPhase; },
  get clock() { return clockText(); },
  get police() { return police.cars.length + police.cops.length; },
  get parked() { return parked.map((c) => ({ name: c.name, x: c.x, z: c.z })); },
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
  hud.showBanner(m.title, m.briefing, 6000);
  announce(`${m.title}. ${m.objective}`);
}

function completeMission() {
  const finishedStory = missions.complete();
  if (finishedStory) {
    state = 'complete';
    hudEl.classList.add('hidden');
    input.unlockPointer();
    showOnly('menu-complete');
    audio.engine(null);
    audio.siren(false);
    saveGame({ missionIndex: MISSIONS.length, money });
    announce('Story complete. Free roam continues.');
    return;
  }
  // Save AFTER missions.complete() bumped the index, so Continue resumes at
  // the next mission instead of replaying the one just finished.
  saveGame({ missionIndex: missions.index, money });
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
  saveGame({ missionIndex: Math.min(missions.index, MISSIONS.length - 1), money });
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
    audio.blip();
    return;
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
  peds.update(dt);
  effects.update(dt);

  // Enemies shoot back.
  if (state === 'playing') {
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
    if (player.inCar) {
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
    // Stage this one at dusk (18:20) so the shot shows the day/night cycle.
    gameMinutes = 18 * 60 + 20;
    applyDayNight();
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
