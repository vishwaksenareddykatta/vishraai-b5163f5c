// Global region detection. Kicks off as early as possible (on first import in the browser)
// and caches the result in sessionStorage so subsequent navigations are instant.

export type Region = "IN" | "INTL";

const STORAGE_KEY = "vishra-region-v2";
const COUNTRY_KEY = "vishra-country-v2";

type State = {
  region: Region | null;
  country: string | null;
  promise: Promise<{ region: Region; country: string | null }> | null;
};

const state: State = { region: null, country: null, promise: null };
const listeners = new Set<(r: Region) => void>();

function notify(r: Region) {
  listeners.forEach((l) => {
    try { l(r); } catch {}
  });
}

async function detectViaEndpoint(url: string, parse: (j: any) => string | undefined, signal: AbortSignal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("bad status");
  const json = await res.json();
  return parse(json);
}

export function startRegionDetection(): Promise<{ region: Region; country: string | null }> {
  if (typeof window === "undefined") {
    return Promise.resolve({ region: "INTL" as Region, country: null });
  }

  if (state.region) {
    return Promise.resolve({ region: state.region, country: state.country });
  }

  if (state.promise) return state.promise;

  // Hydrate from sessionStorage instantly.
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY) as Region | null;
    const cachedCountry = sessionStorage.getItem(COUNTRY_KEY);
    if (cached === "IN" || cached === "INTL") {
      state.region = cached;
      state.country = cachedCountry;
      notify(cached);
      return Promise.resolve({ region: cached, country: cachedCountry });
    }
  } catch {}

  // Race multiple geo endpoints; first success wins. Fall back to INTL on full failure.
  state.promise = (async () => {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 2500);

    const sources: Array<Promise<string | undefined>> = [
      detectViaEndpoint("https://ipapi.co/json/", (j) => j?.country_code, ctrl.signal),
      detectViaEndpoint("https://ipwho.is/", (j) => j?.country_code, ctrl.signal),
      detectViaEndpoint("https://get.geojs.io/v1/ip/country.json", (j) => j?.country, ctrl.signal),
    ];

    let country: string | null = null;
    try {
      country = (await Promise.any(sources)) ?? null;
    } catch {
      country = null;
    } finally {
      clearTimeout(timeout);
      ctrl.abort();
    }

    const region: Region = country?.toUpperCase() === "IN" ? "IN" : "INTL";
    state.region = region;
    state.country = country;
    try {
      sessionStorage.setItem(STORAGE_KEY, region);
      if (country) sessionStorage.setItem(COUNTRY_KEY, country);
    } catch {}
    notify(region);
    return { region, country };
  })();

  return state.promise;
}

export function getRegionSync(): Region | null {
  return state.region;
}

export function getCountrySync(): string | null {
  return state.country;
}

export function subscribeRegion(cb: (r: Region) => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// Kick off detection the moment this module is first imported in the browser.
if (typeof window !== "undefined") {
  // microtask so it doesn't block module evaluation
  Promise.resolve().then(() => { void startRegionDetection(); });
}
