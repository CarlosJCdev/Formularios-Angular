
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  usuario={
    nombre: '',
    apellido: '',
    correo: ''
  };
  constructor() { }

  ngOnInit(): void {
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
