import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Properties } from '../utils/url-properties'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${Properties.URL}/usuario`;
  
  constructor(private httpClient: HttpClient) { }

  public login(data){
    return this.httpClient.post(`${this.url}/login`, data);
  }

  public getUsuarioPorMatricula(id){
    return this.httpClient.get(`${this.url}/usuario-matricula/${id}`);
  }

  public getUsuariosVinculados(id){
    return this.httpClient.get(`${this.url}/usuarios-vinculados/${id}`);
  }

  public createUsuario(data){
    return this.httpClient.post(`${this.url}/criar-usuario`, data);
  }

  public updateUsuario(data){
    return this.httpClient.put(`${this.url}/alterar-usuario`, data);
  }

  public vincularUsuario(data){
    return this.httpClient.put(`${this.url}/vincular-usuario`, data);
  }

  public novaSenha(matricula){
    return this.httpClient.get(`${this.url}/esqueci-senha/${matricula}`);
  }

}
