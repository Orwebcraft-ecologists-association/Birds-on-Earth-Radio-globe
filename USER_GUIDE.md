# 🌍 Birds on Earth Radio Globe - User Guide

## Overview
Birds on Earth Radio Globe is a web application that allows you to explore and listen to thousands of live radio stations from around the world. The application includes robust error handling and station validation, with a special focus on ensuring Israeli radio stations work properly.

## Features

### ✅ Core Features
- **Global Radio Access**: Access thousands of radio stations worldwide through the Radio Browser API
- **Country Filtering**: Filter stations by country (with special support for Israel)
- **Search Functionality**: Search for specific stations by name
- **Station Validation**: Automatically test and validate stations to ensure they're working
- **Smart Error Handling**: Detects and filters out broken stations
- **Real-time Playback**: Stream live radio directly in your browser

### 🇮🇱 Israeli Station Support
The application has been specifically optimized for Israeli radio stations with:
- Automatic validation of Israeli stations upon loading
- Prioritization of working stations
- Enhanced error handling for regional streaming issues
- Support for multiple stream formats common in Israel

## Getting Started

### Quick Start
1. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, or Edge)
2. Select a country from the dropdown menu (e.g., "🇮🇱 Israel")
3. Click "Load Stations" to fetch available stations
4. Click on any station from the list to select it
5. Click the "▶ Play" button to start listening

### Running Locally
To run the application with a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using npm
npm start
```

Then open your browser to `http://localhost:8000`

## User Interface Guide

### Sidebar Controls

#### Country Selection
- **Dropdown Menu**: Select from major countries including Israel, USA, UK, Germany, and more
- **Default**: Shows all countries if none selected

#### Search
- **Search Box**: Type station name or keywords to filter results
- **Real-time Filtering**: Results update as you type

#### Action Buttons
- **Load Stations**: Fetches stations based on current filters
- **Test & Fix Broken Stations**: Validates all loaded stations and shows only working ones

#### Statistics
- **Total Stations**: Shows the total number of loaded stations
- **Working Stations**: Shows how many stations have been validated as working

#### Station List
Each station displays:
- **Station Name**: The official name of the radio station
- **Country**: Location of the station (🌍)
- **Genre/Tags**: Music genre or content type (🏷️)
- **Bitrate**: Stream quality in kbps (📡)
- **Status Indicator**: 
  - Green border = Validated working station (✓)
  - Red border = Not working/broken station (✗)

### Main Player Area

#### Player Information
- **Station Title**: Currently selected station name
- **Station Details**: Country, language, tags, bitrate, and codec information

#### Playback Controls
- **▶ Play**: Start playback of the selected station
- **⏹ Stop**: Stop playback and reset

#### Volume Control
- **Volume Slider**: Adjust volume from 0% to 100%
- **Default**: Set to 70%

## How to Fix Unplayable Stations

### Automatic Fixing
1. Load stations from your desired country
2. Click "Test & Fix Broken Stations"
3. The app will:
   - Test each station's stream URL
   - Mark working stations with a green indicator
   - Mark broken stations with a red indicator
   - Filter the list to show only working stations

### For Israeli Stations
When you select Israel and load stations:
1. The app automatically performs a quick validation
2. Stations are sorted with working ones at the top
3. Any broken stations are identified and can be filtered out

### Manual Station Testing
If a station fails to play:
1. The error message will indicate the type of failure:
   - "Network error" = Station may be offline
   - "Stream URL not supported" = Station is likely offline or has changed
   - "Decoding error" = Unsupported audio format
2. The station will be automatically marked as broken
3. Try selecting a different station from the list

## Troubleshooting

### No Stations Found
- **Solution**: Try selecting a different country or use a broader search term
- **Note**: Some countries may have fewer stations in the database

### Station Won't Play
- **Possible Causes**:
  - Station is temporarily offline
  - Station has moved to a new URL
  - Your browser blocks the stream (check HTTPS/HTTP mixed content)
  - Station uses an unsupported codec
- **Solution**: Use "Test & Fix Broken Stations" to filter them out

### Slow Loading
- **Cause**: The app tries multiple API servers for reliability
- **Solution**: Be patient; the app will find the fastest available server

### Audio Stuttering
- **Possible Causes**:
  - Slow internet connection
  - High bitrate station
- **Solution**: Try a station with a lower bitrate

## Technical Details

### Supported Audio Formats
- MP3
- AAC
- OGG Vorbis
- Opus
- (Browser dependent)

### Browser Compatibility
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Older browsers may have limited codec support

### API Information
The app uses the Radio Browser API with multiple fallback servers:
- `de1.api.radio-browser.info` (Germany)
- `nl1.api.radio-browser.info` (Netherlands)
- `at1.api.radio-browser.info` (Austria)

### Station Quality Indicators
Stations are ordered by:
1. **Vote count**: Popular stations appear first
2. **Working status**: Validated working stations are prioritized
3. **Bitrate**: Higher quality streams when available

## Privacy & Security

- **No Data Collection**: The app doesn't collect or store any personal data
- **Direct Streaming**: Audio streams directly from radio stations to your browser
- **Open Source**: All code is visible and auditable
- **API Access**: Uses the free, community-maintained Radio Browser API

## Tips for Best Experience

1. **Test Stations**: Always use "Test & Fix" when loading a new country
2. **Israeli Stations**: Load Israeli stations for automatic validation
3. **Volume**: Start with 70% volume and adjust as needed
4. **Search**: Use search to quickly find specific stations
5. **Browser**: Use a modern, updated browser for best compatibility
6. **Connection**: Stable internet connection recommended for smooth playback

## Known Limitations

- Some stations may be geo-restricted
- Station availability depends on the Radio Browser database
- Some stations may require specific browser plugins (rare)
- HTTPS sites may block HTTP streams (browser security feature)

## Support

For issues, questions, or contributions:
- **GitHub Issues**: Report bugs or request features
- **Email**: Contact the Orwebcraft Ecologists Association

## Credits

- **Radio Database**: [Radio Browser](https://www.radio-browser.info/)
- **Development**: Orwebcraft Ecologists Association
- **Community**: Thanks to all radio station contributors worldwide

---

**Version**: 1.0.0  
**Last Updated**: November 2025
