import { Socket, Server } from "socket.io";

export abstract class SocketManager
{
    public static Desconectar(client: Socket)
    {
        client.on
        (
            'disconnect', () => 
            {
                console.log('Cliente desconectado...');
            }
        );
    }

    public static Mensaje(client: Socket, server: Server)
    {
        client.on
        (
            'MESSAGE', (payload: any) => 
            {
                console.log('[payload] Message', payload);
                server.emit('NEW_MESSAGE', payload);
            }
        );
    }
}