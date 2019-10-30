import { ImageCredentials } from './image-credentials';
import { Port } from './port';
import { ConfigFile } from './config-file';
import { Storage } from './storage';
import { KeyValue } from '@angular/common';

export interface ServiceInstance {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // AppInstanceId with the application instance identifier.
    app_instance_id?: string;
    // ServiceGroupId with the group identifier.
    service_group_id?: string;
    // ServiceGroupInstanceId with the service group instance identifier.
    service_group_instance_id?: string;
    // ServiceId with the service identifier.
    service_id?: string;
    // Unique identifier for this instance
    service_instance_id?: string;
    // Name of the service.
    name?: string;
    // ServiceType represents the underlying technology of the service to be launched.
    type_name?: string;
    // Image contains the URL/name of the image to be executed.
    image?: string;
    // ImageCredentials with the data required to access the repository the image is available at.
    credentials?: ImageCredentials;
    // DeploySpecs with the resource specs required by the service.
    specs?: DeploySpecs;
    // Storage restrictions
    storage?: Storage[];
    // ExposedPorts contains the list of ports exposed by the current service.
    exposed_ports?: Port[];
    // EnvironmentVariables defines a key-value map of environment variables and values that will be passed to all
    // running services.
    environment_variables?: KeyValue<string, string>;
    // Configs contains the configuration files required by the service.
    configs?: ConfigFile[];
    // Labels with the user defined labels.
    labels?: KeyValue<string, string>;
    // DeployAfter contains the list of services that must be running before launching a service.
    deploy_after?: string[];
    // Status of the deployed service
    status_name?: string;
    // Endpoints exposed to the users by the service.
    endpoints?: string[];
    // DeployedOnClusterId specifies which is the cluster where the service is running.
    deployed_on_cluster_id?: string;
    // Run arguments
    run_arguments?: string[];
    // Relevant information about this instance
    info?: string;
}
