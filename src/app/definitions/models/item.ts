import { InventoryType } from '../enums/inventory-type.enum';
import { KeyValue } from '../interfaces/key-value';

export interface Item {
    mapId(): string;
    mapType(): InventoryType;
    mapStatus(): string;
    mapLocation(): string;
    mapLabels(): KeyValue;
}
