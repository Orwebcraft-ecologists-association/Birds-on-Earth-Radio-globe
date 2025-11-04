// Birds on Earth Radio Globe - Main Application
// Handles radio station fetching, validation, and playback

class RadioGlobeApp {
    constructor() {
        this.stations = [];
        this.filteredStations = [];
        this.currentStation = null;
        this.audioPlayer = document.getElementById('audio-player');
        this.isPlaying = false;
        
        // Configuration constants
        this.QUICK_VALIDATION_LIMIT = 20; // Number of stations to validate immediately
        
        // Radio Browser API endpoints (with fallbacks)
        this.apiEndpoints = [
            'https://de1.api.radio-browser.info',
            'https://nl1.api.radio-browser.info',
            'https://at1.api.radio-browser.info'
        ];
        this.currentApiIndex = 0;
        
        // HTML escape map for XSS prevention
        this.htmlEscapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        
        this.initializeEventListeners();
        this.setupAudioPlayer();
    }

    initializeEventListeners() {
        // Load stations button
        document.getElementById('load-stations-btn').addEventListener('click', () => {
            this.loadStations();
        });

        // Test stations button
        document.getElementById('test-stations-btn').addEventListener('click', () => {
            this.testAndFixStations();
        });

        // Search input
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterStations(e.target.value);
        });

        // Country select
        document.getElementById('country-select').addEventListener('change', () => {
            this.clearStations();
        });

        // Player controls
        document.getElementById('play-btn').addEventListener('click', () => {
            this.play();
        });

        document.getElementById('stop-btn').addEventListener('click', () => {
            this.stop();
        });

        // Volume control
        const volumeSlider = document.getElementById('volume-slider');
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.audioPlayer.volume = volume;
            document.getElementById('volume-value').textContent = e.target.value + '%';
        });
    }

    setupAudioPlayer() {
        // Set initial volume
        this.audioPlayer.volume = 0.7;

        // Audio event listeners
        this.audioPlayer.addEventListener('playing', () => {
            this.isPlaying = true;
            this.showStatus('Playing station successfully', 'success');
        });

        this.audioPlayer.addEventListener('error', (e) => {
            this.handleAudioError(e);
        });

        this.audioPlayer.addEventListener('ended', () => {
            this.isPlaying = false;
        });

        this.audioPlayer.addEventListener('pause', () => {
            this.isPlaying = false;
        });
    }

    async loadStations() {
        const country = document.getElementById('country-select').value;
        const searchTerm = document.getElementById('search-input').value;

        if (!country && !searchTerm) {
            this.showStatus('Please select a country or enter a search term', 'error');
            return;
        }

        this.showStatus('Loading stations...', 'info');
        this.showLoading(true);

        try {
            const params = new URLSearchParams();
            
            if (country) {
                params.append('country', country);
            }
            
            if (searchTerm) {
                params.append('name', searchTerm);
            }

            // Order by votes and limit results
            params.append('order', 'votes');
            params.append('reverse', 'true');
            params.append('limit', '100');
            params.append('hidebroken', 'true'); // Hide known broken stations

            const stations = await this.fetchFromAPI(`/json/stations/search?${params.toString()}`);
            
            if (!stations || stations.length === 0) {
                this.showStatus('No stations found. Try a different country or search term.', 'error');
                this.showLoading(false);
                return;
            }

            // Process and validate stations
            this.stations = stations.map(station => ({
                ...station,
                tested: false,
                working: null
            }));

            // For Israel, perform immediate validation
            if (country === 'Israel') {
                this.showStatus('Found ' + this.stations.length + ' Israeli stations. Validating...', 'info');
                this.quickValidateStations();
            } else {
                this.showStatus('Loaded ' + this.stations.length + ' stations', 'success');
            }

            this.filteredStations = [...this.stations];
            this.renderStations();
            this.updateStats();
            this.showLoading(false);

        } catch (error) {
            console.error('Error loading stations:', error);
            this.showStatus('Failed to load stations: ' + error.message, 'error');
            this.showLoading(false);
        }
    }

    async fetchFromAPI(endpoint) {
        // Try multiple API servers for reliability
        for (let i = 0; i < this.apiEndpoints.length; i++) {
            const apiUrl = this.apiEndpoints[this.currentApiIndex];
            this.currentApiIndex = (this.currentApiIndex + 1) % this.apiEndpoints.length;

            try {
                const response = await fetch(apiUrl + endpoint, {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'BirdsOnEarthRadioGlobe/1.0'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.warn(`Failed to fetch from ${apiUrl}:`, error);
                // Try next server
                if (i === this.apiEndpoints.length - 1) {
                    throw new Error('All API servers failed');
                }
            }
        }
    }

    validateStationUrl(station) {
        // Validates station URL and returns true if working
        try {
            if (station.url_resolved && station.url_resolved.trim() !== '') {
                const url = new URL(station.url_resolved);
                if (url.protocol === 'http:' || url.protocol === 'https:') {
                    return true;
                }
            }
            return false;
        } catch (error) {
            // URL parsing failed
            return false;
        }
    }

    quickValidateStations() {
        // Quick validation by checking if station has valid resolved URL
        this.stations.slice(0, this.QUICK_VALIDATION_LIMIT).forEach(station => {
            station.working = this.validateStationUrl(station);
            station.tested = true;
        });
        
        // Sort stations to show working ones first
        this.stations.sort((a, b) => {
            if (a.working === b.working) return 0;
            return a.working ? -1 : 1;
        });
    }

    async testAndFixStations() {
        if (this.stations.length === 0) {
            this.showStatus('No stations loaded. Please load stations first.', 'error');
            return;
        }

        this.showStatus('Testing stations... This may take a moment.', 'info');
        this.showLoading(true);

        let workingCount = 0;
        let brokenCount = 0;

        for (const station of this.stations) {
            station.working = this.validateStationUrl(station);
            station.tested = true;
            
            if (station.working) {
                workingCount++;
            } else {
                brokenCount++;
            }
        }

        // Filter to show only working stations
        this.filteredStations = this.stations.filter(s => s.working);
        
        this.showStatus(
            `Testing complete! Found ${workingCount} working stations and ${brokenCount} broken stations. Showing only working stations.`,
            'success'
        );
        
        this.renderStations();
        this.updateStats();
        this.showLoading(false);
    }

    filterStations(searchTerm) {
        if (!searchTerm) {
            this.filteredStations = [...this.stations];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredStations = this.stations.filter(station =>
                station.name.toLowerCase().includes(term) ||
                (station.tags && station.tags.toLowerCase().includes(term))
            );
        }
        this.renderStations();
    }

    renderStations() {
        const stationList = document.getElementById('station-list');
        
        if (this.filteredStations.length === 0) {
            stationList.innerHTML = '<div class="loading">No stations to display</div>';
            return;
        }

        stationList.innerHTML = this.filteredStations.map(station => {
            let statusClass = '';
            let statusText = '';
            
            if (station.tested) {
                statusClass = station.working ? 'working' : 'broken';
                statusText = station.working ? '✓ Working' : '✗ Not Working';
            }

            const isActive = this.currentStation && this.currentStation.stationuuid === station.stationuuid;

            return `
                <div class="station-item ${statusClass} ${isActive ? 'active' : ''}" 
                     data-station-id="${this.escapeHtml(station.stationuuid)}">
                    <div class="station-name">${this.escapeHtml(station.name)}</div>
                    <div class="station-info">
                        ${station.country ? '🌍 ' + this.escapeHtml(station.country) : ''}
                        ${station.tags ? ' | 🏷️ ' + this.escapeHtml(station.tags.split(',')[0]) : ''}
                        ${station.bitrate ? ' | 📡 ' + this.escapeHtml(String(station.bitrate)) + 'kbps' : ''}
                    </div>
                    ${statusText ? `<div class="station-status">${statusText}</div>` : ''}
                </div>
            `;
        }).join('');

        // Use event delegation instead of multiple listeners
        stationList.removeEventListener('click', this.stationListClickHandler);
        this.stationListClickHandler = (e) => {
            const stationItem = e.target.closest('.station-item');
            if (stationItem) {
                const stationId = stationItem.getAttribute('data-station-id');
                const station = this.stations.find(s => s.stationuuid === stationId);
                if (station) {
                    this.selectStation(station);
                }
            }
        };
        stationList.addEventListener('click', this.stationListClickHandler);

        // Hide welcome message
        document.getElementById('welcome-message').style.display = 'none';
    }

    selectStation(station) {
        this.currentStation = station;
        
        // Update player UI
        document.getElementById('player').style.display = 'block';
        document.getElementById('player-title').textContent = station.name;
        document.getElementById('player-details').innerHTML = `
            <strong>Country:</strong> ${this.escapeHtml(station.country || 'Unknown')}<br>
            <strong>Language:</strong> ${this.escapeHtml(station.language || 'Unknown')}<br>
            <strong>Tags:</strong> ${this.escapeHtml(station.tags || 'None')}<br>
            <strong>Bitrate:</strong> ${this.escapeHtml(String(station.bitrate || 'Unknown'))}kbps<br>
            <strong>Codec:</strong> ${this.escapeHtml(station.codec || 'Unknown')}
        `;

        // Load the station
        this.loadStation(station);
        
        // Update active state in list
        this.renderStations();
    }

    loadStation(station) {
        this.stop();

        // Use url_resolved if available, fallback to url
        const streamUrl = station.url_resolved || station.url;
        
        if (!streamUrl) {
            this.showStatus('Station has no valid stream URL', 'error');
            return;
        }

        this.audioPlayer.src = streamUrl;
        this.showStatus('Station loaded. Click Play to start.', 'success');
    }

    play() {
        if (!this.currentStation) {
            this.showStatus('Please select a station first', 'error');
            return;
        }

        this.audioPlayer.play()
            .then(() => {
                this.isPlaying = true;
            })
            .catch(error => {
                this.handlePlaybackError(error);
            });
    }

    stop() {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.isPlaying = false;
    }

    handleAudioError(e) {
        const error = this.audioPlayer.error;
        let errorMessage = 'Unknown error';

        if (error) {
            switch (error.code) {
                case error.MEDIA_ERR_ABORTED:
                    errorMessage = 'Playback aborted';
                    break;
                case error.MEDIA_ERR_NETWORK:
                    errorMessage = 'Network error - station may be offline';
                    break;
                case error.MEDIA_ERR_DECODE:
                    errorMessage = 'Decoding error - unsupported audio format';
                    break;
                case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMessage = 'Stream URL not supported or station is offline';
                    break;
            }
        }

        this.showStatus(`Playback error: ${errorMessage}. Try another station.`, 'error');
        
        // Mark station as broken
        if (this.currentStation) {
            this.currentStation.working = false;
            this.currentStation.tested = true;
            this.renderStations();
            this.updateStats();
        }
    }

    handlePlaybackError(error) {
        console.error('Playback error:', error);
        this.showStatus('Failed to play station. The stream may be offline or incompatible.', 'error');
        
        // Mark station as broken
        if (this.currentStation) {
            this.currentStation.working = false;
            this.currentStation.tested = true;
            this.renderStations();
            this.updateStats();
        }
    }

    updateStats() {
        const statsDiv = document.getElementById('station-stats');
        const totalStations = this.stations.length;
        const workingStations = this.stations.filter(s => s.working === true).length;

        document.getElementById('total-stations').textContent = totalStations;
        document.getElementById('working-stations').textContent = workingStations;

        if (totalStations > 0) {
            statsDiv.style.display = 'flex';
        }
    }

    showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('status-message');
        statusDiv.className = `status ${type}`;
        statusDiv.textContent = message;
        statusDiv.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    }

    showLoading(show) {
        const stationList = document.getElementById('station-list');
        if (show) {
            stationList.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Loading stations...</p>
                </div>
            `;
        }
    }

    clearStations() {
        this.stations = [];
        this.filteredStations = [];
        document.getElementById('station-list').innerHTML = '';
        document.getElementById('status-message').style.display = 'none';
        document.getElementById('station-stats').style.display = 'none';
    }

    escapeHtml(text) {
        // Efficient HTML escaping using character replacement
        if (text == null) return '';
        return String(text).replace(/[&<>"'\/]/g, (char) => this.htmlEscapeMap[char]);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.radioApp = new RadioGlobeApp();
    console.log('Birds on Earth Radio Globe initialized');
});
