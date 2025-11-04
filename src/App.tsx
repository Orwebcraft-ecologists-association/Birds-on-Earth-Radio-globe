import { useState, useEffect } from 'react';
import Scene from './components/Scene';
import Sidebar from './components/Sidebar';
import InfoPanel from './components/InfoPanel';
import About from './components/About';
import type { BirdDetection, RadioStation, TreeSubmission, Marker } from './types';
import { fetchBirdDetections } from './services/birdService';
import { fetchRadioStations } from './services/radioService';
import { identifyTree } from './services/treeService';

function App() {
  const [mode, setMode] = useState<'bird' | 'radio' | 'tree'>('bird');
  const [birds, setBirds] = useState<BirdDetection[]>([]);
  const [radios, setRadios] = useState<RadioStation[]>([]);
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [selectedItem, setSelectedItem] = useState<BirdDetection | RadioStation | TreeSubmission | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [birdData, radioData] = await Promise.all([
          fetchBirdDetections(20),
          fetchRadioStations(undefined, 50),
        ]);
        setBirds(birdData);
        setRadios(radioData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Create markers for the globe
  const markers: Marker[] = [
    ...birds.map(bird => ({
      lat: bird.lat,
      lng: bird.lng,
      type: 'bird' as const,
      data: bird,
    })),
    ...radios.map(radio => ({
      lat: radio.lat,
      lng: radio.lng,
      type: 'radio' as const,
      data: radio,
    })),
    ...trees.map(tree => ({
      lat: tree.lat,
      lng: tree.lng,
      type: 'tree' as const,
      data: tree,
    })),
  ].filter(marker => {
    if (mode === 'bird') return marker.type === 'bird';
    if (mode === 'radio') return marker.type === 'radio';
    if (mode === 'tree') return marker.type === 'tree';
    return true;
  });

  const handleTreeUpload = async (file: File) => {
    try {
      // For demo purposes, use a random location
      // In production, this would use the user's location or allow them to select on the map
      const lat = (Math.random() - 0.5) * 180;
      const lng = (Math.random() - 0.5) * 360;
      
      const treeData = await identifyTree(file, lat, lng);
      setTrees(prev => [treeData, ...prev]);
      setSelectedItem(treeData);
    } catch (error) {
      console.error('Error identifying tree:', error);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* About Button */}
      <button
        onClick={() => setShowAbout(true)}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-all font-medium text-sm"
      >
        ℹ️ About
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-700">Loading data...</p>
          </div>
        </div>
      )}

      {/* 3D Globe Scene */}
      <Scene markers={markers} />

      {/* Sidebar */}
      <Sidebar
        mode={mode}
        onModeChange={setMode}
        birds={birds}
        radios={radios}
        trees={trees}
        onItemSelect={setSelectedItem}
        onTreeUpload={handleTreeUpload}
      />

      {/* Info Panel */}
      <InfoPanel
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* About Modal */}
      <About
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </div>
  );
}

export default App;
