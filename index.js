import express from 'express';
import { createServer } from 'node:http';
import { wisp } from '@mercuryworkshop/wisp-js/server';

const app = express();
const server = createServer(app);

// This creates the Wisp endpoint
app.use('/wisp/', wisp());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Wisp Server is live on port ${PORT}`);
});
