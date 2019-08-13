import express  from 'express';
import { SERVER_PORT } from './global/environment';

export class Server
{
    public app: express.Application;
    public port: number;

    public constructor()
    {
        this.app = express();
        this.port = SERVER_PORT;
    }

    public Start(callback: Function)
    {
        this.app.listen(this.port, callback());
    }
}