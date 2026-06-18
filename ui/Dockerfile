# ── Production build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VUE_APP_API_BASE=""
ENV VUE_APP_API_BASE=$VUE_APP_API_BASE
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# ── Development (hot-reload) ──────────────────────────────────────────────────
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Source is volume-mounted at runtime; only node_modules live in the image.
EXPOSE 8080
CMD ["npm", "run", "serve"]
