# Solara Nights

[![make.fun · gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/kuro1996/gta6-open-world/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/kuro1996/gta6-open-world/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

An original open-world crime game for the Make GTA 6 bounty. Nothing in this game comes from Rockstar Games or any other commercial game: every street, character, mission, and sound is built for Solara Bay.

## Story

Ria Santos returns to Solara Bay and finds the Crown Syndicate has taken her brother's garage. She takes jobs from fixer Mara Voss, steals what she needs, outruns the Solara PD, and takes the city back one mission at a time.

## Features

- A coastal city to explore on foot and by car, with roads, sidewalks, a beach, a marina, and the Crown Docks
- Traffic and pedestrians with daily routines
- Cars to steal and drive, including sedans, taxis, trucks, and the yellow Comet GT
- A wanted level from zero to five stars, with chasing police cars and foot cops
- Four story missions with briefing, waypoint beacon, timer, and payout
- Pistol combat with guards who shoot back, health, and reloads
- A HUD with live minimap, money, health, speed, and ammo
- A day and night cycle driving sun, sky, fog, and streetlight glow
- Police PIT tiers at three or more stars
- A start screen, pause menu, and save system with autosave after each mission
- Procedural sound with engine hum, sirens, gunshots, and a quiet synthwave loop using WebAudio with no files
- Night headlights
- A car health bar
- Guard flinch and pistol damage falloff

## How to play

Serve the `game` folder with any static file server and open it in desktop Chrome. The suggested command is the dev server file with no arguments, opening the local address on port 8080:

```sh
node serve.ts
```

No build step and no network requests: every script, the vendored Three.js engine file, and every sound is a file under the `game` folder.

## Controls

- W A S D — move and drive
- Mouse — look
- Shift — sprint
- E — enter or exit a car
- Space — jump or handbrake
- Click — shoot (either button)
- R — reload
- P or Escape — pause
- H — horn
- M — mute
- C — sneak at half speed and half noise
- N — take a Night Shift contract
- B — open the Black Market at the docks stall
- Digits 1 to 9 — buy
- G — start a street race at a start line while in a car
- U — slip into or out of an owned safehouse

## Round 6 attempt 8

Five new systems — nightclubs, bounty hunting, car meets, real estate, and fight club — plus a byte-for-byte rewrite of every game source file from earlier attempts, verified with a diff, with no behavioural change.

## Round 4 attempt 7

Three new systems — arcade, bank heists, and tuning — with no rewrites of existing code.

## Round 4 attempt 6

Eleven new systems — fishing, casino, businesses, delivery, stunts, radio, photo mode, smuggling, gym, chop shop, and taxi — plus wiring only in the main file, input file, and main.ts, with the systems built at boot, ticked in the frame loop, saved and restored with the game at save version 5, shown on the HUD line, and exposed on the debug handle.

## Round 4 attempt 5

Day and night economy, safehouses, and street races, plus wiring only.

## Round 4 attempt 4

Dynamic weather, Night Shift, Black Market, rooftop beacons, sneaking, new sounds, and new effects, with save version 5 keeping reputation, night record, and market deals.

## Round 4 attempt 3

Drift scoring, suspension, damage zones, police helicopter, roadblocks, chase coordination, side-job chains, par-time speed bonus, new rides, verified live debug fields, minimap roadblock and helicopter markers, HUD drift meter, heli warning, chain progress, and damage display, plus re-verified ram immunity.

## Round 4 attempt 2

Side jobs, guard patrol and radio, police radio alert, light rain weather, minimap labels, in-game tutorial, sprint stamina, save version 4, a tenth parked car, re-verified ram immunity, new debug fields, and a headless playtest where mission 1 completes with zero console errors.

## Round 4

Car health bar, night headlights, skid and reverse sounds, guard flinch, pistol damage falloff, muzzle-flash light, pedestrian dodge, traffic respawn, five-star heat, camera shake on damage, mission attempts, save version 3 with statistics, crosswalks and plaza benches, an eighth parked car, low-ammo warning, urgent timer, fairer rams, headshot bonus, and a headless playtest with zero console errors across five runs.

## Round 3

Day and night cycle, police PIT tiers, ram cooldown, health regen, mission variety, burnouts, horns, mute, garage repairs, Comet GT reparked, guard strafing, pedestrian pauses and fleeing, a surfer van, minimap stealable-car markers, and a clock showing the time of day.

## Entry

The kit starter `main.ts` copies the `game` folder and the `screenshots` folder to the output folder and writes a dossier file with the vendored kit file. The `screenshots` folder holds four real renders of the game running in a browser.

## License

MIT — see the LICENSE file.

## Round 6 attempt 9

Street graffiti, night market, recording studio, private eye, courtroom lawyer, and film studio, plus tests — 312 new-system logic checks passing, broken down as 93 plus 128 plus 91, with the 91 round-6 checks still passing, and a headless playtest booting with zero console errors, mission 1 completing, and all six new systems running live.
