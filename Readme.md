// ...existing code...
# E-LearninGs

Monorepo with a Node/Express backend and a React + Vite frontend (developed inside a dev container).

## Repository layout

- server/ — backend API
  - `server.js` — main Express app (server/server.js)
  - `generate-hash.js` — helper to generate bcrypt password hashes (server/generate-hash.js)
- vite-project/ — React frontend (Vite)
  - `src/` — React app
    - `App.jsx` — app routing and auth (vite-project/src/App.jsx)
    - `main.jsx` — app entry (vite-project/src/main.jsx)
    - `components/Navbar.jsx` — top navigation (vite-project/src/components/Navbar.jsx)
    - `services/api.js` — axios wrapper / API helpers (API base: `http://localhost:5000/api`) (vite-project/src/services/api.js)
    - admin pages: `Profile.jsx`, `ManageUsers.jsx` (vite-project/src/pages/admin/)
    - sections: `Features.jsx` (vite-project/src/sections/Features.jsx)
  - `index.html`, `vite.config.js`, `package.json` (vite-project/)

## Requirements

- Node.js (v18+ recommended)
- npm or yarn
- Dev container: Ubuntu 24.04.2 LTS

## Running locally

1. Start backend
   ```sh
   cd server
   npm install

   # Option A: run directly
   node server.js

   # Option B: use the npm script (if defined)
   npm run dev
   ```
   The backend default API base is `http://localhost:5000/api` (see vite-project/src/services/api.js).

2. Start frontend
   ```sh
   cd vite-project
   npm install
   npm run dev
   ```
   Vite will print the dev server URL (typically http://localhost:5173). From the dev container open it on the host with:
   ```sh
   $BROWSER http://localhost:5173
   ```

3. Create example password hashes (optional)
   ```sh
   cd server
   node generate-hash.js
   ```

## Useful notes

- Auth & routing:
  - App and routes: vite-project/src/App.jsx
  - Navbar / search UI: vite-project/src/components/Navbar.jsx
- Admin pages:
  - Profile: vite-project/src/pages/admin/Profile.jsx
  - Manage users: vite-project/src/pages/admin/ManageUsers.jsx
- Frontend API helpers: vite-project/src/services/api.js — update API_BASE there if backend port changes.

## Development tips

- Run backend and frontend in separate terminals inside the dev container.
- If backend port changes, update API_BASE in vite-project/src/services/api.js.
- Use the dev container terminal to run both servers concurrently.

## Contributing

- Follow existing code structure and linting config (vite-project/eslint.config.js).
- Frontend styles use local CSS + Tailwind via CDN in vite-project/index.html.

## License

Add project license info here.