import { Group } from '../definitions/interfaces/group';

export const mockJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    // tslint:disable-next-line:max-line-length
    '.eyJhY2Nlc3MiOlsiT1JHIl0sImV4cCI6MTU0MjI4Njg2MywiaWF0IjoxNTQyMjc2MDYzLCJpc3MiOiJhdXRoeCIsImp0aSI6IjI1OTA5ZDNkLTJlODMtNDlmMC04ZmQzLTFlYmZiNTYxMTNhMSIsIm5iZiI6IjE1NDIyNzYwNjMiLCJvcmdhbml6YXRpb25JRCI6IjdhZDFhN2E4LWU0YjEtNDc5OC05MDcxLWU0NTY5MDhmYWQxMyIsInJvbGUiOiJPd25lciIsInVzZXJJRCI6ImpvaG4uZG9lQG1haWwuY29tIn0' +
    '.MeCoZ_UdYiMlduG-ik63rHHqHztQrK7dgIEWceW0VRk';

/**
 * Mocked organization info
 */
export const mockOrganizationInfo = {
    name: 'Nike'
};

/**
 * Mocked users list
 */
export const mockUserList = [
    {
        name: 'Celia Toth',
        email: 'toth.c@mail.com',
        role_name: 'Owner'
    },
    {
        name: 'Sara Doe',
        email: 'saradoe@mail.com',
        role_name: 'Owner'
    },
    {
        name: 'Dave Smith',
        email: 'davesmith@mail.com',
        role_name: 'Owner'
    },
    {
        name: 'John Doe',
        email: 'john.doe@mail.com',
        role_name: 'Owner'
    },
    {
        name: 'Ellen Martin',
        email: 'ellen.martin@mail.com',
        role_name: 'Owner'
    },
    {
        name: 'Josh Peterson',
        email: 'josh.peterson@mail.com',
        role_name: 'Owner'
    },
    {
        name: 'Mike Slashis',
        email: 'mikeslashis@mail.com',
        role_name: 'Owner'
    },
];

/**
 * Mocked clusters list
 */
