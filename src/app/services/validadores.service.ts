import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rejects } from 'assert';
import { Observable } from 'rxjs';

interface ErrorValidate{
  //Se pueden devolver n cantidad de llaves(s), de tipo booleano
  [s: string]: boolean
}
@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    if( !control.value){
      return Promise.resolve(null);
    }
    return new Promise( (resolve, reject)=>{
      setTimeout(()=>{
        if( control.value === 'carlos'){
          resolve({ existe: true});
        }else{
          resolve( null );
        }
      }, 3000);
    })
  }

  noDatoEspecial(control: FormControl): ErrorValidate{
    if(control.value?.toLowerCase() === 'juan2'){
      return{
        nojuan: true
      }
    }
    return null;
  }
  passwordEquals(pass1Name: string, pass2Name: string){
    return(formGroup: FormGroup)=>{
      const pass1Control= formGroup.controls[pass1Name];
      const pass2Control= formGroup.controls[pass2Name];

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noesIgual: true})
      }
    }
  }
}
