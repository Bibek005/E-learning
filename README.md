# E-LearninGs

Monorepo with a Node/Express backend and a React + Vite frontend (developed inside a dev container).

## Repository layout

- server/ — backend API
  - `server.js` — main Express app ([server/server.js](server/server.js))
  - `generate-hash.js` — helper to generate bcrypt password hashes ([server/generate-hash.js](server/generate-hash.js))
- vite-project/ — React frontend (Vite)
  - `src/` — React app
    - `App.jsx` — app routing and auth ([vite-project/src/App.jsx](vite-project/src/App.jsx))
    - `main.jsx` — app entry ([vite-project/src/main.jsx](vite-project/src/main.jsx))
    - `components/Navbar.jsx` — top navigation ([vite-project/src/components/Navbar.jsx](vite-project/src/components/Navbar.jsx))
    - `services/api.js` — axios wrapper / API helpers (API base: `http://localhost:5000/api`) ([vite-project/src/services/api.js](vite-project/src/services/api.js))
    - admin pages: `Profile.jsx`, `ManageUsers.jsx` ([vite-project/src/pages/admin/Profile.jsx](vite-project/src/pages/admin/Profile.jsx), [vite-project/src/pages/admin/ManageUsers.jsx](vite-project/src/pages/admin/ManageUsers.jsx))
    - sections: `Features.jsx` ([vite-project/src/sections/Features.jsx](vite-project/src/sections/Features.jsx))
  - `index.html`, `vite.config.js`, `package.json` ([vite-project/index.html](vite-project/index.html), [vite-project/vite.config.js](vite-project/vite.config.js), [vite-project/package.json](vite-project/package.json))

## Requirements

- Node.js (v18+ recommended)
- npm or yarn
- Running inside provided dev container (Ubuntu 24.04.2 LTS)

## Running locally

1. Start backend
   ```sh
   cd server
   npm install
   # start server (port 5000 by default)
   node server.js// ...existing code...
# E-LearninGs

Monorepo with a Node/Express backend and a React + Vite frontend (developed inside a dev container).

## Repository layout

- server/ — backend API
  - `server.js` — main Express app ([server/server.js](server/server.js))
  - `generate-hash.js` — helper to generate bcrypt password hashes ([server/generate-hash.js](server/generate-hash.js))
- vite-project/ — React frontend (Vite)
  - `src/` — React app
    - `App.jsx` — app routing and auth ([vite-project/src/App.jsx](vite-project/src/App.jsx))
    - `main.jsx` — app entry ([vite-project/src/main.jsx](vite-project/src/main.jsx))
    - `components/Navbar.jsx` — top navigation ([vite-project/src/components/Navbar.jsx](vite-project/src/components/Navbar.jsx))
    - `services/api.js` — axios wrapper / API helpers (API base: `http://localhost:5000/api`) ([vite-project/src/services/api.js](vite-project/src/services/api.js))
    - admin pages: `Profile.jsx`, `ManageUsers.jsx` ([vite-project/src/pages/admin/Profile.jsx](vite-project/src/pages/admin/Profile.jsx), [vite-project/src/pages/admin/ManageUsers.jsx](vite-project/src/pages/admin/ManageUsers.jsx))
    - sections: `Features.jsx` ([vite-project/src/sections/Features.jsx](vite-project/src/sections/Features.jsx))
  - `index.html`, `vite.config.js`, `package.json` ([vite-project/index.html](vite-project/index.html), [vite-project/vite.config.js](vite-project/vite.config.js), [vite-project/package.json](vite-project/package.json))

## Requirements

- Node.js (v18+ recommended)
- npm or yarn
- Running inside provided dev container (Ubuntu 24.04.2 LTS)

## Running locally

1. Start backend
   ```sh
   cd server
   npm install
   # start server (port 5000 by default)
   # Option A: run directly
   node server.js

   # Option B: use the npm script (if defined)
   npm run dev
   ```
   The backend default API base is `http://localhost:5000/api` (see [vite-project/src/services/api.js](vite-project/src/services/api.js)).

2. Start frontend
   ```sh
   cd vite-project
   npm install
   npm run dev
   ```
   Vite will print the dev server URL (typically `http://localhost:5173`). To open in host browser from the dev container use:
   ```sh
   $BROWSER http://localhost:5173
   ```

3. Create example password hashes (optional)
   ```sh
   cd server
   node generate-hash.js
   ```
   See [server/generate-hash.js](server/generate-hash.js).

## Useful notes

- Auth & routing:
  - `App` and routes: [vite-project/src/App.jsx](vite-project/src/App.jsx)
  - Navbar / search UI: [vite-project/src/components/Navbar.jsx](vite-project/src/components/Navbar.jsx)
- Admin pages:
  - Profile page: [vite-project/src/pages/admin/Profile.jsx](vite-project/src/pages/admin/Profile.jsx)
  - Manage users: [vite-project/src/pages/admin/ManageUsers.jsx](vite-project/src/pages/admin/ManageUsers.jsx)
- Frontend API helpers are in [vite-project/src/services/api.js](vite-project/src/services/api.js). Many functions assume a running backend at `http://localhost:5000/api`.

## Development tips

- If you change backend port, update API_BASE in [vite-project/src/services/api.js](vite-project/src/services/api.js) or set appropriate env config.
- Use the dev container terminal to run both servers concurrently (two terminals / tmux).
- Inspect backend routes and dashboard logic in [server/server.js](server/server.js).

## Contributing

- Follow existing code structure and linting config: [vite-project/eslint.config.js](vite-project/eslint.config.js)
- Frontend styles use local CSS + Tailwind via CDN in [vite-project/index.html](vite-project/index.html).