export const mockClusterList = [
    {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d1',
        name: 'Dhs1_k8s_cluster',
        description: 'Autodiscovered cluster',
        total_nodes: '1',
        running_nodes: '0',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'yes'
    }, {
        organization_id: 'f7751f83-f619-436f-ade2-005924e346b9',
        cluster_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d2',
        name: 'Bs2_k8s_cluster',
        description: 'Autodiscovered a cluster',
        total_nodes: '10',
        running_nodes: '2',
        cluster_type_name: 'aKubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3',
            lab4: 'label4'
        },
        multitenant_support: 'yes'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '6769d264-4ba7-b221-a7f4f14e481d3',
        name: 'Chs3_k8s_cluster',
        description: 'Autodiscovered b cluster',
        total_nodes: '4',
        running_nodes: '3',
        cluster_type_name: 'bKubernetes',
        status_name: 'Error',
        labels: 'ny, edge',
        multitenant_support: 'yes'
    }, {
        organization_id: 'f7751f83-f619-436f-ade2-005924e346b9',
        cluster_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d4',
        name: 'Dhs4_k8s_cluster',
        description: 'Autodiscovered c cluster',
        total_nodes: '4',
        running_nodes: '4',
        cluster_type_name: 'cKubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'no'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d5',
        name: 'Ehs5_k8s_cluster',
        description: 'Autodiscovered d cluster',
        total_nodes: '10',
        running_nodes: '5',
        cluster_type_name: 'dKubernetes',
        status_name: 'Running',
        labels: 'ny, edge',
        multitenant_support: 'yes'
    }, {
        organization_id: 'f7751f83-f619-436f-ade2-005924e346b9',
        cluster_id: '6769d264-4ba7-4cd7-a7f4f14e481d6',
        name: 'Fhs6_k8s_cluster',
        description: 'Autodiscovered e cluster',
        total_nodes: '6',
        running_nodes: '5',
        cluster_type_name: 'Kubernetes',
        status_name: 'Error',
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3'
        },
        multitenant_support: 'yes'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '6769d264-4cd7-b221-a7f4f14e481d7',
        name: 'Ghs7_k8s_cluster',
        description: 'Autodiscovered f cluster',
        total_nodes: '10',
        running_nodes: '7',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'no'
    }, {
        organization_id: 'f7751f83-f619-436f-ade2-005924e346b9',
        cluster_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d8',
        name: 'Hhs8_k8s_cluster',
        description: 'Autodiscovered cluster',
        total_nodes: '7',
        running_nodes: '7',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3'
        },
        multitenant_support: 'yes'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '6769d264-a7f4f14e481d9',
        name: 'Jhs9_k8s_cluster',
        description: 'Autodiscovered cluster',
        total_nodes: '10',
        running_nodes: '9',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'yes'
    }, {
        organization_id: 'f7751f83-f619-436f-ade2-005924e346b9',
        cluster_id: '0800200c9a70',
        name: 'Khs10_k8s_cluster',
        description: 'Autodiscovered cluster',
        total_nodes: '9',
        running_nodes: '8',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'yes'
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
 * Mocked nodes list
 */
export const mockNodesChart = [
    {
        'name': 'Nodes Running',
        'series': [
          {
            'value': 39,
            'name': '-6h'
          },
          {
            'value': 79,
            'name': '-5h'
          },
          {
            'value': 23,
            'name': '-4h'
          },
          {
            'value': 96,
            'name': '-3h'
          },
          {
            'value': 73,
            'name': '-2h'
          },
          {
            'value': 73,
            'name': '-1h'
          },
          {
            'value': 73,
            'name': 'now'
          }
        ]
    }
];

/**
 * Mocked new password
 */
export const mockResetPasword = 'NEW_PASSWORD_1234';

/**
 * Mock resources summary containing total clusters and nodes
 */
export const mockResourcesSummary = {
    total_clusters: mockClusterList.length,
    total_nodes: mockClusterList.length * 10
};

/**
 * Mocked App Instances list
 */
export const mockAppsInstancesList = [
    {
        'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
        'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
        'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
        'name': 'dhtest15',
        'labels': {
           'app': 'simple-app'
        },
        'rules': [
           {
              'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
              'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
              'rule_id': 'fefec0af-ac57-42f1-9741-a25abfa77db6',
              'name': 'allow access to wordpress',
              'target_service_group_name': 'g1',
              'target_service_name': '2',
              'target_port': 80,
              'access_name': 'PUBLIC'
           }
        ],
        'groups': [
           {
              'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
              'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
              'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
              'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
              'service_group_instance_id': 'd8863b33-b55a-4b0d-9b2d-5cefcfb6ac52',
              'name': 'g1',
              'service_instances': [
                 {
                    'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                    'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                    'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
                    'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
                    'service_group_instance_id': 'd8863b33-b55a-4b0d-9b2d-5cefcfb6ac52',
                    'service_id': 'a433d8fd-8821-4323-9a9c-07a1bf724db4',
                    'name': 'simple-mysql',
                    'type_name': 'DOCKER',
                    'image': 'mysql:5.6',
                    'specs': {
                       'replicas': 1
                    },
                    'storage': [
                       {
                          'size': '104857600',
                          'mount_path': '/tmp',
                          'type_name': 'EPHEMERAL'
                       }
                    ],
                    'exposed_ports': [
                       {
                          'name': 'mysqlport',
                          'internal_port': 3306,
                          'exposed_port': 3306
                       }
                    ],
                    'environment_variables': {
                       'MYSQL_ROOT_PASSWORD': 'root'
                    },
                    'configs': [
                       {
                          'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                          'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                          'config_file_id': '8f0737bb-0356-40ec-8171-45ca037d09b1',
                          'content': 'SG9sYQo=',
                          'mount_path': '/config/saludo.conf'
                       },
                       {
                          'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                          'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                          'config_file_id': '0c6adc92-9143-4493-8e8d-f9ab8cddb9cc',
                          'content': 'QWRpb3MK',
                          'mount_path': '/config/despedida.conf'
                       }
                    ],
                    'labels': {
                       'app': 'simple-mysql',
                       'component': 'simple-app'
                    },
                    'status_name': 'SERVICE_WAITING',
                    'endpoints': [
                        'nalej.com',
                    ]
                 },
                 {
                    'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                    'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                    'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
                    'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
                    'service_group_instance_id': 'd8863b33-b55a-4b0d-9b2d-5cefcfb6ac52',
                    'service_id': '068458be-679e-4d91-9747-c51b95fd81bd',
                    'name': 'simple-wordpress',
                    'type_name': 'DOCKER',
                    'image': 'wordpress:5.0.0',
                    'specs': {
                       'replicas': 1
                    },
                    'storage': [
                       {
                          'size': '104857600',
                          'mount_path': '/tmp',
                          'type_name': 'EPHEMERAL'
                       }
                    ],
                    'exposed_ports': [
                       {
                          'name': 'wordpressport',
                          'internal_port': 80,
                          'exposed_port': 80,
                          'endpoints': [
                             {
                                'type_name': 'WEB',
                                'path': '/'
                             }
                          ]
                       }
                    ],
                    'environment_variables': {
                       'WORDPRESS_DB_HOST': 'NALEJ_SERV_SIMPLE-MYSQL:3306',
                       'WORDPRESS_DB_PASSWORD': 'root'
                    },
                    'labels': {
                       'app': 'simple-wordpress',
                       'component': 'simple-app'
                    },
                    'deploy_after': [
                       '1'
                    ],
                    'status_name': 'SERVICE_WAITING'
                 }
              ],
              'policy_name': 'SAME_CLUSTER',
              'status_name': 'SERVICE_SCHEDULED',
              'specs': {
                 'num_replicas': 1
              }
           },
           {
              'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
              'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
              'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
              'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
              'service_group_instance_id': '78138841-7d52-402b-86e7-50f2ff192716',
              'name': 'g1',
              'service_instances': [
                 {
                    'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                    'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                    'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
                    'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
                    'service_group_instance_id': '78138841-7d52-402b-86e7-50f2ff192716',
                    'service_id': 'a433d8fd-8821-4323-9a9c-07a1bf724db4',
                    'name': 'simple-mysql',
                    'type_name': 'DOCKER',
                    'image': 'mysql:5.6',
                    'specs': {
                       'replicas': 1
                    },
                    'storage': [
                       {
                          'size': '104857600',
                          'mount_path': '/tmp',
                          'type_name': 'EPHEMERAL'
                       }
                    ],
                    'exposed_ports': [
                       {
                          'name': 'mysqlport',
                          'internal_port': 3306,
                          'exposed_port': 3306
                       }
                    ],
                    'environment_variables': {
                       'MYSQL_ROOT_PASSWORD': 'root'
                    },
                    'configs': [
                       {
                          'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                          'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                          'config_file_id': '8f0737bb-0356-40ec-8171-45ca037d09b1',
                          'content': 'SG9sYQo=',
                          'mount_path': '/config/saludo.conf'
                       },
                       {
                          'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                          'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                          'config_file_id': '0c6adc92-9143-4493-8e8d-f9ab8cddb9cc',
                          'content': 'QWRpb3MK',
                          'mount_path': '/config/despedida.conf'
                       }
                    ],
                    'labels': {
                       'app': 'simple-mysql',
                       'component': 'simple-app'
                    },
                    'status_name': 'SERVICE_RUNNING',
                    'deployed_on_cluster_id': '155cb041-58c5-45aa-b529-1e4ce66e71e1'
                 },
                 {
                    'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                    'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                    'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
                    'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
                    'service_group_instance_id': '78138841-7d52-402b-86e7-50f2ff192716',
                    'service_id': '068458be-679e-4d91-9747-c51b95fd81bd',
                    'name': 'simple-wordpress',
                    'type_name': 'DOCKER',
                    'image': 'wordpress:5.0.0',
                    'specs': {
                       'replicas': 1
                    },
                    'storage': [
                       {
                          'size': '104857600',
                          'mount_path': '/tmp',
                          'type_name': 'EPHEMERAL'
                       }
                    ],
                    'exposed_ports': [
                       {
                          'name': 'wordpressport',
                          'internal_port': 80,
                          'exposed_port': 80,
                          'endpoints': [
                             {
                                'type_name': 'WEB',
                                'path': '/'
                             }
                          ]
                       }
                    ],
                    'environment_variables': {
                       'WORDPRESS_DB_HOST': 'NALEJ_SERV_SIMPLE-MYSQL:3306',
                       'WORDPRESS_DB_PASSWORD': 'root'
                    },
                    'labels': {
                       'app': 'simple-wordpress',
                       'component': 'simple-app'
                    },
                    'deploy_after': [
                       '1'
                    ],
                    'status_name': 'SERVICE_RUNNING',
                    'deployed_on_cluster_id': '155cb041-58c5-45aa-b529-1e4ce66e71e1'
                 }
              ],
              'policy_name': 'SAME_CLUSTER',
              'status_name': 'SERVICE_SCHEDULED',
              'specs': {
                 'num_replicas': 1
              }
           }
        ],
        'status_name': 'RUNNING',

     }
];

/**
 * Mocked registered apps list (descriptors) - fields still not defined
 */
export const mockRegisteredAppsList = [
    {
        app_descriptor_id: '16143613421',
        name: 'Registered1',
        description: 'Registered1 app description'
    }, {
        app_descriptor_id: '16143613422',
        name: 'Registered2',
        description: 'Registered app description'
    }
];

/**
 * Mocked nodes list
 */
export const mockNodeList = [
    {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d9a',
        ip: '10.240.0.59',
        credentials: 'Private',
        labels: {
            'agentpool':  'default',
            'beta.kubernetes.io/arch' : 'amd64',
            'beta.kubernetes.io/instance-type' : 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',

    },
    {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56b',
        ip: '10.240.0.58',
        credentials: 'Private',
        labels: {
            'agentpool':  'default',
            'beta.kubernetes.io/arch' : 'amd64',
            'beta.kubernetes.io/instance-type' : 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d7c',
        ip: '10.240.0.57',
        credentials: 'Private',
        labels: {
            'agentpool':  'default',
            'beta.kubernetes.io/arch' : 'amd64',
            'beta.kubernetes.io/instance-type' : 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56d',
        ip: '10.240.0.56',
        credentials: 'Private',
        labels: {
            'agentpool':  'default',
            'beta.kubernetes.io/arch' : 'amd64',
            'beta.kubernetes.io/instance-type' : 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d5e',
        ip: '10.240.0.55',
        credentials: 'Private',
        labels: {
            'agentpool':  'default',
            'beta.kubernetes.io/arch' : 'amd64',
            'beta.kubernetes.io/instance-type' : 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56f',
        ip: '10.240.0.53',
        credentials: 'Private',
        labels: {
            'agentpool':  'default',
            'beta.kubernetes.io/arch' : 'amd64',
            'beta.kubernetes.io/instance-type' : 'Standard_D2s_v3',
            'beta.kubernetes.io/os': 'linux',
            'failure-domain.beta.kubernetes.io/region': 'eastus2',
            'failure-domain.beta.kubernetes.io/zone': '0',
            'kubernetes.azure.com/cluster': 'Mc_dhs1_k8s_cluster_dhs1_k8s_cluster_eastus2',
            'kubernetes.io/hostname': 'aks.default.37446519-1',
            'kubernetes.io/role': 'agent',
            'node-role.kubernetes.io/agent': '0',
            'storafeprofile': 'managed',
            'storagetier': 'Premium_LRS'
        },
        status_name: 'Running',
        state_name: 'Unregistered',

    }
];

/**
 * Mocked Apps status timeline
 */
export const mockAppChart = [
    {
        'name': 'Apps Running',
        'series': [
          {
            'value': 39,
            'name': '-6h'
          },
          {
            'value': 79,
            'name': '-5h'
          },
          {
            'value': 23,
            'name': '-4h'
          },
          {
            'value': 96,
            'name': '-3h'
          },
          {
            'value': 40,
            'name': '-2h'
          },
          {
            'value': 73,
            'name': '-1h'
          },
          {
            'value': 23,
            'name': 'now'
          }
        ]
      }
];

/**
 * Mocked Apps Pie Chart
 */
export const mockAppPieChart = [
    {
        name: 'Running',
        value: 5
    },
    {
        name: 'Error',
        value: 4
    }
];

/**
 *  Mocked clusters detail
 */
export const mockClusterDetail = [
    {
        name: 'Cluster1',
        id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d1',
        totalNodes: '10',
        runningNodes: '1',
        description: 'Autodiscovered cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant_support: 'yes'
    }
];


/**
 * Mocked Devices status timeline
 */
export const mockDevicesChart = [
    {
        'name': 'Devices Running',
        'series': [
          {
            'value': 39,
            'name': '-6h'
          },
          {
            'value': 79,
            'name': '-5h'
          },
          {
            'value': 23,
            'name': '-4h'
          },
          {
            'value': 96,
            'name': '-3h'
          },
          {
            'value': 40,
            'name': '-2h'
          },
          {
            'value': 73,
            'name': '-1h'
          },
          {
            'value': 23,
            'name': 'now'
          }
        ]
      }
];

/**
 * Mocked devices list
 */
export const mockDevicesList = [
    [],
    [
        {
           'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
           'device_group_id': 'a56b9900-0fef-41b0-bb7c-adf0055274cd',
           'device_id': 'dh006',
           'register_since': '1550746714',
           'enabled': true,
           'device_status_name': 'OFFLINE'
        }
    ],
    [
        {
        'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
        'device_group_id': 'a2ed5462-76b7-4085-98fb-27c1cd9b79a5',
        'device_id': 'dh001',
        'register_since': '1550746644',
        'enabled': true,
        'device_status_name': 'OFFLINE',
        labels: {
            type: 'phone',
            arch: 'arm'
            }
        },
        {
        'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
        'device_group_id': 'a2ed5462-76b7-4085-98fb-27c1cd9b79a5',
        'device_id': 'dh002',
        'register_since': '1550746647',
        'enabled': true,
        'device_status_name': 'OFFLINE'
        },
        {
        'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
        'device_group_id': 'a2ed5462-76b7-4085-98fb-27c1cd9b79a5',
        'device_id': 'dh003',
        'register_since': '1550746651',
        'enabled': true,
        'device_status_name': 'OFFLINE'
        },
        {
        'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
        'device_group_id': 'a2ed5462-76b7-4085-98fb-27c1cd9b79a5',
        'device_id': 'dh004',
        'register_since': '1550746653',
        'enabled': true,
        'device_status_name': 'OFFLINE'
        },
        {
        'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
        'device_group_id': 'a2ed5462-76b7-4085-98fb-27c1cd9b79a5',
        'device_id': 'dh005',
        'register_since': '1550746656',
        'enabled': true,
        'device_status_name': 'OFFLINE'
        }
    ]
];

/**
 * Mocked devices group list
 */
export const mockGroupList: Group[] = [
    {
       'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
       'device_group_id': 'a2ed5462-76b7-4085-98fb-27c1cd9b79a5',
       'name': 'dg1',
       'created': '1550746520',
       'enabled': true,
       'default_device_connectivity': true,
       'device_group_api_key': '6ca7ab9c-54be-4f74-be44-bb58977fb37e'
    },
    {
       'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
       'device_group_id': 'a56b9900-0fef-41b0-bb7c-adf0055274cd',
       'name': 'dg3',
       'created': '1550746676',
       'enabled': true,
       'default_device_connectivity': true,
       'device_group_api_key': '585fc4d1-f364-415d-be51-be0eda39e632'
    },
    {
       'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
       'device_group_id': 'd94ac398-fd77-4937-b7f7-9fa0ff8b1eab',
       'name': 'dg2',
       'created': '1550746669',
       'enabled': true,
       'default_device_connectivity': true,
       'device_group_api_key': 'cd9e76b1-bfb8-4f51-ba73-3336d8051948'
    }
 ];
/**
 * Mocked new group API Key
 */
export const mockGroupApiKey = '9cd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-3352-ac7a-398a-3c11ac797c74';
