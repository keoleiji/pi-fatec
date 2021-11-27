export class Usuario {

    public matricula_usuario: number;
    public nome_usuario: string;
    public senha_usuario: string;
    public email_usuario: string;
    public id_curso: {id_curso: number, nome_curso: string };
    public matricula_responsavel: Usuario;

}