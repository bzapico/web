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
