// Solara Nights — procedural Solara Bay: road grid, buildings, beach, ocean,
// palms, streetlights, landmarks (Voss Garage, plaza, marina, docks, hospital).
// Every texture is drawn on a canvas at boot; no image files are loaded.
import * as THREE from 'three';
import { BLOCK, CITY_HALF, COLORS, GRID_K, PITCH, PLACES, ROAD_WIDTH } from './config.js';
import { clamp } from './random.js';

function canvasTexture(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function facadeTexture(base, litRatio, rng) {
  return canvasTexture(128, 256, (g, w, h) => {
    g.fillStyle = base;
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,0.12)';
    g.fillRect(0, h - 14, w, 14);
    for (let y = 14; y < h - 20; y += 22) {
      for (let x = 10; x < w - 14; x += 20) {
        g.fillStyle = rng.next() < litRatio ? '#ffd98a' : '#2c3e50';
        g.fillRect(x, y, 12, 14);
      }
    }
  });
}

function signTexture(text, bg, fg) {
  return canvasTexture(512, 128, (g, w, h) => {
    g.fillStyle = bg;
    g.fillRect(0, 0, w, h);
    g.fillStyle = fg;
    g.font = 'bold 64px system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, w / 2, h / 2 + 4);
  });
}

export function buildCity(scene, rng) {
  const colliders = [];
  const group = new THREE.Group();
  scene.add(group);

  const addCollider = (minX, maxX, minZ, maxZ) => {
    colliders.push({ minX, maxX, minZ, maxZ });
  };

  // --- ground, beach, ocean -------------------------------------------------
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(760, 760),
    new THREE.MeshLambertMaterial({ color: COLORS.ground }),
  );
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const sand = new THREE.Mesh(
    // 78 m wide, centred on 279: the sand runs x 240..318 and ends exactly
    // at the water collider, instead of overlapping 12 m into the ocean.
    new THREE.PlaneGeometry(78, 560),
    new THREE.MeshLambertMaterial({ color: COLORS.sand }),
  );
  sand.rotation.x = -Math.PI / 2;
  sand.position.set(279, 0.01, 0);
  group.add(sand);

  const ocean = new THREE.Mesh(
    new THREE.PlaneGeometry(420, 760),
    new THREE.MeshLambertMaterial({ color: COLORS.ocean }),
  );
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(540, 0.02, 0);
  group.add(ocean);
  addCollider(318, 760, -380, 380); // the water blocks walking and driving

  // --- roads and sidewalks --------------------------------------------------
  const roadMat = new THREE.MeshLambertMaterial({ color: COLORS.road });
  const walkMat = new THREE.MeshLambertMaterial({ color: COLORS.sidewalk });
  const roadLen = CITY_HALF * 2 + ROAD_WIDTH;
  for (let k = -GRID_K; k <= GRID_K; k += 1) {
    const c = k * PITCH;
    const roadX = new THREE.Mesh(new THREE.PlaneGeometry(roadLen, ROAD_WIDTH), roadMat);
    roadX.rotation.x = -Math.PI / 2;
    roadX.position.set(0, 0.03, c);
    group.add(roadX);
    const roadZ = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_WIDTH, roadLen), roadMat);
    roadZ.rotation.x = -Math.PI / 2;
    roadZ.position.set(c, 0.03, 0);
    group.add(roadZ);
  }
  // Block base slabs read as sidewalks.
  for (let bx = -GRID_K; bx < GRID_K; bx += 1) {
    for (let bz = -GRID_K; bz < GRID_K; bz += 1) {
      const cx = (bx + 0.5) * PITCH;
      const cz = (bz + 0.5) * PITCH;
      const slab = new THREE.Mesh(new THREE.PlaneGeometry(BLOCK + 4, BLOCK + 4), walkMat);
      slab.rotation.x = -Math.PI / 2;
      slab.position.set(cx, 0.02, cz);
      group.add(slab);
    }
  }
  // Lane dashes, one InstancedMesh for the whole city.
  const dashGeo = new THREE.BoxGeometry(0.35, 0.02, 3);
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xd8d8d8 });
  const dashSpots = [];
  for (let k = -GRID_K; k <= GRID_K; k += 1) {
    for (let d = -CITY_HALF + 8; d <= CITY_HALF - 8; d += 9) {
      const nearCross = Math.abs(((d % PITCH) + PITCH) % PITCH) < 9 || Math.abs(((d % PITCH) + PITCH) % PITCH - PITCH) < 9;
      if (nearCross) continue;
      dashSpots.push([d, k * PITCH, 0]);
      dashSpots.push([k * PITCH, d, 1]);
    }
  }
  const dashes = new THREE.InstancedMesh(dashGeo, dashMat, dashSpots.length);
  const m4 = new THREE.Matrix4();
  dashSpots.forEach(([x, z, rot], i) => {
    m4.makeRotationY(rot ? Math.PI / 2 : 0);
    m4.setPosition(x, 0.05, z);
    dashes.setMatrixAt(i, m4);
  });
  group.add(dashes);

  // --- buildings ------------------------------------------------------------
  const facades = [
    facadeTexture('#e8e0d0', 0.25, rng),
    facadeTexture('#dfe8ee', 0.2, rng),
    facadeTexture('#e8d8c8', 0.3, rng),
  ];
  const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
  const isLandmarkBlock = (bx, bz) => (bx === 0 && bz === 0) || (bx === -4 && bz === 3) || (bx === 3 && bz === -4);
  for (let bx = -GRID_K; bx < GRID_K; bx += 1) {
    for (let bz = -GRID_K; bz < GRID_K; bz += 1) {
      if (isLandmarkBlock(bx, bz)) continue;
      const cx = (bx + 0.5) * PITCH;
      const cz = (bz + 0.5) * PITCH;
      const distCentre = Math.abs(cx) + Math.abs(cz);
      const tall = distCentre < 130 ? rng.range(26, 62) : rng.range(12, 30);
      const mat = new THREE.MeshLambertMaterial({
        map: facades[rng.int(0, facades.length - 1)],
        color: COLORS.buildingPalette[rng.int(0, COLORS.buildingPalette.length - 1)],
      });
      if (rng.chance(0.65)) {
        const w = rng.range(24, 36);
        const d = rng.range(24, 36);
        const h = tall;
        const mesh = new THREE.Mesh(buildingGeo, mat);
        mesh.scale.set(w, h, d);
        mesh.position.set(cx, h / 2, cz);
        group.add(mesh);
        addCollider(cx - w / 2, cx + w / 2, cz - d / 2, cz + d / 2);
      } else {
        for (const [ox, oz] of [[-10, -10], [10, -10], [-10, 10], [10, 10]]) {
          if (rng.chance(0.25)) continue;
          const w = rng.range(14, 18);
          const d = rng.range(14, 18);
          const h = tall * rng.range(0.5, 0.9);
          const mesh = new THREE.Mesh(buildingGeo, mat);
          mesh.scale.set(w, h, d);
          mesh.position.set(cx + ox, h / 2, cz + oz);
          group.add(mesh);
          addCollider(cx + ox - w / 2, cx + ox + w / 2, cz + oz - d / 2, cz + oz + d / 2);
        }
      }
    }
  }

  // --- Voss Garage (landmark, south-west) ------------------------------------
  const garage = new THREE.Group();
  const garageBody = new THREE.Mesh(
    new THREE.BoxGeometry(34, 11, 20),
    new THREE.MeshLambertMaterial({ color: 0x2e6f6a }),
  );
  garageBody.position.y = 5.5;
  garage.add(garageBody);
  const garageDoor = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 7),
    new THREE.MeshLambertMaterial({ color: 0x1c1c22 }),
  );
  garageDoor.position.set(0, 3.5, 10.05);
  garage.add(garageDoor);
  const garageSign = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 6),
    new THREE.MeshBasicMaterial({ map: signTexture('VOSS GARAGE', '#123f3c', '#ffd23d') }),
  );
  garageSign.position.set(0, 9.5, 10.1);
  garage.add(garageSign);
  garage.position.set(PLACES.garage.x, 0, PLACES.garage.z);
  group.add(garage);
  addCollider(PLACES.garage.x - 17, PLACES.garage.x + 17, PLACES.garage.z - 10, PLACES.garage.z + 10);

  // --- Solara Plaza (landmark, centre): fountain, benches, palms -------------
  const plaza = new THREE.Group();
  const basin = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 7.5, 1.2, 20),
    new THREE.MeshLambertMaterial({ color: 0xcfc8b8 }),
  );
  basin.position.y = 0.6;
  plaza.add(basin);
  const water = new THREE.Mesh(
    new THREE.CylinderGeometry(6.4, 6.4, 0.3, 20),
    new THREE.MeshLambertMaterial({ color: 0x3fa8d8, emissive: 0x0a3a55 }),
  );
  water.position.y = 1.1;
  plaza.add(water);
  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 1.2, 4, 10),
    new THREE.MeshLambertMaterial({ color: 0xcfc8b8 }),
  );
  pillar.position.y = 3;
  plaza.add(pillar);
  plaza.position.set(PLACES.plaza.x, 0, PLACES.plaza.z);
  group.add(plaza);
  addCollider(PLACES.plaza.x - 7.5, PLACES.plaza.x + 7.5, PLACES.plaza.z - 7.5, PLACES.plaza.z + 7.5);

  // --- Hospital (landmark, north-east) ----------------------------------------
  const hospital = new THREE.Group();
  const hospBody = new THREE.Mesh(
    new THREE.BoxGeometry(30, 18, 22),
    new THREE.MeshLambertMaterial({ color: 0xf2f2ee }),
  );
  hospBody.position.y = 9;
  hospital.add(hospBody);
  const cross = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshBasicMaterial({ map: signTexture('+', '#c23b2e', '#ffffff') }),
  );
  cross.position.set(0, 14, 11.1);
  hospital.add(cross);
  hospital.position.set(PLACES.hospital.x, 0, PLACES.hospital.z);
  group.add(hospital);
  addCollider(PLACES.hospital.x - 15, PLACES.hospital.x + 15, PLACES.hospital.z - 11, PLACES.hospital.z + 11);

  // --- Marina and Crown Docks (south edge): containers, cranes, pier ----------
  const containerColors = [0xc23b2e, 0x2e6fc2, 0xe8c33a, 0x3aa655, 0xd4762e];
  for (let i = 0; i < 14; i += 1) {
    const x = -170 + (i % 7) * 26 + rng.range(-3, 3);
    const z = 258 + Math.floor(i / 7) * 14 + rng.range(-2, 2);
    const h = rng.chance(0.4) ? 5.4 : 2.7;
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(12, h, 6),
      new THREE.MeshLambertMaterial({ color: containerColors[i % containerColors.length] }),
    );
    box.position.set(x, h / 2, z);
    box.rotation.y = rng.chance(0.5) ? 0 : 0.02;
    group.add(box);
    addCollider(x - 6, x + 6, z - 3, z + 3);
  }
  for (const cx of [-150, -90]) {
    const crane = new THREE.Group();
    const legA = new THREE.Mesh(new THREE.BoxGeometry(1.5, 26, 1.5), new THREE.MeshLambertMaterial({ color: 0xd8b13a }));
    legA.position.set(-4, 13, 0);
    const legB = legA.clone();
    legB.position.x = 4;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(26, 1.5, 1.5), new THREE.MeshLambertMaterial({ color: 0xd8b13a }));
    arm.position.set(4, 25, 0);
    crane.add(legA, legB, arm);
    crane.position.set(cx, 0, 272);
    group.add(crane);
    addCollider(cx - 6, cx + 6, 270, 274);
  }

  // --- palms (instanced trunks + crowns) --------------------------------------
  const palmSpots = [];
  for (let z = -250; z <= 250; z += 26) palmSpots.push([248, z + rng.range(-4, 4)]);
  for (let x = -220; x <= 220; x += 44) {
    if (rng.chance(0.5)) palmSpots.push([x + rng.range(-4, 4), 248]);
  }
  for (let i = 0; i < 8; i += 1) {
    palmSpots.push([PLACES.plaza.x + rng.range(-20, 20), PLACES.plaza.z + rng.range(-20, 20)]);
  }
  const trunkGeo = new THREE.CylinderGeometry(0.25, 0.4, 7, 6);
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x8a6a48 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, palmSpots.length);
  const crownGeo = new THREE.IcosahedronGeometry(2.2, 0);
  const crownMat = new THREE.MeshLambertMaterial({ color: 0x2f7a3a });
  const crowns = new THREE.InstancedMesh(crownGeo, crownMat, palmSpots.length);
  palmSpots.forEach(([x, z], i) => {
    m4.makeRotationZ(rng.range(-0.08, 0.08));
    m4.setPosition(x, 3.5, z);
    trunks.setMatrixAt(i, m4);
    m4.makeScale(1, 0.45, 1);
    m4.setPosition(x, 7.4, z);
    crowns.setMatrixAt(i, m4);
  });
  group.add(trunks, crowns);

  // --- streetlights (instanced poles + bulbs) ---------------------------------
  const lightSpots = [];
  for (let k = -GRID_K; k <= GRID_K; k += 2) {
    for (const d of [-174, -58, 58, 174]) {
      lightSpots.push([d, k * PITCH + 8]);
      lightSpots.push([k * PITCH + 8, d]);
    }
  }
  const poleGeo = new THREE.CylinderGeometry(0.12, 0.12, 7, 6);
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x3a3a40 });
  const poles = new THREE.InstancedMesh(poleGeo, poleMat, lightSpots.length);
  const bulbGeo = new THREE.SphereGeometry(0.35, 8, 6);
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffe9a8 });
  const bulbs = new THREE.InstancedMesh(bulbGeo, bulbMat, lightSpots.length);
  lightSpots.forEach(([x, z], i) => {
    m4.identity();
    m4.setPosition(x, 3.5, z);
    poles.setMatrixAt(i, m4);
    m4.setPosition(x, 7, z);
    bulbs.setMatrixAt(i, m4);
  });
  group.add(poles, bulbs);

  // --- beach umbrellas ---------------------------------------------------------
  for (let i = 0; i < 6; i += 1) {
    const x = 258 + rng.range(0, 30);
    const z = -200 + i * 70 + rng.range(-8, 8);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3, 6), poleMat);
    stick.position.set(x, 1.5, z);
    const top = new THREE.Mesh(
      new THREE.ConeGeometry(2.4, 1.1, 8),
      new THREE.MeshLambertMaterial({ color: containerColors[i % containerColors.length] }),
    );
    top.position.set(x, 3.4, z);
    group.add(stick, top);
  }

  // --- collision ---------------------------------------------------------------
  function collideCircle(x, z, r) {
    let hit = false;
    for (let iter = 0; iter < 3; iter += 1) {
      let pushed = false;
      for (const c of colliders) {
        const nx = clamp(x, c.minX, c.maxX);
        const nz = clamp(z, c.minZ, c.maxZ);
        const dx = x - nx;
        const dz = z - nz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= r * r) continue;
        hit = true;
        pushed = true;
        if (d2 > 1e-6) {
          const d = Math.sqrt(d2);
          x = nx + (dx / d) * r;
          z = nz + (dz / d) * r;
        } else {
          // Centre inside the box: push out along the smallest penetration.
          const pl = x - c.minX;
          const pr = c.maxX - x;
          const pt = z - c.minZ;
          const pb = c.maxZ - z;
          const m = Math.min(pl, pr, pt, pb);
          if (m === pl) x = c.minX - r;
          else if (m === pr) x = c.maxX + r;
          else if (m === pt) z = c.minZ - r;
          else z = c.maxZ + r;
        }
      }
      if (!pushed) break;
    }
    return { x, z, hit };
  }

  return {
    group,
    colliders,
    collideCircle,
    garageDoor: { x: PLACES.garage.x, z: PLACES.garage.z - 12 },
    // f is 0 by day and 1 at night: the streetlight bulbs go from a pale
    // daylight white to a warm sodium glow, one shared material change
    // for the whole city instead of per-instance work.
    setNight(f) {
      const c = new THREE.Color(0xffe9a8).lerp(new THREE.Color(0xffc23d), f);
      bulbMat.color.copy(c);
    },
  };
}
