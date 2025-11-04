import type { RadioStation } from '../types';

const RADIO_BROWSER_API = 'https://de1.api.radio-browser.info/json';

interface RadioBrowserStation {
  stationuuid: string;
  name: string;
  country: string;
  geo_lat: string;
  geo_long: string;
  url: string;
  favicon?: string;
  tags?: string;
  codec?: string;
  bitrate?: number;
}

export async function fetchRadioStations(
  country?: string,
  limit: number = 100
): Promise<RadioStation[]> {
  try {
    const endpoint = country 
      ? `${RADIO_BROWSER_API}/stations/bycountry/${encodeURIComponent(country)}`
      : `${RADIO_BROWSER_API}/stations/topvote/${limit}`;
    
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch radio stations');
    }
    
    const data = await response.json() as RadioBrowserStation[];
    
    return data
      .filter((station) => station.geo_lat && station.geo_long)
      .map((station) => ({
        id: station.stationuuid,
        name: station.name,
        country: station.country,
        lat: parseFloat(station.geo_lat),
        lng: parseFloat(station.geo_long),
        url: station.url,
        favicon: station.favicon,
        tags: station.tags?.split(',').filter(Boolean),
        codec: station.codec,
        bitrate: station.bitrate,
      }));
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    return [];
  }
}

export async function searchRadioStations(query: string): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${RADIO_BROWSER_API}/stations/byname/${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search radio stations');
    }
    
    const data = await response.json() as RadioBrowserStation[];
    
    return data
      .filter((station) => station.geo_lat && station.geo_long)
      .map((station) => ({
        id: station.stationuuid,
        name: station.name,
        country: station.country,
        lat: parseFloat(station.geo_lat),
        lng: parseFloat(station.geo_long),
        url: station.url,
        favicon: station.favicon,
        tags: station.tags?.split(',').filter(Boolean),
        codec: station.codec,
        bitrate: station.bitrate,
      }));
  } catch (error) {
    console.error('Error searching radio stations:', error);
    return [];
  }
}
