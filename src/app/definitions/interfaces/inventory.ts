import { Controller } from './controller';
import { Asset } from './asset';
import { Device } from './device';

/**
 * Interface that defines the Inventory info needed for creating the Inventory object instance
 */
export interface Inventory {
    devices: Device;
    assets: Asset;
    controllers: Controller;
}




