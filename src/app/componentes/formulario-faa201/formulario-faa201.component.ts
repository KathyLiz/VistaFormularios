import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, SimpleChanges } from '@angular/core';

// Formulario
import { FormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';

// ANgular MAterial
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { GeneradorFomularioService } from '../../servicio/generador-fomulario.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-formulario-faa201',
  templateUrl: './formulario-faa201.component.html',
  styleUrls: ['./formulario-faa201.component.scss']
})
export class FormularioFaa201Component implements OnInit {
  error: boolean;
  docPass = false;
  onload: boolean;
  nombres = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z íóúáéñÑü]*')]);
  apellidos = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z íóúáéñÑü]*')]);
  justificacion = new FormControl('');
  identificacion = new FormControl('', [Validators.pattern('[0-9]{10}')]);
  pasaporte = new FormControl('', [Validators.pattern('[a-zA-Z0-9]*')]);
  periodo = new FormControl('', [Validators.required, Validators.pattern('[0,2]{2}[0-9]{2} [a-zA-Z íóúáéñÑü]{1}')]);
  options: FormGroup;
  cedula: string;
  mostrarJustificacion = false;
  animalControl = new FormControl('', [Validators.required]);
  facultad;
  facultad1;
  faa201Form: FormGroup;
  datosFormulario: DatosFormulario;
  anioPeriodo;
  TIPO_DOCUMENTO = 'formulario';
  NOMBRE_DOCUEMNTO = 'FAA_201';
  MENSAJE_ERROR_CAMPOS = 'Existen valores incorrectos en el formulario';
  MENSAJE_INFO = 'Se generará un archivo WORD que podrá descargar y modificar.';
  url_descarga_formulario: string;
  url = 'https://smartbot.epn.edu.ec/';
  url_config = 'https://smartbot.epn.edu.ec/traerFacultades';
 // url = 'https://bot.interlancompu.com'
  tpoDocumentoControl = new FormControl('', [Validators.required]);
  documentosOpciones: TemplateGenerico[] = [
    {nombre: 'Cédula'},
    {nombre: 'Pasaporte'}
  ];
  facultadControl = new FormControl('', [Validators.required]);
  facultades: Facultad[] ;

  adjuntosControl = new FormControl('', [Validators.required]);
  adjuntosOpciones: TemplateGenerico[] = [
    {nombre: 'Certificado Médico'},
    {nombre: 'Certificado de Calamidad Doméstica'},
    {nombre: 'Otro'}
  ];

  carrerasControl = new FormControl('', [Validators.required]);
  carrerasGenerico: TemplateGenerico [];
  carrerasSistemas: TemplateGenerico[];
  carrerasEE: TemplateGenerico[];
  carrerasTecnologos: TemplateGenerico[];
  carrerasQuimicaYAgroindustrias: TemplateGenerico[];
  carrerasMecanicas: TemplateGenerico[];
  carrerasGeologia_Petroleos: TemplateGenerico[];
  carrerasCivil_Ambiental: TemplateGenerico[];
  carrerasCienciasAdministrativas: TemplateGenerico[];
  carrerasCiencias: TemplateGenerico[];


  exito: boolean;
  docCed = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private _formularioService: GeneradorFomularioService) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.obtenerDatos({}, this.url_config);
    this.createForm();
  }

  // Se obtiene el año actual para poner en el formulario
  mostrarCampoJustificacion(valor) {
    this.mostrarJustificacion = valor;
  }

  createForm() {
    this.faa201Form = new FormGroup({
      'nombres': this.nombres,
      'apellidos': this.apellidos,
      'identificacion': this.identificacion,
      'facultad': this.facultadControl,
      'carrera': this.carrerasControl,
      'periodo': this.periodo,
      'justificacion': this.justificacion,
      'adjuntos': this.adjuntosControl,
      'tipoDocumento': this.tpoDocumentoControl,
      'pasaporte': this.pasaporte
    });
   const fecha = new Date();
   this.anioPeriodo = fecha.getUTCFullYear();
    this.periodo.setValue(this.anioPeriodo);
  }

  doSomething(e) {
    const codigo = e.value.cod;
    switch (codigo) {
      case 1:
        this.carrerasGenerico = this.carrerasSistemas;
      break;
      case 2:
      this.carrerasGenerico = this.carrerasCiencias;
      break;
      case 3:
      this.carrerasGenerico = this.carrerasCienciasAdministrativas;
      break;
      case 4:
      this.carrerasGenerico = this.carrerasCivil_Ambiental;
      break;
      case 5:
        this.carrerasGenerico = this.carrerasEE;
      break;
      case 6:
      this.carrerasGenerico = this.carrerasGeologia_Petroleos;
      break;
      case 7:
      this.carrerasGenerico = this.carrerasQuimicaYAgroindustrias;
      break;
      case 8:
      this.carrerasGenerico = this.carrerasMecanicas;
      break;
      case 9:
      this.carrerasGenerico = this.carrerasTecnologos;
      break;
    }
  }

