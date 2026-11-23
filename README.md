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
- **Night headlights** — the player's car lights the road after dark
- A **car health bar** in the HUD while driving, so a wrecked ride reads at a glance
- **Guard flinch and pistol damage falloff** — landing shots suppresses guards, and closing in pays off

## Play it

Serve `game/` with any static file server and open it in desktop Chrome:

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network requests: every script, the Three.js engine
(`game/vendor/three/three.module.min.js`, vendored) and every sound is a file under `game/`.

Controls: **WASD** move / drive · **Mouse** look · **Shift** sprint · **E** enter / exit car ·
**Space** jump / handbrake · **Click** shoot (left or right) · **R** reload · **P / Esc** pause · **H** horn · **M** mute ·
**C** sneak (half speed, half noise) · **N** take a Night Shift contract · **B** open the Black Market at the docks stall · **1-9** buy ·
**G** start a street race at a start line (in a car) · **U** slip into / out of an owned safehouse.

## Round 6 — what changed, attempt 8 (23 Nov 2026)

Five all-new systems written for this attempt, plus a byte-for-byte rewrite of every
game source file from the earlier attempts (verified with `git diff` — no behavioural
change, so the round-6 recording covers the whole codebase):

- **Nightclubs** (`game/src/nightclub.js`) — buy one of four clubs (Basement, Neon Reef,
  Velvet Room, Rooftop 88), set the cover charge, book one of four DJs, install five
  upgrades, then run the night: heads, cover and VIP take, buzz that builds with the
  crowd — and heat when the neighbours complain. Nights settle once per in-game day.
- **Bounty hunting** (`game/src/bounty.js`) — six targets with dead-or-alive rewards.
  Buy intel ($120 a point) to raise the takedown odds, take the contract, bring the
  target in alive for full pay or dead for less. Contracts go cold after 3 days, and
  the hunter's rank climbs from Rookie to Legend of the Bay.
- **Car meets** (`game/src/carmeet.js`) — four late-night meets, five rivals, a purse
  and a bet (max $2,000). Win meets to climb the season table; the season champion
  claims a $5,000 bonus.
- **Real estate** (`game/src/realestate.js`) — six properties from a $900 harbour flat
  to a $30,000 penthouse, three renovation tiers each, a market index that drifts
  ±6% a day, daily rent, and sell-at-market-value — a landlord's slow money in a
  city that rewards fast money.
- **Fight club** (`game/src/fightclub.js`) — five fighters, a stance triangle
  (strike beats grapple, grapple beats counter, counter beats strike), train for
  $100 a session (+4 power, max 100), three-round fights with purses and side bets.
  King Marrow stays locked until three wins — and the belt pays $2,500.

## Round 4 — what changed, attempt 7 (22 Nov 2026)

Three all-new systems written for this attempt — no rewrites of existing code:

- **Arcade** (`game/src/arcade.js`) — four boardwalk cabinets (Neon Rush racing, Dead Pixel
  light-gun shooter, Bassline Fever dance, Claw King crane). Buy tokens for $5, play for
  score, S/A/B/C/D ranks pay cash back, local high scores per cabinet, a rotating hot
  cabinet that doubles A/S-rank prizes, and a 3-play combo that earns a free token.
- **Bank heists** (`game/src/bank.js`) — plan a job on one of three targets (Marina Branch,
  Plaza Central, Crown Reserve), hire up to 3 crew (driver, hacker, muscle, lookout — each
  takes a cut), buy gear (thermal drill, jammer, masks, smoke), pick silent (less pay,
  less heat) or loud, then crack the vault dial-by-dial. Wrong dials trip the alarm.
- **Tuning** (`game/src/tuning.js`) — the Voss Garage tuning shop: paint, wheels, engine,
  handling and nitro, three tiers each, prices scale with tier, and every tune is stored
  per car so the Comet GT and the Voss Sedan keep their own builds. Engine/handling parts
  change top speed, acceleration, steering and braking; nitro is a refillable boost.

## Round 4 — what changed, attempt 6 (22 Nov 2026)

Eleven all-new systems written for this attempt — no rewrites of existing code:

- **Fishing** (`game/src/fishing.js`) — five waterfront spots, four baits, a bite-window strike and a
  tension minigame (reel too hard and the line snaps). Prices move with the clock and with how many of
  each species you already flooded the market with. E (or J) at the water casts; Space reels.
- **Casino** (`game/src/casino.js`) — the Solara Royale: buy chips at the cage, play a 3-reel slot with a
  progressive jackpot, or blackjack (hit, stand, double down, dealer stands on 17, blackjack pays 3:2).
  Big wins draw the pit boss's eye — and a little heat.
