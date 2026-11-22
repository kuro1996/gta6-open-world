# Solara Nights

[![Make GTA 6](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01)
[![Rank](https://make.fun/badge/gta6-01/kuro1996/gta6-open-world/rank.svg)](https://make.fun/bounty/gta6-01)
[![Reward](https://make.fun/badge/gta6-01/kuro1996/gta6-open-world/reward.svg)](https://make.fun/bounty/gta6-01)

**Solara Nights** is an original open-world crime game for the [Make GTA 6](https://make.fun/bounty/gta6-01)
bounty on make.fun. Ria Santos is back in Solara Bay — and the Crown Syndicate took her
brother's garage. Take jobs from fixer Mara Voss, steal what you need, outrun the Solara PD,
and take the city back, one mission at a time.

Nothing in it comes from Rockstar Games or any other commercial game: the city, characters,
vehicles, names, story, art, sound and music are all original.

## The game

- A sun-soaked coastal city to explore **on foot and by car** — roads, sidewalks, a beach,
  a marina and the Crown Docks
- **Traffic and pedestrians** with their own routines (and their own opinions about gunfire)
- **Cars to steal and drive** — sedans, taxis, trucks and the yellow Comet GT
- A **wanted level** (0–5 stars) with police cars that chase and ram, and foot cops that bust you
- **Four story missions** with a briefing, a waypoint beacon, a timer and a payout
- **Combat** — a pistol, syndicate guards who shoot back, health and reloads
- A **HUD with a live minimap**, money, health, speed and ammo
- A **day/night cycle** — the clock drives sun, sky, fog and streetlight glow
- **Police PIT tiers** — at 3+ stars the lead car aims for your rear quarter
- A **start screen, pause menu and save system** (progress autosaves after each mission)
- **Procedural sound** — engine hum, sirens, gunshots and a quiet synthwave loop (WebAudio, no files)

## Play it

Serve `game/` with any static file server and open it in desktop Chrome:

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network requests: every script, the Three.js engine
(`game/vendor/three/three.module.min.js`, vendored) and every sound is a file under `game/`.

Controls: **WASD** move / drive · **Mouse** look · **Shift** sprint · **E** enter / exit car ·
**Space** jump / handbrake · **Click** shoot · **R** reload · **P / Esc** pause · **H** horn · **M** mute.

## Round 3 — what changed (22 Nov 2026)

- **Day/night cycle** — the clock drives sun, sky, fog and streetlight glow; dusk and night change how chases feel.
- **Police PIT tiers** — at 3+ stars the lead car aims for your rear quarter to spin you out; top speed and foot-cop sprint scale with heat, and the siren wail quickens.
- **Ram cooldown** — a police car can only ram once per 1.5 s, so a chase stays a chase instead of a bumper glued to your car until escape is impossible.
- **Health regen** — Ria recovers slowly after 8 calm seconds, with green motes.
- **Mission variety** — The Drop's timer is now 120, 150 or 180 seconds at random; finishing with 30+ seconds left pays a $200 speed bonus; the waypoint beacon pulses.
- **Burnouts, horns, mute** — hold Space + W from a standstill to smoke the tyres; H honks; M mutes.
- **Voss Garage repairs your ride** — park by the garage door, nearly stopped, and the crew patches the car up.
- **Comet GT reparked** — it used to sit inside the plaza fountain's collision shell and grind against it instead of driving away; it now parks clear of the fountain.
- **Guards strafe** while shooting at the docks; pedestrians pause at corners and flee at their own pace; a Surfer Van parks on the beach and vans join traffic; the minimap marks stealable cars in gold and the clock shows the time of day.

## Entry

- `main.ts` (Node 22, standard library only) copies `game/` and `screenshots/` to `/output`
  and writes `/output/dossier.json` with the kit's vendored `vendor/makefun-game.ts`.
- `screenshots/` holds four real renders of the game running in a browser.

## License

MIT — see [LICENSE](LICENSE).
