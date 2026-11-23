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

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Round 4 polish attempt 6 (22 Nov 2026): eleven more all-new systems on
// top of attempt 5 — shore fishing (fishing.js), the Solara Royale casino
// (casino.js), buyable businesses (businesses.js), courier deliveries
// (delivery.js), stunt jumps (stunt.js), the in-car radio (radio.js),
// photo mode (photo.js), smuggling runs (smuggling.js), the gym
// (gym.js), the chop shop (chopshop.js) and taxi shifts (taxi.js) —
// plus J to fish and V for photo mode, save v5 restores all eleven.
// Round 4 attempt 7 (22 Nov 2026): three more — the boardwalk arcade
// (arcade.js), bank-heist planning with vault cracking (bank.js), and the
// Voss Garage tuning shop (tuning.js). See README "Round 4 — what changed,
// attempt 7".
// Round 6 attempt 8 (23 Nov 2026): five more — nightclubs (nightclub.js),
// bounty hunting (bounty.js), car meets (carmeet.js), real estate
// (realestate.js) and the fight club (fightclub.js). See README "Round 6 —
// what changed, attempt 8".
const ROUND = 4;
console.log(`Solara Nights — round ${ROUND} build, handing in game/ + screenshots/`);

// Fail fast on a missing entry point instead of handing in an empty game.
if (!existsSync(join(here, 'game', 'index.html'))) {
  throw new Error('game/index.html is missing — nothing to hand in');
}
// Second pass: the entry point is not the whole game — fail fast when a
// source module is missing too, instead of handing in a broken bundle.
for (const src of ['main.js', 'config.js', 'missions.js', 'police.js', 'driving.js', 'vehicles.js', 'hud.js', 'city.js', 'combat.js', 'player.js', 'audio.js', 'weather.js', 'nightops.js', 'blackmarket.js', 'economy.js', 'safehouse.js', 'streetrace.js', 'fishing.js', 'casino.js', 'businesses.js', 'delivery.js', 'stunt.js', 'radio.js', 'photo.js', 'smuggling.js', 'gym.js', 'chopshop.js', 'taxi.js', 'arcade.js', 'bank.js', 'tuning.js', 'nightclub.js', 'bounty.js', 'carmeet.js', 'realestate.js', 'fightclub.js', 'graffiti.js', 'nightmarket.js', 'studio.js', 'detective.js', 'lawyer.js', 'film.js']) {
  if (!existsSync(join(here, 'game', 'src', src))) {
    throw new Error(`game/src/${src} is missing — the game cannot run`);
  }
}
// Fail fast on missing screenshots too: a game handed in with no renders
// would score on code alone, and the judge reads the pictures first.
const shotsDir = join(here, 'screenshots');
const shotFiles = existsSync(shotsDir) ? readdirSync(shotsDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f)) : [];
if (shotFiles.length === 0) {
  throw new Error('screenshots/ holds no renders — retake them before handing in');
}
// Attempt 3: a render over the 256 KiB cap would be refused by the scorer,
// so check the bytes here instead of discovering it at grading time.
for (const f of shotFiles) {
  const bytes = statSync(join(shotsDir, f)).size;
  if (bytes > 262144) {
    throw new Error(`screenshots/${f} is ${bytes} bytes — over the 256 KiB cap, retake it at lower quality`);
  }
  console.log(`Screenshot ${f}: ${bytes} bytes`);
}
// Attempt 2: the shots.json manifest must describe exactly the renders
// being handed in — a stale manifest would tell the judge about pictures
// that are not in the bundle.
const shotsJsonPath = join(here, 'shots.json');
if (existsSync(shotsJsonPath)) {
  const manifest = JSON.parse(readFileSync(shotsJsonPath, 'utf8'));
  const manifestNames = manifest.map((s) => s.name).sort();
  const actualNames = [...shotFiles].sort();
  if (JSON.stringify(manifestNames) !== JSON.stringify(actualNames)) {
    throw new Error(`shots.json names (${manifestNames.join(', ')}) do not match screenshots/ (${actualNames.join(', ')}) — retake or fix the manifest`);
  }
  // Attempt 3: the manifest must also carry the round the shots were
  // taken in, so a stale round-3 render cannot slip into a round-4 entry.
  for (const s of manifest) {
    if (s.round !== ROUND) {
      throw new Error(`shots.json entry ${s.name} is marked round ${s.round}, not round ${ROUND} — retake it`);
    }
  }
  console.log(`shots.json manifest matches: ${manifestNames.join(', ')} (round ${ROUND})`);
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
