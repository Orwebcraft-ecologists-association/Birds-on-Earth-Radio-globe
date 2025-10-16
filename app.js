// Birds On Earth Radio Application
// Version 1.23 - Demo Version
// 
// This is a demonstration implementation using mock data and simulated features.
// Production version would integrate with:
// - Radio Browser API for live station data
// - eBird/Xeno-canto APIs for bird recordings  
// - Real-time stream status checking
// - Actual audio streaming infrastructure

// ======================
// Global State
// ======================
const AppState = {
    mode: 'birds', // 'birds' or 'radio'
    currentStation: null,
    audioPlayer: new Audio(),
    isPlaying: false,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    searchHistory: {
        stations: JSON.parse(localStorage.getItem('stationHistory') || '[]'),
        birds: JSON.parse(localStorage.getItem('birdHistory') || '[]')
    },
    pendingStations: JSON.parse(localStorage.getItem('pendingStations') || '[]'),
    approvedStations: JSON.parse(localStorage.getItem('approvedStations') || '[]'),
    rejectedStations: JSON.parse(localStorage.getItem('rejectedStations') || '[]'),
    stationStatus: JSON.parse(localStorage.getItem('stationStatus') || '{}'),
    adminMode: false,
    stations: [],
    birds: []
};

// ======================
// Canvas Globe Setup
// ======================
let canvas, ctx, globeRotation = 0;
let stationMarkers = [];

