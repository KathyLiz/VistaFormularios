import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as uuidv1 from 'uuid/v1';

@Injectable({
  providedIn: 'root'
})
export class GeneradorFomularioService {

  JSON = {};
  uuid = uuidv1();
  constructor(private _httpClient: HttpClient) { }

  sendData_HttpClient(datos, uri) {

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };

    this.JSON = { args: datos,
                  tipo: 'formulario',
                  session: this.uuid };
            const argumentos = 'PARAM=' + encodeURIComponent(JSON.stringify(this.JSON));
    return this._httpClient.post (uri, argumentos, httpOptions);
  }

  getJsonConfig_HttpClient(datos, uri) {

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    this.JSON = { args: datos,
                  tipo: 'formulario',
                  session: this.uuid };
            const argumentos = 'PARAM=' + encodeURIComponent(JSON.stringify(this.JSON));
    return this._httpClient.post (uri, argumentos, httpOptions);
  }

}
