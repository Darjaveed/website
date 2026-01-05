# GitHub Copilot / AI Agent Instructions for UpstairsX

Purpose: help an AI coding assistant become productive quickly in this repo by describing architecture, dev workflows, conventions, and concrete examples.

- **Top-level architecture:** frontend React app (Vite) in `client/` and backend Node/Express API in `server/`. Data is persisted in MongoDB. See [server/README.md](server/README.md) and [client/package.json](client/package.json).

- **How to run locally:**
  - Backend: open a terminal in `server/` and run:

    npm install
    npm run dev

    The server entry is `server/src/server.js` and the Express app is configured in [server/src/app.js](server/src/app.js).

  - Frontend: open a terminal in `client/` and run:

    npm install
    npm run dev

    The frontend is a Vite React app; environment variables use `import.meta.env` (see `VITE_API_URL`).

- **Important environment variables:** set `.env` in `server/` with at least:
  - `PORT` (default 5000)
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `CLOUDINARY_*` keys
  - `FRONTEND_URL` (frontend origin for CORS)

- **Authentication flow & gotchas:**
  - Server issues JWT tokens and sets them in an HTTP-only cookie named `token` in `authController.login`. Also returns `token` in the JSON response for flexibility. See [server/src/controllers/authController.js](server/src/controllers/authController.js).
  - Protected routes use `protect` middleware which reads the JWT from cookie first, then from `Authorization: Bearer <token>` header. See [server/src/middleware/authMiddleware.js](server/src/middleware/authMiddleware.js).
  - Frontend API calls MUST use `credentials: 'include'` when calling auth-protected endpoints (examples in `client/src/services/authService.js` and `client/src/services/courseService.js`). Forgetting this will make requests unauthenticated.

- **Data shapes & helpers to know:**
  - `User` model stores password in `passwordHash` and exposes `comparePassword()` — use that for authentication logic. See [server/src/models/User.js](server/src/models/User.js).
  - `Course` model uses `slug` and `category` fields (`program` | `short-term`). API endpoints query by slug for course details. See [server/src/models/Course.js](server/src/models/Course.js) and [server/src/controllers/courseController.js](server/src/controllers/courseController.js).

- **API surface:**
  - Auth: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me` — defined in [server/src/routes/authRoutes.js](server/src/routes/authRoutes.js).
  - Courses: `/api/courses` and `/api/courses/:slug` — see [server/src/routes/courseRoutes.js](server/src/routes/courseRoutes.js).

- **Where to implement new features:**
  - Add HTTP endpoints in `server/src/routes/*.js`, implement logic in `server/src/controllers/*.js`, and interact with DB models in `server/src/models/*.js`.
  - For frontend changes, update components in `client/src/components/`, pages in `client/src/pages/`, and API wrappers in `client/src/services/`.

- **Conventions & patterns observed:**
  - Project uses ES modules (package.json `type: "module"`) — prefer `import`/`export` syntax.
  - Server returns JSON responses with structure `{ success, message?, data? }` — follow this shape for consistency.
  - Error handling: controllers log errors and return `500` with `message` — follow this pattern in new controllers/middleware.
  - Authentication middleware attaches `req.user` (without password) — downstream code expects `req.user.id` or `req.user.role`.

- **Third-party integrations:**
  - Cloudinary is used for uploads (see `server/src/config/cloudinary.js` and `client/src/services/uploadService.js`). Ensure `CLOUDINARY_*` env vars are present when working with media uploads.

- **Quick examples to copy/paste:**
  - Fetch courses from frontend (pattern used across services):

    const res = await fetch(`${API_URL}/courses?category=program`, { credentials: 'include' })

  - Protect a backend route (pattern): add `protect` middleware to the route: `router.get('/me', protect, getCurrentUser)`.

- **Files to inspect first when debugging or extending:**
  - App and routes: [server/src/app.js](server/src/app.js), [server/src/server.js](server/src/server.js)
  - Auth flow: [server/src/controllers/authController.js](server/src/controllers/authController.js), [server/src/middleware/authMiddleware.js](server/src/middleware/authMiddleware.js), [client/src/context/AuthContext.jsx](client/src/context/AuthContext.jsx)
  - API wrappers: [client/src/services/authService.js](client/src/services/authService.js), [client/src/services/courseService.js](client/src/services/courseService.js)

- **What I won't change / assumptions:**
  - No tests are present in the workspace; do not add test scaffolding without asking.
  - Dev workflow assumes local MongoDB is available unless using a hosted DB. The server README documents starting MongoDB.

If any section is unclear or you'd like more examples (route scaffolding, a sample controller, or a frontend integration example), tell me which area to expand. I'll iterate based on your feedback.
