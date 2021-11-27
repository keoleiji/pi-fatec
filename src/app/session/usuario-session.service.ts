import { Injectable } from '@angular/core';
import { Usuario } from '../utils/usuario';
import { Aula } from '../utils/aula';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSessionService {

  constructor() { }

  public usuario: Usuario;

  public aulasVinculadas: Array<Aula>;

  public setUsuario(usuario): void{
    this.usuario = usuario;
  }

  public getUsuario(): Usuario{
    return this.usuario;
  }

  public setAulasVinculadas(materiasVinculadas): void{
    this.aulasVinculadas = materiasVinculadas;
  }

  public getAulasVinculadas(): Array<Aula>{
    return this.aulasVinculadas;
  }

}
