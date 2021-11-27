export class Atividade {

    public id_atividade: number;
    public id_aula: number;
    public matricula_usuario: number;
    public data_cadastro: Date;
    public data_cadastro_formatada: any;
    public data_final: Date;
    public data_final_formatada: any;
    public titulo_atividade: string;
    public descricao_atividade: string;
    public fontes_atividade: Array<string>;
    public isEditar: boolean;

}