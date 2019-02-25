/**
 * Interface that defines the device Group info needed for creating the device Group object instance
 */
export interface Group {
    // OrganizationId with the organization identifier.
    organization_id: string;
    // DevicesGroupId with the device group identifier.
    device_group_id?: string;
    // Name of the device group.
    name?: string;
    // Created time
    created?: string;
    // Labels defined by the user.
    labels?: string;
    // Enabled determines if the device can interact with the running applications.
    enabled?: boolean;
    // DefaultDeviceConnectivity determines if the devices are enable or disable by default
    default_device_connectivity?: boolean;
    // DeviceGroupApiKey with the API used by the devices associated to this group for registration purposes.
    device_group_api_key?: string;
  }
