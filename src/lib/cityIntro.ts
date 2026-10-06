/**
 * Builds a unique, factual one-line "how you get here" sentence from a city's
 * own real data (distance, flight route/duration/fare, drive hours, train).
 * Every field varies per city, so the rendered text is genuinely differentiated
 * across the 550 domestic + 46 international origin pages — not spun boilerplate.
 */
export interface CityReachLike {
  name: string;
  distance_km?: number;
  best_mode?: string;
  flight?: { route?: string; duration?: string; fare_range?: string } | null;
  train?: { name?: string; duration?: string } | null;
  road_hours?: number;
  haridwar_transfer?: string;
}

const NA = /not applicable/i;

export function cityReachSentence(city: CityReachLike): string {
  const flyable = city.best_mode === 'fly' && !!city.flight?.route;
  const hasTrain = !!city.train?.name && !NA.test(city.train.name);
  const driveable = typeof city.road_hours === 'number' && city.road_hours < 9999;

  let core = '';
  if (flyable) {
    const f = city.flight!;
    core =
      `the fastest route is to fly ${f.route}` +
      (f.duration ? ` (${f.duration}${f.fare_range ? `, typically ${f.fare_range}` : ''})` : '') +
      (city.haridwar_transfer ? `, then a ${city.haridwar_transfer} road transfer` : '');
  } else if (driveable) {
    core = `it's about a ${city.road_hours}-hour drive to Haridwar`;
    if (hasTrain) core += `, or take the ${city.train!.name}${city.train!.duration ? ` (${city.train!.duration})` : ''}`;
  } else if (hasTrain) {
    core = `the ${city.train!.name}${city.train!.duration ? ` (${city.train!.duration})` : ''} is a popular rail option`;
  }

  if (!core) return '';
  // distance_km is 0/absent for overseas origin cities — omit the clause there
  // rather than print a nonsensical "0 km from Haridwar".
  const dist =
    typeof city.distance_km === 'number' && city.distance_km > 0
      ? `${city.name} is ${city.distance_km.toLocaleString('en-IN')} km from Haridwar — `
      : `From ${city.name}, `;
  return `${dist}${core}.`;
}
