import { Router, Request, Response } from 'express';
import { Server } from '../server';
import { usuariosConectados } from '../sockets/socket';
import { Grafica } from '../models/grafica';
import { Encuesta } from '../models/encuesta';
import { Mapa } from '../models/mapa';

export const router: Router = Router();
export const grafica: Grafica = new Grafica();
export const encuesta: Encuesta = new Encuesta();
export const mapa: Mapa = new Mapa();

router.get
(
    '/mapa', (req: Request, res: Response) =>
    {
        res.json(mapa.GetMarcadores());
    }
);

router.post
(
    '/mapa', (req: Request, res: Response) =>
    {
        const alternativa = Number(req.body.alternativa);
        const sexo = req.body.sexo;

        encuesta.ResponderEncuesta(alternativa, sexo);

        const server = Server.instance;
        server.socketServer
            .emit('UPDATE_SURVEY', encuesta.GetData());

        res.json(encuesta.GetData());
    }
);

router.get
(
    '/encuesta', (req: Request, res: Response) =>
    {
        res.json(encuesta.GetData());
    }
);

router.post
(
    '/encuesta', (req: Request, res: Response) =>
    {
        const alternativa = Number(req.body.alternativa);
        const sexo = req.body.sexo;

        encuesta.ResponderEncuesta(alternativa, sexo);

        const server = Server.instance;
        server.socketServer
            .emit('UPDATE_SURVEY', encuesta.GetData());

        res.json(encuesta.GetData());
    }
);

router.get
(
    '/grafica', (req: Request, res: Response) =>
    {
        res.json(grafica.GetData());
    }
);

router.post
(
    '/grafica', (req: Request, res: Response) =>
    {
        console.log('_____grafica', req.body);
        const mes = req.body.mes;
        const monto = Number(req.body.monto);

        grafica.IncrementarValor(mes, monto);

        const server = Server.instance;
        server.socketServer
            .emit('UPDATE_CHART', grafica.GetData());

        res.json(grafica.GetData());
    }
);

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
