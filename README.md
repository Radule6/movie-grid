# MovieGrid - Interactive Movie Browser

## Overview
MovieGrid is a React-based web application that displays movies in an interactive grid layout, organized by genres. Users can navigate through movie selections using keyboard controls and toggle between light and dark themes.

## Features
- **Grid Navigation**: Use arrow keys to browse through movies
- **Dark/Light Mode**: Toggle between themes
- **Genre-based Organization**: Movies are categorized by genres
- **Smooth Scrolling**: Automatic scrolling to selected items
- **API Integration**: Fetches data from TMDB API

## Tech Stack
- React 18
- Vite
- Zustand (State Management)
- Styled Components
- Vitest & Testing Library
- ESLint

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API key

### Installation
1. Clone the repository

```bash
git clone <repository-url>
cd react-grid
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key:
```bash
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

## Usage
- Use **Arrow Keys** to navigate through the grid
- Press the theme toggle button to switch between dark and light modes

## Possible Improvements
- Add more features like search, filter, and sorting
- Add more detailed movie information on hover or modal
- Implement a mobile version
## License
This project is licensed under the MIT License

