const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;

// Function to generate a greeting message
function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    const username = os.userInfo().username || 'Developer';

    if (hours < 12) return `Good morning, ${username}!`;
    if (hours < 18) return `Good afternoon, ${username}!`;
    return `Good evening, ${username}!`;
}

// Log request info
function logRequest(req) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
}

// Generate a random quote
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

// Get system stats
function getSystemInfo() {
    return {
        platform: os.platform(),
        cpuCount: os.cpus().length,
        freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
        totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
        uptimeMinutes: Math.round(os.uptime() / 60)
    };
}

// Track server uptime and request count
const serverStartTime = Date.now();
let requestCount = 0;

// Health check endpoint
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

// Create HTTP server
const server = http.createServer((req, res) => {
    logRequest(req);
    requestCount++;

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

// Start the server
server.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
    console.log(`Jenkins build ready: app deployed with health and stats endpoints`);
});
