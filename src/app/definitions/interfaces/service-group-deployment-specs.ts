export interface ServiceGroupDeploymentSpecs {
    // How many times this service group must be replicated
    replicas?: number;
    // Indicate if this service group must be replicated in every cluster
    multi_cluster_replica?: boolean;
    // DeploymentSelectors defines a key-value map of deployment selectors
    deployment_selectors?: Map<string, string>;
}
