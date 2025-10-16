Birds-on-Earth-Radio-globe
Explore the real-time soundscape of our planet. Tune into live birdsong or listen to thousands of global radio stations on an interactive 3D globe. Experience the rich auditory tapestry of nature and human culture, side-by-side.

🌍 Project Purpose
The Birds-on-Earth-Radio-globe project aims to connect people with the world through sound in a unique and immersive way. By visualizing both natural soundscapes and human broadcasts on an interactive globe, we want to:

Raise Awareness: Highlight the incredible diversity of both bird species and human cultures around the globe.

Promote Conservation: Encourage interest in avian conservation by showcasing the beauty of our planet's natural soundscapes.

Connect Cultures: Allow users to explore different cultures, news, and music by tuning into local radio stations from thousands of miles away.

Educate and Inspire: Provide a tool for enthusiasts, students, and researchers to explore geography, biology, and global media.

Create a Unique Experience: Offer a rich auditory experience, allowing users to switch between the calming sounds of nature and the vibrant energy of a bustling city's radio waves.

✨ Key Features
Interactive 3D Globe: A fully interactive globe that you can rotate, zoom, and explore.

Dual Audio Modes: Seamlessly switch between listening to birdsong and live radio stations.

Real-time Birdsong Streams: Listen to the ambient sounds of birds in their natural habitats from various remote locations.

Global Radio Stations 📻: Tune into thousands of live internet radio streams from cities all over the world. Discover music, news, and talk shows from different cultures.

Bird Sound Identification: An integrated feature that attempts to identify bird species being heard in the audio streams.

Smart Filtering: Filter streams by continent, country, ecosystem (for birds), or genre (for radio).

Day/Night Cycle: A visual representation of the day and night cycle on the globe, influencing which bird sounds and radio shows are live.

User Contributions: A system for users to submit their own bird sound recordings or suggest new radio stations.

🎯 Target Audience
This project is for anyone with a curious mind and an interest in nature, technology, and the world around them. This includes:

Nature Lovers and Birdwatchers: Individuals passionate about birds who want to explore their sounds globally.

Radio Enthusiasts and World Music Lovers: People eager to discover new music and cultural perspectives through international radio.

Educators and Students: A great tool for teaching geography, biology, environmental science, and media studies.

Researchers and Ornithologists: A potential source of data for studying bird vocalizations and migration patterns.

Developers and Tech Enthusiasts: A fun project for those interested in web development, data visualization, and real-time applications.

💻 Technologies Used
The project is built using a modern and scalable tech stack:

Frontend:

HTML5, CSS3, JavaScript (Vanilla): Core web technologies for building the user interface.

Three.js: A 3D graphics library for creating the interactive globe.

APIs and Services:

radio-browser.info API: For sourcing the comprehensive list of global radio stations.

Local Storage: For persisting user data (favorites, search history, station submissions).

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Orwebcraft-ecologists-association/Birds-on-Earth-Radio-globe.git
cd Birds-on-Earth-Radio-globe
```

2. Open `index.html` in a modern web browser or serve it using a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser.

### Features Implemented (Version 1.23)

#### Admin Mode
- Toggle admin mode via the gear icon (⚙️) in the About modal
- Approve or reject pending station submissions
- Approved stations are immediately added to the globe
- All changes persist locally in browser storage

#### Search History
- Tracks last 5 searches for both radio stations and bird species
- Collapsible interface in the Detections tab
- Click any history item to re-search
- Clear button for each category (stations/birds)
- Persistent across browser sessions

#### Station Status Checker
- Background check runs on app load and every 5 minutes
- Checks all favorite stations for online/offline status
- Visual indicators:
  - Red markers on globe for offline stations
  - Red "offline" badge in station lists
  - Status updates automatically

#### Other Features
- Interactive 3D globe with real radio station locations
- Dual mode: Radio stations and bird sounds
- Favorite stations with star icon
- Station submission system
- Download packs for birds and radio stations
- Real-time audio playback from thousands of global stations
- Continent and country filtering

### Usage

1. **Browse Stations**: Click and drag to rotate the globe, scroll to zoom
2. **Search**: Enter station name or location in the search box
3. **Play**: Click any station to start playback
4. **Add Favorites**: Click the star icon to add/remove favorites
5. **Submit Station**: Click "➕ Submit Station" to add new stations
6. **Admin Mode**: Click the gear icon in About modal to manage submissions
7. **View History**: Go to Detections tab to see search history

### Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Requires a modern browser with WebGL support for 3D globe rendering.
