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

import { InventoryType } from '../enums/inventory-type.enum';
import { KeyValue } from '../interfaces/key-value';

export abstract class Item {

    labels?: KeyValue;

    constructor(labels: KeyValue) {
        this.labels = labels;
    }

    abstract get type(): InventoryType;
    abstract get id(): string;
    abstract get itemStatus(): string;
    abstract get itemLocation(): string;
}
