import { createServer } from 'http';

const PORT = process.env.PORT || 3000;

// Function to generate greeting
function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return 'Good morning! ☀️';
    if (hours < 18) return 'Good afternoon! 🌤️';
    return 'Good evening! 🌙';
}

// Function to log request info
function logRequest(req) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
}

// Function to get a random quote
function getRandomQuote() {
    const quotes = [
        "Keep calm and code on! 💻",
        "Stay positive, test negative! 🧪",
        "Debugging is like being a detective 🕵️‍♂️",
        "Code, coffee, repeat ☕",
        "Keep pushing to GitHub! 🚀"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

let requestCount = 0;

const server = createServer((req, res) => {
    logRequest(req);
    requestCount++;
    const currentTime = new Date().toLocaleString();
    const quote = getRandomQuote();

    if (req.url === '/stats') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Stats endpoint active',
            totalRequests: requestCount,
            serverTime: currentTime
        }, null, 2));
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from Node.js app!\n${getGreeting()}\nCurrent time: ${currentTime}\nQuote: ${quote}\nTotal requests: ${requestCount}\n`);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`🧪 Jenkins pipeline test: This should fail during test stage`);
});
