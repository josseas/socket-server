export class Marcador
{
    public constructor
    (
        public id: string,
        public name: string,
        public lat: number,
        public lng: number,
        public alpha: number,
        public url: string,
        public visible: boolean
    )
    {

    }
}