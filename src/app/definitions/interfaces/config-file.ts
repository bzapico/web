// ConfigFile represents the configuration structure defining the service configuration.
export interface ConfigFile {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    // AppDescriptorId with the application descriptor identifier.
    app_descriptor_id?: string;
    // ConfigFileId with the config file identifier.
    config_file_id?: string;
    // Name with the config file name
    name?: string;
    // Content of the configuration file.
    content?: number;
    // MountPath of the configuration file in the service instance.
    mount_path?: string;
}
