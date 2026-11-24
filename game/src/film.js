export const FILMS = [
  { id: 'neon-heist', title: 'Neon Heist', budget: 50000, payoutShare: 0.1, blurb: 'A crew steals the city\'s light' },
  { id: 'midnight-chase', title: 'Midnight Chase', budget: 80000, payoutShare: 0.12, blurb: 'One car, one night, no brakes' },
  { id: 'solara-nights', title: 'Solara Nights', budget: 120000, payoutShare: 0.15, blurb: 'A stunt epic shot on the coast' },
  { id: 'dust-and-thunder', title: 'Dust and Thunder', budget: 30000, payoutShare: 0.08, blurb: 'A desert chase with a broken hero' },
];

export const STUNT_SCRIPTS = [
  { id: 'jump', name: 'Ramp Jump', difficulty: 2, blurb: 'Fly the car over the gap' },
  { id: 'drift', name: 'Drift Corner', difficulty: 3, blurb: 'Slide sideways through the turn' },
  { id: 'chase', name: 'High Speed Chase', difficulty: 4, blurb: 'Weave through traffic at full speed' },
  { id: 'explosion', name: 'Explosion Escape', difficulty: 5, blurb: 'Outrun the fireball' },
  { id: 'rooftop', name: 'Rooftop Leap', difficulty: 6, blurb: 'Jump the car between buildings' },
  { id: 'barrel-roll', name: 'Barrel Roll', difficulty: 6, blurb: 'Roll the car and keep driving' },
];

export const FILM_DRIVERS = [
  { id: 'mike', name: 'Mike Torque', skill: 40, fee: 500, blurb: 'A steady hand with a lead foot' },
  { id: 'sara', name: 'Sara Drift', skill: 65, fee: 1200, blurb: 'Queen of the slide' },
  { id: 'ken', name: 'Ken Blaze', skill: 80, fee: 2500, blurb: 'The fastest stunt driver alive' },
  { id: 'luna', name: 'Luna Vega', skill: 95, fee: 5000, blurb: 'A legend who never misses a mark' },
];

const START_SKILL = 20;
const MAX_SKILL = 90;
const SKILL_PER_TAKE = 1;
const ROLL_SPAN = 30;
const DIFFICULTY_STEP = 5;
const DRIVER_BONUS_HALF = 0.5;
const PREMIERE_MIN_TAKES = 3;
const PREMIERE_MIN_AVG = 50;
const BOX_OFFICE_BASE = 0.5;
const CANCEL_AFTER_DAYS = 10;
const RATING_MIN = 0;
const RATING_MAX = 100;
const SATISFACTION_START = 50;

function filmById(id) {
  return FILMS.find((f) => f.id === id);
}

function stuntById(id) {
  return STUNT_SCRIPTS.find((s) => s.id === id);
}

function driverById(id) {
  return FILM_DRIVERS.find((d) => d.id === id);
}

function clampRating(n) {
  return Math.max(RATING_MIN, Math.min(RATING_MAX, n));
}

