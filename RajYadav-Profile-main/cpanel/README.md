# cPanel Deployment Guide - MSMFHB Portfolio

This folder contains automated and manual configuration steps for deploying this project to cPanel.

## Automated Configuration

Run the following command from the project root:

```bash
npm run deploy:cpanel
```

This script will:
1. Build the React frontend.
2. Build the Node.js backend.
3. Configure `.htaccess` for React SPA routing.
4. Create a cPanel-compatible `app.js` entry point for the backend.

---

## Manual Deployment Steps

### 1. Frontend (React)
- The build files are located in `client/dist`.
- Ensure `.htaccess` is present in `client/dist` (the script does this).
- Zip the **contents** of `client/dist`.
- Upload to `public_html` via cPanel File Manager.
- Extract the zip.

### 2. Backend (Node.js)
- Build the server using `npm run build` in the `server` folder.
- Zip the `server` folder **excluding** `node_modules`.
- Upload to a folder in your cPanel root (e.g., `/home/username/portfolio-backend`).
- In cPanel, go to **Setup Node.js App**.
- Click **Create Application**.
- **Application root**: `portfolio-backend`
- **Application URL**: `yourdomain.com/api` (or a subdomain like `api.yourdomain.com`)
- **Application startup file**: `app.js`
- Click **Create**.
- Once created, click **Run JS Install** to install dependencies from `package.json`.

### 3. Environment Variables
- Create a `.env` file in the backend application root on cPanel or use the "Configuration variables" section in the Node.js App interface.
- Add your `MONGODB_URI`, `JWT_SECRET`, etc.

### 4. Database
- If using MongoDB Atlas, ensure your cPanel IP is whitelisted.
- If using MySQL, create a database and user in cPanel and update the DB config in the backend.

---

## Connecting GitHub to cPanel (Automated Deployment)

Linking GitHub allows you to deploy changes simply by pushing to your repository.

### Step 1: Generate SSH Key in cPanel
1.  Log in to **cPanel**.
2.  Search for **SSH Access**.
3.  Click **Manage SSH Keys** > **Generate a New Key**.
4.  Set a password (or leave blank for convenience, though less secure).
5.  After generating, click **Manage** on the new key and then **Authorize**.
6.  Click **View/Download** on the **Public Key** and copy it.

### Step 2: Add Deploy Key to GitHub
1.  Go to your **GitHub Repository** > **Settings** > **Deploy keys**.
2.  Click **Add deploy key**.
3.  Paste your cPanel Public Key.
4.  Give it a title (e.g., "cPanel Production") and click **Add key**.

### Step 3: Clone Repository in cPanel
1.  Go to **cPanel** > **Git™ Version Control**.
2.  Click **Create**.
3.  **Clone URL**: Use the SSH URL of your repo (e.g., `git@github.com:username/repo.git`).
4.  **Repository Path**: `portfolio-project` (this will be in your home directory).
5.  **Repository Name**: `Portfolio`.
6.  Click **Create**.

### Step 4: Automate Deployment with `.cpanel.yml`
I have already created a `.cpanel.yml` file in the root of this project. This file tells cPanel where to move your files after a pull.
-   When you click **Manage** > **Pull or Deploy** in cPanel Git tool, it will automatically:
    -   Copy `client/dist` content to `public_html`.
    -   Copy `server` build files to your backend folder.

### Step 5: Webhook (Optional - Push to Deploy)
1.  In GitHub Repo > **Settings** > **Webhooks**.
2.  **Payload URL**: Get this from cPanel Git tool (Manage > Webhook URL).
3.  **Content type**: `application/json`.
4.  Now, every `git push` will trigger a deployment!

---

## Troubleshooting
- **404 on Refresh**: Ensure `.htaccess` is in `public_html`.
- **Backend not starting**: Check the cPanel Node.js App logs. Ensure `app.js` is set as the entry point.
- **CORS Errors**: Ensure `CLIENT_URL` in `.env` matches your production domain.
- **Permission Denied (SSH)**: Ensure you "Authorized" the key in cPanel SSH Access.