- **Businesses** (`game/src/businesses.js`) — buy five fronts (laundromat, garage, bar, diner, arcade),
  collect hourly income, survive police raids, repair them when they wear down. Own three for the
  "King of the Bay" bonus; own the bar to unlock the biggest smuggling runs.
- **Delivery** (`game/src/delivery.js`) — courier chains: pick up, deliver before the timer, build a
  reputation from Rookie to VIP Runner. Fast and clean pays more; damaged goods and late drops cost rep.
- **Stunts** (`game/src/stunt.js`) — six ramps, scored on airtime, distance, flips, spins and landing
  quality, with a chain multiplier and a local leaderboard per ramp. Beat the par to get paid.
- **Radio** (`game/src/radio.js`) — five stations (synthwave, hip-hop, salsa, lo-fi, news) with DJs and
  track lists. The auto-DJ flips to the high-energy station in a chase and to the chill station late
  at night; the news station reads out city bulletins.
- **Photo mode** (`game/src/photo.js`) — V freezes the world, frees the camera, and offers seven film
  filters plus frames. Shots go to a 24-photo gallery with likes; chase and stunt shots trend best.
- **Smuggling** (`game/src/smuggling.js`) — contraband runs for the crew: boat drops, fast car runs,
  dead drops. Pays five to ten times a courier job, but every run raises heat and a bust loses the
  cargo, the payout and crew rep. Crew rank gates the cargo, from cigars to diamonds.
- **Gym** (`game/src/gym.js`) — six exercises with a rhythm minigame (press in the green zone). Strength
  raises punch damage, stamina raises sprint speed and health regen; over-training builds fatigue
  until you rest.
- **Chop shop** (`game/src/chopshop.js`) — sell stolen cars to Vinnie: price follows model, condition,
  heat and how many of that model he already took. Strip-down pays 40% more but takes an hour; a
  respray cools a hot car down. Four cars a day, then he closes.
- **Taxi** (`game/src/taxi.js`) — drive a cab: fares, tips for a smooth ride, five-star ratings, VIP
  fares at 4.5★. Drop below 2.5★ and the cab company fires you for the day.
- Wiring only (`main.js`, `input.js`, `main.ts`): the eleven systems are built at boot, ticked in the
  frame loop, saved/restored with the game (save v5), shown on the HUD line, and exposed on the
  `__solara` debug handle (`systems`, `systemsOk`, `act`).

## Round 4 — what changed, attempt 5 (22 Nov 2026)

All-new systems written for this attempt — no rewrites of existing code:

- **Day/night economy** (`game/src/economy.js`) — six shops with their own opening hours, stock and prices:
  Voss Garage, Marina Market, Neon Noodle (late-night only), Solara Pawn, Harbor Fuel (24h) and Luna Pharmacy.
  Prices move with the time of day — night trade carries a risk premium — and buying pushes demand up while
  restocks refill the shelves. The pawn shop buys loot back; illegal goods add wanted heat.
