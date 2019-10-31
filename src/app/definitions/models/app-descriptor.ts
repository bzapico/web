/**
 * Interface that defines the AppDescriptor structure defines the top
 * level abstraction for an application and all the associated services.
 */
import { SecurityRule } from '../interfaces/security-rule';
import { ServiceGroup } from '../interfaces/service-group';
import { InboundNetworkInterface } from '../interfaces/inbound-network-interface';
import { OutboundNetworkInterface } from '../interfaces/outbound-network-interface';
import { AppParameter } from '../interfaces/app-parameter';
import { KeyValue } from '../interfaces/key-value';

export class AppDescriptor {
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id?: string;
    /**
     * AppDescriptorId with the application descriptor identifier.
     */
    app_descriptor_id?: string;
    /**
     * Name of the application.
     */
    name?: string;
    /**
     * ConfigurationOptions defines a key-value map of configuration options.
     */
    configuration_options?: KeyValue;
    /**
     * EnvironmentVariables defines a key-value map of environment variables and values that will be passed to all running services.
     */
    environment_variables?: KeyValue;
    /**
     * Labels defined by the user.
     */
    labels?: KeyValue;
    /**
     * Rules that define the connectivity between the elements of an application.
     */
    rules?: SecurityRule[];
    /**
     * Groups with the Service collocation strategies.
     */
    groups?: ServiceGroup[];
    /**
     * AppParameter with the parameters definition of an application
     */
    parameters?: AppParameter[];
    /**
     * InboundNetInterfaces with a list of inbounds
     */
    inbound_net_interfaces?: InboundNetworkInterface[];
    /**
     * OutboundNetInterfaces with a list of outbounds
     */
    outbound_net_interfaces?: OutboundNetworkInterface[];
}
