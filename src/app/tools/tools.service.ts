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
import { ToolsComponent } from './tools.component';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  /**
   * Return an specific dot color depending on the node status
   * @param status Status name
   */
  getStatusDotColor(status: string): {'background-color': string, border?: string} {
    const basicColor = {
      'background-color': ToolsComponent.STATUS_COLORS[status.toUpperCase()]
    };
    const basicBorderColor = ToolsComponent.STATUS_BORDER_COLORS[status.toUpperCase()];
    if (basicBorderColor) {
      basicColor['border'] = '1px ' + basicBorderColor + ' solid';
    }
    return basicColor;
  }
  /**
   * Filters the backend incoming status to display it in removing the underscore "_" between words
   * @param rawStatus string containing the status that the backend is sending
   */
  getStatusUnderscoreRemoved(rawStatus: string): string {
    if (rawStatus.toLowerCase().replace('_', ' ')) {
      if (rawStatus.toLowerCase() === 'install_in_progress') {
        return rawStatus.toLowerCase().replace('install_in_progress', 'installing');
      }
      if (rawStatus.toLowerCase() === 'installed') {
        return rawStatus.toLowerCase().replace('installed', ' ');
      }
      return rawStatus.replace('_', ' ');
    }
    return rawStatus;
  }
}
