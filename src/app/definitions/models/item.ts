import { InventoryType } from '../enums/inventory-type.enum';
import { KeyValue } from '../interfaces/key-value';

export abstract class Item {
    abstract get id(): string;
    abstract get type(): InventoryType;
    abstract get status(): string;
    abstract get locationData(): string;
    abstract get labelsData(): KeyValue
}
