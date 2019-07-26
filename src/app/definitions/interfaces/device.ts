/**
 * Interface that defines the Device info needed for creating the Device object instance
 */
export interface Device {
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
  labels?: any;
  // Enabled determines if the device can interact with the running applications.
  enabled?: boolean;
  // DeviceApiKey contains the API KEY used by the device to send data.
  device_api_key?: string;
  // DeviceStatus contains the status of the device (ONLINE/OFFLINE)
  device_status_name?: string;
  // location with the device location
  location?: any;
  // AssetInfo with the information related to Hw, Storage and OS
  asset_info?: any;
}
