/**
 * Birds on Earth Radio Globe Application
 * Combines bird sighting data from eBird with radio station information
 * on an interactive 3D globe visualization
 */

class BirdsRadioGlobe {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        // Data layers
        this.birdData = [];
        this.radioData = [];
        this.birdMarkers = [];
        this.radioMarkers = [];
        
        // UI elements
        this.canvas = document.getElementById('globe-canvas');
        this.container = document.getElementById('globe-container');
        this.infoPanel = document.getElementById('info-panel');
        this.loadingIndicator = document.getElementById('loading');
        
        this.init();
        this.loadSampleData();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000a0f);
        
        // Camera setup
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Create globe
        this.createGlobe();
        
        // Lighting
        this.setupLighting();
        
        // Controls (simplified orbit controls)
        this.setupControls();
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    createGlobe() {
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        
        // Create earth texture (using a simple gradient for now)
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const context = canvas.getContext('2d');
        
        // Create a simple earth-like texture
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1e3c72');
        gradient.addColorStop(0.3, '#2a5298');
        gradient.addColorStop(0.5, '#1e3c72');
        gradient.addColorStop(0.7, '#2a5298');
        gradient.addColorStop(1, '#1e3c72');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some continents (simplified)
        context.fillStyle = '#2d5016';
        this.drawContinents(context);
        
        const texture = new THREE.CanvasTexture(canvas);
        
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        this.globe = new THREE.Mesh(geometry, material);
        this.globe.receiveShadow = true;
        this.globe.castShadow = true;
        this.scene.add(this.globe);
        
        // Add atmosphere glow
        this.addAtmosphere();
    }
    
    drawContinents(context) {
        // Simplified continent shapes
        const continents = [
            // North America
            { x: 200, y: 150, width: 150, height: 100 },
            // South America  
            { x: 250, y: 280, width: 80, height: 120 },
            // Europe
            { x: 450, y: 120, width: 60, height: 80 },
            // Africa
            { x: 470, y: 200, width: 100, height: 150 },
            // Asia
            { x: 550, y: 100, width: 200, height: 120 },
            // Australia
            { x: 700, y: 320, width: 80, height: 60 }
        ];
        
        continents.forEach(continent => {
            context.beginPath();
            context.ellipse(
                continent.x + continent.width / 2,
                continent.y + continent.height / 2,
                continent.width / 2,
                continent.height / 2,
                0, 0, 2 * Math.PI
            );
            context.fill();
        });
    }
    
    addAtmosphere() {
        const atmosphereGeometry = new THREE.SphereGeometry(1.05, 64, 32);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 }
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    gl_FragColor = vec4(0.2, 0.8, 1.0, intensity * 0.6);
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        this.scene.add(atmosphere);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point light for highlights
        const pointLight = new THREE.PointLight(0x4CAF50, 0.5, 10);
        pointLight.position.set(2, 2, 2);
        this.scene.add(pointLight);
    }
    
    setupControls() {
        let isMouseDown = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        this.canvas.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });
        
        this.canvas.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                const deltaMove = {
                    x: e.clientX - previousMousePosition.x,
                    y: e.clientY - previousMousePosition.y
                };
                
                const deltaRotationQuaternion = new THREE.Quaternion()
                    .setFromEuler(new THREE.Euler(
                        deltaMove.y * 0.01,
                        deltaMove.x * 0.01,
                        0,
                        'XYZ'
                    ));
                
                this.globe.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.globe.quaternion);
                
                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
            
            // Update mouse position for raycasting
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        });
        
        // Mouse wheel zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoom = e.deltaY * 0.001;
            this.camera.position.z += zoom;
            this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
        });
        
        // Click handler for markers
        this.canvas.addEventListener('click', (e) => this.onMarkerClick(e));
    }
    
    loadSampleData() {
        this.showLoading(true);
        
        // Simulate loading bird data from eBird
        setTimeout(() => {
            this.birdData = this.generateSampleBirdData();
            this.radioData = this.generateSampleRadioData();
            this.updateMarkers();
            this.showLoading(false);
        }, 1000);
    }
    
    generateSampleBirdData() {
        const species = [
            'American Robin', 'Blue Jay', 'Cardinal', 'Chickadee', 'Sparrow',
            'Hawk', 'Eagle', 'Owl', 'Woodpecker', 'Hummingbird',
            'Penguin', 'Albatross', 'Flamingo', 'Pelican', 'Seagull'
        ];
        
        const data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                id: `bird_${i}`,
                species: species[Math.floor(Math.random() * species.length)],
                latitude: (Math.random() - 0.5) * 160,
                longitude: (Math.random() - 0.5) * 360,
                count: Math.floor(Math.random() * 20) + 1,
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                location: `Location ${i}`,
                type: 'bird'
            });
        }
        return data;
    }
    
    generateSampleRadioData() {
        const stations = [
            'Nature Sounds FM', 'Bird Call Radio', 'Wildlife Network', 
            'Eco Radio', 'Forest Frequencies', 'Sky Radio', 'Ocean Waves FM',
            'Mountain Echo', 'Prairie Winds', 'Tropical Sounds'
        ];
        
        const data = [];
        for (let i = 0; i < 30; i++) {
            data.push({
                id: `radio_${i}`,
                name: stations[Math.floor(Math.random() * stations.length)],
                latitude: (Math.random() - 0.5) * 160,
                longitude: (Math.random() - 0.5) * 360,
                frequency: `${(88 + Math.random() * 20).toFixed(1)} FM`,
                power: `${Math.floor(Math.random() * 50) + 10} kW`,
                description: 'Broadcasting nature sounds and bird calls',
                type: 'radio'
            });
        }
        return data;
    }
    
    updateMarkers() {
        // Clear existing markers
        this.clearMarkers();
        
        const dataToggle = document.getElementById('data-toggle').value;
        
        if (dataToggle === 'birds' || dataToggle === 'both') {
            this.createBirdMarkers();
        }
        
        if (dataToggle === 'radio' || dataToggle === 'both') {
            this.createRadioMarkers();
        }
    }
    
    clearMarkers() {
        [...this.birdMarkers, ...this.radioMarkers].forEach(marker => {
            this.scene.remove(marker);
        });
        this.birdMarkers = [];
        this.radioMarkers = [];
    }
    
    createBirdMarkers() {
        this.birdData.forEach(bird => {
            const marker = this.createMarker(bird, 0x4CAF50, 0.02);
            this.birdMarkers.push(marker);
            this.scene.add(marker);
        });
    }
    
    createRadioMarkers() {
        this.radioData.forEach(radio => {
            const marker = this.createMarker(radio, 0xFF5722, 0.025);
            this.radioMarkers.push(marker);
            this.scene.add(marker);
        });
    }
    
    createMarker(data, color, size) {
        const geometry = new THREE.SphereGeometry(size, 8, 6);
        const material = new THREE.MeshBasicMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.8
        });
        
        const marker = new THREE.Mesh(geometry, material);
        
        // Convert lat/lon to 2D coordinates for our fallback renderer
        const phi = (90 - data.latitude) * (Math.PI / 180);
        const theta = (data.longitude + 180) * (Math.PI / 180);
        
        // Simple orthographic projection
        marker.position.x = Math.cos(theta) * Math.sin(phi);
        marker.position.y = Math.cos(phi);
        marker.position.z = Math.sin(theta) * Math.sin(phi);
        
        // Store data for interaction
        marker.userData = data;
        
        return marker;
    }
    
    onMarkerClick(event) {
        // Simplified click detection for 2D fallback
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.min(rect.width, rect.height) * 0.3;
        
        // Check if click is near any marker
        const allMarkers = [...this.birdMarkers, ...this.radioMarkers];
        let clickedMarker = null;
        let minDistance = Infinity;
        
        allMarkers.forEach(marker => {
            const markerX = centerX + marker.position.x * radius * 0.8;
            const markerY = centerY - marker.position.y * radius * 0.8;
            const distance = Math.sqrt((x - markerX) ** 2 + (y - markerY) ** 2);
            
            if (distance < 10 && distance < minDistance) {
                minDistance = distance;
                clickedMarker = marker;
            }
        });
        
        if (clickedMarker) {
            this.showInfoPanel(clickedMarker.userData);
        } else {
            this.hideInfoPanel();
        }
    }
    
    showInfoPanel(data) {
        const title = document.getElementById('info-title');
        const details = document.getElementById('info-details');
        
        if (data.type === 'bird') {
            title.textContent = data.species;
            details.innerHTML = `
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Count:</strong> ${data.count} individuals</p>
                <p><strong>Date:</strong> ${data.date.toLocaleDateString()}</p>
                <p><strong>Coordinates:</strong> ${data.latitude.toFixed(2)}°, ${data.longitude.toFixed(2)}°</p>
                <p><em>Bird sighting data from eBird community</em></p>
            `;
        } else if (data.type === 'radio') {
            title.textContent = data.name;
            details.innerHTML = `
                <p><strong>Frequency:</strong> ${data.frequency}</p>
                <p><strong>Power:</strong> ${data.power}</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Coordinates:</strong> ${data.latitude.toFixed(2)}°, ${data.longitude.toFixed(2)}°</p>
                <p><em>Radio station broadcasting nature content</em></p>
            `;
        }
        
        this.infoPanel.classList.remove('hidden');
        this.infoPanel.classList.add('show');
    }
    
    hideInfoPanel() {
        this.infoPanel.classList.remove('show');
        setTimeout(() => {
            this.infoPanel.classList.add('hidden');
        }, 300);
    }
    
    showLoading(show) {
        if (show) {
            this.loadingIndicator.classList.remove('hidden');
        } else {
            this.loadingIndicator.classList.add('hidden');
        }
    }
    
    setupEventListeners() {
        // Data toggle
        document.getElementById('data-toggle').addEventListener('change', () => {
            this.updateMarkers();
        });
        
        // Region filter (placeholder for now)
        document.getElementById('region-filter').addEventListener('change', () => {
            // TODO: Implement region filtering
            console.log('Region filter changed');
        });
        
        // Refresh data
        document.getElementById('refresh-data').addEventListener('click', () => {
            this.loadSampleData();
        });
        
        // Close info panel
        document.getElementById('close-info').addEventListener('click', () => {
            this.hideInfoPanel();
        });
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Auto-rotate globe slowly
        if (this.globe) {
            this.globe.rotation.y += 0.001;
        }
        
        // Animate marker glow
        const time = Date.now() * 0.005;
        [...this.birdMarkers, ...this.radioMarkers].forEach(marker => {
            if (marker.material) {
                marker.material.opacity = 0.6 + 0.2 * Math.sin(time + marker.position.x * 10);
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BirdsRadioGlobe();
});