import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/utils/usuario';
import { AppComponent } from 'src/app/app.component';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var $: any;

@Component({
  selector: 'app-remocao-responsavel',
  templateUrl: './remocao-responsavel.component.html',
  styleUrls: ['./remocao-responsavel.component.css']
})
export class RemocaoResponsavelComponent {

  constructor(private usuarioService: UsuarioService) { }

  @Input() responsaveis: Array<Usuario>;
  @Input() usuario: Usuario;

  @Output() resposta = new EventEmitter();

  removerResponsavel(responsavel) {
    Swal.fire({
      title: 'Remover responsável?',
      text: `${responsavel.nome_usuario} perderá acesso ao cadastro de tarefas, juntamente com todos os alunos que ele promoveu!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--cor-primaria)',
      cancelButtonColor: 'var(--cor-secundaria)',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        AppComponent.abreLoading();
        let data = {
          matricula_responsavel: null,
          matricula_usuario: responsavel.matricula_usuario
        }
        this.usuarioService.vincularUsuario(data).subscribe(res => {
          AppComponent.fechaLoading();
          if (res["httpStatus"] == "OK"){
            Swal.fire("Sucesso!", res["mensagem"], "success");
            this.atualizarResponsaveis();
          }
          else Swal.fire("Erro!", res["mensagem"], "error");
        })
      }
    })
  }

  atualizarResponsaveis(){
    this.resposta.emit(null);
  }

}
