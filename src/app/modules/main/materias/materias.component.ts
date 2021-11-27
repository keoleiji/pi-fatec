import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from 'src/app/services/materia.service';
import { AppComponent } from 'src/app/app.component';
import { Aula } from 'src/app/utils/aula';
import { UsuarioSessionService } from 'src/app/session/usuario-session.service';
import { AulaVinculadaService } from 'src/app/services/aula-vinculada.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/utils/usuario';
declare var $: any;

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  constructor(private route: ActivatedRoute, private materiaService: MateriaService,
    private usuarioSession: UsuarioSessionService, private aulaService: AulaVinculadaService) { }

  public usuario: Usuario;

  public curso: string;

  public materias: Array<Aula> = [];

  public semestres: Array<{ nome: string, materias: Array<Aula> }> = [
    { nome: "Primeiro semestre", materias: [] },
    { nome: "Segundo semestre", materias: [] },
    { nome: "Terceiro semestre", materias: [] },
    { nome: "Quarto semestre", materias: [] },
    { nome: "Quinto semestre", materias: [] },
    { nome: "Sexto semestre", materias: [] }
  ];

  public materiasVinculadas: Array<Aula> = [];
  public materiasVinculadasIds: Array<number> = [];

  ngOnInit(): void {
    this.usuario = this.usuarioSession.getUsuario();
    this.atualizaMaterias();
  }

  atualizaMaterias() {
    this.semestres[0].materias = [];
    this.semestres[1].materias = [];
    this.semestres[2].materias = [];
    this.semestres[3].materias = [];
    this.semestres[4].materias = [];
    this.semestres[5].materias = [];
    this.materiasVinculadas = [];
    this.materiasVinculadasIds = [];
    AppComponent.abreLoading();
    this.materiasVinculadas = this.usuarioSession.getAulasVinculadas();
    this.materiasVinculadas.forEach(materia => {
      this.materiasVinculadasIds.push(materia.id_aula);
    })
    this.materiaService.getMateriasByCurso(this.route.snapshot.paramMap.get("id")).subscribe(res => {
      this.curso = res[0].nome_curso;
      Object.values(res).forEach(materia => {
        this.semestres[materia.semestre - 1]["materias"].push(materia);
      })
      AppComponent.fechaLoading();
    })
  }

  aplicarMateria(materia, event) {
    let data = {
      matricula_usuario: this.usuarioSession.getUsuario().matricula_usuario,
      id_aula: materia.id_aula
    }
    AppComponent.abreLoading();
    this.aulaService.createVinculoAulaUsuario(data).subscribe(res => {
      if (res["httpStatus"] == "OK") {
        event.target.innerHTML = "check";
        Swal.fire("Sucesso!", res["mensagem"], "success");
        this.aulaService.getAulasVinculadasMatricula(this.usuario["matricula_usuario"]).subscribe(res => {
          this.usuarioSession.setAulasVinculadas(res);
          this.atualizaMaterias();
        })
      }
      else
        Swal.fire("Erro!", res["mensagem"], "error");
      AppComponent.fechaLoading();
    })
  }

  desaplicarMateria(materia, event) {
    let id_vinculacao;
    this.materiasVinculadas.forEach(materiaVinculada => {
      if (materiaVinculada.id_aula == materia.id_aula)
        id_vinculacao = materiaVinculada.id_vinculacao;
    })
    AppComponent.abreLoading();
    this.aulaService.deleteVinculoAulaUsuario(id_vinculacao).subscribe(res => {
      if (res["httpStatus"] == "OK") {
        event.target.innerHTML = "add";
        Swal.fire("Sucesso!", res["mensagem"], "success");
        this.aulaService.getAulasVinculadasMatricula(this.usuario["matricula_usuario"]).subscribe(res => {
          this.usuarioSession.setAulasVinculadas(res);
          this.atualizaMaterias();
        })
      }
      else
        Swal.fire("Erro!", res["mensagem"], "error");
      AppComponent.fechaLoading();
    })
  }

}
