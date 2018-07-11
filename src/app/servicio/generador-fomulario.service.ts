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

  sendData_HttpClient(datos, uri, documento) {

    const httpOptions = {
        headers: new HttpHeaders({
          'Unique-Identifier':  this.uuid,
          'TipoDocumento': documento,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      };

    this.JSON = { args: datos };
    return this._httpClient.post (uri, JSON.stringify(this.JSON), httpOptions);
  }
}
