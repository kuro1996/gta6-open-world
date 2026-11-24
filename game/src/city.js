import * as THREE from 'three';
import * as CFG from './config.js';
import * as RND from './random.js';

const BLOCK = typeof CFG.BLOCK === 'number' ? CFG.BLOCK : 40;
const CITY_HALF = typeof CFG.CITY_HALF === 'number' ? CFG.CITY_HALF : 280;
const GRID_K = typeof CFG.GRID_K === 'number' ? CFG.GRID_K : 7;
const PITCH = typeof CFG.PITCH === 'number' ? CFG.PITCH : 40;
const ROAD_WIDTH = typeof CFG.ROAD_WIDTH === 'number' ? CFG.ROAD_WIDTH : 12;

function clamp(v, a, b) {
  if (typeof RND.clamp === 'function') return RND.clamp(v, a, b);
  return Math.max(a, Math.min(b, v));
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function makeFacadeTexture(rng) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const base = ['#3a4a5a', '#5a4a3a', '#4a3a5a', '#2a3a4a'][Math.floor(rng() * 4)];
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 128, 256);
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 6; col++) {
      ctx.fillStyle = rng() < 0.5 ? '#ffd98a' : '#1a2430';
      ctx.fillRect(8 + col * 20, 10 + row * 20, 12, 12);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export function buildCity(scene, rng) {
  const rand = typeof rng === 'function' ? rng : Math.random;
  const group = new THREE.Group();
  scene.add(group);
  const colliders = [];

  const groundMat = new THREE.MeshStandardMaterial({ color: 0x4a5a3a });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(760, 760), groundMat);
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const sandMat = new THREE.MeshStandardMaterial({ color: 0xd9c28a });
  const sand = new THREE.Mesh(new THREE.PlaneGeometry(78, 560), sandMat);
  sand.rotation.x = -Math.PI / 2;
  sand.position.set(279, 0.1, 0);
  group.add(sand);

  const oceanMat = new THREE.MeshStandardMaterial({ color: 0x1a5a8a });
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(420, 760), oceanMat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(540, 0.05, 0);
  group.add(ocean);

  colliders.push({ minX: 318, maxX: 760, minZ: -380, maxZ: 380 });

  const roadMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2e });
  const roadBase = { r: 0x2a / 255, g: 0x2a / 255, b: 0x2e / 255 };
  const groundBase = { r: 0x4a / 255, g: 0x5a / 255, b: 0x3a / 255 };
  const roadColor = new THREE.Color(0x2a2a2e);

  for (let k = -GRID_K; k <= GRID_K; k++) {
    const pos = k * PITCH;
    const roadX = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_WIDTH, 760), roadMat);
    roadX.rotation.x = -Math.PI / 2;
    roadX.position.set(pos, 0.15, 0);
    group.add(roadX);
    const roadZ = new THREE.Mesh(new THREE.PlaneGeometry(760, ROAD_WIDTH), roadMat);
    roadZ.rotation.x = -Math.PI / 2;
    roadZ.position.set(0, 0.15, pos);
    group.add(roadZ);
  }

  const dashGeo = new THREE.BoxGeometry(1.2, 0.1, 4);
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xdddd88 });
  const dashCount = (GRID_K * 2 + 1) * 24;
  const dashes = new THREE.InstancedMesh(dashGeo, dashMat, dashCount);
  const dummy = new THREE.Object3D();
  let di = 0;
  for (let k = -GRID_K; k <= GRID_K && di < dashCount; k++) {
    for (let i = 0; i < 24 && di < dashCount; i++) {
      dummy.position.set(k * PITCH, 0.2, -360 + i * 30);
      dummy.updateMatrix();
      dashes.setMatrixAt(di, dummy.matrix);
      di += 1;
    }
  }
  dashes.count = di;
  group.add(dashes);

  const zebraGeo = new THREE.BoxGeometry(ROAD_WIDTH, 0.1, 2);
  const zebraMat = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
  const zebras = new THREE.InstancedMesh(zebraGeo, zebraMat, 16);
  let zi = 0;
  for (let k = -2; k <= 2; k++) {
    dummy.position.set(k * PITCH, 0.2, 0);
    dummy.rotation.y = 0;
    dummy.updateMatrix();
    zebras.setMatrixAt(zi, dummy.matrix);
    zi += 1;
    dummy.position.set(0, 0.2, k * PITCH);
    dummy.rotation.y = Math.PI / 2;
    dummy.updateMatrix();
    zebras.setMatrixAt(zi, dummy.matrix);
    zi += 1;
  }
  zebras.count = zi;
  group.add(zebras);

  const facades = [];
  for (let i = 0; i < 3; i++) facades.push(makeFacadeTexture(rand));
  const containerColors = [0xc23a2a, 0x2a7ac2, 0x3aa23a, 0xd9a02a, 0x7a3ac2];
  const palette = [0x8a7a6a, 0x6a7a8a, 0x9a8a7a, 0x7a6a5a, 0x5a6a7a];

  const garagePos = { x: 140, z: -90 };
  const plazaPos = { x: 0, z: 0 };
  const hospitalPos = { x: -100, z: -60 };

  function nearLandmark(x, z) {
    return (
      Math.hypot(x - garagePos.x, z - garagePos.z) < BLOCK ||
      Math.hypot(x - plazaPos.x, z - plazaPos.z) < BLOCK ||
      Math.hypot(x - hospitalPos.x, z - hospitalPos.z) < BLOCK
    );
  }

  function addBox(x, z, w, h, d, color, tex) {
    const mat = tex
      ? new THREE.MeshStandardMaterial({ map: tex, color })
      : new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, h / 2, z);
    group.add(mesh);
    return mesh;
  }

  for (let gx = -GRID_K; gx <= GRID_K; gx++) {
    for (let gz = -GRID_K; gz <= GRID_K; gz++) {
      const cx = gx * PITCH + PITCH / 2;
      const cz = gz * PITCH + PITCH / 2;
      if (Math.abs(cx) > CITY_HALF || Math.abs(cz) > CITY_HALF) continue;
      if (nearLandmark(cx, cz)) continue;
      const central = Math.abs(cx) < 120 && Math.abs(cz) < 120;
      const tall = central ? 26 + rand() * 36 : 12 + rand() * 18;
      const tex = pick(rand, facades);
      const color = pick(rand, palette);
      if (rand() < 0.65) {
        const w = 22 + rand() * 10;
        addBox(cx, cz, w, tall, w, color, tex);
        colliders.push({ minX: cx - w / 2, maxX: cx + w / 2, minZ: cz - w / 2, maxZ: cz + w / 2 });
      } else {
        const count = 2 + Math.floor(rand() * 3);
        for (let i = 0; i < count; i++) {
          const ox = cx + (rand() - 0.5) * 20;
          const oz = cz + (rand() - 0.5) * 20;
          const w = 10 + rand() * 6;
          const h = tall * (0.5 + rand() * 0.5);
          addBox(ox, oz, w, h, w, color, tex);
          colliders.push({ minX: ox - w / 2, maxX: ox + w / 2, minZ: oz - w / 2, maxZ: oz + w / 2 });
        }
      }
    }
  }

  let garageDoor = null;
  {
    const body = addBox(garagePos.x, garagePos.z, 30, 10, 20, 0x1a8a7a, null);
    void body;
    garageDoor = new THREE.Mesh(new THREE.BoxGeometry(12, 7, 1), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    garageDoor.position.set(garagePos.x, 3.5, garagePos.z + 10.5);
    group.add(garageDoor);
    const sign = new THREE.Mesh(new THREE.BoxGeometry(16, 3, 0.5), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    sign.position.set(garagePos.x, 11, garagePos.z + 10.5);
    group.add(sign);
    const signTop = new THREE.Mesh(new THREE.BoxGeometry(14, 1.5, 0.6), new THREE.MeshStandardMaterial({ color: 0xffd92a }));
    signTop.position.set(garagePos.x, 11, garagePos.z + 10.6);
    group.add(signTop);
    colliders.push({ minX: garagePos.x - 15, maxX: garagePos.x + 15, minZ: garagePos.z - 10, maxZ: garagePos.z + 10 });
  }

  {
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 1.5, 24), new THREE.MeshStandardMaterial({ color: 0x9a9a9a }));
    basin.position.set(plazaPos.x, 0.75, plazaPos.z);
    group.add(basin);
    const water = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 8.5, 0.5, 24), new THREE.MeshStandardMaterial({ color: 0x3a9ad9 }));
    water.position.set(plazaPos.x, 1.4, plazaPos.z);
    group.add(water);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.5, 6, 12), new THREE.MeshStandardMaterial({ color: 0xcccccc }));
    pillar.position.set(plazaPos.x, 4, plazaPos.z);
    group.add(pillar);
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const bx = plazaPos.x + Math.cos(angle) * 16;
      const bz = plazaPos.z + Math.sin(angle) * 16;
      const bench = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 1.5), new THREE.MeshStandardMaterial({ color: 0x6a4a2a }));
      bench.position.set(bx, 0.5, bz);
      bench.rotation.y = -angle + Math.PI / 2;
      group.add(bench);
      colliders.push({ minX: bx - 2, maxX: bx + 2, minZ: bz - 0.75, maxZ: bz + 0.75 });
    }
  }

  {
    addBox(hospitalPos.x, hospitalPos.z, 34, 16, 24, 0xf2f2f2, null);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(2, 8, 0.5), new THREE.MeshStandardMaterial({ color: 0xc22a2a }));
    crossV.position.set(hospitalPos.x, 18, hospitalPos.z + 12.2);
    group.add(crossV);
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 0.5), new THREE.MeshStandardMaterial({ color: 0xc22a2a }));
    crossH.position.set(hospitalPos.x, 18, hospitalPos.z + 12.2);
    group.add(crossH);
    colliders.push({ minX: hospitalPos.x - 17, maxX: hospitalPos.x + 17, minZ: hospitalPos.z - 12, maxZ: hospitalPos.z + 12 });
  }

  for (let i = 0; i < 14; i++) {
    const cx = -240 + (i % 7) * 12;
    const cz = 120 + Math.floor(i / 7) * 14;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 4, 4), new THREE.MeshStandardMaterial({ color: containerColors[i % containerColors.length] }));
    mesh.position.set(cx, 2, cz);
    group.add(mesh);
    colliders.push({ minX: cx - 5, maxX: cx + 5, minZ: cz - 2, maxZ: cz + 2 });
  }
  for (let i = 0; i < 2; i++) {
    const crane = new THREE.Mesh(new THREE.BoxGeometry(4, 40, 4), new THREE.MeshStandardMaterial({ color: 0xd9a02a }));
    crane.position.set(-220 + i * 40, 20, 150);
    group.add(crane);
  }

  const palmSpots = [];
  for (let i = 0; i < 12; i++) palmSpots.push({ x: 300 + rand() * 10, z: -260 + i * 48 });
  for (let i = 0; i < 8; i++) palmSpots.push({ x: -260 + i * 70, z: 270 });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    palmSpots.push({ x: plazaPos.x + Math.cos(a) * 26, z: plazaPos.z + Math.sin(a) * 26 });
  }
  const trunkGeo = new THREE.CylinderGeometry(0.4, 0.6, 7, 6);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6a4a2a });
  const crownGeo = new THREE.SphereGeometry(2.5, 8, 6);
  const crownMat = new THREE.MeshStandardMaterial({ color: 0x2a8a3a });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, palmSpots.length);
  const crowns = new THREE.InstancedMesh(crownGeo, crownMat, palmSpots.length);
  palmSpots.forEach((p, i) => {
    dummy.position.set(p.x, 3.5, p.z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);
    dummy.position.set(p.x, 7.5, p.z);
    dummy.updateMatrix();
    crowns.setMatrixAt(i, dummy.matrix);
  });
  group.add(trunks);
  group.add(crowns);

  const lightSpots = [];
  for (let gx = -GRID_K; gx <= GRID_K; gx += 2) {
    for (let gz = -GRID_K; gz <= GRID_K; gz += 2) {
      lightSpots.push({ x: gx * PITCH, z: gz * PITCH });
    }
  }
  const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 6, 6);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const bulbGeo = new THREE.SphereGeometry(0.5, 8, 6);
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfff2cc });
  const poles = new THREE.InstancedMesh(poleGeo, poleMat, lightSpots.length);
  const bulbs = new THREE.InstancedMesh(bulbGeo, bulbMat, lightSpots.length);
  lightSpots.forEach((p, i) => {
    dummy.position.set(p.x, 3, p.z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    poles.setMatrixAt(i, dummy.matrix);
    dummy.position.set(p.x, 6.2, p.z);
    dummy.updateMatrix();
    bulbs.setMatrixAt(i, dummy.matrix);
  });
  group.add(poles);
  group.add(bulbs);

  for (let i = 0; i < 6; i++) {
    const ux = 270 + rand() * 20;
    const uz = -220 + i * 88;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3, 6), new THREE.MeshStandardMaterial({ color: 0xdddddd }));
    pole.position.set(ux, 1.5, uz);
    group.add(pole);
    const top = new THREE.Mesh(new THREE.ConeGeometry(3, 1.5, 8), new THREE.MeshStandardMaterial({ color: pick(rand, [0xe23a5a, 0x2a7ac2, 0xffd92a]) }));
    top.position.set(ux, 3.5, uz);
    group.add(top);
  }

  const cityObj = {
    group,
    colliders,
    collideCircle,
    garageDoor,
    groundMat,
    wet: 0,
    storm: 0,
    setNight,
    setWet,
    setStorm,
  };

  function collideCircle(x, z, radius) {
    let px = x;
    let pz = z;
    let hit = false;
    for (let pass = 0; pass < 3; pass++) {
      let moved = false;
      for (const box of colliders) {
        const cx = clamp(px, box.minX, box.maxX);
        const cz = clamp(pz, box.minZ, box.maxZ);
        const dx = px - cx;
        const dz = pz - cz;
        const distSq = dx * dx + dz * dz;
        if (distSq >= radius * radius) continue;
        hit = true;
        moved = true;
        if (distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          px = cx + (dx / dist) * radius;
          pz = cz + (dz / dist) * radius;
        } else {
          const left = px - box.minX;
          const right = box.maxX - px;
          const top = pz - box.minZ;
          const bottom = box.maxZ - pz;
          const min = Math.min(left, right, top, bottom);
          if (min === left) px = box.minX - radius;
          else if (min === right) px = box.maxX + radius;
          else if (min === top) pz = box.minZ - radius;
          else pz = box.maxZ + radius;
        }
      }
      if (!moved) break;
    }
    return { x: px, z: pz, hit };
  }

  function setNight(factor) {
    const day = new THREE.Color(0xfff2cc);
    const night = new THREE.Color(0xff9a2a);
    bulbMat.color.lerpColors(day, night, clamp(factor, 0, 1));
  }

  function applyDimming() {
    const roadDim = cityObj.wet * 0.35 + cityObj.storm * 0.25;
    const groundDim = cityObj.wet * 0.18 + cityObj.storm * 0.12;
    roadMat.color.setRGB(roadBase.r * (1 - roadDim), roadBase.g * (1 - roadDim), roadBase.b * (1 - roadDim));
    groundMat.color.setRGB(groundBase.r * (1 - groundDim), groundBase.g * (1 - groundDim), groundBase.b * (1 - groundDim));
  }

  function setWet(factor) {
    cityObj.wet = clamp(factor, 0, 1);
    applyDimming();
  }

  function setStorm(factor) {
    cityObj.storm = clamp(factor, 0, 1);
    applyDimming();
  }

  return cityObj;
}

