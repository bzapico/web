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

/**
 * AssetInfo defines the information related to Hw, Storage and OS
 */
import { OperatingSystemInfo } from './operating-system-info';
import { HardwareInfo } from './hardware-info';
import { StorageHardwareInfo } from './storage-hardware-info';

export interface AssetInfo {
    /**
     * OS contains Operating System information.
     */
    os?: OperatingSystemInfo;
    /**
     * Hardware information.
     */
    hardware?: HardwareInfo;
    /**
     * Storage information.
     */
    storage?: StorageHardwareInfo[];
}
