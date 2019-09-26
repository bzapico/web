/**
 * Mocked clusters list
 */
export const mockClusterList = [
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31',
        'name': 'nalej55App1K8SCluster',
        'cluster_type_name': 'KUBERNETES',
        'multitenant_support': 'YES',
        'status_name': 'RUNNING',
        'labels': {
            'cluster': 'app2',
            'slave1': 'true',
            'slave2': 'true',
            'slave3': 'true'
        },
        'total_nodes': '3',
        'running_nodes': '3'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'cluster_id': 'aebf82f3-72b9-4e9e-a0c2-aacb35f557e7',
        'name': 'nalej55App2K8SCluster',
        'cluster_type_name': 'KUBERNETES',
        'multitenant_support': 'YES',
        'status_name': 'RUNNING',
        'labels': {
            'cluster': 'app1',
            'slave1': 'true',
            'slave2': 'true',
            'slave3': 'true'
        },
        'total_nodes': '3',
        'running_nodes': '3'
    }
];

/**
 * Mocked clusters Chart
 */
export const mockClusterChart = [
    {
        name: 'Running',
        value: 5
    },
    {
        name: 'Error',
        value: 1
    }
];

/**
 * Mock resources summary containing total clusters and nodes
 */
export const mockResourcesSummary = {
    total_clusters: mockClusterList.length,
    total_nodes: mockClusterList.length * 10
};
