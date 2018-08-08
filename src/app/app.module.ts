import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { FormularioFaa201Component } from './componentes/formulario-faa201/formulario-faa201.component';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MAT_LABEL_GLOBAL_OPTIONS, MatButtonModule, MatRippleModule, MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { DialogComponentComponent } from './componentes/dialog-component/dialog-component.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneradorFomularioService } from './servicio/generador-fomulario.service';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    FormularioFaa201Component,
    DialogComponentComponent
  ],
  imports: [
    modules,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports: [modules],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    GeneradorFomularioService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [DialogComponentComponent]
})
export class AppModule { }
