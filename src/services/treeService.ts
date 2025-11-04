import type { TreeSubmission } from '../types';

// This would integrate with Google Gemini API for plant identification
// For now, we'll create a mock service structure

export async function identifyTree(imageFile: File, lat: number, lng: number): Promise<TreeSubmission> {
  // In production, this would:
  // 1. Upload the image
  // 2. Call Google Gemini API for identification
  // 3. Return the identified tree data
  
  // Mock implementation
  const reader = new FileReader();
  
  return new Promise((resolve) => {
    reader.onload = () => {
      const mockTreeData: TreeSubmission = {
        id: Date.now().toString(),
        species: 'Oak',
        commonName: 'White Oak',
        scientificName: 'Quercus alba',
        lat,
        lng,
        timestamp: new Date().toISOString(),
        imageUrl: reader.result as string,
        confidence: 0.85,
        submittedBy: 'user',
      };
      
      // Simulate API delay
      setTimeout(() => resolve(mockTreeData), 1000);
    };
    
    reader.readAsDataURL(imageFile);
  });
}

export async function submitTreeIdentification(
  imageUrl: string,
  lat: number,
  lng: number
): Promise<TreeSubmission> {
  // This would call the Gemini API
  // Mock response for now
  const mockSubmission: TreeSubmission = {
    id: Date.now().toString(),
    species: 'Pine',
    commonName: 'Eastern White Pine',
    scientificName: 'Pinus strobus',
    lat,
    lng,
    timestamp: new Date().toISOString(),
    imageUrl,
    confidence: 0.82,
    submittedBy: 'anonymous',
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return mockSubmission;
}

