# Worldwise

Worldwise is a small React + Vite web app for browsing countries and cities, viewing city details on a map, and managing city entries. It demonstrates a component-based React structure, client-side routing, simple authentication context for protected routes, and usage of local JSON data.

## Key Features

- List countries and their cities
- View city details and location on an interactive map
- Add new cities via a form (demo/local-only)
- Protected routes with a simple fake authentication context
- Geolocation and URL-position hooks for map integration
- Built with Vite for fast development

## Tech Stack

- React
- Vite
- CSS Modules for component styling
- Leaflet (or similar) for map components (check Map.jsx)

## Project Structure

- `index.html` — app entry HTML
- `src/` — application source
  - `components/` — reusable UI components (City, CityList, CountryList, Map, Form, etc.)
  - `pages/` — top-level route pages (HomePage, Login, Product, etc.)
  - `contexts/` — React contexts (citiesContext, fakeAuthContext)
  - `hooks/` — custom hooks (`useGeolocation.js`, `useUrlPosition.js`)
- `data/cities.json` — sample city data used by the app

## Getting Started

Prerequisites: Node.js (14+ recommended) and npm or yarn.

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

If your `package.json` uses different scripts, adapt the commands accordingly.

## Data

The app uses `data/cities.json` as the local data source. You can inspect or modify this file to change the list of available cities.

## Contributing

Contributions are welcome. For small fixes or improvements:

1. Fork the repository
2. Create a branch for your change
3. Open a pull request describing the change
