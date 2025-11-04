import type { BirdDetection } from '../types';

// Mock BirdNET data since we don't have direct API access
// In a real implementation, this would connect to BirdNET's API or a backend that aggregates BirdNET data
export async function fetchBirdDetections(limit: number = 50): Promise<BirdDetection[]> {
  // This is mock data - in production, this would fetch from BirdNET or similar service
  const mockDetections: BirdDetection[] = [
    {
      id: '1',
      species: 'Northern Cardinal',
      commonName: 'Northern Cardinal',
      scientificName: 'Cardinalis cardinalis',
      lat: 40.7128,
      lng: -74.0060,
      timestamp: new Date().toISOString(),
      confidence: 0.95,
      location: 'New York, USA',
    },
    {
      id: '2',
      species: 'European Robin',
      commonName: 'European Robin',
      scientificName: 'Erithacus rubecula',
      lat: 51.5074,
      lng: -0.1278,
      timestamp: new Date().toISOString(),
      confidence: 0.89,
      location: 'London, UK',
    },
    {
      id: '3',
      species: 'Australian Magpie',
      commonName: 'Australian Magpie',
      scientificName: 'Gymnorhina tibicen',
      lat: -33.8688,
      lng: 151.2093,
      timestamp: new Date().toISOString(),
      confidence: 0.92,
      location: 'Sydney, Australia',
    },
    {
      id: '4',
      species: 'House Sparrow',
      commonName: 'House Sparrow',
      scientificName: 'Passer domesticus',
      lat: 48.8566,
      lng: 2.3522,
      timestamp: new Date().toISOString(),
      confidence: 0.87,
      location: 'Paris, France',
    },
    {
      id: '5',
      species: 'American Robin',
      commonName: 'American Robin',
      scientificName: 'Turdus migratorius',
      lat: 34.0522,
      lng: -118.2437,
      timestamp: new Date().toISOString(),
      confidence: 0.91,
      location: 'Los Angeles, USA',
    },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockDetections.slice(0, limit);
}

export async function fetchBirdImage(scientificName: string): Promise<string | undefined> {
  try {
    // Fetch image from Wikipedia
    const searchName = scientificName.replace(/ /g, '_');
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${searchName}`
    );
    
    if (!response.ok) {
      return undefined;
    }
    
    const data = await response.json();
    return data.thumbnail?.source || data.originalimage?.source;
  } catch (error) {
    console.error('Error fetching bird image:', error);
    return undefined;
  }
}
