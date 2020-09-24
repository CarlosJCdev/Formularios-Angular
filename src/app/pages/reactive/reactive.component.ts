import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private validador: ValidadoresService) { 
    this.crearFormulario();
    this.guardar();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get pasatiempo(){
    return this.forma.get('pasatiempos') as FormArray
  }
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get municipioNoValido(){
    return this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched
  }
  get estadoNoValido(){
    return this.forma.get('direccion.estado').invalid && this.forma.get('direccion.estado').touched
  }
  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }
  get pass2NoValido(){
    const pass1= this.forma.get('pass1').value;
    const pass2= this.forma.get('pass1').value;
    return (pass1 === pass2) ? false : true
  }


  crearFormulario(){
    this.forma= this.fb.group({
      //Valores x default, validaciones síncronas que no necesitan la interacción del usuario, 
      nombre: ['', [Validators.required, Validators.minLength(5), this.validador.noDatoEspecial] ],
      //Cuando tengamos mas de una validacion debemos poner la expreción entre []
      apellido: ['', [Validators.required, Validators.minLength(5)] ],
      correo: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      //Validación asyncrona
      usuario: ['', , this.validador.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        municipio: ['', Validators.required],
        estado: ['', Validators.required]
      }),
      //Array de formControl
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validador.passwordEquals('pass1', 'pass2')
    });
    //Para poder agregar pasatiempos al momento de guardar el formulario, podriamos:
    /* ['comer', 'dormir'].forEach(valor => this.pasatiempo.push(this.fb.control(valor))); */
  }

  //Método que escucha cambios en el navegador despues de haberlo creado
  crearListeners(){
    /*De está manera nos devuelve todo el objeto que cambio
     this.forma.valueChanges.subscribe(valor =>{
      console.log(valor);
    }) */
    /* Con está forma nos imprime por consola solo el valor que modifica el usuario campo(nombre)*/
    this.forma.get('nombre').valueChanges.subscribe( 
      console.log
    )
  }

  guardar(){
    console.log(this.forma);
    if(this.forma.invalid){
     return Object.values(this.forma.controls).forEach(control =>{
      if(control instanceof FormGroup){
        Object.values( control.controls).forEach(control => control.markAsTouched());
      }else{
        control.markAsTouched();
      }
      });
    }
    this.forma.reset();
  }

  agregarPasatiempo(){
    this.pasatiempo.push( this.fb.control('Nuevo elemento', Validators.required))
  }
  borrarPasatiempo(i: number){
    this.pasatiempo.removeAt(i);
  }
}
