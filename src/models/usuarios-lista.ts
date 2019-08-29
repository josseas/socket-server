import { Usuario } from "./usuario";

export class UsuariosLista
{
    private lista: Array<Usuario>;

    public constructor()
    {
        this.lista = new Array<Usuario>();
    }

    public AddUsuario(usuario: Usuario) : void
    {
        this.lista.push(usuario);
    }

    public ActualizarNombre(id: string, nombre: string) : void
    {
        this.lista.forEach
        (
            usuario =>
            {
                if (usuario.id === id)
                    usuario.nombre = nombre;
            }
        );
    }

    public GetLista() : Array<Usuario>
    {
        return this.lista.filter(usuario => usuario.nombre !== '<sin-nombre>');
    }

    public GetUsuario(id: string) : Usuario | undefined
    {
        return this.lista.find(usuario => usuario.id === id);
    }

    public GetUsuariosEnSala(sala: string) : Array<Usuario>
    {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    public BorrarUsuario(id: string)
    {
        const usuario = this.GetUsuario(id);

        this.lista = this.lista.filter(usuario => usuario.id !== id);

        return usuario;
    }
}