## License

Add project license info here.
```// filepath: /README.md
// ...existing code...
# E-LearninGs

Monorepo with a Node/Express backend and a React + Vite frontend (developed inside a dev container).

## Repository layout

- server/ — backend API
  - `server.js` — main Express app ([server/server.js](server/server.js))
  - `generate-hash.js` — helper to generate bcrypt password hashes ([server/generate-hash.js](server/generate-hash.js))
- vite-project/ — React frontend (Vite)
  - `src/` — React app
    - `App.jsx` — app routing and auth ([vite-project/src/App.jsx](vite-project/src/App.jsx))
    - `main.jsx` — app entry ([vite-project/src/main.jsx](vite-project/src/main.jsx))
    - `components/Navbar.jsx` — top navigation ([vite-project/src/components/Navbar.jsx](vite-project/src/components/Navbar.jsx))
    - `services/api.js` — axios wrapper / API helpers (API base: `http://localhost:5000/api`) ([vite-project/src/services/api.js](vite-project/src/services/api.js))
    - admin pages: `Profile.jsx`, `ManageUsers.jsx` ([vite-project/src/pages/admin/Profile.jsx](vite-project/src/pages/admin/Profile.jsx), [vite-project/src/pages/admin/ManageUsers.jsx](vite-project/src/pages/admin/ManageUsers.jsx))
    - sections: `Features.jsx` ([vite-project/src/sections/Features.jsx](vite-project/src/sections/Features.jsx))
  - `index.html`, `vite.config.js`, `package.json` ([vite-project/index.html](vite-project/index.html), [vite-project/vite.config.js](vite-project/vite.config.js), [vite-project/package.json](vite-project/package.json))

## Requirements

- Node.js (v18+ recommended)
- npm or yarn
- Running inside provided dev container (Ubuntu 24.04.2 LTS)

## Running locally

1. Start backend
   ```sh
   cd server
   npm install
   # start server (port 5000 by default)
   # Option A: run directly
   node server.js

   # Option B: use the npm script (if defined)
   npm run dev
   ```
   The backend default API base is `http://localhost:5000/api` (see [vite-project/src/services/api.js](vite-project/src/services/api.js)).

2. Start frontend
   ```sh
   cd vite-project
   npm install
   npm run dev
   ```
   Vite will print the dev server URL (typically `http://localhost:5173`). To open in host browser from the dev container use:
   ```sh
   $BROWSER http://localhost:5173
   ```

3. Create example password hashes (optional)
   ```sh
   cd server
   node generate-hash.js
   ```
   See [server/generate-hash.js](server/generate-hash.js).

## Useful notes

- Auth & routing:
  - `App` and routes: [vite-project/src/App.jsx](vite-project/src/App.jsx)
  - Navbar / search UI: [vite-project/src/components/Navbar.jsx](vite-project/src/components/Navbar.jsx)
- Admin pages:
  - Profile page: [vite-project/src/pages/admin/Profile.jsx](vite-project/src/pages/admin/Profile.jsx)
  - Manage users: [vite-project/src/pages/admin/ManageUsers.jsx](vite-project/src/pages/admin/ManageUsers.jsx)
- Frontend API helpers are in [vite-project/src/services/api.js](vite-project/src/services/api.js). Many functions assume a running backend at `http://localhost:5000/api`.

## Development tips

- If you change backend port, update API_BASE in [vite-project/src/services/api.js](vite-project/src/services/api.js) or set appropriate env config.
- Use the dev container terminal to run both servers concurrently (two terminals / tmux).
- Inspect backend routes and dashboard logic in [server/server.js](server/server.js).

## Contributing

- Follow existing code structure and linting config: [vite-project/eslint.config.js](vite-project/eslint.config.js)
- Frontend styles use local CSS + Tailwind via CDN in [vite-project/index.html](vite-project/index.html).

## License

Add project license info here.
   ```
   The backend default API base is `http://localhost:5000/api` (see [vite-project/src/services/api.js](vite-project/src/services/api.js)).

2. Start frontend
   ```sh
   cd vite-project
   npm install
   npm run dev
   ```
   Vite will print the dev server URL (typically `http://localhost:5173`). To open in host browser from the dev container use:
   ```sh
   $BROWSER http://localhost:5173
   ```

3. Create example password hashes (optional)
   ```sh
   cd server
   node generate-hash.js
   ```
   See [server/generate-hash.js](server/generate-hash.js).

## Useful notes

- Auth & routing:
  - `App` and routes: [vite-project/src/App.jsx](vite-project/src/App.jsx)
  - Navbar / search UI: [vite-project/src/components/Navbar.jsx](vite-project/src/components/Navbar.jsx)
- Admin pages:
  - Profile page: [vite-project/src/pages/admin/Profile.jsx](vite-project/src/pages/admin/Profile.jsx)
  - Manage users: [vite-project/src/pages/admin/ManageUsers.jsx](vite-project/src/pages/admin/ManageUsers.jsx)
- Frontend API helpers are in [vite-project/src/services/api.js](vite-project/src/services/api.js). Many functions assume a running backend at `http://localhost:5000/api`.

## Development tips

- If you change backend port, update API_BASE in [vite-project/src/services/api.js](vite-project/src/services/api.js) or set appropriate env config.
- Use the dev container terminal to run both servers concurrently (two terminals / tmux).
- Inspect backend routes and dashboard logic in [server/server.js](server/server.js).

## Contributing

- Follow existing code structure and linting config: [vite-project/eslint.config.js](vite-project/eslint.config.js)
- Frontend styles use local CSS + Tailwind via CDN in [vite-project/index.html](vite-project/index.html).

## License

Add project license info here.