export function createFilmSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getHeatLevel = typeof deps.getHeatLevel === 'function' ? deps.getHeatLevel : () => 0;

  let signedFilmId = null;
  let signedDay = null;
  let takes = [];
  let drivingSkill = START_SKILL;
  let driverId = null;
  let directorSatisfaction = SATISFACTION_START;
  let completedFilms = 0;
  let totalBoxOffice = 0;
  let filmsSigned = 0;
  let driversHired = 0;
  let driverFeesPaid = 0;
  let lastTickDay = null;

  function averageExact() {
    if (takes.length === 0) return 0;
    const sum = takes.reduce((s, t) => s + t.rating, 0);
    return sum / takes.length;
  }

  function averageRounded() {
    return Math.round(averageExact());
  }

  function bestTakeRating() {
    if (takes.length === 0) return 0;
    return Math.max(...takes.map((t) => t.rating));
  }

  function daysOnFilm() {
    if (signedFilmId === null || signedDay === null) return -1;
    return getDay() - signedDay;
  }

  function driverRecord() {
    return driverId ? driverById(driverId) : null;
  }

  const system = {
    signFilm(filmId) {
      const film = filmById(filmId);
      if (!film) return { ok: false, reason: 'unknown-film' };
      if (signedFilmId !== null) {
        return { ok: false, reason: 'film-signed', film: filmId, signedFilm: signedFilmId };
      }
      signedFilmId = film.id;
      signedDay = getDay();
      takes = [];
      directorSatisfaction = SATISFACTION_START;
      filmsSigned += 1;
      log(`Signed film: ${film.title}`);
      return {
        ok: true,
        filmId: film.id,
        title: film.title,
        budget: film.budget,
        payoutShare: film.payoutShare,
        signedDay,
      };
    },

    shootTake(stuntId) {
      const stunt = stuntById(stuntId);
      if (!stunt) return { ok: false, reason: 'unknown-stunt' };
      if (signedFilmId === null) return { ok: false, reason: 'no-film' };
      const driver = driverRecord();
      const driverBonus = driver ? driver.skill * DRIVER_BONUS_HALF : 0;
      const roll = rng() * ROLL_SPAN;
      const raw = drivingSkill + roll - stunt.difficulty * DIFFICULTY_STEP + driverBonus;
      const rating = Math.floor(clampRating(raw));
      takes.push({ stunt: stunt.id, name: stunt.name, rating });
      drivingSkill = Math.min(MAX_SKILL, drivingSkill + SKILL_PER_TAKE);
      directorSatisfaction = averageRounded();
      log(`Take ${takes.length}: ${stunt.name} rated ${rating}`);
      return {
        ok: true,
        stunt: stunt.id,
        name: stunt.name,
        rating,
        drivingSkill,
        takes: takes.length,
        averageRating: averageRounded(),
        satisfaction: directorSatisfaction,
      };
    },

    premiere(filmId) {
      const film = filmById(filmId);
      if (!film) return { ok: false, reason: 'unknown-film' };
      if (signedFilmId === null || signedFilmId !== filmId) return { ok: false, reason: 'wrong-film' };
      if (takes.length < PREMIERE_MIN_TAKES) return { ok: false, reason: 'not-enough-takes' };
      const avg = averageExact();
      if (avg < PREMIERE_MIN_AVG) return { ok: false, reason: 'rating-too-low' };
      const boxOffice = Math.floor(film.budget * (BOX_OFFICE_BASE + avg / 100) * film.payoutShare);
      addCash(boxOffice);
      completedFilms += 1;
      totalBoxOffice += boxOffice;
      const avgRounded = averageRounded();
      const takeCount = takes.length;
      signedFilmId = null;
      signedDay = null;
      takes = [];
      directorSatisfaction = SATISFACTION_START;
      log(`Premiered ${film.title}, box office ${boxOffice}`);
      return {
        ok: true,
        filmId: film.id,
        title: film.title,
        boxOffice,
        averageRating: avgRounded,
        takes: takeCount,
        completedFilms,
        totalBoxOffice,
        cash: getCash(),
      };
    },

    hireDriver(driverIdArg) {
      const driver = driverById(driverIdArg);
      if (!driver) return { ok: false, reason: 'unknown-driver' };
      if (getCash() < driver.fee) return { ok: false, reason: 'not-enough-cash', fee: driver.fee, cash: getCash() };
      addCash(-driver.fee);
      driverId = driver.id;
      driversHired += 1;
      driverFeesPaid += driver.fee;
      log(`Hired driver: ${driver.name}`);
      return { ok: true, driverId: driver.id, name: driver.name, fee: driver.fee, skill: driver.skill, cash: getCash() };
    },

    filmStatus() {
      if (signedFilmId === null) return null;
      const film = filmById(signedFilmId);
      return {
        filmId: signedFilmId,
        title: film.title,
        budget: film.budget,
        payoutShare: film.payoutShare,
        signedDay,
        daysOnFilm: daysOnFilm(),
        takes: takes.length,
        averageRating: averageRounded(),
        satisfaction: directorSatisfaction,
      };
    },

    takeHistory() {
      return takes.map((t) => ({ stunt: t.stunt, name: t.name, rating: t.rating }));
    },

    driverStatus() {
      const driver = driverRecord();
      if (!driver) return null;
      return { driverId: driver.id, name: driver.name, skill: driver.skill, fee: driver.fee };
    },

    averageRating() {
      return averageRounded();
    },

    bestRating() {
      return bestTakeRating();
    },

    daysOnFilm() {
      return daysOnFilm();
    },

    currentHour() {
      return getHour();
    },

    currentHeat() {
      return getHeatLevel();
    },

    stats() {
      const driver = driverRecord();
      return {
        signedFilm: signedFilmId || 'none',
        signedDay: signedDay === null ? -1 : signedDay,
        daysOnFilm: daysOnFilm(),
        takes: takes.length,
        averageRating: averageRounded(),
        bestRating: bestTakeRating(),
        drivingSkill,
        driver: driverId || 'none',
        driverSkill: driver ? driver.skill : 0,
        directorSatisfaction,
        completedFilms,
        totalBoxOffice,
        filmsSigned,
        driversHired,
        driverFeesPaid,
        hasFilm: signedFilmId !== null,
        hasDriver: driverId !== null,
        lastTickDay: lastTickDay === null ? -1 : lastTickDay,
      };
    },

    hudLine() {
      if (signedFilmId === null) {
        const driver = driverRecord();
        const driverText = driver ? `Driver: ${driver.name}` : 'No driver';
        return `No film signed | Driving ${drivingSkill} | ${driverText} | Completed ${completedFilms} | Box office $${totalBoxOffice}`;
      }
      const film = filmById(signedFilmId);
      return `${film.title} | Takes ${takes.length} | Avg ${averageRounded()} | Skill ${drivingSkill} | Day ${daysOnFilm()}/10`;
    },

    tickDay(day) {
      const d = typeof day === 'number' ? day : getDay();
      if (lastTickDay !== null && lastTickDay === d) {
        return { ok: false, reason: 'already-settled' };
      }
      lastTickDay = d;
      if (signedFilmId !== null && signedDay !== null && d - signedDay > CANCEL_AFTER_DAYS) {
        const film = filmById(signedFilmId);
        const lost = takes.length;
        const cancelledId = signedFilmId;
        signedFilmId = null;
        signedDay = null;
        takes = [];
        directorSatisfaction = SATISFACTION_START;
        log(`Film cancelled: ${film.title}`);
        return { ok: true, day: d, cancelled: true, filmId: cancelledId, title: film.title, takesLost: lost };
      }
      return { ok: true, day: d, cancelled: false, filmId: signedFilmId, daysOnFilm: daysOnFilm() };
    },

    serialize() {
      return {
        signedFilmId,
        signedDay,
        takes: takes.map((t) => ({ ...t })),
        drivingSkill,
        driverId,
        directorSatisfaction,
        completedFilms,
        totalBoxOffice,
        filmsSigned,
        driversHired,
        driverFeesPaid,
        lastTickDay,
      };
    },

    deserialize(saved) {
      const restored = {
        filmId: null,
        takes: 0,
      };
      if (!saved || typeof saved !== 'object') return { ok: true, filmId: null, takes: 0 };
      if (typeof saved.signedFilmId === 'string' && filmById(saved.signedFilmId)) {
        signedFilmId = saved.signedFilmId;
        restored.filmId = signedFilmId;
        signedDay = typeof saved.signedDay === 'number' ? saved.signedDay : null;
      } else {
        signedFilmId = null;
        signedDay = null;
      }
      if (Array.isArray(saved.takes)) {
        takes = [];
        for (const t of saved.takes) {
          if (!t || typeof t !== 'object') continue;
          if (!stuntById(t.stunt)) continue;
          takes.push({
            stunt: t.stunt,
            name: typeof t.name === 'string' ? t.name : (stuntById(t.stunt) || {}).name || '',
            rating: clampRating(typeof t.rating === 'number' ? Math.floor(t.rating) : 0),
          });
        }
      } else {
        takes = [];
      }
      restored.takes = takes.length;
      if (typeof saved.drivingSkill === 'number') {
        drivingSkill = Math.max(START_SKILL, Math.min(MAX_SKILL, Math.floor(saved.drivingSkill)));
      }
      if (typeof saved.driverId === 'string' && driverById(saved.driverId)) {
        driverId = saved.driverId;
      } else {
        driverId = null;
      }
      if (typeof saved.directorSatisfaction === 'number') {
        directorSatisfaction = Math.max(0, Math.min(100, Math.floor(saved.directorSatisfaction)));
      }
      const counters = ['completedFilms', 'totalBoxOffice', 'filmsSigned', 'driversHired', 'driverFeesPaid'];
      for (const key of counters) {
        if (typeof saved[key] === 'number') {
          if (key === 'completedFilms') completedFilms = Math.max(0, Math.floor(saved[key]));
          else if (key === 'totalBoxOffice') totalBoxOffice = Math.max(0, Math.floor(saved[key]));
          else if (key === 'filmsSigned') filmsSigned = Math.max(0, Math.floor(saved[key]));
          else if (key === 'driversHired') driversHired = Math.max(0, Math.floor(saved[key]));
          else if (key === 'driverFeesPaid') driverFeesPaid = Math.max(0, Math.floor(saved[key]));
        }
      }
      if (typeof saved.lastTickDay === 'number' || saved.lastTickDay === null) {
        lastTickDay = saved.lastTickDay;
      }
      if (takes.length > 0) directorSatisfaction = averageRounded();
      return { ok: true, filmId: restored.filmId, takes: restored.takes };
    },
  };

  return system;
}
