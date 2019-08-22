import { Express, Router, Request, Response } from 'express';
import { Server } from '../server';

export class MensajesRouting
{
    public constructor()
    {

    }

    public Routes(router: Router, server: Server) : void
    {
        console.log('[routes] Exec');
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

                server.socketServer
                    // .in(id)
                    .emit('PRIVATE_MESSAGE', { de, cuerpo });
                // server.socketServer.in(id).emit('PRIVATE_MESSAGE', { de, cuerpo });

                res.json({ state: true, message: `para: ${id}, cuerpo: ${cuerpo}, de: ${de}` });
            }
        );
    }
}