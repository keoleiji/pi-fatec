import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Atividade } from 'src/app/utils/atividade';
import { AppComponent } from 'src/app/app.component';
import { UsuarioSessionService } from 'src/app/session/usuario-session.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Usuario } from 'src/app/utils/usuario';
declare var $: any;

@Component({
  selector: 'app-atividade',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css']
})
export class AtividadesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usuarioSession: UsuarioSessionService,
    private atividadeService: AtividadeService) { }

  public materia = { id_materia: null, nome_materia: "??", nome_curso: "??" };

  public usuario: Usuario;

  public atividades: Array<Atividade> = []

  public atividade: Atividade;
  public atividadeVazia: Atividade = {
    id_atividade: null,
    id_aula: null,
    matricula_usuario: null,
    data_cadastro: null,
    data_final: null,
    titulo_atividade: null,
    descricao_atividade: null,
    fontes_atividade: null,
    isEditar: null,
    data_cadastro_formatada: null,
    data_final_formatada: null
  };

  ngOnInit(): void {
    this.verificaMateria();
  }

  ngDoCheck(): void {
    if (this.materia["id_materia"] != this.route.snapshot.paramMap.get("id"))
      this.verificaMateria();
  }

  verificaMateria(): void {
    AppComponent.abreLoading();
    this.usuario = this.usuarioSession.getUsuario();
    this.materia["id_materia"] = this.route.snapshot.paramMap.get("id");
    this.materia["nome_materia"] = this.route.snapshot.paramMap.get("materia");
    this.materia["nome_curso"] = this.route.snapshot.paramMap.get("curso");
    this.atividade = this.atividadeVazia;
    this.buscaAtividades();
  }

  buscaAtividades() {
    this.atividade["id_aula"] = parseInt(this.materia["id_materia"]);
    this.atividades = [];
    this.atividadeService.getAtividadeByMateria(this.materia["id_materia"]).subscribe(res => {
      Object.values(res).forEach(atividade => {
        atividade["data_final_formatada"] = "";
        atividade["data_cadastro_formatada"] = "";
        this.atividades.push(atividade);
      })
      AppComponent.fechaLoading();
      this.formataData();
    })
  }

  formataData() {
    this.atividades.forEach(atividade => {
      var d1 = JSON.stringify(atividade["data_final"]).split("-")
      atividade["data_final_formatada"] = [d1[2], d1[1], d1[0]].join("/").split('"').join("");
      var d2 = JSON.stringify(atividade["data_cadastro"]).split("-")
      atividade["data_cadastro_formatada"] = [d2[2], d2[1], d2[0]].join("/").split('"').join("");
    })
    // this.encontraProximoDia(+new Date() - 86400000);
  }

  scrollTo(posicao) {
    switch (posicao) {
      case "top":
        $(".content").animate({ scrollTop: 0 }, 500);
        break;
      case "today":
        this.atividades.forEach(atividade => {
          if(new Date(atividade.data_final) > new Date()){
            this.encontraProximoDia(+new Date() - 86400000);
            return 0;
          }  
        })
        break;
      case "bottom":
        $(".content").animate({ scrollTop: $(".content")[0].scrollHeight }, 500)
        break;
    }
  }

  encontraProximoDia(proximoDia) {
    proximoDia = new Date(86400000 + +new Date(proximoDia));
    let dia;
    dia = proximoDia.toISOString().split("T")[0].split("T")[0];
    let d1 = dia.split(/\D/g)
    dia = [d1[2], d1[1], d1[0]].join("/");
    if ($(`h5:contains('${dia}')`).length > 0)
      $(".content").animate({ scrollTop: $(`h5:contains('${dia}')`).offset().top + $(".content").scrollTop() - 30 }, 500);
    else (this.encontraProximoDia(proximoDia));
  }

  deletarAtividade(atividade) {
    Swal.fire({
      title: 'Confirma remoção?',
      text: "Essa atividade será apagada e ninguém mais terá acesso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--cor-primaria)',
      cancelButtonColor: 'var(--cor-secundaria)',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        AppComponent.abreLoading();
        this.atividadeService.deleteAtividade(atividade.id_atividade).subscribe(res => {
          AppComponent.fechaLoading();
          if (res["httpStatus"] == "OK")
            Swal.fire("Sucesso!", res["mensagem"], "success");
          else Swal.fire("Erro!", res["mensagem"], "error");
          this.buscaAtividades();
        })
      }
    })
  }

  editarAtividade(atividade, event) {
    if (event.target.innerHTML == "edit")
      event.target.innerHTML = "clear";
    else event.target.innerHTML = "edit";
    atividade.isEditar = !atividade.isEditar;
  }

  zerarAtividade() {
    this.atividade["id_atividade"] = null;
    this.atividade["matricula_usuario"] = null;
    this.atividade["data_cadastro"] = null;
    this.atividade["data_final"] = null;
    this.atividade["titulo_atividade"] = null;
    this.atividade["descricao_atividade"] = null;
    this.atividade["fontes_atividade"] = null;
    this.atividade["data_cadastro_formatada"] = null;
    this.atividade["data_final_formatada"] = null;
  }

  atualizaAtividades() {
    this.zerarAtividade();
    this.buscaAtividades();
  }

}
