import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioSessionService } from 'src/app/session/usuario-session.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  languageList = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Portuguese' }];

  constructor(private router: Router, private usuarioService: UsuarioService,
    private cursoService: CursoService, private usuarioSession: UsuarioSessionService,
    @Inject(LOCALE_ID) protected localeId: string) { }

  @ViewChild('modalLoading') modalLoading;

  public usuario: number;
  public senha: string;

  public curso: number = 0;
  public matricula: number;
  public nome: string;
  public email: string;

  public cursos: Array<any> = [];

  ngOnInit(): void {
    let session = localStorage.getItem("session");
    if (session != null)
      this.router.navigate(["main"]);
    this.cursoService.getCursos().subscribe(res => {
      Object.values(res).forEach(curso => {
        this.cursos.push(curso)
      })
    })
  }

  login(): void {
    AppComponent.abreLoading();
    let data = {
      matricula_usuario: this.usuario,
      senha_usuario: this.senha
    };
    this.usuarioService.login(data).subscribe(res => {
      AppComponent.fechaLoading();
      if (res[0]) {
        this.usuarioSession.setUsuario(res[0]);
        localStorage.setItem("session", res[0]["matricula_usuario"]);
        this.router.navigate(["main"]);
      }
      else this.abreModal("Credenciais incorretas!", "Usuário e/ou senha incorretos", "error");
    }, err => {
      AppComponent.fechaLoading();
      this.abreModal("Erro!", "Não foi possível concluir a ação, tente novamente mais tarde!", "error");
    })
  }

  enviarSenhaProvisoria(): void {
    if (!this.usuario) {
      this.abreModal("Preencha a matrícula!", "Primeiro preencha a matrícula, depois aperte Esqueci a Senha!", "warning");
    }
    else {
      let email;
      AppComponent.abreLoading();
      this.usuarioService.getUsuarioPorMatricula(this.usuario).subscribe(res => {
        email = res["email_usuario"];
        AppComponent.fechaLoading();
        Swal.fire({
          title: 'Digite o e-mail vinculado a sua matrícula',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'OK',
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            if (login == email) {
              AppComponent.abreLoading();
              this.usuarioService.novaSenha(this.usuario).subscribe(res => {
                AppComponent.fechaLoading();
                if (res["httpStatus"] == "OK")
                  this.abreModal("Cheque seu e-mail!", res["mensagem"], "success");
                else this.abreModal("Erro!", res["Mensagem"], "error");
              }, err => {
                AppComponent.fechaLoading();
                this.abreModal("Erro!", "Não foi possível concluir a ação, tente novamente mais tarde!", "error");
              })
            } else {
              AppComponent.fechaLoading();
              this.abreModal("Erro!", "A matrícula e o email inserido não batem!", "error");
            }
          }
        });
      }, err => {
        Swal.fire("Erro!", "Não foi possível localizar esse usuário no momento!", "error");
        AppComponent.fechaLoading();
      })
    }
  }

  abrirCadastro(): void {
    AppComponent.fade("out", 400, ".div-login");
    AppComponent.fade("in", 400, ".div-cadastro");
  }

  finalizarCadastro(): void {
    let data = {
      matricula_usuario: this.matricula,
      id_curso: this.curso,
      nome_usuario: this.nome,
      email_usuario: this.email
    }
    if (this.curso && this.matricula && this.nome && this.email) {
      if (this.email.split("@")[1] == "fatec.sp.gov.br") {
        AppComponent.abreLoading();
        this.usuarioService.getUsuarioPorMatricula(data.matricula_usuario).subscribe(res => {
          if (res["matricula_usuario"] == 0) {
            this.usuarioService.createUsuario(data).subscribe(res => {
              if (res["httpStatus"] == "OK")
                this.abreModal("Cadastro concluído!", res["mensagem"], "success")
              else this.abreModal("Erro!", res["mensagem"], "error");
              this.fecharCadastro();
            }, err => {
              this.abreModal("Erro!", "Não foi possível concluir o cadastro, tente novamente mais tarde!", "error");
              this.fecharCadastro();
            })

          }
          else
            this.abreModal("Erro!", "Essa matrícula já está sendo utilizada!", "error");
        })
      }
      else this.abreModal("Atenção!", "O e-mail deve pertencer ao domínio da Fatec! (@fatec.sp.gov.br)", "warning");
    }
    else
      this.abreModal("Verifique os campos!", "Todos os campos são obrigatórios!", "warning");
  }

  fecharCadastro(): void {
    this.curso = null;
    this.matricula = null;
    this.nome = null;
    this.email = null;
    AppComponent.fade("out", 400, ".div-cadastro");
    AppComponent.fade("in", 400, ".div-login");
  }

  abreModal(titulo: string, texto: string, icone: SweetAlertIcon): void {
    Swal.fire(titulo, texto, icone).then(() => {
      AppComponent.fechaLoading();
    });
  }

}