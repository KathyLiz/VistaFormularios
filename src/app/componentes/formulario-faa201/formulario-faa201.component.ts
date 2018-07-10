import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, SimpleChanges } from '@angular/core';

// Formulario
import { FormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';

// ANgular MAterial
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-formulario-faa201',
  templateUrl: './formulario-faa201.component.html',
  styleUrls: ['./formulario-faa201.component.scss']
})
export class FormularioFaa201Component implements OnInit {
  nombres = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z íóúáéñÑü]*')]);
  apellidos = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z íóúáéñÑü]*')]);
  identificacion = new FormControl('', [Validators.required, Validators.pattern('[0-9]')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  options: FormGroup;
  animalControl = new FormControl('', [Validators.required]);
  facultad;
  facultad1;
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  facultadControl = new FormControl('', [Validators.required]);
  facultades: Facultad[] = [
    {nombre: 'Facultad de Sistemas', cod: 1},
    {nombre: 'Facultad de Ciencias', cod: 2},
    {nombre: 'Facultad de Ciencias Administrativas', cod: 3},
    {nombre: 'Facultad de Ing. Civil y Ambiental', cod: 4},
    {nombre: 'Facultad de Ing. Eléctrica y Electrónica', cod: 5},
    {nombre: 'Facultad de Geología y Petróleos', cod: 6},
    {nombre: 'Facultad de Química y Agroindustria', cod: 7},
    {nombre: 'Facultad de Mecánica', cod: 8},
    {nombre: 'Escuela de Formación de Tecnólogos', cod: 9}
  ];

  carrerasControl = new FormControl('', [Validators.required]);
  carrerasGenerico: Carrera [];
  carrerasSistemas: Carrera[] = [
    {nombre: 'Ingeniería en Sistemas Informáticos y de Computación'},
    {nombre: 'Ingeniría de Software'},
    {nombre: 'Ingeniería en Ciencias de la Computación'},
  ];
  carrerasEE: Carrera[] = [
    {nombre: 'Ingeniería en Electrónica y Automatización'},
    {nombre: 'Ingeniría en Tecnologías de la Informacióne'},
    {nombre: 'Ingeniería en Eléctrica'},
    {nombre: 'Ingeniería en Telecomunicaciones'},
  ];

  periodoControl = new FormControl('', [Validators.required]);
  periodos: Carrera[] = [
    {nombre: '2018 A'},
    {nombre: '2018 B'},
  ];
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  doSomething(e) {
    const codigo = e.value.cod;
    console.log('Evento', e.value.cod);
    if (codigo === 1 ) {
      this.carrerasGenerico = this.carrerasSistemas;
    } else if (codigo === 5 ) {
      this.carrerasGenerico = this.carrerasEE;
    }
  }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.nombres.hasError('required') ? 'Campo requerido' :
        this.nombres.hasError('text') ? 'Valor no permitido' :
        this.nombres.hasError('pattern') ? 'Ingrese un valor válido' :
            '';
  }

  getErrorMessage1() {
    return this.apellidos.hasError('required') ? 'Campo requerido' :
        this.apellidos.hasError('text') ? 'Valor no permitido' :
        this.apellidos.hasError('pattern') ? 'Ingrese un valor válido' :
            '';
  }

  getErrorMessage2() {
    return this.identificacion.hasError('required') ? 'Campo requerido' :
        this.identificacion.hasError('tel') ? 'Valor no permitido' :
        this.identificacion.hasError('pattern') ? 'Ingrese un valor válido' :
        this.identificacion.hasError('maxlength') ? 'Ingrese un valor válido' :
            '';
  }
  validarFormulario(formulario: NgForm) {
    console.log('Formulario', formulario);
  }

}
export interface Animal {
  name: string;
  sound: string;
}
export interface Facultad {
  nombre: string;
  cod: number;
}
export interface Carrera {
  nombre: string;
}
