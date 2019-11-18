/*
 * Copyright 2019 Nalej
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class GraphLink {

    private _source: string;
    private _target: string;
    private _notMarker?: boolean;
    private _isBetweenApps?: boolean;

    constructor(source: string, target: string, notMarker: boolean, isBetweenApps: boolean) {
        this._source = source;
        this._target = target;
        this._notMarker = notMarker;
        this._isBetweenApps = isBetweenApps;
    }

    get source(): string {
        return this._source;
    }

    set source(value: string) {
        this._source = value;
    }

    get target(): string {
        return this._target;
    }

    set target(value: string) {
        this._target = value;
    }

    get notMarker(): boolean {
        return this._notMarker;
    }

    set notMarker(value: boolean) {
        this._notMarker = value;
    }

    get isBetweenApps(): boolean {
        return this._isBetweenApps;
    }

    set isBetweenApps(value: boolean) {
        this._isBetweenApps = value;
    }
}
