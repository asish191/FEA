# Movie App - Progressive Web App (PWA)

A modern movie streaming application built with React that functions as a Progressive Web App with offline support and skeleton loading animations.

## Features

### 🚀 Progressive Web App (PWA)
- **Offline Support**: Works without internet connection using service worker caching
- **Installable**: Can be installed on desktop and mobile devices
- **App-like Experience**: Full-screen standalone mode
- **Fast Loading**: Cached resources for instant loading
- **Responsive Design**: Optimized for all screen sizes

### 🎬 Movie Features
- Browse movies by categories
- View movie details and trailers
- User authentication system
- Comments and reviews system
- Responsive movie grid layout

### ⚡ Skeleton Loading
- **Home Page**: Skeleton loaders for banner and movie rows
- **Movie Details**: Skeleton loaders for movie information and comments
- **Smooth Animations**: Shimmer effect for better user experience
- **Responsive**: Adapts to different screen sizes

### 🔧 Technical Features
- React 19 with modern hooks
- Redux Toolkit for state management
- React Router for navigation
- Service Worker for offline functionality
- Custom PWA hooks for better code organization

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## PWA Features

### Offline Functionality
- The app caches essential resources for offline use
- Service worker handles network requests and provides fallbacks
- Offline page with helpful information when connection is lost

### Installation
- Users can install the app on their devices
- Automatic install prompt when criteria are met
- Works on desktop and mobile browsers

### Caching Strategy
- Static assets are cached for fast loading
- API responses are cached for offline access
- Intelligent cache management with versioning

## Skeleton Loading

The app includes comprehensive skeleton loading states:

- **Banner Skeleton**: Shows while main banner loads
- **Movie Row Skeletons**: Display while movie data loads
- **Comment Skeletons**: Show while comments load
- **Responsive Design**: Adapts to different screen sizes

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── SkeletonLoader.js    # Skeleton loading component
│   ├── PWAInstallPrompt.js  # PWA install prompt
│   └── ...
├── hooks/              # Custom hooks
│   ├── usePWA.js           # PWA functionality hook
│   └── ...
├── pages/              # Page components
│   ├── OfflinePage.js      # Offline page
│   └── ...
├── styles/             # CSS files
│   ├── SkeletonLoader.css   # Skeleton animations
│   ├── OfflinePage.css      # Offline page styles
│   └── ...
└── ...
public/
├── sw.js              # Service worker
├── manifest.json      # PWA manifest
└── ...
```

## Browser Support

- Chrome (recommended for PWA features)
- Firefox
- Safari
- Edge

## Development

### Adding New Skeleton Types
1. Add new case in `SkeletonLoader.js`
2. Create corresponding CSS in `SkeletonLoader.css`
3. Use the new type in your components

### PWA Customization
1. Modify `manifest.json` for app metadata
2. Update `sw.js` for caching strategies
3. Customize offline page in `OfflinePage.js`

## Performance

- Lighthouse PWA score: 90+
- Fast loading with skeleton screens
- Optimized bundle size
- Efficient caching strategies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test PWA functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details
