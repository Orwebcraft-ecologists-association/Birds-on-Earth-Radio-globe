# 🌍 Birds-on-Earth-Radio-globe 📻

Explore the real-time soundscape of our planet. Tune into live radio stations from around the world with robust error handling and station validation. Experience the rich auditory tapestry of human culture from thousands of global radio stations.

> **Current Status**: Radio station functionality is fully implemented with special focus on Israeli stations. Bird sound features are planned for future releases.

## 🚀 Quick Start

1. **Open the Application**: Simply open `index.html` in any modern web browser
2. **Select Country**: Choose a country from the dropdown (e.g., 🇮🇱 Israel)
3. **Load Stations**: Click "Load Stations" to fetch available radio stations
4. **Test Stations**: Click "Test & Fix Broken Stations" to validate and filter working stations
5. **Select & Play**: Click on a station and hit the "▶ Play" button to start listening

### Running with Local Server

```bash
# Using Python 3
python3 -m http.server 8000

# Or using npm
npm start
```

Then navigate to `http://localhost:8000`

## 🌍 Project Purpose

The Birds-on-Earth-Radio-globe project aims to connect people with the world through sound in a unique and immersive way. Our current implementation focuses on providing reliable access to global radio stations:

- **Connect Cultures**: Allow users to explore different cultures, news, and music by tuning into local radio stations from thousands of miles away.

- **Educate and Inspire**: Provide a tool for enthusiasts, students, and researchers to explore geography, cultural diversity, and global media.

- **Ensure Reliability**: Robust error handling and station validation to ensure working playback, with special focus on Israeli stations.

- **Create a Unique Experience**: Offer a rich auditory experience exploring the vibrant energy of radio waves from cities around the globe.

## ✨ Implemented Features

### Radio Station Features (Current Release)

- **🌍 Global Radio Access**: Tune into thousands of live internet radio streams from cities all over the world. Discover music, news, and talk shows from different cultures.

- **🔍 Smart Filtering**: Filter streams by country with search functionality to find specific stations.

- **✅ Station Validation**: Automatic testing and validation of radio stations to ensure they're actually working before you try to play them.

- **🇮🇱 Israeli Station Focus**: Special handling and validation for Israeli radio stations with automatic testing upon loading.

- **🛡️ Robust Error Handling**: Comprehensive error detection with clear, user-friendly messages when stations fail to play.

- **📊 Quality Indicators**: Visual indicators showing which stations are validated as working (green) vs. broken (red).

- **🔄 Multi-Server Reliability**: Uses multiple Radio Browser API servers with automatic fallback for maximum uptime.

- **📡 Stream Information**: Displays bitrate, codec, language, and other technical details for each station.

- **🎚️ Volume Control**: Easy-to-use volume slider with visual feedback.

### Planned Features (Future Releases)

- Interactive 3D Globe visualization
- Bird sound integration
- Day/Night cycle visualization
- User contributions for new stations

## 🎯 Target Audience

This project is for anyone with a curious mind and an interest in the world around them:

- **Radio Enthusiasts and World Music Lovers**: People eager to discover new music and cultural perspectives through international radio.

- **Educators and Students**: A great tool for teaching geography, cultural diversity, and global media studies.

- **Travelers and Culture Enthusiasts**: Stay connected with your home country or explore new cultures through local radio.

- **Israeli Listeners**: Specially optimized for reliable access to Israeli radio stations.

- **Developers and Tech Enthusiasts**: A practical example of web audio, API integration, and error handling.

## 💻 Technologies Used

The current implementation uses a clean, lightweight tech stack:

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, flexbox, and responsive design
- **Vanilla JavaScript**: No framework dependencies for maximum compatibility and performance
- **HTML5 Audio API**: Native browser audio playback

### APIs and Services
- **Radio Browser API**: Community-maintained database of radio stations worldwide
  - Multiple server endpoints (Germany, Netherlands, Austria) for reliability
  - RESTful JSON API
  - Free and open-source

### Architecture
- **Client-Side Only**: No backend server required
- **Static Hosting**: Can be deployed to any static file hosting service
- **No Build Process**: Works directly in the browser without compilation

### Browser Support
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Modern browsers required for HTML5 audio support

## 📁 Project Structure

```
Birds-on-Earth-Radio-globe/
├── index.html          # Main HTML file with UI structure
├── app.js              # JavaScript application logic
├── package.json        # Project metadata and scripts
├── README.md           # This file
├── USER_GUIDE.md       # Detailed user documentation
└── TECHNICAL_DOCS.md   # Technical implementation details
```

## 🐛 Bug Fixes

### Fixed: Unplayable Radio Stations

This release specifically addresses the reported issue of many unplayable stations:

1. **✅ Station Validation**: Implemented automatic testing to identify working vs. broken stations
2. **✅ Israeli Stations**: Special focus on ensuring Israeli radio stations work properly with automatic validation
3. **✅ Error Handling**: Comprehensive error detection and user-friendly error messages
4. **✅ Smart Filtering**: "Test & Fix Broken Stations" feature to filter out non-working streams
5. **✅ Multiple API Servers**: Fallback mechanism ensures station data is always available
6. **✅ URL Resolution**: Prioritizes resolved URLs for better reliability
7. **✅ Quality Indicators**: Visual feedback showing station working status

## 📖 Documentation

- **[USER_GUIDE.md](USER_GUIDE.md)**: Complete user guide with screenshots and troubleshooting
- **[TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)**: Technical implementation details and architecture

## 🔧 Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Optional: Python 3 for local server (for testing)

### Local Development
```bash
# Clone the repository
git clone https://github.com/Orwebcraft-ecologists-association/Birds-on-Earth-Radio-globe.git
cd Birds-on-Earth-Radio-globe

# Start local server
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### Deployment
Simply upload all files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

No build step or server configuration required!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Credits

- **Radio Database**: [Radio Browser](https://www.radio-browser.info/) - Community-maintained radio station database
- **Development**: Orwebcraft Ecologists Association
- **Community**: Thanks to all radio station contributors worldwide

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Orwebcraft-ecologists-association/Birds-on-Earth-Radio-globe/issues)
- **Email**: Contact the Orwebcraft Ecologists Association

---

**Made with ❤️ by the Orwebcraft Ecologists Association**
