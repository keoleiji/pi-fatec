import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/utils/usuario';
import { AppComponent } from 'src/app/app.component';
import { UsuarioSessionService } from 'src/app/session/usuario-session.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private usuarioSession: UsuarioSessionService, private usuarioService: UsuarioService) { }

  public matricula: number;
  public nome: string;
  public email: string;
  public curso: number;
  public senha: string;
  public confirmacaoSenha: string;

  public usuario: Usuario;

  ngOnInit(): void {
    this.usuario = this.usuarioSession.getUsuario();
    AppComponent.abreLoading();
    this.zerarInformacoes();
  }

  alterarInformacoes(): void {
    let data = {
      matricula_usuario: this.matricula,
      id_curso: this.curso ? this.curso : null,
      nome_usuario: this.nome ? this.nome : null,
      senha_usuario: this.senha ? this.senha : null,
      email_usuario: this.email ? this.email : null
    }
    Swal.fire({
      title: 'Confirma alteração?',
      text: "Suas informações serão alteradas!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--cor-primaria)',
      cancelButtonColor: 'var(--cor-secundaria)',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        AppComponent.abreLoading();
        this.usuarioService.updateUsuario(data).subscribe(res => {
          this.zerarInformacoes();
          if (res["httpStatus"] == "OK")
            Swal.fire("Sucesso!", res["mensagem"], "success");
          else Swal.fire("Erro!", res["mensagem"], "error");
        })
      }
    })
  }

  zerarInformacoes(): void {
    this.matricula = this.usuario.matricula_usuario;
    this.nome = this.usuario.nome_usuario;
    this.email = this.usuario.email_usuario;
    this.curso = this.usuario.id_curso.id_curso;
    this.senha = null;
    this.confirmacaoSenha = null;
    AppComponent.fechaLoading();
  }

}
