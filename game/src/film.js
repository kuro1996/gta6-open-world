// film.js
//
// Film stunt production system for Solara Nights.
//
// The player signs onto a film, shoots stunt takes with a car, and
// premieres the finished picture for a share of the box office. A good
// take needs driving skill, a brave stunt driver, and a kind roll of
// the dice. A film left sitting too long gets cancelled and pays
// nothing, so the player has to finish what they start.
//
// This module is deliberately self contained. It never touches the DOM,
// never touches the network, and never imports another game file. The
// only things it needs arrive through the deps object handed to the
// factory, and every single dep is optional: when the caller leaves one
// out, a harmless default takes its place. All randomness flows through
// the injected rng function, so a test can rig the dice and assert
// exact outcomes. All money flows through getCash and addCash, so the
// module never keeps a private wallet. All heat flows through addHeat,
// and all notable events flow through log.
//
// Return contract for every action:
//   success -> { ok: true, ...numbers and ids describing what happened }
//   failure -> { ok: false, reason: 'kebab-case-string', ...context }
//
// Ratings are whole numbers from 0 to 100. Money is always whole
// dollars, and any box office figure is rounded down to the nearest
// whole dollar so cash never gains fractions.
//
// ---------------------------------------------------------------------------
// Films
// ---------------------------------------------------------------------------
//
// Four pictures, smallest budget first. Each film has a production
// budget and a payout share: the fraction of the box office the player
// keeps when the film premieres. Budgets run from 5000 to 20000
// dollars and shares run from 0.10 to 0.20, rising together, so the
// biggest picture is also the most generous one.
//
// A film is signed one at a time. Signing a second film while one is
// already in production is refused: the player can only shoot one
// picture at once.

export const FILMS = [
  {
    id: 'neon-harbor',
    title: 'Neon Harbor',
    budget: 8000,
    payoutShare: 0.12,
    blurb: 'A getaway driver falls for the detective chasing her.',
  },
  {
    id: 'midnight-drift',
    title: 'Midnight Drift',
    budget: 12000,
    payoutShare: 0.15,
    blurb: 'Illegal street racing under the marina lights.',
  },
  {
    id: 'solar-flare',
    title: 'Solar Flare',
    budget: 16000,
    payoutShare: 0.18,
    blurb: 'A solar storm knocks out the grid mid-heist.',
  },
  {
    id: 'velvet-storm',
    title: 'Velvet Storm',
    budget: 20000,
    payoutShare: 0.2,
    blurb: 'The harbor\'s biggest crew plans one last storm job.',
  },
];

// ---------------------------------------------------------------------------
// Stunt scripts
// ---------------------------------------------------------------------------
//
// Six stunt scripts, easiest first. Difficulty runs 1 through 6 and
// subtracts five points per step from the take rating, so the hardest
// stunts demand real driving skill, a strong hired driver, or a lucky
// roll to come out looking good on camera.

export const STUNT_SCRIPTS = [
  {
    id: 'alley-jump',
    name: 'Alley Jump',
    difficulty: 1,
    blurb: 'A short ramp over a stack of crates in a back alley.',
  },
  {
    id: 'rooftop-chase',
    name: 'Rooftop Chase',
    difficulty: 2,
    blurb: 'A pursuit across the low rooftops of the old district.',
  },
  {
    id: 'bridge-dive',
    name: 'Bridge Dive',
    difficulty: 3,
    blurb: 'Off the harbor bridge, through the gap, onto the far ramp.',
  },
  {
    id: 'harbor-explosion',
    name: 'Harbor Explosion',
    difficulty: 4,
    blurb: 'Thread the fireball as the fuel depot goes up behind you.',
  },
  {
    id: 'train-top-run',
    name: 'Train Top Run',
    difficulty: 5,
    blurb: 'Race along the roof of a moving freight train at night.',
  },
  {
    id: 'skyscraper-fall',
    name: 'Skyscraper Fall',
    difficulty: 6,
    blurb: 'Drive off the tower roof and land on the airbag street.',
  },
];

