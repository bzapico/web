/**
 * Interface that defines the Application instance Data model
 */
export interface ApplicationInstance {
  organization_id?: string;
  app_descriptor_id?: string;
  app_instance_id?: string;
  name?: string;
  description?: string;
  configuration_options?: any;
  environment_variables?: any;
  labels?: any;
  rules?: any[];
  groups?: any[];
  services?: any[];
  status_name?: string;
}
