import express from 'express';
import { createServer } from 'node:http';
import wisp from '@mercuryworkshop/wisp-js/server'; // Removed the {} brackets

const app = express();
const server = createServer(app);

// This ensures the wisp server is attached correctly
app.use('/wisp/', (req, res) => {
    wisp(req, res);
});

// Basic health check for your Render dashboard
app.get('/', (req, res) => {
    res.send('Wisp Server is Active');
});

const PORT = process.env.PORT || 3000;

// Important: Listen on the server object, not the app object
server.listen(PORT, () => {
    console.log(`Wisp Server is live on port ${PORT}`);
});

// Handle WebSocket upgrades (required for Wisp)
server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/wisp/')) {
        wisp(req, socket, head);
    } else {
        socket.end();
    }
});
