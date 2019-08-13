import bodyParser from 'body-parser';
import cors from 'cors';

import { Server } from './src/server';
import { router } from './src/routes/router';

import { SERVER_PORT } from './src/global/environment';

const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({ origin: true, credentials: true }));

// Rutas API
server.app.use('/api', router);

server.Start
(
    () => console.log(`Server run in port: ${SERVER_PORT}`)
);