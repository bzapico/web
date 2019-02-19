/**
 * Interface that defines the Device info needed for creating the Device object instance
 */
export interface Device {
  // OrganizationId with the organization identifier.
  organization_id?: string;
  // DevicesGroupId with the device group identifier.
  device_group_id?: string;
  // DeviceId with the device identifier.
  device_id?: string;
  // RegisterSince is the timestamp when the device joined the group.
  register_since?: number;
  // Labels defined by the user.
  labels?: string;
  // Enabled determines if the device can interact with the running applications.
  enabled?: boolean;
  // DeviceApiKey contains the API KEY used by the device to send data.
  device_api_key?: string;
}
