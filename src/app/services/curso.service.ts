import { Injectable } from '@angular/core';
import { Properties } from '../utils/url-properties';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private url = `${Properties.URL}/cursos`;
  
  constructor(private httpClient: HttpClient) { }

  public getCursos(){
    return this.httpClient.get(`${this.url}`);
  }
  
}
