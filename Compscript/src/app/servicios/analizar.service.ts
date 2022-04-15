import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL } from "../link/URL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnalizarService {

  static el: Array<any>;
  static edes: number = 0;

  constructor(private http: HttpClient) { }

  ejecutar(codigo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    //return this.http.post<any>(URL + 'analizar', codigo);
    return this.http.post<any>(URL + 'analizar', codigo);
  }

  setErrores(lista:Array<any>):void{
    AnalizarService.el = lista;
  }

  getErrores(): Array<any>{
    return AnalizarService.el;
  }
}
