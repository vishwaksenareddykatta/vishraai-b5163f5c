import { useEffect, useState } from "react";
import { type Region, getRegionSync, getCountrySync, subscribeRegion, startRegionDetection } from "@/lib/region";

export function useRegion(): { region: Region | null; country: string | null } {
  const [region, setRegion] = useState<Region | null>(() => getRegionSync());
  const [country, setCountry] = useState<string | null>(() => getCountrySync());

  useEffect(() => {
    void startRegionDetection().then(({ region, country }) => {
      setRegion(region);
      setCountry(country);
    });
    const unsub = subscribeRegion((r) => {
      setRegion(r);
      setCountry(getCountrySync());
    });
    return () => { unsub(); };
  }, []);

  return { region, country };
}
