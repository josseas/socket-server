export class Grafica
{
    private meses: Array<string> = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio'];
    private valores: Array<number> = [0, 0, 0, 0, 0, 0, 0];

    public constructor()
    {

    }

    public GetData()
    {
        return [{ data: this.valores, label: 'Ventas' }];
    }

    public IncrementarValor(mes: string, valor: number)
    {
        mes = mes.toLowerCase().trim();

        for (let i in this.meses)
        {
            if (this.meses[i] === mes)
                this.valores[i] += valor;
        }

        // return this.GetData();
    }
}