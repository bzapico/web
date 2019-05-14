/**
 * Interface that defines the Item Data model
 */
export interface Item {
    // OrganizationId with the organization identifier.
    organization_id?: string;
    type?: string;
    id?: string;
    location?: string;
    labels?: any;
    status?: string;
    actions?: string;
}
