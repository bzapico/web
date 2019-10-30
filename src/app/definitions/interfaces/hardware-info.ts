/**
 * HardwareInfo contains information about the hardware of an asset.
 */
import { CpuInfo } from './cpu-info';
import { NetworkingHardwareInfo } from './networking-hardware-info';

export interface HardwareInfo {
    // CPUs contains the list of CPU available in a given asset.
    cpus?: CpuInfo[];
    // InstalledRam contains the total RAM available in MB.
    installed_ram?: number;
    // NetInterfaces with the list of networking cards.
    net_interfaces?: NetworkingHardwareInfo[];
}
