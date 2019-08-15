import Express from 'express';
import SocketIO from 'socket.io'; 
import Http from 'http';

import { SERVER_PORT } from './global/environment';
import { SocketManager } from './sockets/socket';

export class Server
{
    public application: Express.Application;
    public httpServer: Http.Server;
    public socketServer: SocketIO.Server;
    
    public port: number;

    public constructor()
    {
        this.application = Express();
        this.httpServer = new Http.Server(this.application);
        this.socketServer = SocketIO(this.httpServer);
        
        this.port = SERVER_PORT;

        this.ListeningSockets();
    }

    private ListeningSockets()
    {
        console.log('Sockets escuchando...');

        this.socketServer.on
        (
            'connection', client =>
            {
                console.log('Nuevo cliente conectado...');

                SocketManager.Mensaje(client, this.socketServer);
                SocketManager.Desconectar(client);
            }
        );
    }

    public Start(callback: Function)
    {
        this.httpServer.listen(this.port, callback());
    }
}