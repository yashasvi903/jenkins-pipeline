import { createServer } from 'http';

const PORT = process.env.PORT || 3000;

// Simple function to generate a greeting message
function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return 'Good morning! ☀️';
    if (hours < 18) return 'Good afternoon! 🌤️';
    return 'Good evening! 🌙';
}

// New function to log request info
function logRequest(req) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
}

const server = createServer((req, res) => {
    logRequest(req); // log each request
    const currentTime = new Date().toLocaleString();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from Node.js app!\n${getGreeting()}\nCurrent time: ${currentTime}\n`);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Jenkins automation test: Greeting and logging function added`);
});
