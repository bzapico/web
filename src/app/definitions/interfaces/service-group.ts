import { ServiceGroupDeploymentSpecs } from './service-group-deployment-specs';
import { Service } from './service';
import { CollocationPolicy } from '../enums/collocation-policy.enum';

export interface ServiceGroup {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // ServiceGroupId with the group identifier.
    service_group_id?: string;
    // Name of the service group.
    name?: string;
    // Services defining a list of service identifiers that belong to the group.
    services?: Service[];
    // Policy indicating the deployment collocation policy.
    policy?: CollocationPolicy;
    // Particular deployment specs for this service
    specs?: ServiceGroupDeploymentSpecs;
    // Labels defined by the user.
    labels?: Map<string, string>;
}
