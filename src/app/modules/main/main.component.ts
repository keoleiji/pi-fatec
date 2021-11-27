import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UsuarioSessionService } from 'src/app/session/usuario-session.service';
import { AulaVinculadaService } from 'src/app/services/aula-vinculada.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/utils/usuario';
import { Aula } from 'src/app/utils/aula';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  lang;

  constructor(private router: Router, private usuarioSession: UsuarioSessionService,
    private aulaService: AulaVinculadaService, private usuarioService: UsuarioService) { }

  public isSidebar: boolean = false;

  public usuario: Usuario;
  public aulasVinculadas: Array<Aula>;

  ngOnInit(): void {
    AppComponent.abreLoading();
    this.lang = localStorage.getItem('lang') || 'pt';
    if ($(window).width() <= 750)
      $(".content").hide();
    if (localStorage.getItem("session") != null) {
      if (this.usuario == null) {
        this.usuarioService.getUsuarioPorMatricula(localStorage.getItem("session")).subscribe(res => {
          this.usuarioSession.setUsuario(res);
          this.usuario = this.usuarioSession.getUsuario();
          this.aulaService.getAulasVinculadasMatricula(this.usuario["matricula_usuario"]).subscribe(res => {
            this.usuarioSession.setAulasVinculadas(res);
            this.aulasVinculadas = this.usuarioSession.getAulasVinculadas();
            AppComponent.fechaLoading();
          }, err => {
            AppComponent.fechaLoading();
            Swal.fire("Erro!", "Não foi possível concluir a ação, tente novamente mais tarde!", "error");
          });
        }, err => {
          localStorage.removeItem("session");
          this.router.navigate(["login"]);
          AppComponent.fechaLoading();
          Swal.fire("Erro!", "Não foi possível concluir a ação, tente novamente mais tarde!", "error");
        })
      } else {
        this.aulaService.getAulasVinculadasMatricula(this.usuario["matricula_usuario"]).subscribe(res => {
          this.usuarioSession.setAulasVinculadas(res);
          this.aulasVinculadas = this.usuarioSession.getAulasVinculadas();
          AppComponent.fechaLoading();
        })
      }
    }
    else{
      this.router.navigate(['login']);
      AppComponent.fechaLoading();
    }
  }

  ngDoCheck() {
    if (this.aulasVinculadas != this.usuarioSession.getAulasVinculadas())
      this.aulasVinculadas = this.usuarioSession.getAulasVinculadas();
  }

  resizeSidebar(): void {
    this.isSidebar = !this.isSidebar;
    if (this.isSidebar) {
      $(".sidebar").css("width", "30px");
      $(".operacao").css("left", "10px");
      $(".content").css("left", "15px");
      $(".content").css("width", "calc(100% - 15px)");
      $(".div-minimize").css("transform", "rotate(180deg)");
      $(".div-conteudo-sidebar").hide();
      if ($(window).width() <= 750)
        AppComponent.fade("in", 400, $(".content"))
    }
    else {
      $(".sidebar").css("width", "320px");
      $('.operacao').css("left", "300px");
      $(".content").css("left", "320px");
      $(".content").css("width", "calc(100% - 320px)");
      $(".div-minimize").css("transform", "rotate(0deg)");
      AppComponent.fade("in", 400, $(".div-conteudo-sidebar"))
      if ($(window).width() <= 750)
        $(".content").hide();
    }
  }

  reziseClick() {
    if ($(window).width() <= 750 && $(".sidebar").css("width") != "30px")
      this.resizeSidebar();
  }

  logout(): void {
    localStorage.removeItem("session")
    this.router.navigate(["login"])
  }

  changeLang(lang){
    localStorage.setItem('lang',lang);
    window.location.reload();
  }

}
