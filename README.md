# Birds on Earth Radio Globe

An interactive 3D globe visualization that combines bird sighting data from eBird with radio station information from around the world. This web application creates an immersive experience for exploring the intersection of avian biodiversity and radio broadcasting.

## Features

- **Interactive 3D Globe**: Smooth rotation and zoom controls for exploring the Earth
- **Bird Sighting Data**: Visualize bird observations from the eBird community database
- **Radio Station Network**: Display radio stations broadcasting nature and bird-related content
- **Real-time Filtering**: Switch between bird data, radio stations, or view both simultaneously
- **Regional Exploration**: Filter data by geographic regions
- **Detailed Information**: Click on markers to see detailed information about birds or radio stations
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- A modern web browser with WebGL support
- Python (for local development server) or Node.js

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Orwebcraft-ecologists-association/Birds-on-Earth-Radio-globe.git
cd Birds-on-Earth-Radio-globe
```

2. Start a local web server:

**Using Python:**
```bash
python -m http.server 8000
# or
python3 -m http.server 8000
```

**Using Node.js:**
```bash
npm install
npm run serve
```

3. Open your browser and navigate to `http://localhost:8000`

### Usage

- **Mouse Controls**: 
  - Click and drag to rotate the globe
  - Scroll to zoom in/out
  - Click on markers to view detailed information

- **Data Controls**:
  - Use the dropdown to switch between bird sightings, radio stations, or both
  - Filter by geographic regions using the region selector
  - Click "Refresh Data" to load new sample data

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js WebGL library
- **Styling**: CSS Grid, Flexbox, CSS animations
- **Data Sources**: eBird API (simulated), Radio station databases

## Data Sources

- **Bird Data**: Sourced from [eBird](https://ebird.org), the world's largest biodiversity-related citizen science project
- **Radio Stations**: Curated list of stations broadcasting nature sounds, bird calls, and environmental content

## Contributing

We welcome contributions from the ornithology and radio enthusiast communities!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- eBird community for bird observation data
- Three.js community for the excellent 3D graphics library
- Radio stations worldwide broadcasting nature content

## Reference

Original application concept: https://ai.studio/apps/drive/1wQA0FeLYdWwIH_NnTrFfygtuBgQYDChr
