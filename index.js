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

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from Node.js app!\n${getGreeting()}\n`);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Jenkins automation test: Greeting function added`);
});
