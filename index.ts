import bodyParser from 'body-parser';
import cors from 'cors';

import { Server } from './src/server';
import { router } from './src/routes/router';

import { SERVER_PORT } from './src/global/environment';

const server = new Server();

// BodyParser
server.application.use(bodyParser.urlencoded({ extended: true }));
server.application.use(bodyParser.json());

// Cors
server.application.use(cors({ origin: true, credentials: true }));

// Rutas API
server.application.use('/api', router);

// Levantar Servidor
server.Start
(
    () => console.log(`Server run in port: ${SERVER_PORT}`)
);