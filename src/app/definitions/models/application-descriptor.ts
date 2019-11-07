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

/**
 * Interface that defines the AppDescriptor structure defines the top
 * level abstraction for an application and all the associated services.
 */
import { ServiceGroup } from '../interfaces/service-group';
import { AppParameter } from '../interfaces/app-parameter';
import { Application } from './application';

export class ApplicationDescriptor extends Application {
    /**
     * Groups with the Service collocation strategies.
     */
    groups?: ServiceGroup[];
    /**
     * AppParameter with the parameters definition of an application
     */
    parameters?: AppParameter[];

    getId(): string {
        return this.app_descriptor_id;
    }
}
