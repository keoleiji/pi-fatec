import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioSessionService } from 'src/app/session/usuario-session.service';
import { Usuario } from 'src/app/utils/usuario';
declare var $: any;

@Component({
  selector: 'app-responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css']
})
export class ResponsavelComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private usuarioSession: UsuarioSessionService) { }

  public usuario: Usuario;

  public usuariosVinculados: Array<Usuario> = [];

  ngOnInit(): void {
    this.usuario = this.usuarioSession.getUsuario();
    this.atualizarReponsaveis();
  }

  atualizarReponsaveis() {
    this.usuariosVinculados = [];
    AppComponent.abreLoading();
    this.usuarioService.getUsuariosVinculados(this.usuario.matricula_usuario).subscribe(res => {
      Object.values(res).forEach(usuario => {
        this.usuariosVinculados.push(usuario);
      })
      AppComponent.fechaLoading();
    }, err => {
      AppComponent.fechaLoading();
    })
  }

}
