import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPais(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
      map((res:any[])=>{
        return res.map( pais=>{
          return{
            nombre: pais.name,
            codigo: pais.alpha3Code
          }
        })
        //Esto es el mismo resultado pero mas simplificado
        /* return res.map( pais=> ({nombre: pais.name, codigo: pais.alpha3Code})) */
      })
    );
  }
}
