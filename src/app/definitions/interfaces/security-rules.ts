/**
 * SecurityRule structure defining which element can access a given application service.
 */
export interface SecurityRules {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // RuleId with the security rule identifier.
    rule_id?: string;
    // Name of the security rule.
    name?: string;
    // TargetServiceGroupName defining the name of the service to be accessed.
    target_service_group_name?: string;
    // TargetServiceName name of the service belonging to be source group mentioned above to be accessed.
    target_service_name?: string;
    // TargetPort defining the port that is affected by the current rule.
    target_port: number;
    // Access level to that port defining who can access the port.
    access_name?: string;
    // Name of the service group
    auth_service_group_name?: string;
    // AuthServices defining a list of services that can access the port.
    auth_services?: string[];
    // DeviceGroups defining a list of device groups that can access the port.
    // This field cannot be set by the user when uploading the descriptor.
    device_group_ids?: string[];
    // DeviceGroupNames defining a list of device groups names that can access the port.
    device_group_names?: string[];
    // inbound_net_interface_name The name of the inbound net interface linked to the security rule
    inbound_net_interface_name?: string;
    // outbound_net_interface_name The name of the outbound net interface linked to the security rule
    outbound_net_interface_name?: string;
}
