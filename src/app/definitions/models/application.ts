import { InboundNetworkInterface } from '../interfaces/inbound-network-interface';
import { OutboundNetworkInterface } from '../interfaces/outbound-network-interface';
import { KeyValue } from '../interfaces/key-value';
import {SecurityRule} from '../interfaces/security-rule';

export abstract class Application {
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
     * Rules that define the connectivity between the elements of an application.
     */
    rules?: SecurityRule[];
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
     * InboundNetInterfaces with a list of inbounds.
     */
    inbound_net_interfaces?: InboundNetworkInterface[];
    /**
     * OutboundNetInterfaces with a list of outbounds.
     */
    outbound_net_interfaces?: OutboundNetworkInterface[];

    abstract getId(): string;
}