function initGlobe() {
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    document.getElementById('globe-container').appendChild(canvas);
    
    ctx = canvas.getContext('2d');
    
    // Animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
    
    // Add mouse interaction
    canvas.addEventListener('click', onGlobeClick);
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1000);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw globe
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    
    // Globe shadow
    ctx.beginPath();
    ctx.arc(centerX + 10, centerY + 10, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    
    // Globe background
    const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
    );
    gradient.addColorStop(0, '#3a7bd5');
    gradient.addColorStop(0.5, '#2a5298');
    gradient.addColorStop(1, '#1e3c72');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw continents (simplified)
    ctx.fillStyle = 'rgba(76, 175, 80, 0.4)';
    drawSimplifiedContinents(centerX, centerY, radius);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Latitude lines
    for (let i = -60; i <= 60; i += 30) {
        const y = centerY + (i / 90) * radius * 0.8;
        const width = Math.sqrt(radius * radius - Math.pow((i / 90) * radius * 0.8, 2)) * 2;
        ctx.beginPath();
        ctx.ellipse(centerX, y, width / 2, width * 0.1, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Longitude lines
    for (let i = 0; i < 360; i += 30) {
        const angle = (i + globeRotation) * Math.PI / 180;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.abs(Math.cos(angle)) * radius * 0.3, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw station markers
    stationMarkers.forEach(marker => {
        if (!marker.latitude || !marker.longitude) return;
        
        const pos = latLonToCanvasPos(marker.latitude, marker.longitude, centerX, centerY, radius);
        if (!pos) return; // Behind globe
        
        const isOffline = AppState.stationStatus[marker.stationuuid] === 'offline';
        const color = isOffline ? '#ff4444' : '#4CAF50';
        
        // Draw marker
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add glow effect
        const markerGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 10);
        markerGradient.addColorStop(0, color + 'aa');
        markerGradient.addColorStop(1, color + '00');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = markerGradient;
        ctx.fill();
    });
    
    // Globe border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Auto-rotate
    globeRotation += 0.1;
    if (globeRotation >= 360) globeRotation = 0;
}

function drawSimplifiedContinents(centerX, centerY, radius) {
    const scale = radius / 200;
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(centerX + 20 * scale, centerY + 10 * scale, 40 * scale, 60 * scale, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.ellipse(centerX + 10 * scale, centerY - 40 * scale, 30 * scale, 25 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(centerX + 80 * scale, centerY - 20 * scale, 60 * scale, 45 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // North America
    ctx.beginPath();
    ctx.ellipse(centerX - 80 * scale, centerY - 30 * scale, 50 * scale, 55 * scale, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(centerX - 60 * scale, centerY + 50 * scale, 35 * scale, 50 * scale, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(centerX + 120 * scale, centerY + 60 * scale, 30 * scale, 25 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
}

function onWindowResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function latLonToCanvasPos(lat, lon, centerX, centerY, radius) {
    // Adjust longitude for rotation
    lon = (lon - globeRotation + 360) % 360;
    if (lon > 180) lon -= 360;
    
    // Check if point is on visible side
    if (Math.abs(lon) > 90) return null;
    
    const latRad = lat * Math.PI / 180;
    const lonRad = lon * Math.PI / 180;
    
    const x = centerX + radius * Math.cos(latRad) * Math.sin(lonRad);
    const y = centerY - radius * Math.sin(latRad);
    
    return { x, y };
}

function onGlobeClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    
    // Check if clicked on a marker
    for (const marker of stationMarkers) {
        const pos = latLonToCanvasPos(marker.latitude, marker.longitude, centerX, centerY, radius);
        if (!pos) continue;
        
        const dist = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
        if (dist < 10) {
            playStation(marker);
            return;
        }
    }
}

function addStationMarker(station) {
    if (!station.latitude || !station.longitude) return;
    stationMarkers.push(station);
}

function clearMarkers() {
    stationMarkers = [];
}

function updateMarkerColors() {
    // Colors are updated in the animation loop based on status
}

// ======================
// Data Loading
// ======================
async function loadStations() {
    try {
        // Use mock data since API is blocked
        const stations = mockStations;
        
        // Add approved user stations
        AppState.stations = [...stations, ...AppState.approvedStations];
        
        // Add markers for all stations
        clearMarkers();
        AppState.stations.forEach(station => {
            if (station.geo_lat && station.geo_long) {
                station.latitude = parseFloat(station.geo_lat);
                station.longitude = parseFloat(station.geo_long);
                addStationMarker(station);
            }
        });
        
        return AppState.stations;
    } catch (error) {
        console.error('Error loading stations:', error);
        return [];
    }
}

async function loadBirds() {
    // Simulated bird data (in production, this would come from an API)
    AppState.birds = [
        { name: 'American Robin', location: 'North America', lat: 40.7128, lon: -74.0060 },
        { name: 'European Starling', location: 'Europe', lat: 51.5074, lon: -0.1278 },
        { name: 'African Grey Parrot', location: 'Africa', lat: -1.2921, lon: 36.8219 },
        { name: 'Rainbow Lorikeet', location: 'Australia', lat: -33.8688, lon: 151.2093 },
        { name: 'Toucan', location: 'South America', lat: -15.7939, lon: -47.8828 }
    ];
}

// ======================
// Search Functionality
// ======================
function addToSearchHistory(query, type) {
    const history = type === 'station' ? AppState.searchHistory.stations : AppState.searchHistory.birds;
    
    // Remove if already exists
    const index = history.indexOf(query);
    if (index > -1) {
        history.splice(index, 1);
    }
    
    // Add to beginning
    history.unshift(query);
    
    // Keep only last 5
    if (history.length > 5) {
        history.pop();
    }
    
    // Save to localStorage
    if (type === 'station') {
        localStorage.setItem('stationHistory', JSON.stringify(history));
    } else {
        localStorage.setItem('birdHistory', JSON.stringify(history));
    }
    
    updateSearchHistoryUI();
}

function updateSearchHistoryUI() {
    const stationHistoryEl = document.getElementById('station-history');
    const birdHistoryEl = document.getElementById('bird-history');
    
    // Update station history
    stationHistoryEl.innerHTML = '';
    if (AppState.searchHistory.stations.length === 0) {
        stationHistoryEl.innerHTML = '<div style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">No recent searches</div>';
    } else {
        AppState.searchHistory.stations.forEach(query => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.textContent = query;
            item.onclick = () => {
                document.getElementById('search-input').value = query;
                performSearch(query);
            };
            stationHistoryEl.appendChild(item);
        });
    }
    
    // Update bird history
    birdHistoryEl.innerHTML = '';
    if (AppState.searchHistory.birds.length === 0) {
        birdHistoryEl.innerHTML = '<div style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">No recent searches</div>';
    } else {
        AppState.searchHistory.birds.forEach(query => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.textContent = query;
            item.onclick = () => {
                document.getElementById('search-input').value = query;
                performSearch(query);
            };
            birdHistoryEl.appendChild(item);
        });
    }
}

function performSearch(query) {
    const searchType = AppState.mode === 'radio' ? 'station' : 'bird';
    addToSearchHistory(query, searchType);
    
    const resultsEl = document.getElementById('results-list');
    resultsEl.innerHTML = '';
    
    if (AppState.mode === 'radio') {
        const filtered = AppState.stations.filter(station => 
            station.name.toLowerCase().includes(query.toLowerCase()) ||
            (station.country && station.country.toLowerCase().includes(query.toLowerCase()))
        );
        
        displayStations(filtered);
    } else {
        const filtered = AppState.birds.filter(bird =>
            bird.name.toLowerCase().includes(query.toLowerCase()) ||
            bird.location.toLowerCase().includes(query.toLowerCase())
        );
        
        displayBirds(filtered);
    }
}

function displayStations(stations) {
    const resultsEl = document.getElementById('results-list');
    resultsEl.innerHTML = '';
    
    if (stations.length === 0) {
        resultsEl.innerHTML = '<div style="color: rgba(255,255,255,0.5); padding: 20px; text-align: center;">No stations found</div>';
        return;
    }
    
    stations.slice(0, 20).forEach(station => {
        const isOffline = AppState.stationStatus[station.stationuuid] === 'offline';
        const isFavorite = AppState.favorites.some(f => f.stationuuid === station.stationuuid);
        
        const item = document.createElement('div');
        item.className = 'result-item' + (isOffline ? ' offline' : '');
        item.innerHTML = `
            <div class="result-info">
                <div class="result-name">
                    ${isOffline ? '<span class="status-indicator offline"></span>' : ''}
                    ${station.name}
                </div>
                <div class="result-location">${station.country || 'Unknown'}</div>
            </div>
            <div class="result-actions">
                <button class="btn-icon" onclick="toggleFavorite('${station.stationuuid}')" title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFavorite ? '⭐' : '☆'}
                </button>
            </div>
        `;
        
        item.onclick = (e) => {
            if (!e.target.classList.contains('btn-icon')) {
                playStation(station);
            }
        };
        
        resultsEl.appendChild(item);
    });
}

function displayBirds(birds) {
    const resultsEl = document.getElementById('results-list');
    resultsEl.innerHTML = '';
    
    if (birds.length === 0) {
        resultsEl.innerHTML = '<div style="color: rgba(255,255,255,0.5); padding: 20px; text-align: center;">No birds found</div>';
        return;
    }
    
    birds.forEach(bird => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
            <div class="result-info">
                <div class="result-name">🦜 ${bird.name}</div>
                <div class="result-location">${bird.location}</div>
            </div>
        `;
        
        item.onclick = () => {
            playBirdSound(bird);
        };
        
        resultsEl.appendChild(item);
    });
}

// ======================
// Audio Playback
// ======================
function playStation(station) {
    AppState.currentStation = station;
    
    // Stop current playback
    AppState.audioPlayer.pause();
    
    // Set new source
    AppState.audioPlayer.src = station.url || station.url_resolved;
    AppState.audioPlayer.volume = document.getElementById('volume-slider').value / 100;
    
    // Play
    AppState.audioPlayer.play()
        .then(() => {
            AppState.isPlaying = true;
            updatePlayButton();
            updateNowPlaying();
        })
        .catch(error => {
            console.error('Playback error:', error);
            alert('Unable to play this station. It may be offline.');
            // Mark as offline
            AppState.stationStatus[station.stationuuid] = 'offline';
            localStorage.setItem('stationStatus', JSON.stringify(AppState.stationStatus));
            updateMarkerColors();
        });
}

function playBirdSound(bird) {
    // Simulate bird sound playback
    updateNowPlaying(`🦜 Listening to ${bird.name} from ${bird.location}`);
    alert(`Playing ${bird.name} sounds from ${bird.location}.\n\n(In production, this would stream actual bird recordings)`);
}

function togglePlayPause() {
    if (!AppState.currentStation) return;
    
    if (AppState.isPlaying) {
        AppState.audioPlayer.pause();
        AppState.isPlaying = false;
    } else {
        AppState.audioPlayer.play();
        AppState.isPlaying = true;
    }
    
    updatePlayButton();
}

function updatePlayButton() {
    const btn = document.getElementById('play-pause-btn');
    const icon = document.getElementById('play-icon');
    
    if (AppState.currentStation) {
        btn.disabled = false;
    }
    
    icon.textContent = AppState.isPlaying ? '⏸️' : '▶️';
}

function updateNowPlaying(customText = null) {
    const infoEl = document.getElementById('station-info');
    
    if (customText) {
        infoEl.textContent = customText;
    } else if (AppState.currentStation) {
        const isOffline = AppState.stationStatus[AppState.currentStation.stationuuid] === 'offline';
        infoEl.innerHTML = `
            <strong>Now Playing:</strong><br>
            ${isOffline ? '<span style="color: #ff4444;">🔴 Offline - </span>' : ''}
            ${AppState.currentStation.name}<br>
            <small>${AppState.currentStation.country || 'Unknown location'}</small>
        `;
    } else {
        infoEl.textContent = 'Select a station to start';
    }
}

// ======================
// Favorites
// ======================
function toggleFavorite(stationId) {
    const station = AppState.stations.find(s => s.stationuuid === stationId);
    if (!station) return;
    
    const index = AppState.favorites.findIndex(f => f.stationuuid === stationId);
    
    if (index > -1) {
        AppState.favorites.splice(index, 1);
    } else {
        AppState.favorites.push(station);
    }
    
    localStorage.setItem('favorites', JSON.stringify(AppState.favorites));
    updateFavoritesList();
    
    // Refresh current view
    if (document.getElementById('search-input').value) {
        performSearch(document.getElementById('search-input').value);
    }
}

function updateFavoritesList() {
    const listEl = document.getElementById('favorites-list');
    listEl.innerHTML = '';
    
    if (AppState.favorites.length === 0) {
        listEl.innerHTML = '<div style="color: rgba(255,255,255,0.5); padding: 20px; text-align: center;">No favorite stations yet</div>';
        return;
    }
    
    AppState.favorites.forEach(station => {
        const isOffline = AppState.stationStatus[station.stationuuid] === 'offline';
        
        const item = document.createElement('div');
        item.className = 'result-item' + (isOffline ? ' offline' : '');
        item.innerHTML = `
            <div class="result-info">
                <div class="result-name">
                    ${isOffline ? '<span class="status-indicator offline"></span>' : ''}
                    ${station.name}
                </div>
                <div class="result-location">${station.country || 'Unknown'}</div>
            </div>
            <div class="result-actions">
                <button class="btn-icon" onclick="toggleFavorite('${station.stationuuid}')" title="Remove from favorites">⭐</button>
            </div>
        `;
        
        item.onclick = (e) => {
            if (!e.target.classList.contains('btn-icon')) {
                playStation(station);
            }
        };
        
        listEl.appendChild(item);
    });
}

// ======================
// Station Status Checker
// ======================
async function checkStationStatus(station) {
    // Simulate status check since API is blocked
    // In production, this would check the actual API
    // For now, randomly mark some stations as offline for demonstration
    const randomCheck = Math.random();
    if (randomCheck < 0.15) { // 15% chance of being offline
        return 'offline';
    }
    return 'online';
}

async function checkFavoriteStationsStatus() {
    console.log('Checking favorite stations status...');
    
    for (const station of AppState.favorites) {
        const status = await checkStationStatus(station);
        if (status !== 'unknown') {
            AppState.stationStatus[station.stationuuid] = status;
        }
    }
    
    localStorage.setItem('stationStatus', JSON.stringify(AppState.stationStatus));
    updateMarkerColors();
    updateFavoritesList();
    
    console.log('Station status check complete');
}

// Run status check on load and every 5 minutes
function startStatusChecker() {
    checkFavoriteStationsStatus();
    setInterval(checkFavoriteStationsStatus, 5 * 60 * 1000); // 5 minutes
}

// ======================
// Admin Mode
// ======================
function toggleAdminMode() {
    AppState.adminMode = !AppState.adminMode;
    
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.style.display = AppState.adminMode ? 'block' : 'none';
    
    if (AppState.adminMode) {
        updatePendingStationsList();
    }
}

function updatePendingStationsList() {
    const listEl = document.getElementById('pending-stations-list');
    listEl.innerHTML = '';
    
    // Filter out rejected stations
    const pending = AppState.pendingStations.filter(s => 
        !AppState.rejectedStations.includes(s.id)
    );
    
    if (pending.length === 0) {
        listEl.innerHTML = '<div style="color: rgba(255,255,255,0.5); padding: 20px; text-align: center;">No pending submissions</div>';
        return;
    }
    
    pending.forEach(station => {
        const item = document.createElement('div');
        item.className = 'pending-station';
        item.innerHTML = `
            <div class="pending-station-info">
                <div class="pending-station-name">${station.name}</div>
                <div class="pending-station-details">
                    ${station.country} • ${station.url}<br>
                    Coordinates: ${station.latitude}, ${station.longitude}
                </div>
            </div>
            <div class="pending-actions">
                <button class="btn-approve" onclick="approveStation('${station.id}')">✓ Approve</button>
                <button class="btn-reject" onclick="rejectStation('${station.id}')">✗ Reject</button>
            </div>
        `;
        listEl.appendChild(item);
    });
}

function approveStation(stationId) {
    const station = AppState.pendingStations.find(s => s.id === stationId);
    if (!station) return;
    
    // Add to approved stations
    AppState.approvedStations.push({
        ...station,
        stationuuid: station.id,
        geo_lat: station.latitude,
        geo_long: station.longitude,
        url_resolved: station.url
    });
    
    // Save to localStorage
    localStorage.setItem('approvedStations', JSON.stringify(AppState.approvedStations));
    
    // Update stations list
    AppState.stations.push(AppState.approvedStations[AppState.approvedStations.length - 1]);
    
    // Add marker
    const approvedStation = AppState.approvedStations[AppState.approvedStations.length - 1];
    approvedStation.latitude = station.latitude;
    approvedStation.longitude = station.longitude;
    addStationMarker(approvedStation);
    
    // Update UI
    updatePendingStationsList();
    
    alert(`Station "${station.name}" has been approved and added to the globe!`);
}

function rejectStation(stationId) {
    // Add to rejected list
    AppState.rejectedStations.push(stationId);
    localStorage.setItem('rejectedStations', JSON.stringify(AppState.rejectedStations));
    
    // Update UI
    updatePendingStationsList();
    
    alert('Station has been rejected');
}

// ======================
// Station Submission
// ======================
function submitStation(event) {
    event.preventDefault();
    
    const station = {
        id: 'user-' + Date.now(),
        name: document.getElementById('station-name').value,
        url: document.getElementById('station-url').value,
        country: document.getElementById('station-country').value,
        latitude: parseFloat(document.getElementById('station-lat').value),
        longitude: parseFloat(document.getElementById('station-lon').value)
    };
    
    AppState.pendingStations.push(station);
    localStorage.setItem('pendingStations', JSON.stringify(AppState.pendingStations));
    
    // Close modal
    document.getElementById('submit-modal').classList.remove('show');
    
    // Reset form
    document.getElementById('submit-station-form').reset();
    
    alert('Station submitted successfully! It will be reviewed by an admin.');
}

// ======================
// Mode Toggle
// ======================
function toggleMode() {
    AppState.mode = AppState.mode === 'radio' ? 'birds' : 'radio';
    
    const modeIcon = document.getElementById('mode-icon');
    const modeText = document.getElementById('mode-text');
    
    if (AppState.mode === 'radio') {
        modeIcon.textContent = '📻';
        modeText.textContent = 'Radio Mode';
    } else {
        modeIcon.textContent = '🦜';
        modeText.textContent = 'Birds Mode';
    }
    
    // Clear results
    document.getElementById('results-list').innerHTML = '';
    document.getElementById('search-input').value = '';
}

// ======================
// Downloads
// ======================
function downloadBirdsPack() {
    alert('Downloading Birds Pack...\n\nThis would download a collection of bird sound recordings.');
    // In production, this would trigger an actual download
}

function downloadRadioPack() {
    alert('Downloading Radio Pack...\n\nThis would download a collection of favorite radio stations for offline access.');
    // In production, this would trigger an actual download
}

// ======================
// Event Listeners
// ======================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    initGlobe();
    loadStations().then(() => {
        startStatusChecker();
    });
    loadBirds();
    updateSearchHistoryUI();
    updateFavoritesList();
    
    // Mode toggle
    document.getElementById('mode-toggle').addEventListener('click', toggleMode);
    
    // Search
    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        if (query) {
            performSearch(query);
        }
    });
    
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            if (query) {
                performSearch(query);
            }
        }
    });
    
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });
    
    // Search history collapse
    document.getElementById('history-header').addEventListener('click', () => {
        const content = document.getElementById('history-content');
        const btn = document.getElementById('history-collapse-btn');
        
        content.classList.toggle('collapsed');
        btn.classList.toggle('collapsed');
    });
    
    // Clear history buttons
    document.getElementById('clear-station-history').addEventListener('click', () => {
        AppState.searchHistory.stations = [];
        localStorage.setItem('stationHistory', '[]');
        updateSearchHistoryUI();
    });
    
    document.getElementById('clear-bird-history').addEventListener('click', () => {
        AppState.searchHistory.birds = [];
        localStorage.setItem('birdHistory', '[]');
        updateSearchHistoryUI();
    });
    
    // Audio controls
    document.getElementById('play-pause-btn').addEventListener('click', togglePlayPause);
    
    document.getElementById('volume-slider').addEventListener('input', (e) => {
        const volume = e.target.value;
        AppState.audioPlayer.volume = volume / 100;
        document.getElementById('volume-label').textContent = volume + '%';
    });
    
    // Modals
    document.getElementById('about-btn').addEventListener('click', () => {
        document.getElementById('about-modal').classList.add('show');
    });
    
    document.getElementById('submit-station-btn').addEventListener('click', () => {
        document.getElementById('submit-modal').classList.add('show');
    });
    
    document.getElementById('download-btn').addEventListener('click', () => {
        document.getElementById('download-modal').classList.add('show');
    });
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').classList.remove('show');
        });
    });
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
    
    // Admin mode toggle
    document.getElementById('admin-toggle-btn').addEventListener('click', toggleAdminMode);
    
    // Submit station form
    document.getElementById('submit-station-form').addEventListener('submit', submitStation);
    
    // Download buttons
    document.getElementById('download-birds-pack').addEventListener('click', downloadBirdsPack);
    document.getElementById('download-radio-pack').addEventListener('click', downloadRadioPack);
});

// Make functions globally accessible
window.toggleFavorite = toggleFavorite;
window.approveStation = approveStation;
window.rejectStation = rejectStation;