// Evento tipo documento
  selectorDoc(e) {
    if (e.value.nombre === 'Pasaporte') {
        this.docPass = true;
        this.docCed = false;
    } else {
      this.docPass = false;
      this.docCed = true;
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

  getErrorMessagePeriodo() {
    return this.periodo.hasError('required') ? 'Campo requerido' :
        this.periodo.hasError('text') ? 'Valor no permitido' :
        this.periodo.hasError('pattern') ? 'Ingrese un valor válido' :
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

  getErrorMessagePass() {
    return this.pasaporte.hasError('required') ? 'Campo requerido' :
        this.pasaporte.hasError('text') ? 'Valor no permitido' :
        this.pasaporte.hasError('pattern') ? 'Ingrese un valor válido' :
        this.pasaporte.hasError('maxlength') ? 'Ingrese un valor válido' :
            '';
  }


  enviarFormulario() {
    let validador = true;
    let valorDocumento = '';
     if (this.docCed){
        validador = this.validar();
     }
    if (validador && this.faa201Form.status === 'VALID' && this.validarPeriodo()) {
      this.onload = true;
      if (this.docCed) {
        valorDocumento = this.faa201Form.value.identificacion;
      } else {
        valorDocumento = this.faa201Form.value.pasaporte;
      }
      this.openDialog(this.MENSAJE_INFO);
      this.datosFormulario = {
        tipo: this.TIPO_DOCUMENTO,
        nombre: this.NOMBRE_DOCUEMNTO,
        fecha: 'date',
        facultad: this.faa201Form.value.facultad.nombre,
        carrera: this.faa201Form.value.carrera.nombre,
        nombres: this.faa201Form.value.nombres,
        apellidos: this.faa201Form.value.apellidos,
        documento: valorDocumento,
        periodo: this.faa201Form.value.periodo,
        justificacion: this.faa201Form.value.justificacion,
        adjuntos: this.faa201Form.value.adjuntos.nombre
      };
      this.realizarPeticion(this.datosFormulario, this.url);
    } else {
      this.openDialog(this.MENSAJE_ERROR_CAMPOS);
    }
  }

  realizarPeticion(json, url) {
    const observableLogin$ = this._formularioService.sendData_HttpClient(json, url);
            observableLogin$.subscribe(
                (data: any) => {
                    // this.loaded = true;
                    this.onload = false;
                      this.exito = true;
                      this.url_descarga_formulario = data.url;
                },
                (error) => {
                    this.error = true;
                    this.onload = false;
                },
                () => {
                    // se termina el stream
                    this.onload = false;
                }
            );
  }

  obtenerDatos(json, url) {
    const observableLogin$ = this._formularioService.sendData_HttpClient(json, url);
            observableLogin$.subscribe(
                (data: any) => {
                    // this.loaded = true;
                    this.onload = false;
                    console.log(data);
                    this.facultades = data.facultades;
                    this.carrerasSistemas = data.carreras[0].carreras;
                    this.carrerasCiencias = data.carreras[1].carreras;
                    this.carrerasCienciasAdministrativas = data.carreras[2].carreras;
                    this.carrerasCivil_Ambiental = data.carreras[3].carreras;
                    this.carrerasEE = data.carreras[4].carreras;
                    this.carrerasGeologia_Petroleos = data.carreras[5].carreras;
                    this.carrerasQuimicaYAgroindustrias = data.carreras[6].carreras;
                    this.carrerasMecanicas = data.carreras[7].carreras;
                    this.carrerasTecnologos = data.carreras[8].carreras;
                },
                (error) => {
                   // this.error = true;
                    this.onload = false;
                    console.log('respuestaNOK', error);
                    this.facultades= [
                      {nombre: 'Facultad de Sistemas', cod: 1},
                      {nombre: 'Facultad de Ciencias', cod: 2},
                      {nombre: 'Facultad de Ciencias Administrativas', cod: 3},
                      {nombre: 'Facultad de Ing. Civil y Ambiental', cod: 4},
                      {nombre: 'Facultad de Ing. Eléctrica y Electrónica', cod: 5},
                      {nombre: 'Facultad de Geología y Petróleos', cod: 6},
                      {nombre: 'Facultad de Química y Agroindustria', cod: 7},
                      {nombre: 'Facultad de Mecánica', cod: 8},
                      {nombre: 'Escuela de Formación de Tecnólogos', cod: 9}];
                      this.carrerasSistemas= [
                        {nombre: 'Ingeniería en Sistemas Informáticos y de Computación'},
                        {nombre: 'Ingeniría de Software'},
                        {nombre: 'Ingeniería en Ciencias de la Computación'},
                      ];
                      this.carrerasEE= [
                        {nombre: 'Ingeniería en Electrónica y Automatización'},
                        {nombre: 'Ingeniría en Tecnologías de la Información'},
                        {nombre: 'Ingeniería en Eléctrica'},
                        {nombre: 'Ingeniería en Telecomunicaciones'},
                      ];

                      this.carrerasTecnologos= [
                        {nombre: 'Tecnología en Electrónica y Telecomunicaciones'},
                        {nombre: 'Tecnología en Análisis de Sistemas Informáticos'},
                        {nombre: 'Tecnología en Electromecánica'},
                      {nombre: 'Tecnología en Agua y Saneamiento Ambiental'}
                    ];

                    this.carrerasQuimicaYAgroindustrias= [
                      {nombre: 'Agroindustria'},
                      {nombre: 'Ingeniería Química'}
                    ];

                    this.carrerasMecanicas= [
                      {nombre: 'Ingeniería Mecánica'}
                    ];
                    this.carrerasGeologia_Petroleos= [
                      {nombre: 'Geología'},
                      {nombre: 'Petróleos'}
                    ];
                    this.carrerasCivil_Ambiental=[
                      {nombre: 'Ingeniería Civil'},
                      {nombre: 'Ingeniería Ambiental'}
                    ];
                    this.carrerasCienciasAdministrativas= [
                      {nombre: 'Ingeniería de la Producción'}
                    ];
                    this.carrerasCiencias= [
                      {nombre: 'Física'},
                      {nombre: 'Matemática'},
                      {nombre: 'Ingeniería Matemática'}
                    ];
                },
                () => {
                    // se termina el stream
                    this.onload = false;
                }
            );
  }

  openDialog(mensaje) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      mensaje: mensaje
    };
    this.dialog.open(DialogComponentComponent, dialogConfig);
}

/** Función para mostrar el formulario cuando hay un error */
mostrarFormulario() {
    this.onload = false;
    this.error = false;
}

descargarFormulario() {
  window.open(this.url_descarga_formulario);
}

validarPeriodo() {
  const periodoForm = this.periodo.value;
  const anio = periodoForm.split(' ');
  if (Number(anio[0]) === this.anioPeriodo || (Number(anio[0]) === this.anioPeriodo - 1) ) { // si el año es igual al actual o al actual +1
    return true;
  } else {
    this.periodo.setValue('');
    return false;
  }
}

  /**Algoritmo de validación de cédula */
  validar() {
    const cad = this.identificacion.value;
    let total = 0;
    const longitud = cad.length;
    const longcheck = longitud - 1;
    if (cad !== '' && longitud === 10) {
      for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          let aux = Number(cad.charAt(i)) * 2;
          if (aux > 9) { aux -= 9; }
          total += aux;
        } else {
          total += Number(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }
      total = total % 10 ? 10 - total % 10 : 0;
      if (Number(cad.charAt(longitud - 1)) === total) {
        return true;
      }  else {
      this.identificacion.setValue('');
        return false;
      }
    }
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
export interface TemplateGenerico {
  nombre: string;
}

export interface DatosFormulario {
  tipo: string;
  nombre: string;
  fecha: string;
  facultad: string;
  carrera: string;
  nombres: string;
  apellidos: string;
  documento: string;
  periodo: string;
  justificacion: string;
  adjuntos: string;
}
