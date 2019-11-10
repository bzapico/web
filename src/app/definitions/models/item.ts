import { InventoryType } from '../enums/inventory-type.enum';
import { KeyValue } from '../interfaces/key-value';

export abstract class Item {
    abstract mapId(): string;
    abstract mapType(): InventoryType;
    abstract mapStatus(): string;
    abstract mapLocation(): string;
    abstract mapLabels(): KeyValue;
}
