# Birds On Earth Radio - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Features Overview](#features-overview)
3. [Admin Mode](#admin-mode)
4. [Search History](#search-history)
5. [Station Status Checker](#station-status-checker)
6. [Favorites](#favorites)
7. [Submit a Station](#submit-a-station)
8. [Downloads](#downloads)

## Getting Started

Open `index.html` in a modern web browser. The application will load with an interactive globe showing radio stations around the world.

## Features Overview

### Dual Mode Toggle
Switch between **Birds Mode** 🦜 and **Radio Mode** 📻 using the toggle button at the top of the panel.

- **Birds Mode**: Listen to bird sounds from around the world
- **Radio Mode**: Tune into global radio stations

### Navigation Tabs
- **Search**: Find stations or birds by name or location
- **Detections**: View search history and current detections
- **Favorites**: Access your saved favorite stations

## Admin Mode

### Accessing Admin Mode
1. Click the **ℹ️ About** button
2. Click the **⚙️ gear icon** at the bottom of the About modal
3. The admin panel will appear showing pending station submissions

### Managing Submissions
When admin mode is active:
- View all pending station submissions
- Click **✓ Approve** to add a station to the global list
- Click **✗ Reject** to remove a submission from the pending list
- All actions are saved in browser localStorage

### Features
- Approved stations are immediately added to the globe
- Rejected stations are permanently removed from pending list
- All changes persist between browser sessions

## Search History

### How It Works
The application automatically tracks your last 5 searches for both radio stations and bird species.

### Accessing Search History
1. Go to the **Detections** tab
2. Find the **📜 Search History** section
3. Click the header to expand/collapse

### Features
- **Separate Lists**: Radio stations and birds have independent histories
- **Click to Re-search**: Click any history item to search for it again
- **Clear History**: Each list has a "Clear" button to remove all entries
- **Persistent Storage**: History is saved in localStorage

### Usage Tips
- Most recent searches appear at the top
- History updates automatically when you perform a search
- Maximum of 5 items per category

## Station Status Checker

### Automatic Status Checking
The application automatically checks the status of your favorite stations:
- **On App Load**: All favorite stations are checked
- **Every 5 Minutes**: Background task re-checks all favorites

### Visual Indicators

#### On the Globe
- **Green Markers** 🟢: Station is online
- **Red Markers** 🔴: Station is offline

#### In the UI
- **Offline Badge**: Red indicator next to offline stations
- **Status Dot**: Small colored circle shows online/offline status

### How It Works
1. The checker simulates status checks for each favorite station (in production, this would query actual station APIs)
2. Results are cached in localStorage
3. Markers and UI update automatically
4. If an offline station comes back online, it automatically turns green

*Note: In this demo version, station status is simulated. In a production environment, this would query actual radio station APIs.*

## Favorites

### Adding to Favorites
1. Search for a station
2. Click the **☆ star icon** next to the station
3. The star will fill ⭐ to show it's favorited

### Viewing Favorites
1. Click the **Favorites** tab
2. All your favorite stations appear in the list
3. Click any station to start playing

### Removing from Favorites
Click the filled **⭐ star icon** to unfavorite a station

### Features
- Favorites persist across browser sessions
- Status indicators show if a favorite is offline
- Favorites are checked automatically for status

## Submit a Station

### How to Submit
1. Click the **➕ Submit Station** button
2. Fill in the form:
   - **Station Name**: The name of the radio station
   - **Stream URL**: The URL of the audio stream
   - **Country**: The country where the station is located
   - **Latitude**: Geographic latitude (decimal format)
   - **Longitude**: Geographic longitude (decimal format)
3. Click **Submit**

### What Happens Next
- Your submission is added to the pending queue
- An admin can review and approve/reject it
- If approved, the station appears on the globe immediately
- All submissions are saved in localStorage

## Downloads

### Available Downloads
1. **🦜 Download Birds Pack**: Collection of bird sound recordings
2. **📻 Download Radio Pack**: Favorite radio stations for offline access

### How to Download
1. Click the **📥 Downloads** button
2. Choose which pack to download
3. Follow the browser's download prompts

*Note: In this demo version, downloads display informational alerts. In a production environment, these would trigger actual file downloads with packaged content.*

## Keyboard Shortcuts

- **Enter**: Submit search query
- **Escape**: Close modals (if implemented)

## Browser Compatibility

### Recommended Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

### Requirements
- JavaScript enabled
- localStorage enabled
- Canvas support (for globe rendering)

## Data Storage

All data is stored in browser localStorage:
- **favorites**: Your favorite stations
- **stationHistory**: Radio station search history
- **birdHistory**: Bird search history
- **pendingStations**: Stations awaiting admin review
- **approvedStations**: User-submitted approved stations
- **rejectedStations**: Rejected submission IDs
- **stationStatus**: Online/offline status cache

### Clearing Data
To reset the application:
1. Open browser Developer Tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage for this domain

## Troubleshooting

### Globe Not Rendering
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

### Station Won't Play
- Check if the station shows as offline (red indicator)
- Some stations may require specific browser permissions
- Try a different station

### Search History Not Saving
- Check if localStorage is enabled in browser settings
- Ensure you're not in private/incognito mode

### Admin Mode Not Showing Submissions
- Make sure you've toggled admin mode ON (gear icon clicked)
- Submit a test station to see it appear
- Check browser console for errors

## Tips and Tricks

1. **Globe Interaction**: The globe rotates automatically. Watch for station markers to appear.

2. **Quick Favorites**: Star a station right from search results - no need to play it first.

3. **Search History**: Click a history item to quickly re-run that search.

4. **Status Awareness**: Check favorites regularly to see which stations are online.

5. **Admin Workflow**: Submit stations during browsing, then approve them in admin mode.

## Version Information

**Current Version**: 1.23

### New in v1.23
- ✨ Admin mode for station approval/rejection
- 📜 Search history with collapsible UI
- 🔴 Station status checker with visual indicators
- ⭐ Enhanced favorites functionality
- 📥 Download packs feature
- 🎨 Improved UI with better visual feedback

---

For more information or to report issues, visit the project repository.
