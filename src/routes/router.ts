import { Router, Request, Response } from 'express';

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

        res.json
        ({
            state: true, message: `para: ${id}, cuerpo: ${cuerpo}, de: ${de}`
        });
    }
);