/**
 * Interface that defines the Edge Controller info needed for creating the Edge Controller object instance
 */
import { InventoryType } from '../enums/inventory-type.enum';
import { KeyValue } from '../interfaces/key-value';
import { InventoryLocation } from '../interfaces/inventory-location';
import { AssetInfo } from '../interfaces/asset-info';
import { Item } from './item';

export class Controller extends Item {
    // OrganizationId with the organization identifier.
    organization_id: string;
    // EdgeControllerId with the EIC identifier.
    edge_controller_id: string;
    // Show flag to determine if this asset should be shown on the UI. This flag is internally used
    // for the async uninstall/removal of the asset.
    show?: boolean;
    // Created time
    created?: number;
    // Name of the EIC.
    name?: string;
    // Labels defined by the user.
    labels?: KeyValue;
    // LastAliveTimestamp contains the last alive message received
    last_alive_timestamp?: string;
    // Status for the UI.
    status?: string;
    // location with the EC location
    location?: InventoryLocation;
    // ECOpSummary contains the result of the last operation for this edge controller
    last_op_result?: string;
    // AssetInfo with the information related to Hw, Storage and OS
    asset_info?: AssetInfo;

    assets?: any[];

    constructor(
        organization_id: string,
        edge_controller_id: string,
        show: boolean,
        created: number,
        name: string,
        labels: KeyValue,
        last_alive_timestamp: string,
        status: string,
        location: InventoryLocation,
        last_op_result: string,
        asset_info: AssetInfo,
        assets: any[]) {
        super();
        this.organization_id = organization_id;
        this.edge_controller_id = edge_controller_id;
        this.show = show;
        this.created = created;
        this.name = name;
        this.labels = labels;
        this.last_alive_timestamp = last_alive_timestamp;
        this.status = status;
        this.location = location;
        this.last_op_result = last_op_result;
        this.asset_info = asset_info;
        this.assets = assets;
    }

    mapId(): string {
        return this.edge_controller_id;
    }

    mapType(): InventoryType {
        return InventoryType.Ec;
    }

    mapStatus(): string {
        return this.status;
    }

    mapLocation(): string {
        return this.location && this.location.geolocation ? this.location.geolocation : 'undefined';
    }

    mapLabels(): KeyValue {
        return this.labels || {};
    }
}
