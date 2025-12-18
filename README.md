# Safe Harbor — Frontend

> **Status:** Startup • In formation

This repository contains the frontend codebase for **Safe Harbor**, a startup
focused on building web products with a modern, pragmatic React stack (no
TypeScript, no CI/CD configured). This README documents conventions, setup,
architecture guidance, and development workflows.

---

## Table of contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Why these choices?](#why-these-choices)
- [Getting started (local)](#getting-started-local)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [State management](#state-management)
- [API / Networking](#api--networking)
- [Styling guidelines](#styling-guidelines)
- [Testing & Linting](#testing--linting)
- [No CI / CD](#no-ci--cd)
- [Development best practices](#development-best-practices)
- [Deployment notes](#deployment-notes)
- [Roadmap & TODOs](#roadmap--todos)
- [Contributing](#contributing)
- [License & legal](#license--legal)
- [Contacts](#contacts)

---

## Project overview

Safe Harbor frontend is a single-page application built with React. It's
intended to be fast, easy to iterate on, and approachable for frontend engineers
who prefer JavaScript (no TypeScript) and minimal tooling friction.

This repo is specifically tailored for early-stage product development: quick
prototyping, clear component patterns, and pragmatic state + data fetching
approaches.

## Tech stack

- **React** (functional components + hooks)
- **Tailwind CSS** for utility-first styling
- **Zustand** for lightweight app state
- **Axios** for HTTP requests
- **Vite** or **Create React App** (pick one; recommended: Vite for speed)
- **Jest + React Testing Library** (optional; recommended) — basic testing setup

**Decisions:**

- No TypeScript — JavaScript only to speed iteration.
- No CI/CD configured in this repo (we'll add later when processes stabilize).

## Why these choices?

- **React**: industry standard for interactive apps and wide dev familiarity.
- **Tailwind**: fast styling with consistent tokens, reduces CSS-bloat in
  prototypes.
- **Zustand**: minimal global state with a tiny API surface — easy for
  small/medium apps.
- **Axios**: familiar promise-based HTTP client with interceptors for
  auth/refresh flows.

## Getting started (local)

> These instructions assume you have Node.js (LTS) and npm or yarn installed.

```bash
# clone
git clone git@github.com:your-org/safe-harbor-frontend.git
cd safe-harbor-frontend

# install
npm install
# or
# yarn install

# start dev server
npm run dev
# or
# yarn dev
```

Open http://localhost:5173 (if using Vite) or http://localhost:3000 (CRA) in
your browser.

## Available scripts

_Note: update these to match whether you use Vite or CRA._

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx",
    "test": "jest",
    "format": "prettier --write ."
  }
}
```

## Project structure

```
src/
├─ assets/           # images, icons, fonts
├─ components/       # reusable UI components
│  ├─ ui/            # low-level presentational components
│  └─ layout/        # header, footer, navigation
├─ features/         # feature folders (pages + hooks + small state)
├─ hooks/            # global custom hooks
├─ lib/              # utilities, helpers
├─ services/         # network layer (axios instances) and API clients
├─ store/            # zustand stores
├─ styles/           # tailwind config, global css
├─ App.jsx
└─ main.jsx
```

Keep components small, focused, and well-documented with JSDoc-style comments
where helpful.

## State management

Use **Zustand** for app-wide state. For feature-local state prefer local
`useState` or `useReducer` inside components.

Example pattern (src/store/uiStore.js):

```js
import create from 'zustand';

export const useUIStore = create((set) => ({
  theme: 'light',
  setTheme: (t) => set({ theme: t }),
}));
```

Guidelines:

- Keep global state minimal (auth, user profile, feature flags, UI theme,
  toasts)
- Prefer derived selectors inside components rather than exposing raw store
  where possible

## API / Networking

Centralize networking in `src/services/api.js` using Axios. Add interceptors for
auth and automatic error handling.

Pattern example:

```js
import axios from 'axios';

export const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUser = () => api.get('/user');
```

Guidelines:

- Return normalized responses from services (e.g. `response.data`), keep
  components free of low-level axios details
- Centralize error handling and retries here

## Styling guidelines

- Use Tailwind classes for UI. Keep class usage readable by grouping related
  utilities and using meaningful component wrappers when classes grow large.
- Create a `src/styles/tailwind.config.js` file to store theme tokens (colors,
  spacing, radii).
- For complex or repeating utility combinations, create small component wrappers
  (e.g., `<Button />`) instead of repeating utilities.

## Testing & Linting

- Add ESLint + Prettier. Use Airbnb or recommended React rules but remove
  TypeScript rules.
- Basic unit tests with Jest + React Testing Library for critical components.

Recommended commands: `npm run test`, `npm run lint`, `npm run format`.

## No CI / CD

This repository intentionally does **not** include CI/CD configuration. When the
organization is ready to adopt continuous integration (test runs, linting) or
continuous deployment (Vercel/Netlify/GH Pages), add a small pipeline that runs
tests and builds artifacts. For now, local checks are expected before pushing.

## Development best practices

- Keep components < 200 lines where practical.
- Use feature folders for larger pages with `index.jsx`, `styles.css`,
  `hooks.js`, `tests.spec.js` next to each other.
- Prefer composition over prop drilling. Use context sparingly — prefer zustand
  for app/state shared across many components.
- Write descriptive commit messages. Use atomic commits for single logical
  changes.

## Deployment notes

When ready to deploy, typical options include:

- **Vercel** — great for quick React deployments (serverless functions optional)
- **Netlify** — straightforward CI-less deploy via git
- **Static host** — S3 + CloudFront if you need more control

Build command: `npm run build` (Vite). Output directory: `dist/` (Vite) or
`build/` (CRA).

## Roadmap & TODOs

- [ ] Authentication flow (login / refresh token)
- [ ] Design system: Button, Input, Form primitives
- [ ] E2E tests (Cypress)
- [ ] Add CI when processes are stable

## Contributing

1. Fork the repo
2. Create a branch: `feature/<short-description>`
3. Commit early, commit often
4. Open PR against `main` with description of intent and screenshots

## License & legal

For now, this project is internal to Safe Harbor (in formation).

## Contacts

- Product / Founder: `safeharborswellness@gmail.com`
- Fullstack lead 1: `hdivyesh62@gmail.com`
- Fullstack lead 2: `viralvaghela2641@gmail.com`
