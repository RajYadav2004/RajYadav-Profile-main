import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    red: "\x1b[31m",
};

async function setupCPanel() {
    console.log(`${colors.bright}${colors.cyan}--- cPanel Auto Configuration Started ---${colors.reset}\n`);

    try {
        // 1. Build Client
        console.log(`${colors.yellow}[1/4] Building Client...${colors.reset}`);
        execSync('npm run build', { cwd: path.join(rootDir, 'client'), stdio: 'inherit' });
        console.log(`${colors.green}✔ Client built successfully.${colors.reset}\n`);

        // 2. Configure .htaccess for Client
        console.log(`${colors.yellow}[2/4] Configuring .htaccess...${colors.reset}`);
        const htaccessTemplate = fs.readFileSync(path.join(rootDir, 'cpanel', '.htaccess.template'), 'utf8');
        fs.writeFileSync(path.join(rootDir, 'client', 'dist', '.htaccess'), htaccessTemplate);
        console.log(`${colors.green}✔ .htaccess added to client/dist.${colors.reset}\n`);

        // 3. Build Server
        console.log(`${colors.yellow}[3/4] Building Server...${colors.reset}`);
        execSync('npm run build', { cwd: path.join(rootDir, 'server'), stdio: 'inherit' });

        // Create a root-level app.js in server directory for cPanel compatibility
        const serverEntryPoint = `// cPanel Entry Point\nrequire('./dist/server.js');`;
        fs.writeFileSync(path.join(rootDir, 'server', 'app.js'), serverEntryPoint);
        console.log(`${colors.green}✔ Server built and app.js entry point created.${colors.reset}\n`);

        // 4. Instructions
        console.log(`${colors.bright}${colors.cyan}--- Configuration Complete! ---${colors.reset}`);
        console.log(`\n${colors.bright}Next Steps for Deployment:${colors.reset}`);
        console.log(`\n${colors.blue}1. Frontend (React):${colors.reset}`);
        console.log(`   - Zip the contents of 'client/dist' folder.`);
        console.log(`   - Upload the zip to 'public_html' via cPanel File Manager and extract it.`);

        console.log(`\n${colors.blue}2. Backend (Node.js):${colors.reset}`);
        console.log(`   - Go to cPanel > 'Setup Node.js App'.`);
        console.log(`   - Create a new Application.`);
        console.log(`   - Node.js version: 18.x or 20.x recommended.`);
        console.log(`   - Application mode: production.`);
        console.log(`   - Application root: 'portfolio-backend' (or the folder where you upload the server files).`);
        console.log(`   - Application startup file: 'app.js'.`);
        console.log(`   - Zip 'server' folder (exclude node_modules) and upload to your application root.`);
        console.log(`   - Click 'Run JS Install' in the Node.js App interface.`);

        console.log(`\n${colors.blue}3. Database:${colors.reset}`);
        console.log(`   - Ensure your .env variables in the Node.js app match your cPanel MySQL/MongoDB setup.`);

        console.log(`\n${colors.green}${colors.bright}Happy Deploying! 🚀${colors.reset}\n`);

    } catch (error) {
        console.error(`${colors.red}❌ Error during configuration: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}

setupCPanel();
