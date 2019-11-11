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

import { LocalStorageKeys } from 'src/app/definitions/const/local-storage-keys';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // hardcoded local environment API ip address
  // apiUrl: 'http://192.168.99.100'
  apiUrl: getBaseUrl()
};

function getBaseUrl() {
  const url = localStorage.getItem(LocalStorageKeys.url);
  if (url && url !== '') {
    return url;
  }
  const index = document.location.href.lastIndexOf(':');
  if (index !== -1
      && index > 5) { // Avoid first ':'
    const chunks = document.location.href.split(':');
    return chunks[0] + ':' + chunks[1] + ':443'; // Remove everything after ":port_number"
  } else {
    const hashIndex = document.location.href.indexOf('#');
    if (hashIndex !== -1) {
      const chunks = document.location.href.split('#');
      return chunks[0].slice(0, chunks[0].length - 1); // Returns the required url chunk
    } else {
      return document.location.href.slice(0, document.location.href.length - 1);
    }
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
