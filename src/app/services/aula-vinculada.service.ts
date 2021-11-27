import { Injectable } from '@angular/core';
import { Properties } from '../utils/url-properties';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AulaVinculadaService {
  
  private url = `${Properties.URL}/aulas-vinculadas`;
  
  constructor(private httpClient: HttpClient) { }

  public getAulasVinculadasMatricula(id){
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public createVinculoAulaUsuario(data){
    return this.httpClient.post(`${this.url}`, data);
  }

  public deleteVinculoAulaUsuario(id){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
