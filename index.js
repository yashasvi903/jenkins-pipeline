import { createServer } from 'http';
import os from 'os'; // ✅ 1. New import: to show system info

const PORT = process.env.PORT || 3000;

// ✅ 2. Enhanced greeting with username (if available)
function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    const username = os.userInfo().username || 'Developer';

    if (hours < 12) return `Good morning, ${username}!`;
    if (hours < 18) return `Good afternoon, ${username}!`;
    return `Good evening, ${username}!`;
}

// Log each request
function logRequest(req) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
}

// Get random motivational quote
function getRandomQuote() {
    const quotes = [
        "Keep calm and code on.",
        "Stay positive, test negative.",
        "Debugging is like being a detective.",
        "Code, coffee, repeat.",
        "Keep pushing to GitHub.",
        "Success is built on consistent effort."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// ✅ 3. Added function to show system statistics
function getSystemInfo() {
    return {
        platform: os.platform(),
        cpuCount: os.cpus().length,
        freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
        totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
        uptimeMinutes: Math.round(os.uptime() / 60)
    };
}

// Track uptime and requests
const serverStartTime = Date.now();
let requestCount = 0;

// ✅ 4. Added health check endpoint
function handleHealthCheck(req, res) {
    const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'OK',
        uptime: `${uptimeSeconds} seconds`,
        requests: requestCount,
        timestamp: new Date().toISOString()
    }, null, 2));
}

const server = createServer((req, res) => {
    logRequest(req);
    requestCount++;

    // ✅ 5. Added multiple endpoints
    if (req.url === '/stats') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Server Statistics',
            totalRequests: requestCount,
            system: getSystemInfo(),
            currentTime: new Date().toLocaleString()
        }, null, 2));
        return;
    }

    if (req.url === '/health') {
        handleHealthCheck(req, res);
        return;
    }

    // Default route
    const message = `
        Hello from Node.js App
        ${getGreeting()}
        Time: ${new Date().toLocaleString()}
        Quote: ${getRandomQuote()}
        Requests: ${requestCount}
    `;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(message);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Jenkins automation test: Added health, system info, and personalized greeting`);
});
