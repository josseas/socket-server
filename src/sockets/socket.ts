import { Socket, Server } from "socket.io";
import { UsuariosLista } from "../models/usuarios-lista";
import { Usuario } from "../models/usuario";
import { Mapa } from "../models/mapa";
import { mapa } from "../routes/router";

export const usuariosConectados = new UsuariosLista();

export abstract class SocketManager
{
    public static Conectar(client: Socket, server: Server) : void
    {
        const usuario = new Usuario(client.id);
        usuariosConectados.AddUsuario(usuario);

        // server.emit('USUARIOS_ACTIVOS', { usuarios: usuariosConectados.GetLista() });
    }

    public static Desconectar(client: Socket, server: Server) : void
    {
        client.on
        (
            'disconnect', () => 
            {
                usuariosConectados.BorrarUsuario(client.id);
                console.log('Cliente desconectado...');

                server.emit('USUARIOS_ACTIVOS', { usuarios: usuariosConectados.GetLista() });
            }
        );
    }

    public static Mensaje(client: Socket, server: Server) : void
    {
        client.on
        (
            'NEW_MESSAGE', (payload: any) => 
            {
                // console.log('[payload] Message', payload);
                server.emit('MESSAGE_FOR_ALL', payload);
            }
        );
    }

    public static ConfigurarUsuario(client: Socket, server: Server) : void
    {
        client.on
        (
            'CONFIGURAR-USUARIO', (payload: any, callback: Function) => 
            {
                // console.log('[payload] USUARIO ->', payload);
                usuariosConectados.ActualizarNombre(client.id, payload.nombre);
                
                server.emit('USUARIOS_ACTIVOS', { usuarios: usuariosConectados.GetLista() });

                callback({ status: true, message: `Usuario ${payload.nombre}, configurado...`});
            }
        );
    }

    public static GetActiveUsers(client: Socket, server: Server) : void
    {
        client.on
        (
            'GET_ACTIVE_USERS', (payload: any, callback: Function) => 
            {
                server.emit('USUARIOS_ACTIVOS', { usuarios: usuariosConectados.GetLista() });
            }
        );
    }

    public static NuevoMarcador(client: Socket, server: Server) : void
    {
        client.on
        (
            'ADD_MARKER', (payload: any, callback: Function) => 
            {
                mapa.AddMarcador(payload);
                server.emit('SEND_ADD_MARKER', payload);
            }
        );
    }

    public static RemoverMarcador(client: Socket, server: Server) : void
    {
        client.on
        (
            'REMOVE_MARKER', (payload: any, callback: Function) => 
            {
                mapa.RemoveMarcador(payload);
                server.emit('SEND_REMOVE_MARKER', payload);
            }
        );
    }

    public static MoverMarcador(client: Socket, server: Server) : void
    {
        client.on
        (
            'MOVE_MARKER', (payload: any, callback: Function) => 
            {
                mapa.MoveMarcador(payload);
                server.emit('SEND_MOVE_MARKER', payload);
            }
        );
    }
}