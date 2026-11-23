# JARVIS AI 2.0 — Production Deployment Guide

JARVIS AI 2.0 is built on a fullstack Next.js App Router architecture and can be deployed to Vercel, Railway, Render, Docker, or any Node.js / Linux VPS environment.

---

## Deployment Option 1: Standalone Node.js / VPS (Recommended)

### Prerequisites
- Node.js >= 18.18.0 (Tested on Node.js v24.19.0)
- npm >= 9.0.0

### Steps
1. Clone or extract the repository:
   ```bash
   git clone <repo-url> jarvis-os
   cd jarvis-os
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment configuration:
   ```bash
   cp .env.example .env.local
   ```
4. Build the production bundle:
   ```bash
   npm run build
   ```
5. Launch the production server using PM2 or systemd:
   ```bash
   npm install -g pm2
   pm2 start npm --name "jarvis-os" -- start -- -p 3000
   ```
6. Configure Nginx reverse proxy with SSL (Let's Encrypt / Certbot) for HTTPS.
   ```nginx
   server {
       server_name jarvis.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       listen 443 ssl;
       # SSL certificate managed by Certbot
   }
   ```

---

## Deployment Option 2: Docker Container

Create a `Dockerfile` with the following configuration:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/data ./data

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t jarvis-os:2.0 .
docker run -p 3000:3000 -v $(pwd)/data:/app/data jarvis-os:2.0
```

---

## Deployment Option 3: Vercel / Cloud Platforms

1. Connect your GitHub repository to Vercel.
2. Set Build Command: `npm run build`
3. Set Output Directory: `.next`
4. Deploy!
