import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { PerfilComponent } from './modules/main/perfil/perfil.component';
import { ResponsavelComponent } from './modules/main/responsavel/responsavel.component';
import { CursosComponent } from './modules/main/cursos/cursos.component';
import { MateriasComponent } from './modules/main/materias/materias.component';
import { AtividadesComponent } from './modules/main/atividades/atividades.component';


const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "main", component: MainComponent, children: [
      { path: "perfil", component: PerfilComponent },
      { path: "responsavel", component: ResponsavelComponent },
      { path: "cursos", component: CursosComponent },
      { path: "materias/:id", component: MateriasComponent },
      { path: "atividades/:curso/:materia/:id", component: AtividadesComponent },
    ]
  },
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }