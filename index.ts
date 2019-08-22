import bodyParser from 'body-parser';
import cors from 'cors';

import { Server } from './src/server';
import { router } from './src/routes/router';

import { SERVER_PORT } from './src/global/environment';

const server: Server = Server.instance;

// BodyParser
server.application.use(bodyParser.urlencoded({ extended: true }));
server.application.use(bodyParser.json());

// Cors
server.application.use(cors({ origin: true, credentials: true }));

// Rutas API
server.application.use('/api', router);

// const mensajesRoutes = new MensajesRouting();
// mensajesRoutes.Routes(router, server);

// Levantar Servidor
server.Start
(
    () => console.log(`Server run in port: ${SERVER_PORT}`)
);