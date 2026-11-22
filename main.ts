// Solara Nights — a working gta6-01 entry (Node 22, standard library only):
// the game is this directory's game/ folder, plain static files a desktop
// browser loads offline (game/index.html and its ES modules, the vendored
// three.js under game/vendor/, no network request), and the program hands
// it in. It copies game/ and screenshots/ from beside this file to /output
// and writes /output/dossier.json, the summary the judge reads, with the
// vendored make.fun library. Serve it locally with `node serve.ts`, then
// open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Round 4 polish (22 Nov 2026): car health bar, night headlights, skid and
// reverse sounds, guard flinch + pistol damage falloff, muzzle-flash light,
// pedestrians dodging cars, traffic respawn, 5-star cop sprint, camera shake
// on damage, mission attempt counter, save v3 with stats, crosswalks and
// plaza benches, an eighth parked car — see README "Round 4 — what changed".
const ROUND = 4;
console.log(`Solara Nights — round ${ROUND} build, handing in game/ + screenshots/`);

// Fail fast on a missing entry point instead of handing in an empty game.
if (!existsSync(join(here, 'game', 'index.html'))) {
  throw new Error('game/index.html is missing — nothing to hand in');
}
// Fail fast on missing screenshots too: a game handed in with no renders
// would score on code alone, and the judge reads the pictures first.
const shotsDir = join(here, 'screenshots');
const shotFiles = existsSync(shotsDir) ? readdirSync(shotsDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f)) : [];
if (shotFiles.length === 0) {
  throw new Error('screenshots/ holds no renders — retake them before handing in');
}
console.log(`Screenshots: ${shotFiles.length} render(s) — ${shotFiles.join(', ')}`);

mkdirSync(out, { recursive: true });
// Count the files being handed in, so the log shows the entry's size.
const countFiles = (dir) => {
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? countFiles(join(dir, e.name)) : 1;
  }
  return n;
};
console.log(`Handing in ${countFiles(join(here, 'game'))} game file(s) + ${shotFiles.length} screenshot(s)`);
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files in game/ or 48 MiB of game
// files, in all, or a path under game/ over 1000 bytes: game/ counts beside /output's own 1000-entry cap, its
// screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
