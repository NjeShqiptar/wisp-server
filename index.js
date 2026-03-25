import express from 'express';
import { createServer } from 'node:http';
import { wisp } from '@mercuryworkshop/wisp-js/server';

const app = express();
const server = createServer(app);

// Basic Landing Page for Render
app.get('/', (req, res) => {
    res.send('Wisp Server is Online');
});

const PORT = process.env.PORT || 3000;

// This is the critical part for Wisp/WebSockets
server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/wisp/')) {
        wisp(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(PORT, () => {
    console.log(`Wisp Server live on port ${PORT}`);
});
