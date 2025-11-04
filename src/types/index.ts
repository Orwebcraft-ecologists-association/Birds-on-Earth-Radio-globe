export interface BirdDetection {
  id: string;
  species: string;
  commonName: string;
  scientificName: string;
  lat: number;
  lng: number;
  timestamp: string;
  confidence: number;
  location: string;
  audioUrl?: string;
  imageUrl?: string;
}

export interface RadioStation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  url: string;
  favicon?: string;
  tags?: string[];
  codec?: string;
  bitrate?: number;
}

export interface TreeSubmission {
  id: string;
  species?: string;
  commonName?: string;
  scientificName?: string;
  lat: number;
  lng: number;
  timestamp: string;
  imageUrl: string;
  confidence?: number;
  submittedBy?: string;
}

export type MarkerType = 'bird' | 'radio' | 'tree';

export interface Marker {
  lat: number;
  lng: number;
  type: MarkerType;
  data: BirdDetection | RadioStation | TreeSubmission;
}
