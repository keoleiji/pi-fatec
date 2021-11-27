import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { Atividade } from 'src/app/utils/atividade';
import { Usuario } from 'src/app/utils/usuario';
import { UsuarioSessionService } from 'src/app/session/usuario-session.service';
import { AtividadeService } from 'src/app/services/atividade.service';
declare var $: any;

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private usuarioSession: UsuarioSessionService, private atividadeService: AtividadeService) { }

  @Input() atividade: Atividade;
  @Output() resposta = new EventEmitter();

  public usuario: Usuario;

  ngOnInit(): void {
    this.usuario = this.usuarioSession.getUsuario();
  }

  verificaProcesso(atividade) {
    if (atividade.id_atividade)
      this.atualizarAtividade(atividade);
    else this.criarAtividade(atividade);
  }

  atualizarAtividade(atividade) {
    Swal.fire({
      title: 'Confirma alteração?',
      text: "Essa atividade terá seus dados alterados para visualização!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--cor-primaria)',
      cancelButtonColor: 'var(--cor-secundaria)',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        AppComponent.abreLoading();
        let data = {
          id_aula: this.atividade.id_aula["id_aula"],
          id_atividade: atividade.id_atividade,
          matricula_usuario: this.usuario.matricula_usuario,
          data_cadastro: new Date(86400000 + +new Date()).toISOString().split("T")[0],
          data_final: new Date(86400000 + +new Date(atividade.data_final)).toISOString().split("T")[0],
          titulo_atividade: atividade.titulo_atividade,
          descricao_atividade: atividade.descricao_atividade,
          fontes_atividade: atividade.fontes_atividade
        }
        this.atividadeService.updateAtividade(data).subscribe(res => {
          AppComponent.fechaLoading();
          if (res["httpStatus"] == "OK")
            Swal.fire("Sucesso!", res["mensagem"], "success")
          else Swal.fire("Erro!", res["mensagem"], "error");
          atividade.isEditar = false;
          $(".edit").html("edit");
          this.atualizarAtividades();
        })
      }
    })
  }

  criarAtividade(atividade) {
    Swal.fire({
      title: 'Confirma criação?',
      text: "Essa atividade será adicionada à lista superior.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: 'var(--cor-primaria)',
      cancelButtonColor: 'var(--cor-secundaria)',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        AppComponent.abreLoading();
        let data = {
          id_aula: this.atividade.id_aula,
          matricula_usuario: this.usuario.matricula_usuario,
          data_cadastro: new Date(86400000 + +new Date()).toISOString().split("T")[0],
          data_final: new Date(86400000 + +new Date(atividade.data_final)).toISOString().split("T")[0],
          titulo_atividade: atividade.titulo_atividade,
          descricao_atividade: atividade.descricao_atividade,
          fontes_atividade: atividade.fontes_atividade
        }
        this.atividadeService.createAtividade(data).subscribe(res => {
          AppComponent.fechaLoading();
          if (res["httpStatus"] == "OK")
            Swal.fire("Sucesso!", res["mensagem"], "success")
          else Swal.fire("Erro!", res["mensagem"], "error");
          atividade.isEditar = false;
          $(".edit").html("edit");
          this.atualizarAtividades();
        })
      }
    })
  }

  atualizarAtividades() {
    this.resposta.emit(null);
  }

}
