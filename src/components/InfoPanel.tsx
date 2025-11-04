import type { BirdDetection, RadioStation, TreeSubmission } from '../types';

interface InfoPanelProps {
  item: BirdDetection | RadioStation | TreeSubmission | null;
  onClose: () => void;
}

function isBirdDetection(item: BirdDetection | RadioStation | TreeSubmission | null): item is BirdDetection {
  return item !== null && 'species' in item && 'confidence' in item;
}

function isRadioStation(item: BirdDetection | RadioStation | TreeSubmission | null): item is RadioStation {
  return item !== null && 'url' in item && 'name' in item;
}

function isTreeSubmission(item: BirdDetection | RadioStation | TreeSubmission | null): item is TreeSubmission {
  return item !== null && 'imageUrl' in item && 'timestamp' in item;
}

export default function InfoPanel({ item, onClose }: InfoPanelProps) {
  if (!item) return null;

  return (
    <div className="fixed bottom-0 right-0 w-96 bg-white/95 backdrop-blur-sm shadow-2xl rounded-tl-2xl z-40 max-h-[60vh] overflow-y-auto">
      <div className="p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Bird Detection Info */}
        {isBirdDetection(item) && (
          <div>
            <div className="mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Bird Detection
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.commonName}</h2>
            <p className="text-sm text-gray-600 italic mb-4">{item.scientificName}</p>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-sm text-gray-800">{item.location}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Confidence</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {(item.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Detected</p>
                <p className="text-sm text-gray-800">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            {item.imageUrl && (
              <div className="mt-4">
                <img
                  src={item.imageUrl}
                  alt={item.commonName}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        )}

        {/* Radio Station Info */}
        {isRadioStation(item) && (
          <div>
            <div className="mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                Radio Station
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Country</p>
                <p className="text-sm text-gray-800">{item.country}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-xs text-gray-600">
                  {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                </p>
              </div>
              
              {item.codec && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Audio Format</p>
                  <p className="text-sm text-gray-800">
                    {item.codec} {item.bitrate ? `@ ${item.bitrate} kbps` : ''}
                  </p>
                </div>
              )}
              
              {item.tags && item.tags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
              🎧 Listen Now
            </button>
          </div>
        )}

        {/* Tree Submission Info */}
        {isTreeSubmission(item) && (
          <div>
            <div className="mb-4">
              <span className="px-3 py-1 bg-lime-100 text-lime-800 text-xs font-medium rounded-full">
                Tree Identification
              </span>
            </div>
            
            {item.imageUrl && (
              <div className="mb-4">
                <img
                  src={item.imageUrl}
                  alt={item.commonName || 'Tree'}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {item.commonName || 'Unidentified Tree'}
            </h2>
            {item.scientificName && (
              <p className="text-sm text-gray-600 italic mb-4">{item.scientificName}</p>
            )}
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-xs text-gray-600">
                  {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                </p>
              </div>
              
              {item.confidence && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Confidence</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-lime-500 h-2 rounded-full"
                        style={{ width: `${item.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {(item.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
              
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Submitted</p>
                <p className="text-sm text-gray-800">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Tree identification powered by Google Gemini API, 
                  inspired by the PlantNet project.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
