# React Frontend - Ocean Professional Chat

This is a lightweight React frontend for a Slack-like chat application with authentication, channels, and real-time messaging.

## Features
- Authentication: Login and Signup flows
- Channels: Sidebar with channel list
- Chat: Messages list and input
- Real-time: Socket.IO client for live updates
- Theming: Ocean Professional theme with primary (#2563EB), secondary (#F59E0B), error (#EF4444), background (#f9fafb), text (#111827)
- Responsive: Adaptive sidebar and content layout

## Environment Variables
Create a `.env` file in the project root (same folder as package.json) to configure endpoints:

```
REACT_APP_API_BASE=http://localhost:8000
REACT_APP_WS_BASE=http://localhost:8000
```

These are required for REST and WebSocket connectivity. The orchestrator should set them for deployment.

## Scripts
- `npm start` - start dev server
- `npm run build` - production build
- `npm test` - run tests

## Structure
- `src/auth` - Auth context and pages
- `src/chat` - Chat layout and components
- `src/services` - API and Socket services
- `src/theme.js` - Theme application

## Backend Contracts
Expected endpoints (FastAPI recommended):
- `POST /auth/login` -> `{ token, user }`
- `POST /auth/signup` -> `{ token, user }`
- `GET /channels` -> `[{ id, name, description? }]`
- `GET /channels/:id/messages` -> `[{ id, content, user: { id, name }, createdAt }]`
- `POST /channels/:id/messages` -> `{ id, content, user, createdAt }`

Socket.IO events:
- client emits: `join` with `{ channelId }`
- server emits: `message:new` with `{ channelId, message }`

Adjust names to match your backend if different.

## Styling
The Ocean Professional theme is applied via CSS variables and `applyTheme()` in `src/theme.js`. The UI uses a minimalist, modern layout with rounded corners, subtle shadows, and gradients.