// ---------------------------------------------------------------------------
// Stunt drivers
// ---------------------------------------------------------------------------
//
// Four stunt drivers for hire, weakest first. A hired driver adds half
// of their skill to every take rating while they are on the picture,
// so the best driver is worth forty seven points a take. Fees run from
// 400 to 1200 dollars and are charged in full on hiring. Hiring a new
// driver replaces the old one; there is never more than one hired
// driver at a time, and the hired driver stays on after a premiere.

export const FILM_DRIVERS = [
  {
    id: 'rookie-rio',
    name: 'Rio Park, Rookie',
    skill: 20,
    fee: 400,
    blurb: 'Keen, cheap, and still learning which pedal is which.',
  },
  {
    id: 'steady-sam',
    name: 'Sam Okafor, Steady Hand',
    skill: 45,
    fee: 650,
    blurb: 'Never crashes the same way twice. Reliable on set.',
  },
  {
    id: 'daredevil-dana',
    name: 'Dana Reyes, Daredevil',
    skill: 70,
    fee: 900,
    blurb: 'Jumps first, checks the landing later. Directors love her.',
  },
  {
    id: 'legend-luis',
    name: 'Luis Vega, Legend',
    skill: 95,
    fee: 1200,
    blurb: 'The driver every stunt coordinator calls when it must work.',
  },
];

// ---------------------------------------------------------------------------
// Tuning numbers
// ---------------------------------------------------------------------------
//
// These constants gather every magic number in one place so a balance
// pass never has to hunt through the logic. Each one is used in exactly
// the way its name describes.

const START_DRIVING_SKILL = 20;
const MAX_DRIVING_SKILL = 90;
const SKILL_GAIN_PER_TAKE = 1;
const ROLL_SPAN = 30;
const DIFFICULTY_STEP = 5;
const DRIVER_BONUS_HALF = 0.5;
const PREMIERE_MIN_TAKES = 3;
const PREMIERE_MIN_AVERAGE = 50;
const BOX_OFFICE_BASE = 0.5;
const CANCEL_AFTER_DAYS = 10;
const RATING_MIN = 0;
const RATING_MAX = 100;
const SATISFACTION_START = 50;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
//
// findFilm, findStunt and findDriver are plain linear lookups over the
// short constant tables. The tables are tiny, so no index is ever
// needed.
//
// clampRating keeps a rating inside 0 to 100 and drops any fraction,
// which is how a take rating stays a whole number the HUD can print.
//
// roundDownToDollar drops the fractional part of a money amount. Box
// office is a product of a budget, a rating factor and a share, so it
// can land on a fraction; the player is always paid the floor.
//
// copyTake makes a detached snapshot of a take record so callers can
// read take history without ever mutating the system's own records.
//
// averageOf sums a list of ratings and divides by the count, returning
// zero for an empty list. The premiere check uses the exact average,
// not the rounded one, so a film averaging 49.6 never sneaks past a
// threshold of 50.

function findFilm(filmId) {
  for (let i = 0; i < FILMS.length; i += 1) {
    if (FILMS[i].id === filmId) {
      return FILMS[i];
    }
  }
  return null;
}

function findStunt(stuntId) {
  for (let i = 0; i < STUNT_SCRIPTS.length; i += 1) {
    if (STUNT_SCRIPTS[i].id === stuntId) {
      return STUNT_SCRIPTS[i];
    }
  }
  return null;
}

function findDriver(driverId) {
  for (let i = 0; i < FILM_DRIVERS.length; i += 1) {
    if (FILM_DRIVERS[i].id === driverId) {
      return FILM_DRIVERS[i];
    }
  }
  return null;
}

function clampRating(value) {
  if (value < RATING_MIN) {
    return RATING_MIN;
  }
  if (value > RATING_MAX) {
    return RATING_MAX;
  }
  return Math.floor(value);
}

function roundDownToDollar(amount) {
  return Math.floor(amount);
}

function copyTake(take) {
  return {
    stunt: take.stunt,
    name: take.name,
    rating: take.rating,
  };
}