export function buildRooftopBeacons(scene, rng) {
  const rand = typeof rng === 'function' ? rng : Math.random;
  const group = new THREE.Group();
  scene.add(group);
  const spots = [];
  for (let i = 0; i < 6; i++) {
    spots.push({ x: -200 + rand() * 400, z: -200 + rand() * 400, h: 40 + rand() * 25 });
  }
  const lights = [];
  const spheres = [];
  for (const spot of spots) {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff2222 }));
    sphere.position.set(spot.x, spot.h, spot.z);
    group.add(sphere);
    const light = new THREE.PointLight(0xff2222, 2, 60);
    light.position.set(spot.x, spot.h, spot.z);
    group.add(light);
    spheres.push(sphere);
    lights.push(light);
  }
  let clock = 0;
  const phase = rand() * Math.PI * 2;
  function update(dt) {
    clock += dt || 0;
    const t = (clock + phase) % 3;
    const on = t < 1;
    for (let i = 0; i < lights.length; i++) {
      if (on) {
        const pulse = 1 + Math.sin(clock * 6) * 0.3;
        spheres[i].scale.set(pulse, pulse, pulse);
        lights[i].intensity = 2 * pulse;
      } else {
        spheres[i].scale.set(0.6, 0.6, 0.6);
        lights[i].intensity = 0.2;
      }
    }
  }
  return { group, count: 6, update };
}
