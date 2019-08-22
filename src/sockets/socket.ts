import { Socket, Server } from "socket.io";
import { UsuariosLista } from "../models/usuarios-lista";
import { Usuario } from "../models/usuario";

export const usuariosConectados = new UsuariosLista();

export abstract class SocketManager
{
    public static Conectar(client: Socket) : void
    {
        const usuario = new Usuario(client.id);
        usuariosConectados.AddUsuario(usuario);
    }

    public static Desconectar(client: Socket) : void
    {
        client.on
        (
            'disconnect', () => 
            {
                usuariosConectados.BorrarUsuario(client.id);
                console.log('Cliente desconectado...');
            }
        );
    }

    public static Mensaje(client: Socket, server: Server) : void
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

    public static ConfigurarUsuario(client: Socket, server: Server) : void
    {
        client.on
        (
            'CONFIGURAR-USUARIO', (payload: any, callback: Function) => 
            {
                console.log('[payload] USUARIO ->', payload);
                usuariosConectados.ActualizarNombre(client.id, payload.nombre);

                callback({ status: true, message: `Usuario ${payload.nombre}, configurado...`});
            }
        );
    }
}