function averageOf(ratings) {
  if (ratings.length === 0) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < ratings.length; i += 1) {
    total += ratings[i];
  }
  return total / ratings.length;
}

function bestOf(ratings) {
  let best = 0;
  for (let i = 0; i < ratings.length; i += 1) {
    if (ratings[i] > best) {
      best = ratings[i];
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
//
// createFilmSystem builds one independent film system. Call it once per
// save, or once per test, and each call gets fresh state that never
// leaks into another system.
//
// Deps, all optional:
//   rng          -> () => number in [0, 1). Defaults to Math.random.
//   getDay       -> () => current in-game day number. Defaults to () => 1.
//   getHour      -> () => current in-game hour. Defaults to () => 12.
//   getCash      -> () => current cash. Defaults to () => 0.
//   addCash      -> (delta) => void. Defaults to a no-op.
//   addHeat      -> (n) => void. Defaults to a no-op.
//   log          -> (message) => void. Defaults to a no-op.
//   getHeatLevel -> () => current heat level. Defaults to () => 0.
//
// The factory reads deps once, wraps each one in a safe local, and the
// rest of the system only ever talks to those locals. A dep that arrives
// as something other than a function is treated as missing. Heat is not
// used by the film rules today, but the dep is accepted so the factory
// matches the shared shape of the game's other systems.

export function createFilmSystem(deps) {
  const safeDeps = deps && typeof deps === 'object' ? deps : {};

  const rng = typeof safeDeps.rng === 'function' ? safeDeps.rng : Math.random;
  const getDay = typeof safeDeps.getDay === 'function' ? safeDeps.getDay : () => 1;
  const getHour = typeof safeDeps.getHour === 'function' ? safeDeps.getHour : () => 12;
  const getCash = typeof safeDeps.getCash === 'function' ? safeDeps.getCash : () => 0;
  const addCash = typeof safeDeps.addCash === 'function' ? safeDeps.addCash : () => {};
  const addHeat = typeof safeDeps.addHeat === 'function' ? safeDeps.addHeat : () => {};
  const log = typeof safeDeps.log === 'function' ? safeDeps.log : () => {};
  const getHeatLevel = typeof safeDeps.getHeatLevel === 'function'
    ? safeDeps.getHeatLevel
    : () => 0;

  // -- Live state ----------------------------------------------------------
  //
  // signedFilmId holds the id of the film currently in production, or
  // null when no film is signed. signedDay records the day it was
  // signed, which is what the cancellation rule measures against.
  //
  // takes holds the shot records for the current film, in shooting
  // order. Each take records the stunt id, the stunt name, and the
  // rating it earned. Takes are cleared when a film premieres or is
  // cancelled, so they always describe the film in production now.
  //
  // drivingSkill starts at 20 and grows by one point per take, up to a
  // ceiling of 90. It is the player's own skill, so it survives across
  // films: practice on one picture makes the next picture easier.
  //
  // driverId holds the hired stunt driver, or null when nobody is
  // hired. Unlike takes, the hired driver survives a premiere, so the
  // player does not have to re-hire for the next picture.
  //
  // directorSatisfaction tracks how happy the director is with the
  // footage so far. It starts at 50 when a film is signed and then
  // follows the average take rating, so a run of strong takes lifts it
  // and a run of weak takes drags it down.
  //
  // completedFilms counts premieres that paid out. totalBoxOffice adds
  // up every box office payment. filmsSigned counts every signing,
  // including films that were later cancelled. driversHired counts
  // every hiring, including re-hires of the same driver. driverFeesPaid
  // tracks dollars spent on driver fees.
  //
  // lastTickDay remembers the last day tickDay ran for, so the day hook
  // can refuse to run twice on the same day and never cancel a film
  // twice or double-count a day.

  let signedFilmId = null;
  let signedDay = null;
  let takes = [];
  let drivingSkill = START_DRIVING_SKILL;
  let driverId = null;
  let directorSatisfaction = SATISFACTION_START;
  let completedFilms = 0;
  let totalBoxOffice = 0;
  let filmsSigned = 0;
  let driversHired = 0;
  let driverFeesPaid = 0;
  let lastTickDay = null;

  // -- Private lookups -----------------------------------------------------
  //
  // driverSkill reads the skill of the hired driver, or zero when
  // nobody is hired. The take rating math calls this, never the raw id.
  //
  // takeRatings pulls the plain rating numbers out of the take records
  // so the average and best helpers can work on them.
  //
  // averageRatingExact returns the true mean of the current takes, or
  // zero when no take has been shot yet. The premiere gate and the box
  // office math both use this exact figure.
  //
  // refreshSatisfaction sets the director satisfaction to the rounded
  // average of the takes shot so far, or back to the starting value
  // when no take has been shot yet.

  function driverSkill() {
    if (driverId === null) {
      return 0;
    }
    const driver = findDriver(driverId);
    if (driver === null) {
      return 0;
    }
    return driver.skill;
  }

  function takeRatings() {
    const out = [];
    for (let i = 0; i < takes.length; i += 1) {
      out.push(takes[i].rating);
    }
    return out;
  }

  function averageRatingExact() {
    return averageOf(takeRatings());
  }

  function refreshSatisfaction() {
    if (takes.length === 0) {
      directorSatisfaction = SATISFACTION_START;
      return;
    }
    directorSatisfaction = Math.round(averageRatingExact());
  }

  // -- Signing -------------------------------------------------------------
  //
  // signFilm puts the player onto a picture. The signed day is stamped
  // from the current day, the take list starts empty, and the director
  // starts at a neutral satisfaction of 50. Only one film can be in
  // production at a time.
  //
  // Failures, checked in this order:
  //   unknown film    -> the id matches nothing in FILMS
  //   film signed     -> another film is already in production

  function signFilm(filmId) {
    const film = findFilm(filmId);
    if (film === null) {
      return { ok: false, reason: 'unknown-film', film: filmId };
    }
    if (signedFilmId !== null) {
      return {
        ok: false,
        reason: 'film-signed',
        film: filmId,
        signed: signedFilmId,
      };
    }
    signedFilmId = film.id;
    signedDay = getDay();
    takes = [];
    directorSatisfaction = SATISFACTION_START;
    filmsSigned += 1;
    log('Signed onto ' + film.title + '. Budget $' + film.budget + ', payout share ' + Math.round(film.payoutShare * 100) + '%. Shoot at least ' + PREMIERE_MIN_TAKES + ' takes, then premiere.');
    return {
      ok: true,
      film: film.id,
      title: film.title,
      budget: film.budget,
      payoutShare: film.payoutShare,
      signedDay: signedDay,
    };
  }

  // -- Shooting ------------------------------------------------------------
  //
  // shootTake films one stunt for the signed picture.
  //
  // The rating is the player's driving skill, plus the rng roll times
  // thirty, minus five per difficulty step of the stunt, plus half of
  // the hired driver's skill when a driver is on the picture. The
  // result is clamped to the range 0 to 100 and rounded down to a whole
  // number. A rookie with no driver can still land a decent take on an
  // easy stunt with a kind roll, and a veteran with the best driver can
  // still flop a hard stunt on a cruel roll.
  //
  // Every take grows the player's driving skill by one point, up to the
  // ceiling of 90, because every shot on camera is practice. The take
  // is recorded, the director satisfaction is refreshed from the new
  // average, and the result carries the rating, the new skill, the
  // take count, and the running average.
  //
  // Failures, checked in this order:
  //   unknown stunt -> the id matches nothing in STUNT_SCRIPTS
  //   no film       -> no film is currently signed

  function shootTake(stuntId) {
    const stunt = findStunt(stuntId);
    if (stunt === null) {
      return { ok: false, reason: 'unknown-stunt', stunt: stuntId };
    }
    if (signedFilmId === null) {
      return { ok: false, reason: 'no-film', stunt: stuntId };
    }
    const roll = rng() * ROLL_SPAN;
    const driverBonus = driverSkill() * DRIVER_BONUS_HALF;
    const raw = drivingSkill + roll - stunt.difficulty * DIFFICULTY_STEP + driverBonus;
    const rating = clampRating(raw);
    takes.push({
      stunt: stunt.id,
      name: stunt.name,
      rating: rating,
    });
    drivingSkill = Math.min(MAX_DRIVING_SKILL, drivingSkill + SKILL_GAIN_PER_TAKE);
    refreshSatisfaction();
    const film = findFilm(signedFilmId);
    log('Take ' + takes.length + ' for ' + (film === null ? 'the film' : film.title) + ': ' + stunt.name + ' rated ' + rating + '/100. Driving skill is now ' + drivingSkill + '.');
    return {
      ok: true,
      stunt: stunt.id,
      name: stunt.name,
      rating: rating,
      drivingSkill: drivingSkill,
      takes: takes.length,
      averageRating: Math.round(averageRatingExact()),
      satisfaction: directorSatisfaction,
    };
  }

  // -- Premiere ------------------------------------------------------------
  //
  // premiere releases the signed film and pays the box office share.
  //
  // The film must have at least three takes, and the average take
  // rating must be at least 50, or the director refuses to release it.
  // The box office equals the budget times the factor (0.5 plus the
  // average rating divided by 100) times the payout share, rounded down
  // to whole dollars. A film averaging 50 pays half the budget times
  // the share, and a film averaging 100 pays one and a half times the
  // budget times the share, so every extra point of average rating is
  // worth real money.
  //
  // On a successful premiere the film clears, the takes clear, the
  // completed count rises, and the box office total grows. The hired
  // driver stays on for the next picture.
  //
  // Failures, checked in this order:
  //   unknown film    -> the id matches nothing in FILMS
  //   wrong film      -> the id is a real film but not the signed one,
  //                      or no film is signed at all
  //   not enough takes -> fewer than three takes have been shot
  //   rating too low  -> the average rating is below 50

  function premiere(filmId) {
    const film = findFilm(filmId);
    if (film === null) {
      return { ok: false, reason: 'unknown-film', film: filmId };
    }
    if (signedFilmId === null || signedFilmId !== filmId) {
      return {
        ok: false,
        reason: 'wrong-film',
        film: filmId,
        signed: signedFilmId,
      };
    }
    if (takes.length < PREMIERE_MIN_TAKES) {
      return {
        ok: false,
        reason: 'not-enough-takes',
        film: filmId,
        takes: takes.length,
        needed: PREMIERE_MIN_TAKES,
      };
    }
    const average = averageRatingExact();
    if (average < PREMIERE_MIN_AVERAGE) {
      return {
        ok: false,
        reason: 'rating-too-low',
        film: filmId,
        averageRating: Math.round(average),
        needed: PREMIERE_MIN_AVERAGE,
        takes: takes.length,
      };
    }
    const boxOffice = roundDownToDollar(
      film.budget * (BOX_OFFICE_BASE + average / 100) * film.payoutShare,
    );
    const takeCount = takes.length;
    const roundedAverage = Math.round(average);
    addCash(boxOffice);
    completedFilms += 1;
    totalBoxOffice += boxOffice;
    log(film.title + ' premiered. Average take ' + roundedAverage + '/100 across ' + takeCount + ' takes. Box office share $' + boxOffice + ' paid.');
    signedFilmId = null;
    signedDay = null;
    takes = [];
    directorSatisfaction = SATISFACTION_START;
    return {
      ok: true,
      film: film.id,
      title: film.title,
      boxOffice: boxOffice,
      averageRating: roundedAverage,
      takes: takeCount,
      completedFilms: completedFilms,
      totalBoxOffice: totalBoxOffice,
      cash: getCash(),
    };
  }

  // -- Hiring a driver -----------------------------------------------------
  //
  // hireDriver puts a stunt driver on the picture. The fee is charged
  // in full every time, even when the player re-hires the same driver,
  // because the driver bills per engagement. Hiring replaces whoever
  // was hired before; there is never more than one hired driver at a
  // time. A driver can be hired before any film is signed, so the
  // player can line up the crew first and sign the picture after.
  //
  // Failures, checked in this order:
  //   unknown driver   -> the id matches nothing in FILM_DRIVERS
  //   not enough cash  -> getCash() is below the driver's fee

  function hireDriver(wantedDriverId) {
    const driver = findDriver(wantedDriverId);
    if (driver === null) {
      return { ok: false, reason: 'unknown-driver', driver: wantedDriverId };
    }
    if (getCash() < driver.fee) {
      return {
        ok: false,
        reason: 'not-enough-cash',
        driver: wantedDriverId,
        fee: driver.fee,
        cash: getCash(),
      };
    }
    addCash(-driver.fee);
    driverFeesPaid += driver.fee;
    driversHired += 1;
    driverId = driver.id;
    log('Hired stunt driver ' + driver.name + ' for $' + driver.fee + '. Driver skill ' + driver.skill + ' adds ' + Math.floor(driver.skill * DRIVER_BONUS_HALF) + ' points to every take.');
    return {
      ok: true,
      driver: driver.id,
      name: driver.name,
      fee: driver.fee,
      skill: driver.skill,
      cash: getCash(),
    };
  }

  // -- Read-only views -----------------------------------------------------
  //
  // filmStatus returns the signed film's public record plus the
  // production position: the day it was signed, how many days it has
  // been in production, how many takes are in the can, the average
  // rating, and the director satisfaction. It returns null when no
  // film is signed.
  //
  // takeHistory returns detached copies of every take for the current
  // film, in shooting order. The copies are safe to hand to a HUD or
  // a test: mutating them never touches live state.
  //
  // driverStatus returns the hired driver's public record, or null
  // when nobody is hired.
  //
  // averageRating returns the rounded average of the current takes, or
  // zero when no take has been shot yet. bestRating returns the best
  // single take rating so far, or zero when no take has been shot.
  //
  // daysOnFilm returns how many days the signed film has been in
  // production, measured against the current day, or -1 when no film
  // is signed. A film that has been in production for more than ten
  // days is living on borrowed time: tickDay will cancel it.
  //
  // currentHour is a thin pass-through to the injected clock, kept so
  // the wiring layer can ask the system what time it thinks it is
  // without reaching past the factory.
  //
  // currentHeat is a thin pass-through to the injected heat level, kept
  // for the same reason. Film work does not raise heat by itself, but
  // the wiring layer may want to read the level next to film state.

  function filmStatus() {
    if (signedFilmId === null) {
      return null;
    }
    const film = findFilm(signedFilmId);
    if (film === null) {
      return null;
    }
    return {
      id: film.id,
      title: film.title,
      budget: film.budget,
      payoutShare: film.payoutShare,
      signedDay: signedDay,
      daysOnFilm: getDay() - signedDay,
      takes: takes.length,
      averageRating: Math.round(averageRatingExact()),
      satisfaction: directorSatisfaction,
    };
  }

  function takeHistory() {
    const out = [];
    for (let i = 0; i < takes.length; i += 1) {
      out.push(copyTake(takes[i]));
    }
    return out;
  }

  function driverStatus() {
    if (driverId === null) {
      return null;
    }
    const driver = findDriver(driverId);
    if (driver === null) {
      return null;
    }
    return {
      id: driver.id,
      name: driver.name,
      skill: driver.skill,
      fee: driver.fee,
    };
  }

  function averageRating() {
    return Math.round(averageRatingExact());
  }

  function bestRating() {
    return bestOf(takeRatings());
  }

  function daysOnFilm() {
    if (signedFilmId === null || signedDay === null) {
      return -1;
    }
    return getDay() - signedDay;
  }

  function currentHour() {
    return getHour();
  }

  function currentHeat() {
    return getHeatLevel();
  }

  // -- Stats and HUD -------------------------------------------------------
  //
  // stats returns a plain object of numbers, strings and booleans that
  // fully describes the system's public position. Nothing in it is a
  // live reference: it is safe to store, compare, or print.
  //
  // hudLine returns one short line for the on-screen HUD. When no film
  // is signed it says so plainly and shows the driving skill, so the
  // player always knows the film desk is quiet rather than wondering
  // whether the line failed to render.

  function stats() {
    return {
      signedFilm: signedFilmId === null ? 'none' : signedFilmId,
      signedDay: signedDay === null ? -1 : signedDay,
      daysOnFilm: daysOnFilm(),
      takes: takes.length,
      averageRating: averageRating(),
      bestRating: bestRating(),
      drivingSkill: drivingSkill,
      driver: driverId === null ? 'none' : driverId,
      driverSkill: driverSkill(),
      directorSatisfaction: directorSatisfaction,
      completedFilms: completedFilms,
      totalBoxOffice: totalBoxOffice,
      filmsSigned: filmsSigned,
      driversHired: driversHired,
      driverFeesPaid: driverFeesPaid,
      hasFilm: signedFilmId !== null,
      hasDriver: driverId !== null,
      lastTickDay: lastTickDay === null ? -1 : lastTickDay,
    };
  }

  function hudLine() {
    if (signedFilmId === null) {
      const driver = driverStatus();
      const driverText = driver === null ? 'No driver' : 'Driver: ' + driver.name;
      return 'No film signed | Driving ' + drivingSkill + ' | ' + driverText + ' | Completed ' + completedFilms + ' | Box office $' + totalBoxOffice;
    }
    const film = findFilm(signedFilmId);
    const title = film === null ? signedFilmId : film.title;
    return title + ' | Takes ' + takes.length + ' | Avg ' + averageRating() + ' | Skill ' + drivingSkill + ' | Day ' + daysOnFilm() + '/' + CANCEL_AFTER_DAYS;
  }

  // -- Persistence ---------------------------------------------------------
  //
  // serialize returns a plain JSON-able snapshot of every piece of
  // state. deserialize restores from such a snapshot and tolerates
  // missing fields by falling back to defaults, so an old save or a
  // hand-built partial object never crashes the system. Unknown extra
  // fields are ignored. Take records are re-cloned on the way in so
  // the caller's object and the live state never share references.
  // Driving skill is clamped back into its legal range on load, and a
  // signed film id that matches nothing in FILMS is dropped rather
  // than trusted.

  function serialize() {
    const savedTakes = [];
    for (let i = 0; i < takes.length; i += 1) {
      savedTakes.push({
        stunt: takes[i].stunt,
        name: takes[i].name,
        rating: takes[i].rating,
      });
    }
    return {
      signedFilmId: signedFilmId,
      signedDay: signedDay,
      takes: savedTakes,
      drivingSkill: drivingSkill,
      driverId: driverId,
      directorSatisfaction: directorSatisfaction,
      completedFilms: completedFilms,
      totalBoxOffice: totalBoxOffice,
      filmsSigned: filmsSigned,
      driversHired: driversHired,
      driverFeesPaid: driverFeesPaid,
      lastTickDay: lastTickDay,
    };
  }

  function deserialize(d) {
    const data = d && typeof d === 'object' ? d : {};
    const savedFilm = typeof data.signedFilmId === 'string' ? data.signedFilmId : null;
    signedFilmId = savedFilm !== null && findFilm(savedFilm) !== null ? savedFilm : null;
    signedDay = typeof data.signedDay === 'number' ? Math.floor(data.signedDay) : null;
    if (signedFilmId === null) {
      signedDay = null;
    }
    takes = [];
    if (Array.isArray(data.takes)) {
      for (let i = 0; i < data.takes.length; i += 1) {
        const raw = data.takes[i];
        if (!raw || typeof raw !== 'object' || typeof raw.stunt !== 'string') {
          continue;
        }
        const stunt = findStunt(raw.stunt);
        if (stunt === null) {
          continue;
        }
        takes.push({
          stunt: raw.stunt,
          name: typeof raw.name === 'string' ? raw.name : stunt.name,
          rating: typeof raw.rating === 'number' ? clampRating(raw.rating) : 0,
        });
      }
    }
    drivingSkill = typeof data.drivingSkill === 'number'
      ? Math.min(MAX_DRIVING_SKILL, Math.max(START_DRIVING_SKILL, Math.floor(data.drivingSkill)))
      : START_DRIVING_SKILL;
    const savedDriver = typeof data.driverId === 'string' ? data.driverId : null;
    driverId = savedDriver !== null && findDriver(savedDriver) !== null ? savedDriver : null;
    directorSatisfaction = typeof data.directorSatisfaction === 'number'
      ? clampRating(data.directorSatisfaction)
      : SATISFACTION_START;
    completedFilms = typeof data.completedFilms === 'number' ? Math.max(0, Math.floor(data.completedFilms)) : 0;
    totalBoxOffice = typeof data.totalBoxOffice === 'number' ? Math.max(0, Math.floor(data.totalBoxOffice)) : 0;
    filmsSigned = typeof data.filmsSigned === 'number' ? Math.max(0, Math.floor(data.filmsSigned)) : 0;
    driversHired = typeof data.driversHired === 'number' ? Math.max(0, Math.floor(data.driversHired)) : 0;
    driverFeesPaid = typeof data.driverFeesPaid === 'number' ? Math.max(0, Math.floor(data.driverFeesPaid)) : 0;
    lastTickDay = typeof data.lastTickDay === 'number' ? Math.floor(data.lastTickDay) : null;
    refreshSatisfaction();
    return { ok: true, film: signedFilmId, takes: takes.length };
  }

  // -- Day hook ------------------------------------------------------------
  //
  // tickDay runs once per in-game day. The wiring layer calls it with
  // the new day number. Calling it twice for the same day returns a
  // failure with reason 'already-settled' and changes nothing, so a
  // double call can never cancel a film twice.
  //
  // The only rule: a film that has been signed for more than ten days
  // without a premiere is cancelled. The takes are thrown away, the
  // signed film clears, and no money is paid. The director satisfaction
  // falls back to its neutral starting value, the hired driver stays
  // on, and the player's driving skill keeps whatever practice the
  // cancelled takes earned.
  //
  // The returned object says whether a cancellation happened and which
  // film was lost, or reports a quiet day when nothing was cancelled.

  function tickDay(day) {
    const dayNum = typeof day === 'number' ? Math.floor(day) : getDay();
    if (lastTickDay !== null && dayNum === lastTickDay) {
      return { ok: false, reason: 'already-settled', day: dayNum };
    }
    lastTickDay = dayNum;

    if (signedFilmId !== null && signedDay !== null && dayNum - signedDay > CANCEL_AFTER_DAYS) {
      const lost = signedFilmId;
      const film = findFilm(lost);
      const lostTitle = film === null ? lost : film.title;
      const lostTakes = takes.length;
      signedFilmId = null;
      signedDay = null;
      takes = [];
      directorSatisfaction = SATISFACTION_START;
      log(lostTitle + ' was cancelled after ' + CANCEL_AFTER_DAYS + ' days without a premiere. ' + lostTakes + ' takes thrown away, no payout.');
      return {
        ok: true,
        day: dayNum,
        cancelled: true,
        film: lost,
        title: lostTitle,
        takesLost: lostTakes,
      };
    }

    return {
      ok: true,
      day: dayNum,
      cancelled: false,
      film: signedFilmId,
      daysOnFilm: daysOnFilm(),
    };
  }

  // -- Public surface ------------------------------------------------------
  //
  // Every method the wiring layer needs, and nothing it does not. The
  // returned object is the whole system: actions, views, persistence,
  // and the day hook.

  return {
    signFilm,
    shootTake,
    premiere,
    hireDriver,
    filmStatus,
    takeHistory,
    driverStatus,
    averageRating,
    bestRating,
    daysOnFilm,
    currentHour,
    currentHeat,
    stats,
    hudLine,
    serialize,
    deserialize,
    tickDay,
  };
}
