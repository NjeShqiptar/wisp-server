import express from 'express';
import { createServer } from 'node:http';
import { server as wisp } from '@mercuryworkshop/wisp-js/server';

const app = express();
const httpServer = createServer(app);

// Simple landing page so Render knows it's alive
app.get('/', (req, res) => {
    res.send('Wisp Server: Online and Operational');
});

const PORT = process.env.PORT || 3000;

// This is the bridge that makes the proxy work
httpServer.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/wisp/')) {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.end();
    }
});

httpServer.listen(PORT, () => {
    console.log(`Wisp Server live on port ${PORT}`);
});