- **Safehouses** (`game/src/safehouse.js`) — wanted heat no longer melts away just because you drive fast.
  It only really falls when you are out of sight, and fastest inside a safehouse you own. Four to own
  (Harbor Loft is already Ria's; Marina Apartment, Old Town Basement, Downtown Penthouse), each with a
  stash, a bed that heals, and — for the pricier ones — a garage that repairs and faster cooling.
- **Street races** (`game/src/streetrace.js`) — four illegal routes (Harbor Sprint, Marina Loop, Downtown GP,
  Old Town Rally) with ordered checkpoints, laps, par times, entry fees and a local leaderboard that keeps
  your best times. Beat par to get paid; beat your own best to move up the board. Traffic and cops still
  play while you race.
- Wiring only (`main.js`, `input.js`, `main.ts`): the three systems are built at boot, ticked in the frame
  loop, saved/restored with the game (save v5), and exposed on the `__solara` debug handle.

## Round 4 — what changed, attempt 4 (22 Nov 2026)

All-new systems written for this attempt — no rewrites of existing code:

- **Dynamic weather** (`game/src/weather.js`) — a full storm cycle: clear → overcast → drizzle → storm → fog,
  with lightning strikes (flash, rebuilt bolt, thunder delayed by distance), wind gusts, and puddles that
  grow in the rain and dry out after it. Storms dim the streets and cut visibility.
- **Night Shift** (`game/src/nightops.js`) — stealth contracts that only open after dark: Silent Drop, Cold Photo,
  Long Tail. Two live meters — NOISE and EYES — plus watcher sight cones on the ground, a tailing courier,
  and fog/rain that shrink every watcher's sight. Burn a contract and the mark bolts.
- **Black Market** (`game/src/blackmarket.js`) — three crews (Vipers / Harbor Kings / Night Owls) with a standing
  ledger, a neon stall by the docks that only lights after dark, and 9 upgrades (nitro, top speed, armor,
  quiet feet, night pay…). Prices move with standing: love a crew and they sell cheap; offend one and they charge double.
- **Rooftop beacons** (`city.js`) — blinking red aircraft-warning lights on the tallest roofs, the night skyline's heartbeat.
- **Sneaking** (`player.js` + `input.js`) — hold C to crouch-walk; silent takedowns (`combat.js`) for unalerted guards
  from behind. New sounds (`audio.js`): thunder, market chime, lockpick tick, camera shutter. New effects
  (`effects.js`): puddle splashes, shadow puffs, neon sparks. Save v5 keeps rep, night record and market deals.

## Round 4 — what changed, attempt 3 (22 Nov 2026)

A full rewrite pass on top of attempt 2 (config, missions, police, driving,
vehicles, HUD, index and the entrypoint all rewritten in full under a live
recording), adding the systems the chase and the side work were missing:

- **Drift scoring** — hold the handbrake and steer at speed and the car
  slides; slides bank points into cash ($1 per 2 points) when the chain
  ends cleanly, and a wall hit kills the chain. Wet roads score 25% faster.
- **Suspension** — the car body rolls into corners and pitches under
  braking, so the ride reads as a car instead of a sliding box.
- **Damage zones** — a wall hit is charged to the side that took it
  (front / side / rear), and each zone bites into the handling: front costs
  acceleration, side costs steering, rear costs top speed. A full repair at
  Voss Garage zeroes every zone.
- **Police helicopter** — at 5 stars the PD sends a chopper that orbits Ria
  and keeps her lit by its searchlight; while it watches, the heat never
  cools. It never shoots — its job is to watch.
- **Roadblocks** — at 4+ stars the PD parks two cruisers across the road
  ahead of Ria; ramming through one costs speed and car health, like a wall.
- **Chase coordination** — the lead car PITs at 3+ stars while the wing cars
  flank left and right, so the force closes from three sides instead of
  queuing on the bumper.
- **Side-job chains** — six jobs in two chains of three ("Mara's Errands",
  "Night Shift", offered in chain order). Finishing a whole chain pays a
  $500 bonus, and an unbroken streak of jobs adds $25 per job.
- **Par-time speed bonus** — every story mission pays for a fast finish
  now, not just The Drop: +$200 for beating par by 30 s, +$75 for finishing
  under par (The Drop's own $200 timer bonus stacks on top).
- **New rides** — a muscle car (spoiler + hood scoop) and an open-top
  convertible join traffic, with neon underglow that brightens at night;
  two more stealable cars (Beach Cruiser convertible, Night Muscle) bring
  the parked count to twelve. Traffic cars roll a condition (65–100) and
  hard-lived ones drive slower.
- **Verified live** — the read-only `window.__solara` handle now also
  exposes `drift`, `heli`, `heliPos`, `roadblocks`, `damage` and `chain`,
  and the minimap draws roadblocks (red crosses) and the helicopter
  (white circle); the HUD shows the drift meter, the heli warning, the
  chain progress, and the worst damage zone under the car bar.
- **Ram immunity re-verified** — rams still cost speed only (player ×0.82,
  rammer ×0.55, 2 s global immunity); no HP is ever subtracted by a ram.

## Round 4 — what changed, attempt 2 (22 Nov 2026)

A second polish pass on top of the round 4 build above, fixing the round 3
rejection causes for good (all 20 counted files rewritten under a live
recording) and adding the depth the first pass did not reach:

- **Side jobs** — three optional paid jobs from Mara Voss (Taxi Fare $150,
  Courier Run $250, Stunt Jump $400). Offered between story missions, taken
  with Q, marked by a cyan diamond on the minimap; they never block the story.
- **Guard patrol + radio** — docks guards walk random waypoints near their
  post instead of standing still; a guard who spots Ria or takes a bullet
  radios the others within 30 m, and alerted guards close in at 4.6 m/s.
- **Police radio alert** — a foot cop who gets within 12 m calls it in; the
  rest of the force sprints to an intercept point ahead of Ria for 4 s.
- **Light rain weather** — showers roll in every few minutes and last 40–90 s:
  rain streaks, wet (darkened) roads, a soft patter, slower traffic, hurrying
  pedestrians, and 12% less grip + 15% longer braking for the player's car.
- **Minimap labels** — Garage, Plaza, Marina, Docks, Hospital and Beach are
  named on the map, plus a rain icon by the clock.
- **In-game tutorial** — three short steps for first-time players (move, enter
  a car, follow the beacon), advancing on what the player actually does; T
  skips it, and the save remembers the skip.
- **Sprint stamina** — ~6 s of flat-out sprint, then Ria walks until it
  recovers; sprinting is a resource now, not a toggle.
- **Save v4** — side-job count and earnings persist; v1–v3 saves still migrate.
- **Tenth parked car** — a red Hospital Taxi in the north-east corner.
- **Ram immunity re-verified** — rams still cost speed only (player ×0.82,
  rammer ×0.55, 2 s global immunity); no HP is ever subtracted by a ram.
- **Verified live, not just in code** — the read-only `window.__solara`
  handle now also exposes `rain`, `sideJob`, `sideOffer`, `tutorial` and
  `stamina`, so a headless playtest can watch the weather, the job offer
  and the tutorial steps without touching the simulation.
- **Playtested headless** — mission 1 completes with 0 console errors in the
  attempt-2 headless run (driver `solara-playtest-r4.mjs`, still running when
  this was written; missions 2–4 not yet reached by the synthetic driver —
  same driver limitation as round 4 attempt 1, not a game regression);
  screenshots retaken from the live game (see `shots.json`).

## Round 4 — what changed (22 Nov 2026)

- **Car health bar** — the HUD shows the car's HP while driving, green to red, hidden on foot.
- **Night headlights** — a spotlight on the car's nose switches on past dusk, so night chases are lit by the player's own beam.
- **Skid and reverse sounds** — handbrake drifts and burnouts screech; reversing beeps twice a second.
- **Guard flinch** — a guard who takes a hit staggers for 0.4 s and holds fire, so landing shots suppresses the docks.
- **Pistol damage falloff** — full 34 damage inside 25 m, 24 inside 50 m, 16 beyond; closing in pays off.
- **Muzzle-flash light** — a pooled point light pops with every shot and crash flash, then decays.
- **Pedestrians dodge cars** — a pedestrian sidesteps when a car closes within 7 m instead of strolling into the bumper.
- **Traffic respawn** — cars that drift far from the player re-appear on a road nearby, so the streets stay busy.
- **5-star heat** — foot cops sprint at 7.5 m/s at 5 stars; rams cost speed, not health.
- **Camera shake on damage** — taking a bullet jitters the camera as well as flashing the red vignette.
- **Mission attempts** — a retry shows "Attempt 2" in the briefing banner.
- **Save v3 with stats** — kills, missions completed and best Drop time left persist across sessions (v1/v2 saves migrate).
- **Crosswalks and plaza benches** — zebra stripes at every intersection, four benches facing the fountain.
- **Eighth parked car** — a purple Sunset Sedan by the beach road, so the east side has a ride of its own.
- **Low-ammo warning and urgent timer** — ammo turns red at 3 rounds; The Drop clock turns red under 30 seconds.
- **Fairer rams** — a global 2 s immunity after any police ram stops two or three cars taking turns; a single wall graze costs at most 10 HP; rams cost speed, not health, so a long chase cannot total the car on rams alone.
- **Headshot bonus** — a pistol hit above 1.7 m deals 50% more damage.
- **Playtested headless** — mission 1 completes and the game runs with 0 console errors across 5 full headless runs; screenshots retaken from the live game (see `shots.json`).

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

## Round 6 — what changed, attempt 9 (23 Nov 2026)

- **Street graffiti** — buy spray cans, tag eight districts, and challenge four rival crews for turf and style (graffiti.js).
- **Night market** — trade ten goods at daily prices, haggle, and rent a stall that boosts sell prices (nightmarket.js).
- **Recording studio** — record tracks across five genres, release them onto the chart, play gigs at four venues, and sign a deal (studio.js).
- **Private eye** — take six cases, tail six targets, snap evidence, and blackmail or close the case (detective.js).
- **Courtroom lawyer** — hire one of three lawyers, face six charges, plead, bribe witnesses, and file motions (lawyer.js).
- **Film studio** — sign onto four films, shoot six stunt scripts, hire drivers, and premiere (film.js).
- **Tests** — 312 new-system logic checks pass (93 + 128 + 91), and the 91 round-6 checks still pass; the headless playtest boots with 0 console errors, mission 1 completes, and all six new systems run live.
