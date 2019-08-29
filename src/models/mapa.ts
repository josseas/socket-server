import { Marcador } from "./marcador";

export class Mapa
{
    private marcadores: Array<Marcador>;
    public urlSvg1: string = './assets/1.svg';
    public urlSvg2: string = './assets/2.svg';

    public constructor()
    {
        this.marcadores = new Array<Marcador>();        
        this.marcadores.push({ id: this.GenerateID(), name: 'Casa 1', lat: -12.0291328, lng: -77.0211839, alpha: 1, url: this.urlSvg2, visible: false });
        this.marcadores.push({ id: this.GenerateID(), name: 'Casa 2', lat: 7.92658, lng: -12.05228, alpha: 1, url: this.urlSvg1, visible: false });
        this.marcadores.push({ id: this.GenerateID(), name: 'Casa 3', lat: 48.75606, lng: -118.859, alpha: 1, url: this.urlSvg1, visible: false });
        this.marcadores.push({ id: this.GenerateID(), name: 'Casa 4', lat: 5.19334, lng: -67.03352, alpha: 1, url: this.urlSvg1, visible: false });
        this.marcadores.push({ id: this.GenerateID(), name: 'Casa 5', lat: 12.09407, lng: 26.31618, alpha: 1, url: this.urlSvg1, visible: false });
        this.marcadores.push({ id: this.GenerateID(), name: 'Casa 6', lat: 47.92393, lng: 78.58339, alpha: 1, url: this.urlSvg1, visible: false });
    }

    public GenerateID() : string
    {
        let dt: number = new Date().getTime();
        let uuid : string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace
        (
            /[xy]/g, c =>
            {
                let r: number = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
            }
        );

        return uuid;
    }

    public GetMarcadores() : Array<Marcador>
    {
        return this.marcadores;
    }

    public AddMarcador(marcador: Marcador)
    {
        this.marcadores.push(marcador);
    }

    public RemoveMarcador(id: string)
    {
        this.marcadores = this.marcadores.filter(marcador => marcador.id !== id);
    }

    public MoveMarcador(marcador: Marcador)
    {
        this.marcadores.forEach
        (
            m =>
            {
                if (m.id === marcador.id)
                {
                    m.lat = marcador.lat;
                    m.lng = marcador.lng;
                }
            }
        );
    }
}