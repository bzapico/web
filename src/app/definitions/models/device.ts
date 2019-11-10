/**
 * Interface that defines the Device info needed for creating the Device object instance
 */
import { KeyValue } from '../interfaces/key-value';
import { InventoryLocation } from '../interfaces/inventory-location';
import { AssetInfo } from '../interfaces/asset-info';
import { InventoryType } from '../enums/inventory-type.enum';
import { Item } from './item';

export class Device extends Item {
  // OrganizationId with the organization identifier.
  organization_id: string;
  // DevicesGroupId with the device group identifier.
  device_group_id: string;
  // DeviceId with the device identifier.
  device_id: string;
  // AssetDeviceId is the composite of DeviceID and DeviceGroupId
  asset_device_id?: string;
  // RegisterSince is the timestamp when the device joined the group.
  register_since?: number;
  // Labels defined by the user.
  labels?: KeyValue;
  // Enabled determines if the device can interact with the running applications.
  enabled?: boolean;
  // DeviceApiKey contains the API KEY used by the device to send data.
  device_api_key?: string;
  // DeviceStatus contains the status of the device (ONLINE/OFFLINE)
  device_status_name?: string;
  // location with the device location
  location?: InventoryLocation;
  // AssetInfo with the information related to Hw, Storage and OS
  asset_info?: AssetInfo;

  constructor(
    organization_id: string,
    device_group_id: string,
    device_id: string,
    asset_device_id: string,
    register_since: number,
    labels: KeyValue,
    enabled: boolean,
    device_api_key: string,
    device_status_name: string,
    location: InventoryLocation,
    asset_info: AssetInfo) {
    super();
    this.organization_id = organization_id;
    this.device_group_id = device_group_id;
    this.device_id = device_id;
    this.asset_device_id = asset_device_id;
    this.register_since = register_since;
    this.labels = labels;
    this.enabled = enabled;
    this.device_api_key = device_api_key;
    this.device_status_name = device_status_name;
    this.location = location;
    this.asset_info = asset_info;
  }

  mapId(): string {
    return this.device_id;
  }

  mapType(): InventoryType {
    return InventoryType.Device;
  }

  mapStatus(): string {
    return this.device_status_name;
  }

  mapLocation(): string {
    return this.location && this.location.geolocation ? this.location.geolocation : 'undefined';
  }

  mapLabels(): KeyValue {
    return this.labels || {};
  }
}
