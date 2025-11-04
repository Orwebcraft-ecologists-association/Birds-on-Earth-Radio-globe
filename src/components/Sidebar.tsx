import { useState } from 'react';
import type { BirdDetection, RadioStation, TreeSubmission } from '../types';

interface SidebarProps {
  mode: 'bird' | 'radio' | 'tree';
  onModeChange: (mode: 'bird' | 'radio' | 'tree') => void;
  birds: BirdDetection[];
  radios: RadioStation[];
  trees: TreeSubmission[];
  onItemSelect: (item: BirdDetection | RadioStation | TreeSubmission) => void;
  onTreeUpload: (file: File) => void;
}

export default function Sidebar({
  mode,
  onModeChange,
  birds,
  radios,
  trees,
  onItemSelect,
  onTreeUpload,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onTreeUpload(file);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-all"
      >
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white/95 backdrop-blur-sm shadow-2xl transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Birds on Earth</h1>
            <p className="text-sm text-gray-600 mt-1">Explore the soundscape of our planet</p>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => onModeChange('bird')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mode === 'bird'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🐦 Birds
            </button>
            <button
              onClick={() => onModeChange('radio')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mode === 'radio'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📻 Radio
            </button>
            <button
              onClick={() => onModeChange('tree')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mode === 'tree'
                  ? 'bg-lime-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌳 Trees
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {mode === 'bird' && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 mb-4">Live bird detections from BirdNET</p>
                {birds.map((bird) => (
                  <div
                    key={bird.id}
                    onClick={() => onItemSelect(bird)}
                    className="p-3 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition-colors border border-green-200"
                  >
                    <h3 className="font-semibold text-gray-800">{bird.commonName}</h3>
                    <p className="text-xs text-gray-600 italic">{bird.scientificName}</p>
                    <p className="text-xs text-gray-500 mt-1">{bird.location}</p>
                    <p className="text-xs text-green-600 mt-1">
                      Confidence: {(bird.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                ))}
              </div>
            )}

            {mode === 'radio' && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 mb-4">Global radio stations</p>
                {radios.map((radio) => (
                  <div
                    key={radio.id}
                    onClick={() => onItemSelect(radio)}
                    className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 cursor-pointer transition-colors border border-orange-200"
                  >
                    <h3 className="font-semibold text-gray-800">{radio.name}</h3>
                    <p className="text-xs text-gray-600">{radio.country}</p>
                    {radio.tags && radio.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {radio.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-orange-200 text-orange-800 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {mode === 'tree' && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 mb-4">
                  Submit tree photos for identification using Google Gemini API (inspired by PlantNet)
                </p>
                
                {/* Upload Section */}
                <div className="p-4 bg-lime-50 rounded-lg border-2 border-dashed border-lime-300">
                  <label className="cursor-pointer block text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="py-6">
                      <svg
                        className="w-12 h-12 mx-auto text-lime-600 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">Upload Tree Photo</p>
                      <p className="text-xs text-gray-500 mt-1">Click to select an image</p>
                    </div>
                  </label>
                </div>

                {/* Tree Submissions List */}
                {trees.map((tree) => (
                  <div
                    key={tree.id}
                    onClick={() => onItemSelect(tree)}
                    className="p-3 bg-lime-50 rounded-lg hover:bg-lime-100 cursor-pointer transition-colors border border-lime-200"
                  >
                    {tree.imageUrl && (
                      <img
                        src={tree.imageUrl}
                        alt={tree.commonName}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <h3 className="font-semibold text-gray-800">{tree.commonName}</h3>
                    <p className="text-xs text-gray-600 italic">{tree.scientificName}</p>
                    {tree.confidence && (
                      <p className="text-xs text-lime-600 mt-1">
                        Confidence: {(tree.confidence * 100).toFixed(0)}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-600">
              Data from{' '}
              <a href="https://birdnet.cornell.edu/" className="text-blue-600 hover:underline">
                BirdNET
              </a>
              ,{' '}
              <a href="https://www.radio-browser.info/" className="text-blue-600 hover:underline">
                radio-browser.info
              </a>
              , and{' '}
              <a href="https://ai.google.dev/gemini-api" className="text-blue-600 hover:underline">
                Google Gemini API
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
