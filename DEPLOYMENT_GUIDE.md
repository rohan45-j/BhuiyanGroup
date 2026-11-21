# 🚀 Bhuiyan Group Enterprise Portal — Production Deployment Guide
> **Comprehensive Step-by-Step Server Setup & Hosting Documentation**

---

## 📋 Table of Contents
1. [Tech Stack & System Architecture](#1-tech-stack--system-architecture)
2. [Server & Hosting Prerequisites](#2-server--hosting-prerequisites)
3. [Method 1: Linux VPS Deployment (Ubuntu 22.04/24.04 LTS) — Recommended](#3-method-1-linux-vps-deployment-ubuntu-22042404-lts--recommended)
4. [Method 2: cPanel / Cloud Hosting with "Setup Node.js App"](#4-method-2-cpanel--cloud-hosting-with-setup-nodejs-app)
5. [Method 3: Docker & Docker Compose Deployment](#5-method-3-docker--docker-compose-deployment)
6. [Critical: Persistent File Storage & Uploads Permissions](#6-critical-persistent-file-storage--uploads-permissions)
7. [Domain & DNS Setup (Cloudflare, Namecheap, GoDaddy)](#7-domain--dns-setup-cloudflare-namecheap-godaddy)
8. [Automated Backups Strategy](#8-automated-backups-strategy)
9. [Zero-Downtime Routine for Future Updates](#9-zero-downtime-routine-for-future-updates)
10. [Troubleshooting & FAQs](#10-troubleshooting--faqs)

---

## 1. Tech Stack & System Architecture

| Layer | Technology | Version |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | `16.4.6` |
| **Runtime** | Node.js | `v20.x LTS` (or `v18.x LTS`) |
| **UI Library** | React | `19.3.0` |
| **Styling** | Tailwind CSS + Vanilla CSS Tokens | `4.3.3` |
| **Icons & Animations** | Lucide React + Framer Motion | Latest |
| **Email Service** | Nodemailer (SMTP Relay) | `10.6.1` |
| **Persistence Engine** | Atomic JSON Store (`src/data/`) + Asset Storage (`public/uploads/`) | Server Native FS |

---

## 2. Server & Hosting Prerequisites

Before provisioning hosting, ensure your server meets or exceeds these specifications:

### Minimum Specifications:
- **CPU:** 1 vCPU
- **RAM:** 1 GB (2 GB recommended during `npm run build`)
- **Storage:** 10 GB SSD / NVMe (persistent write access required)
- **OS:** Ubuntu 22.04 / 24.04 LTS, Debian 12, or CloudLinux with Node.js
- **Node.js:** `v20.18.0+ LTS`
- **Network Ports:** Port `80` (HTTP), Port `443` (HTTPS), Port `22` (SSH)

---

## 3. Method 1: Linux VPS Deployment (Ubuntu 22.04/24.04 LTS) — Recommended

> **Best for:** DigitalOcean Droplet, Contabo VPS, Linode, AWS EC2, or Hetzner Cloud.

### Step 1: Connect to Server & Update OS
```bash
ssh root@<YOUR_SERVER_IP>
apt update && apt upgrade -y
```

### Step 2: Install Node.js 20 LTS, Git, and Nginx
```bash
# Install Node.js 20 repository
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install packages
apt install -y nodejs git nginx build-essential

# Verify versions
node -v   # Should show v20.x.x
npm -v    # Should show v10.x.x
```

### Step 3: Install PM2 Global Process Manager
```bash
npm install -g pm2
```

### Step 4: Clone Codebase to `/var/www`
```bash
cd /var/www
git clone <YOUR_GIT_REPOSITORY_URL> bhuiyan-group
cd bhuiyan-group
```

### Step 5: Install Dependencies & Run Production Build
```bash
# Install project dependencies
npm install

# Build optimized production bundle
npm run build
```

### Step 6: Configure Permissions for File Uploads
```bash
# Ensure upload directories exist with proper write permissions
mkdir -p public/uploads
chmod -R 775 public/uploads src/data
chown -R www-data:www-data public/uploads src/data
```

### Step 7: Start Application with PM2
```bash
# Start Next.js in production cluster mode
pm2 start ecosystem.config.js

# Check running status
pm2 status

# Save PM2 state so it restarts automatically on server reboot
pm2 save
pm2 startup
```

### Step 8: Configure Nginx as Reverse Proxy
Create a new Nginx server configuration:
```bash
nano /etc/nginx/sites-available/bhuiyangroup.com.bd
```

Paste the following block (replace `bhuiyangroup.com.bd` with your real domain):
```nginx
server {
    listen 80;
    server_name bhuiyangroup.com.bd www.bhuiyangroup.com.bd;

    # Allow large uploads for PDF brochures and video reels (up to 50MB)
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets cache header
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        access_log off;
    }
}
```

Enable site and test Nginx:
```bash
ln -s /etc/nginx/sites-available/bhuiyangroup.com.bd /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 9: Install Free SSL Certificate (Let's Encrypt HTTPS)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d bhuiyangroup.com.bd -d www.bhuiyangroup.com.bd
```
*Select option to automatically redirect all HTTP traffic to HTTPS.*

---

## 4. Method 2: cPanel / Cloud Hosting with "Setup Node.js App"

> **Supported Providers:** Hostinger Cloud, Namecheap Shared/Cloud, ExonHost, IT Nut Hosting.

### Step 1: Create Archive on Local Computer
Compress the project files into a `.zip` archive:
- **Include:** `src/`, `public/`, `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `ecosystem.config.js`.
- **Exclude:** `node_modules/` and `.next/` (these will be built on the server).

### Step 2: Configure Node.js in cPanel
1. Log in to cPanel.
2. Find and click **"Setup Node.js App"** (under Software section).
3. Click **"Create Application"**:
   - **Node.js version:** Select `20.x` (or `18.x`).
   - **Application mode:** `Production`.
   - **Application root:** `bhuiyan-group` (folder name).
   - **Application URL:** Select your domain (e.g., `bhuiyangroup.com.bd`).
   - **Application startup file:** `node_modules/next/dist/bin/next` (or leave default).
4. Click **Create**.

### Step 3: Upload Files via File Manager
1. In cPanel **File Manager**, navigate to the newly created folder (`bhuiyan-group`).
2. Upload and extract your `.zip` archive.

### Step 4: Run NPM Install & Build
1. In the Node.js App manager page, copy the virtual environment command (e.g. `source /home/username/nodevenv/...`).
2. Open cPanel **Terminal**, paste the command, and press Enter.
3. Run:
```bash
npm install
npm run build
```
4. Back in the cPanel Node.js App dashboard, click **"Restart Application"**.

---

## 5. Method 3: Docker & Docker Compose Deployment

The repository includes a ready-to-run [Dockerfile](file:///d:/Rohan45/BhuiyanGroup/Dockerfile) and [docker-compose.yml](file:///d:/Rohan45/BhuiyanGroup/docker-compose.yml).

### Step 1: Build & Launch Container
```bash
docker compose up -d --build
```

### Step 2: View Logs
```bash
docker compose logs -f
```

### Step 3: Stop or Restart
```bash
docker compose down
docker compose up -d
```

*Data in `public/uploads` and `src/data` are mounted as persistent volumes so changes never get lost on container rebuilds.*

---

## 6. Critical: Persistent File Storage & Uploads Permissions

When users upload pictures, videos, or PDFs via `/admin`, they are saved to `public/uploads/` and configured in `src/data/siteConfig.json`.

Ensure these paths have write permissions on your server:
```bash
chmod -R 775 /var/www/bhuiyan-group/public/uploads
chmod -R 775 /var/www/bhuiyan-group/src/data
```

If SELinux is active (CentOS / RHEL / AlmaLinux):
```bash
chcon -R -t httpd_sys_rw_content_t /var/www/bhuiyan-group/public/uploads
chcon -R -t httpd_sys_rw_content_t /var/www/bhuiyan-group/src/data
```

---

## 7. Domain & DNS Setup (Cloudflare, Namecheap, GoDaddy)

Log in to your DNS provider and add the following records:

| Record Type | Host / Name | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `<YOUR_SERVER_IP>` | Auto / 1 Hour |
| **CNAME** | `www` | `bhuiyangroup.com.bd` | Auto / 1 Hour |

> **Cloudflare Users:** If using Cloudflare proxy (Orange Cloud), ensure SSL/TLS encryption mode is set to **"Full"** or **"Full (strict)"** to prevent redirect loops.

---

## 8. Automated Backups Strategy

Create a daily automated cron job to backup site data and uploaded photos:

```bash
crontab -e
```
Add the following line to run every midnight at 2:00 AM:
```bash
0 2 * * * tar -czf /var/backups/bhuiyan_backup_$(date +\%F).tar.gz /var/www/bhuiyan-group/src/data /var/www/bhuiyan-group/public/uploads
```

---

## 9. Zero-Downtime Routine for Future Updates

Whenever you make improvements or push updates to your Git repository:

```bash
cd /var/www/bhuiyan-group

# 1. Fetch latest changes
git pull origin main

# 2. Install any new packages
npm install

# 3. Build new production assets
npm run build

# 4. Zero-downtime cluster reload
pm2 reload bhuiyan-group
```
*Visitors will never experience downtime during updates!*

---

## 10. Troubleshooting & FAQs

### Q: Port 3000 is already in use?
```bash
# Find and terminate existing process on port 3000
lsof -i :3000
kill -9 <PID>
# Restart PM2
pm2 restart bhuiyan-group
```

### Q: Uploaded image gives 404 or fails to save?
Verify the folder exists and is writable:
```bash
ls -ld public/uploads
# If permission denied:
chmod 775 public/uploads
```

### Q: How to check live server logs?
```bash
pm2 logs bhuiyan-group --lines 100
```

---

*Authored for Bhuiyan Group Industrial Conglomerate Web Platform.*
