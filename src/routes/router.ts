import { Router, Request, Response } from 'express';
import { Socket } from 'socket.io';
import { Server } from '../server';
import { usuariosConectados } from '../sockets/socket';

export const router: Router = Router();

router.get
(
    '/mensajes', (req: Request, res: Response) =>
    {
        res.json
        ({
            state: true, message: 'Todo es bien'
        });
    }
);

router.post
(
    '/mensajes', (req: Request, res: Response) =>
    {
        const cuerpo = req.body.cuerpo;
        const de = req.body.de;

        const server = Server.instance;
        server.socketServer
            .emit('MESSAGE_FOR_ALL', { de, cuerpo });

        res.json
        ({
            state: true, message: `cuerpo: ${cuerpo}, de: ${de}`
        });
    }
);

router.post
(
    '/mensajes/:id', (req: Request, res: Response) =>
    {
        const id = req.params.id;
        const cuerpo = req.body.cuerpo;
        const de = req.body.de;
        
        const server = Server.instance;
        server.socketServer
            .in(id)
            .emit('MESSAGE_PRIVATE', { de, cuerpo });

        res.json({ state: true, message: `para: ${id}, cuerpo: ${cuerpo}, de: ${de}` });
    }
);

router.get
(
    '/usuarios', (req: Request, res: Response) =>
    {
        const server = Server.instance;
        server.socketServer
            .clients
            (
                (err: any, clients: Array<string>) =>
                {
                    if (err)
                        return res.json({ status: false, err });                    

                    res.json({ state: true, clients });
                }
            );
    }
);

router.get
(
    '/usuarios/detalle', (req: Request, res: Response) =>
    {
        res.json({ state: true, clients: usuariosConectados.GetLista() });
    }
);
