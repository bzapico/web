export interface ConnectionInstance {
    // OrganizationId with the organization identifier
    organization_id?: string;
    // ConnectionId with the connection identifier
    connection_id?: string;
    // SourceInstanceId with the identifier of the outbound instance
    source_instance_id?: string;
    // SourceInstanceId with the name of the outbound instance
    source_instance_name?: string;
    // TargetInstanceId with the identifier of the inbound instance
    target_instance_id?: string;
    // TargetInstanceId with the identifier of the inbound instance
    target_instance_name?: string;
    // InboundName with the name of the inbound identifier
    inbound_name?: string;
    // OutboundName with the name of the outbound identifier
    outbound_name?: string;
    // OutboundRequired is a flag that indicates if the outbound connection should be informed when deploying an instance
    outbound_required?: boolean;
    // Status Status of the connection
    status_name?: string;
    // IpRange The range of IPs associated to the network where the peers are connected
    ip_range?: string;
    // ZtNetworkId A link to the zt network created for the connection
    zt_network_id?: string;
}
