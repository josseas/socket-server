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
    
    private static _instance: Server;

    public constructor()
    {
        this.application = Express();
        this.httpServer = new Http.Server(this.application);
        this.socketServer = SocketIO(this.httpServer);
        
        this.port = SERVER_PORT;

        this.ListeningSockets();
    }

    public static get instance() : Server
    {
        return this._instance || (this._instance = new this());
    }

    private ListeningSockets()
    {
        console.log('[Listening] SOCKETS');

        this.socketServer.on
        (
            'connection', client =>
            {
                SocketManager.Conectar(client, this.socketServer);
                SocketManager.ConfigurarUsuario(client, this.socketServer);
                SocketManager.GetActiveUsers(client, this.socketServer);
                SocketManager.Mensaje(client, this.socketServer);
                SocketManager.NuevoMarcador(client, this.socketServer);
                SocketManager.RemoverMarcador(client, this.socketServer);
                SocketManager.MoverMarcador(client, this.socketServer);
                SocketManager.Desconectar(client, this.socketServer);
            }
        );
    }

    public Start(callback: Function)
    {
        this.httpServer.listen(this.port, callback());
    }
}