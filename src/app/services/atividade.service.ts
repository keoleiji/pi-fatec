import { Injectable } from '@angular/core';
import { Properties } from '../utils/url-properties';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  private url = `${Properties.URL}/atividades`;
  
  constructor(private httpClient: HttpClient) { }

  public getAtividadeByMateria(id){
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public createAtividade(data){
    return this.httpClient.post(`${this.url}`, data);
  }

  public updateAtividade(data){
    return this.httpClient.put(`${this.url}`, data);
  }

  public deleteAtividade(id){
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}
