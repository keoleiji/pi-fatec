import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/utils/usuario';
declare var $: any;

@Component({
  selector: 'app-cadastro-responsavel',
  templateUrl: './cadastro-responsavel.component.html',
  styleUrls: ['./cadastro-responsavel.component.css']
})
export class CadastroResponsavelComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  @Input() usuario: Usuario;

  @Output() resposta = new EventEmitter();

  public matriculaResponsavel: number;

  public isPesquisa: boolean = true;

  public usuarioResponsavel;

  ngOnInit(): void {
    this.zerarAluno();
  }

  alteraBotao(): void {
    if (!this.isPesquisa)
      this.isPesquisa = true;
  }

  pesquisarAluno(): void {
    if (this.matriculaResponsavel) {
      AppComponent.abreLoading();
      this.usuarioService.getUsuarioPorMatricula(this.matriculaResponsavel).subscribe(res => {
        this.usuarioResponsavel = res;
        AppComponent.fechaLoading();
        this.isPesquisa = false;
        this.matriculaResponsavel = null;
      })
    }
    else Swal.fire("Atenção!", "Digite a matrícula de algum usuário!", "warning");
  }

  promoverAluno(): void {
    Swal.fire({
      title: 'Promover aluno?',
      text: "Este aluno poderá cadastrar novas tarefas bem como promover outros alunos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--cor-primaria)',
      cancelButtonColor: 'var(--cor-secundaria)',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        let data = {
          matricula_responsavel: this.usuario.matricula_usuario,
          matricula_usuario: this.usuarioResponsavel.matricula_usuario
        }
        AppComponent.abreLoading();
        this.usuarioService.vincularUsuario(data).subscribe(res => {
          AppComponent.fechaLoading();
          if (res["httpStatus"] == "OK")
            Swal.fire("Sucesso!", res["mensagem"], "success");
          else Swal.fire("Erro!", res["mensagem"], "error");
          this.zerarAluno();
          this.atualizarResponsaveis();
        })
      }
    })
  }

  zerarAluno(): void {
    this.isPesquisa = true;
    this.usuarioResponsavel = {
      nome_usuario: "Aluno",
      matricula_usuario: "??",
      id_curso: { id_curso: 0, nome_curso: "??" },
      email_usuario: "??"
    }
  }

  atualizarResponsaveis() {
    this.resposta.emit(null);
  }

}
