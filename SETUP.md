# Birds on Earth Radio Globe - Setup Guide

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Orwebcraft-ecologists-association/Birds-on-Earth-Radio-globe.git
cd Birds-on-Earth-Radio-globe
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Linting

Run the linter:
```bash
npm run lint
```

## Environment Variables

For production use with real APIs, create a `.env` file in the root directory:

```env
# Google Gemini API Key (for tree identification)
VITE_GEMINI_API_KEY=your_api_key_here

# Optional: BirdNET API endpoint (if using a custom backend)
VITE_BIRDNET_API_URL=https://your-birdnet-api.com
```

## Features

- **Interactive 3D Globe**: Powered by Three.js and React Three Fiber
- **Live Bird Detections**: Integration with BirdNET (currently mock data)
- **Tree Photo Identification**: Upload tree photos for AI identification using Google Gemini API
- **Global Radio Stations**: Browse and listen to radio stations from around the world
- **Species Imagery**: Automatic fetching of species images from Wikipedia

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **3D Rendering**: Three.js via React Three Fiber
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **State Management**: React Hooks

## API Integration Notes

### BirdNET Integration
The current implementation uses mock data. To integrate with real BirdNET data, you would need to:
1. Set up a backend service that aggregates BirdNET detections
2. Update `src/services/birdService.ts` to fetch from your backend

### Google Gemini API
The tree identification feature is prepared for Google Gemini API integration:
1. Sign up for Google AI Studio and get an API key
2. Add the API key to your `.env` file
3. Update `src/services/treeService.ts` to use the real API

### Radio Browser API
The radio browser integration works out of the box using the free radio-browser.info API.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

3. Update vite.config.ts to set the base path:
```typescript
export default defineConfig({
  base: '/Birds-on-Earth-Radio-globe/',
  plugins: [react()]
})
```

4. Deploy:
```bash
npm run deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Credits

- **BirdNET**: Cornell Lab of Ornithology
- **PlantNet**: Plant identification inspiration
- **Radio Browser**: Community-driven radio station database
- **Wikipedia**: Species imagery

## Support

For issues and questions, please use the GitHub Issues page.
