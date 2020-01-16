/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Injectable } from '@angular/core';
import { LogResponse } from 'src/app/definitions/interfaces/log-response';
import { mockLogsList } from 'src/app/services/utils/logs.mocks';
import { Backend } from '../definitions/interfaces/backend';
import { Subject } from 'rxjs';
// import { BackendService } from '../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  /**
   * searchLogsResponse manages the timing in the BE interaction
   */
  searchLogsResponse = new Subject();
  /**
   * Backend reference
   */
  backend: Backend;
  /**
   * LogResponse reference
   */
  // logs: LogResponse;
  // Temporary dummy mode
  logs: LogResponse = mockLogsList as LogResponse;

  constructor(
    // private backendService: BackendService,
  ) {}
  /**
   * Search for log entries matching a query
   * @param searchParams message with the query to be resolved
   */
  searchLogs(searchParams) {
    // searchLogs() {
    // this.backend.searchLogs(searchParams).subscribe(searchResponse =>  {
    // // searchResponse es la info relevante se tienen que suscribir los que quieran oir
    // this.searchLogsResponse.next(searchResponse);
    // });
    this.searchLogsResponse.next(this.logs);
  }











  // public getLogsEntry(): LogResponse {
  //   return this.logs;
  // }

  // SEARCH LOGS con parametros para el search
  // pasarle un obj en el formato que piden y es el BE el que pone el formato que quieren
  // this.backend.
  //n_first siempre a false
  // include_metadata que siempre venga

  // SEARCH LOGS para el filter

  // ascending cambia el searchreques de order
  // habra que tener un current search objeto que coja los que hay y
  // meta la nueva inf cada vez que se clicke, modificando y pidinedolo al servicio (SEARCH-LOGS.COMPONENT)

  // COPY
  // almacenar la respuesta q se estará mostrando en display
  // de la ultima reques de searc que amacenamos en los datos, el contenido lo metera al portapapeles

  // Download
  // cuando pido el download, hay que hacer pull del check cada ratito para saber si está lista la info
  // ejecuto correctamente,
  // te da un numero para usar en el check, cuando el check está listo
  // nos trae un  enlace
  // tenemos que levantar una modal del estilo de Device group successfully created
  // "HERE IS THE LINK WITH THE LOGS COMPRESSED FILE"

  // last hour
  // newdate.now.... me da un timestamp que es el date ctual y
  //  hay que hacer la cuenta, y añadirselo al objeto que estamos modificando en SEARCHLOGS.COMP
  // SON NANOSEGUNDOS!!!!

// ESCUCHAR
  // cuando nos llegue la respuesta del searsch,


}
