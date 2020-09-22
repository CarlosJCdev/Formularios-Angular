
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  usuario={
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  };

  paises: any[];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPais().subscribe(paises=>{
      this.paises= paises;
      //Para agregar un elemento al inicio de la lista de los paises
      this.paises.unshift({
        nombre: 'Selecciona un pais',
        codigo: ''
      })
      /* console.log(this.paises); */
    });
  }

  guardar(form: NgForm){
    //Si los input no son validos, marcara todos los controls como tocados o modificados, pero no validos
    //Y por ende con los herrores
    if(form.invalid){
      Object.values(form.controls).forEach(control=>{
        control.markAsTouched();
      });
      return;
    }
    console.log(form.value);
  }

}
