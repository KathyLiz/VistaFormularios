import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { FormularioFaa201Component } from './componentes/formulario-faa201/formulario-faa201.component';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MAT_LABEL_GLOBAL_OPTIONS, MatButtonModule, MatRippleModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    AppComponent,
    FormularioFaa201Component
  ],
  imports: [
    modules,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [modules],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
