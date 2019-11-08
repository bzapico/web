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
import { Subject } from 'rxjs';
import { AppStatus } from '../definitions/enums/app-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  showManageConnections = new Subject();

  constructor() {}

  /**
   * Returns the length of the services in registered list. Represents the number of available services
   * @param app selected app
   */
  getServicesCount(app): number {
    let temporalCount = 0;
    app.groups.forEach(group => {
      if (group.services) {
        temporalCount = group.services.length + temporalCount;
      }
    });
    return temporalCount;
  }
  /**
   * Checks if the app status requires an special css class
   * @param status app status name
   * @param className CSS class name
   */
  classStatusCheck(status: string, className: string): boolean {
    switch (status.toLowerCase()) {
      case AppStatus.Running:
        return className.toLowerCase() === AppStatus.Running;
      case AppStatus.DeploymentError:
      case AppStatus.PlanningError:
      case AppStatus.Incomplete:
      case AppStatus.Error:
        return className.toLowerCase() === AppStatus.Error;
      case AppStatus.Queued:
      case AppStatus.Planning:
      case AppStatus.Scheduled:
        return className.toLowerCase() === AppStatus.Process;
      default:
        return className.toLowerCase() === AppStatus.Process;
    }
  }
}
