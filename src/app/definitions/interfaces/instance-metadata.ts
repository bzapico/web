// This is a common metadata entity that collects information for a deployed instance. This instance can be a
// service instance or a service group instance.
export interface InstanceMetadata {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // AppInstanceId with the application instance identifier.
    app_instance_id?: string;
    // Identifier of the monitored entity. This generic id can be used to monitor different kinds of objects.
    monitored_instance_id?: string;
    // Type of instance this metadata refers to
    type_name?: string;
    // List of instances supervised by this metadata structure
    instances_id?: string[];
    // Number of desired replicas specified in the descriptor
    desired_replicas?: number;
    // Number of available replicas for this instance
    available_replicas?: number;
    // Number of unavailable replicas for this descriptor
    unavailable_replicas?: number;
    // Status of every item monitored by this metadata entry
    status_name?: Map<string, string>;
    // Relevant information for every monitored instance
    info?: Map<string, string>;
}
