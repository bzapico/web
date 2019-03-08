/**
 * Interface that defines the AppDescriptor structure defines the top
 * level abstraction for an application and all the associated services.
 */
export interface AppDescriptor {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // Name of the application.
    name?: string;
    // ConfigurationOptions defines a key-value map of configuration options.
    configuration_options?: any;
    // EnvironmentVariables defines a key-value map of environment variables and values that will be passed to all
    // running services.
    environment_variables?: any;
    // Labels defined by the user.
    labels?: any;
    // Rules that define the connectivity between the elements of an application.
    rules?: any[];
    // Groups with the Service collocation strategies.
    groups?: any[];
  }
