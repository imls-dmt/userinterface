# ── Stage 1: build the Vue SPA ────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VUE_APP_API_BASE is baked into the bundle at build time.
# Leave empty ("") so the app uses relative URLs proxied through nginx.
# Set to a full origin (e.g. https://api.example.com) only when the API
# and UI are served from different domains.
ARG VUE_APP_API_BASE=""
ENV VUE_APP_API_BASE=$VUE_APP_API_BASE

RUN npm run build

# ── Stage 2: serve static files + proxy /api/ ─────────────────────────────────
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
