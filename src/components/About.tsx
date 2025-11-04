interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function About({ isOpen, onClose }: AboutProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="float-right p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Birds on Earth Radio</h1>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            This interactive globe is a unique fusion of technology and nature, bringing together 
            live radio broadcasts and real-time bird sound detections from across the planet. 
            It's an auditory exploration of our world, showcasing the vibrant soundscapes created 
            by both humans and wildlife.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Data Sources</h2>
          <div className="space-y-3 mb-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-1">🐦 Live Bird Detections</h3>
              <p className="text-sm text-gray-700">
                Sourced from the{' '}
                <a
                  href="https://birdnet.cornell.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  BirdNET
                </a>{' '}
                project by The Cornell Lab of Ornithology, which uses AI to identify birds by their songs.
              </p>
            </div>

            <div className="p-4 bg-lime-50 rounded-lg">
              <h3 className="font-semibold text-lime-800 mb-1">🌳 Tree Identification</h3>
              <p className="text-sm text-gray-700">
                User-submitted tree photos are identified using the{' '}
                <a
                  href="https://ai.google.dev/gemini-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Gemini API
                </a>
                . This feature is inspired by the incredible work of the{' '}
                <a
                  href="https://identify.plantnet.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  PlantNet
                </a>{' '}
                project.
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-1">📻 Global Radio Stations</h3>
              <p className="text-sm text-gray-700">
                Provided by the community-driven{' '}
                <a
                  href="https://www.radio-browser.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  radio-browser.info
                </a>{' '}
                API, a wiki-like approach to collecting internet radio stations.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-1">🖼️ Species Imagery</h3>
              <p className="text-sm text-gray-700">
                Fetched from{' '}
                <a
                  href="https://www.wikipedia.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Wikipedia
                </a>{' '}
                to provide visual context for each detected species.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Technology Stack</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Frontend</h3>
              <p className="text-xs text-gray-600">React + TypeScript</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">3D Globe</h3>
              <p className="text-xs text-gray-600">Three.js</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Styling</h3>
              <p className="text-xs text-gray-600">Tailwind CSS</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Build Tool</h3>
              <p className="text-xs text-gray-600">Vite</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Credits</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This project was created to demonstrate the power of combining real-time data streams 
            in a visually engaging way. The source code is available on{' '}
            <a
              href="https://github.com/Orwebcraft-ecologists-association/Birds-on-Earth-Radio-globe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
            .
          </p>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700 text-center">
              🌍 Explore the rich tapestry of sound across our planet 🌍
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
