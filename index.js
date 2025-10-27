import { createServer } from 'http';

const PORT = process.env.PORT || 3000;

// Greeting message based on time
function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return 'Good morning!';
    if (hours < 18) return 'Good afternoon!';
    return 'Good evening!';
}

// Log request info
function logRequest(req) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
}

// Get a random motivational quote
function getRandomQuote() {
    const quotes = [
        "Keep calm and code on.",
        "Stay positive, test negative.",
        "Debugging is like being a detective.",
        "Code, coffee, repeat.",
        "Keep pushing to GitHub."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Simple uptime tracker
const serverStartTime = Date.now();
let requestCount = 0;

// Helper to get server stats
function getServerStats() {
    const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
    return {
        totalRequests: requestCount,
        uptime: `${uptimeSeconds} seconds`,
        serverTime: new Date().toLocaleString()
    };
}

const server = createServer((req, res) => {
    logRequest(req);
    requestCount++;

    if (req.url === '/stats') {
        const stats = getServerStats();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(stats, null, 2));
        return;
    }

    const message = `
        Hello from Node.js App
        ${getGreeting()}
        Current time: ${new Date().toLocaleString()}
        Quote: ${getRandomQuote()}
        Total requests: ${requestCount}
    `;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(message);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Jenkins automation test: updated with uptime tracker and cleaner output`);
});
