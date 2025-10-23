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

// New function to get a random fun quote
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

const server = createServer((req, res) => {
    logRequest(req); // log each request
    const currentTime = new Date().toLocaleString();
    const quote = getRandomQuote(); // get a fun quote
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from Node.js app!\n${getGreeting()}\nCurrent time: ${currentTime}\nQuote: ${quote}\n`);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Jenkins automation test: Greeting, logging, and fun quote added`);
});
