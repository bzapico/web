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

import { OperatingSystemClass } from '../enums/operating-system-class.enum';

// OperatingSystemInfo contains information about the operating system of an asset. Notice that no
// enums have been used for either the name or the version as to no constraint the elements of the
// inventory even if we do not have an agent running supporting those.
export interface OperatingSystemInfo {
    // Name of the operating system. Expecting full name.
    name?: string;
    // Version installed.
    version?: string;
    // Class of the operating system - determines the binary format together with architecture
    class?: OperatingSystemClass;
    // ClassName with the string representation of the name.
    class_name?: string;
    // Architecture of the OS.
    architecture?: string;
}
