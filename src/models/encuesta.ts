export enum TipoPregunta
{
    a1 = "Alternativa. 1",
    a2 = "Alternativa. 2",
    a3 = "Alternativa. 3",
    a4 = "Alternativa. 4"
};

export enum Sexo
{
    F = "Femenino",
    M = "Masculino"
};

export class Encuesta
{
    private alternativas: Array<string> = [TipoPregunta.a1, TipoPregunta.a2, TipoPregunta.a3, TipoPregunta.a4];
    private valMasculino: Array<number> = [0, 0, 0, 0];
    private valFemenino: Array<number> = [0, 0, 0, 0];

    public constructor()
    {

    }

    public GetData()
    {
        return [
            { data: this.valFemenino, label: Sexo.F },
            { data: this.valMasculino, label: Sexo.M }
        ];
    }

    public ResponderEncuesta(alternativa: number, sexo: string)
    {
        switch(sexo)
        {
            case 'F':
                this.valFemenino[alternativa]++;
                break;
            case 'M':
                this.valMasculino[alternativa]++;
                break;
        }
    }
}