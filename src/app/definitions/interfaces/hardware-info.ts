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
 * HardwareInfo contains information about the hardware of an asset.
 */
import { CpuInfo } from './cpu-info';
import { NetworkingHardwareInfo } from './networking-hardware-info';

export interface HardwareInfo {
    /**
     * CPUs contains the list of CPU available in a given asset.
     */
    cpus?: CpuInfo[];
    /**
     * InstalledRam contains the total RAM available in MB.
     */
    installed_ram?: number;
    /**
     * NetInterfaces with the list of networking cards.
     */
    net_interfaces?: NetworkingHardwareInfo[];
}
