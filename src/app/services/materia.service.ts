import { Injectable } from '@angular/core';
import { Properties } from '../utils/url-properties';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private url = `${Properties.URL}/materias`;
  
  constructor(private httpClient: HttpClient) { }

  public getMateriasByCurso(id){
    return this.httpClient.get(`${this.url}/${id}`);
  }

}
