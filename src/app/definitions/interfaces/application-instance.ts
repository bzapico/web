/**
 * AppInstance represents an instance of the application in the system
 */
import { SecurityRule } from './security-rule';
import { ServiceGroupInstance } from './service-group-instance';
import { InstanceMetadata } from './instance-metadata';
import { OutboundNetworkInterface } from './outbound-network-interface';
import { ConnectionInstance } from './connection-instance';
import { InboundNetworkInterface } from './inbound-network-interface';

export interface ApplicationInstance {
  // OrganizationId with the organization identifier.
  organization_id?: string;
  // AppDescriptorId with the application descriptor identifier.
  app_descriptor_id?: string;
  // AppInstanceId with the application instance identifier.
  app_instance_id?: string;
  // Name of the application.
  name?: string;
  // ConfigurationOptions defines a key-value map of configuration options.
  configuration_options?: Map<string, string>;
  // EnvironmentVariables defines a key-value map of environment variables and values that will be passed to all
  // running services.
  environment_variables?: Map<string, string>;
  // Labels defined by the user.
  labels?: Map<string, string>;
  // Rules that define the connectivity between the elements of an application.
  rules?: SecurityRule[];
  // Groups with the Service collocation strategies.
  groups?: ServiceGroupInstance[];
  // Status of the deployed instance.
  status_name?: string;
  // Metadata descriptor for the instances triggered by this app
  metadata?: InstanceMetadata[];
  // Textual information about this particular application instance
  info?: string;
  // InboundNetInterfaces with a list of inbounds
  inbound_net_interfaces?: InboundNetworkInterface[];
  // OutboundNetInterfaces with a list of outbounds
  outbound_net_interfaces?: OutboundNetworkInterface[];
  // InboundConnections with a list of connections where the instance is the target
  inbound_connections?: ConnectionInstance[];
  // OutboundConnections with a list of connections where the instance is the source
  outbound_connections?: ConnectionInstance[];
}
