# Bebi Website

Private MERN relationship archive for songs, messages, gallery photos, memories, timeline events,
monthsary greetings, and anniversary recap mode.

## Stack

- Client: Vite, React, React Router, Axios, Framer Motion
- Server: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Node Cron
- Architecture: `client/` and `server/` split, backend MVC routes/controllers/models/services/jobs

## Run Locally

1. Install dependencies:

   ```bash
   npm run install:all
   ```

2. Copy environment templates:

   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

3. Start MongoDB locally, or set `MONGO_URI` to a hosted MongoDB database.

4. Start the API and frontend in separate terminals:

   ```bash
   npm run dev:server
   npm run dev:client
   ```

5. Open `http://127.0.0.1:5173`.

Default development access code is `1208`. For production, set `ACCESS_CODE_HASH`,
`JWT_SECRET`, and remove the plain `SPECIAL_ACCESS_CODE`.

## API Overview

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST /api/songs`
- `GET|POST /api/messages`
- `GET|POST /api/gallery`
- `GET|POST /api/memories`
- `GET|POST /api/timeline`
- `GET /api/anniversary`
- `GET /api/anniversary/status`
- `GET /api/notifications`

All content APIs are protected with JWT middleware.

## Uploads

Multer stores files under `server/uploads/<year>/<month>/`. Images are limited to 8 MB and audio
files to 30 MB. Uploaded files are served from `/uploads/...`.

## Scheduling

Node Cron runs:

- Monthsary job: every 8th day at 9:00 AM
- Anniversary job: every December 8 at 9:00 AM

The scheduler timezone defaults to `Asia/Singapore`. Email/SMS/push notifications are webhook-based
and skipped safely when credentials are not configured.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
```
