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
 * CPUInfo contains information about a CPU.
 */
export interface CpuInfo {
    /**
     * Manufacturer of the CPU.
     */
    manufacturer?: string;
    /**
     * Model of the CPU.
     */
    model?: string;
    /**
     * Architecture of the CPU.
     */
    architecture?: string;
    /**
     * NumCores with the number of cores.
     */
    num_cores?: number;
}
