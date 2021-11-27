import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/utils/curso';
import { AppComponent } from 'src/app/app.component';
declare var $: any;

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  constructor(private cursoService: CursoService) { }

  public cursos: Array<Curso> = [];

  ngOnInit(): void {
    AppComponent.abreLoading();
    this.cursoService.getCursos().subscribe(res => {
      Object.values(res).forEach(curso => {
        this.cursos.push(curso);
      })
      AppComponent.fechaLoading();
    })
  }

}
