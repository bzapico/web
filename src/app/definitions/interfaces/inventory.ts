import { Controller } from '../models/controller';
import { Asset } from '../models/asset';
import { Device } from '../models/device';

/**
 * Interface that defines the Inventory info needed for creating the Inventory object instance
 */
export interface Inventory {
    devices: Device[];
    assets: Asset[];
    controllers: Controller[];
}




