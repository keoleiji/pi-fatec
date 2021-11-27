import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { PerfilComponent } from './modules/main/perfil/perfil.component';
import { ResponsavelComponent } from './modules/main/responsavel/responsavel.component';
import { CadastroResponsavelComponent } from './modules/main/responsavel/cadastro-responsavel/cadastro-responsavel.component';
import { RemocaoResponsavelComponent } from './modules/main/responsavel/remocao-responsavel/remocao-responsavel.component';
import { MateriasComponent } from './modules/main/materias/materias.component';
import { CursosComponent } from './modules/main/cursos/cursos.component';
import { AtividadesComponent } from './modules/main/atividades/atividades.component';
import { FormularioComponent } from './modules/main/atividades/formulario/formulario.component';
import { UsuarioSessionService } from './session/usuario-session.service';
import { PostsComponent } from './posts/posts.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PerfilComponent,
    CadastroResponsavelComponent,
    RemocaoResponsavelComponent,
    ResponsavelComponent,
    MateriasComponent,
    CursosComponent,
    AtividadesComponent,
    FormularioComponent,
    PostsComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsuarioSessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
