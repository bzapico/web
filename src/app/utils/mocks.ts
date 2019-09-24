import { Group } from '../definitions/interfaces/group';
import { Inventory } from '../definitions/interfaces/inventory';

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
        role_name: 'NalejAdmin'
    },
    {
        name: 'Sara Doe',
        email: 'saradoe@mail.com',
        role_name: 'NalejAdmin'
    },
    {
        name: 'Dave Smith',
        email: 'davesmith@mail.com',
        role_name: 'NalejAdmin'
    },
    {
        name: 'John Doe',
        email: 'john.doe@mail.com',
        role_name: 'NalejAdmin'
    },
    {
        name: 'Ellen Martin',
        email: 'ellen.martin@mail.com',
        role_name: 'NalejAdmin'
    },
    {
        name: 'Josh Peterson',
        email: 'josh.peterson@mail.com',
        role_name: 'NalejAdmin'
    },
    {
        name: 'Mike Slashis',
        email: 'mikeslashis@mail.com',
        role_name: 'NalejAdmin'
    },
];

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
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
        'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
        'name': 'kuard3',
        'labels': {
            'app': 'kuard'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'rule_id': '52425199-fbb9-4aa6-b7fb-78a7a01e5941',
                'name': 'allow access to kuard web',
                'target_service_name': 'kuardfront',
                'target_port': 8080,
                'access_name': 'PUBLIC',
                'inbound_net_interface': 'OpenCast12',
                'outbound_net_interface': 'OpenCast12'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'rule_id': '78dc4ead-3d08-4bf3-8b39-6fcce9745ac8',
                'name': 'allow access to processing',
                'target_service_name': 'kuardprocessing',
                'target_port': 8080,
                'access_name': 'APP_SERVICES',
                'auth_service_group_name': 'kuard-front-group',
                'auth_services': [
                    'kuardfront'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'rule_id': '3b63e6a6-dd35-4748-8e35-516c517d3842',
                'name': 'allow access to storage',
                'target_service_name': 'kuardstorage',
                'target_port': 8080,
                'access_name': 'APP_SERVICES',
                'auth_service_group_name': 'kuard-processing-group',
                'auth_services': [
                    'kuardprocessing'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                'service_group_id': 'e36e0f01-9aeb-4fba-87dd-6ebd42197be8',
                'service_group_instance_id': 'a69a1555-d2bc-4363-8d96-a68e94ad1aa1',
                'name': 'kuard-front-group',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                        'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                        'service_group_id': 'e36e0f01-9aeb-4fba-87dd-6ebd42197be8',
                        'service_group_instance_id': 'a69a1555-d2bc-4363-8d96-a68e94ad1aa1',
                        'service_id': '6018a6a3-fddf-47e0-a612-fb617cc782ea',
                        'service_instance_id': 'be177d36-bef6-4107-aaff-61043884788c',
                        'name': 'kuardfront',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 2
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'kuardfront-8080.a69a15.0a2611.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                    'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                    'monitored_instance_id': 'a69a1555-d2bc-4363-8d96-a68e94ad1aa1',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        'be177d36-bef6-4107-aaff-61043884788c'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        'be177d36-bef6-4107-aaff-61043884788c': 'SERVICE_RUNNING'
                    },
                    'info': {
                        'be177d36-bef6-4107-aaff-61043884788c': ''
                    }
                },
                'global_fqdn': [
                    'kuardfront-8080.a69a15.0a2611.3bc6a816.ep.nalej55.nalej.tech'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                'service_group_id': 'b1b93c71-55d5-460a-8321-c0d8b0804693',
                'service_group_instance_id': '8fbe4bd8-1f1d-4e5a-9625-bee90caccc44',
                'name': 'kuard-processing-group',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                        'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                        'service_group_id': 'b1b93c71-55d5-460a-8321-c0d8b0804693',
                        'service_group_instance_id': '8fbe4bd8-1f1d-4e5a-9625-bee90caccc44',
                        'service_id': '80de5802-9d1d-4690-8993-eef87e36c5df',
                        'service_instance_id': '96971525-d3d8-454a-b307-d02392192059',
                        'name': 'kuardprocessing',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 3
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                    'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                    'monitored_instance_id': '8fbe4bd8-1f1d-4e5a-9625-bee90caccc44',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '96971525-d3d8-454a-b307-d02392192059'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '96971525-d3d8-454a-b307-d02392192059': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '96971525-d3d8-454a-b307-d02392192059': ''
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                'service_group_id': '22a9cc33-14bc-40ca-b7aa-6ffbdf20f190',
                'service_group_instance_id': '7ac08cad-92c5-43df-8779-d54883f6452f',
                'name': 'kuard-storage-group',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                        'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                        'service_group_id': '22a9cc33-14bc-40ca-b7aa-6ffbdf20f190',
                        'service_group_instance_id': '7ac08cad-92c5-43df-8779-d54883f6452f',
                        'service_id': '99966f94-4037-4f2a-8e26-82d779fc74bc',
                        'service_instance_id': '06129bda-554d-43ae-9ae6-8cc306a4649a',
                        'name': 'kuardstorage',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                    'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
                    'monitored_instance_id': '7ac08cad-92c5-43df-8779-d54883f6452f',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '06129bda-554d-43ae-9ae6-8cc306a4649a'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '06129bda-554d-43ae-9ae6-8cc306a4649a': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '06129bda-554d-43ae-9ae6-8cc306a4649a': ''
                    }
                }
            }
        ],
        'status_name': 'RUNNING'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
        'app_instance_id': '22b3a193-4635-491f-8bd2-e3be64cadf5e',
        'name': 'fefe',
        'labels': {
            'app': 'sentiment-app'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': '99f06fb7-b96e-4ab0-ab10-68a2fbfd245a',
                'name': 'NIFI Web UI public access',
                'target_service_name': 'nifi',
                'target_port': 8080,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': 'dc529031-c640-4c62-b92d-64c898a7dce9',
                'name': 'Elastic public access',
                'target_service_name': 'elastic',
                'target_port': 9200,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': 'cee2ef09-e8be-4d1c-8d9a-1f5683b5c687',
                'name': 'Kibana public access',
                'target_service_name': 'kibana',
                'target_port': 5601,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': '336ba591-d214-42aa-b4c9-3e4112c626a3',
                'name': 'Allow access to sentiment API 8180',
                'target_service_name': 'sentimentapi',
                'target_port': 8180,
                'access_name': 'APP_SERVICES',
                'auth_service_group_name': 'sentiment',
                'auth_services': [
                    'nifi'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': '55bdab41-8929-4342-b14c-c7f5d8d4d332',
                'name': 'Allow access to elastic 9200',
                'target_service_name': 'elastic',
                'target_port': 9200,
                'access_name': 'APP_SERVICES',
                'auth_service_group_name': 'sentiment',
                'auth_services': [
                    'kibana',
                    'nifi'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': 'b310ce09-a392-4747-b22b-2437464a8f57',
                'name': 'Allow access to elastic 9300',
                'target_service_name': 'elastic',
                'target_port': 9300,
                'access_name': 'APP_SERVICES',
                'auth_service_group_name': 'sentiment',
                'auth_services': [
                    'kibana',
                    'nifi'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'app_instance_id': '22b3a193-4635-491f-8bd2-e3be64cadf5e',
                'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                'service_group_instance_id': 'cb06ac08-041e-49d2-912e-ca08511f3d8a',
                'name': 'sentiment',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'app_instance_id': '22b3a193-4635-491f-8bd2-e3be64cadf5e',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_group_instance_id': 'cb06ac08-041e-49d2-912e-ca08511f3d8a',
                        'service_id': 'f247a865-f661-40ee-89ce-acd48702ed78',
                        'service_instance_id': '4331a1a2-7a58-484b-b206-d9e8ab503a45',
                        'name': 'nifi',
                        'type_name': 'DOCKER',
                        'image': 'nalejpublic.azurecr.io/nalej/sentimentnifi:v0.0.1',
                        'credentials': {
                            'username': 'username',
                            'password': 'redacted',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'nifiport',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'KAFKA_BROKER': 'NALEJ_SERV_KAFKASVC'
                        },
                        'labels': {
                            'app': 'nifi',
                            'component': 'sentiment-app'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'nifi-8080.cb06ac.22b3a1.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'app_instance_id': '22b3a193-4635-491f-8bd2-e3be64cadf5e',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_group_instance_id': 'cb06ac08-041e-49d2-912e-ca08511f3d8a',
                        'service_id': '91a301e8-fad9-4a38-8f0f-17ed151b32d3',
                        'service_instance_id': '0839fe34-572d-4887-8c4f-51ebb3a7ad1e',
                        'name': 'sentimentapi',
                        'type_name': 'DOCKER',
                        'image': 'nalejpublic.azurecr.io/nalej/sentiment-api:v0.0.1',
                        'credentials': {
                            'username': 'username',
                            'password': 'redacted',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'sentimentport',
                                'internal_port': 8180,
                                'exposed_port': 8180
                            }
                        ],
                        'labels': {
                            'app': 'sentimentapi',
                            'component': 'sentiment-app'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'app_instance_id': '22b3a193-4635-491f-8bd2-e3be64cadf5e',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_group_instance_id': 'cb06ac08-041e-49d2-912e-ca08511f3d8a',
                        'service_id': '6db5237e-b762-4d02-a977-42b65aa8ed88',
                        'service_instance_id': 'f95314a2-f916-4f71-8881-1f6eb4e31a2f',
                        'name': 'elastic',
                        'type_name': 'DOCKER',
                        'image': 'docker.elastic.co/elasticsearch/elasticsearch:6.4.2',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'mount_path': '/usr/share/elasticsearch/data',
                                'type_name': 'EPHEMERAL'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'elasticport92',
                                'internal_port': 9200,
                                'exposed_port': 9200,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'elasticport93',
                                'internal_port': 9300,
                                'exposed_port': 9300
                            }
                        ],
                        'environment_variables': {
                            'ES_JAVA_OPTS': '-Xms512m -Xmx512m',
                            'bootstrap.memory_lock': 'true',
                            'cluster.name': 'elasticsearch',
                            'discovery.type': 'single-node'
                        },
                        'labels': {
                            'app': 'elastic',
                            'component': 'sentiment-app'
                        },
                        'deploy_after': [
                            'nifi'
                        ],
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'elastic-9200.cb06ac.22b3a1.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'app_instance_id': '22b3a193-4635-491f-8bd2-e3be64cadf5e',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_group_instance_id': 'cb06ac08-041e-49d2-912e-ca08511f3d8a',
                        'service_id': '02b6df31-6fa1-4f52-9ec3-ab08d6ba6d86',
                        'service_instance_id': 'aab0f015-1611-47d0-885c-6a0b6c452e9c',
                        'name': 'kibana',
                        'type_name': 'DOCKER',
                        'image': 'docker.elastic.co/kibana/kibana:6.4.2',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'kibanaport',
                                'internal_port': 5601,
                                'exposed_port': 5601,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'ELASTICSEARCH_URL': 'http://NALEJ_SERV_ELASTIC:9200'
                        },
                        'labels': {
                            'app': 'kibana',
                            'component': 'sentiment-app'
                        },
                        'deploy_after': [
                            'elastic'
                        ],
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'kibana-5601.cb06ac.22b3a1.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                    'app_instance_id': '22b3a193-4635-491f-8bd2-e3be64cadf5e',
                    'monitored_instance_id': 'cb06ac08-041e-49d2-912e-ca08511f3d8a',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '4331a1a2-7a58-484b-b206-d9e8ab503a45',
                        '0839fe34-572d-4887-8c4f-51ebb3a7ad1e',
                        'f95314a2-f916-4f71-8881-1f6eb4e31a2f',
                        'aab0f015-1611-47d0-885c-6a0b6c452e9c'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '0839fe34-572d-4887-8c4f-51ebb3a7ad1e': 'SERVICE_RUNNING',
                        '4331a1a2-7a58-484b-b206-d9e8ab503a45': 'SERVICE_RUNNING',
                        'aab0f015-1611-47d0-885c-6a0b6c452e9c': 'SERVICE_RUNNING',
                        'f95314a2-f916-4f71-8881-1f6eb4e31a2f': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '0839fe34-572d-4887-8c4f-51ebb3a7ad1e': '',
                        '4331a1a2-7a58-484b-b206-d9e8ab503a45': '',
                        'aab0f015-1611-47d0-885c-6a0b6c452e9c': '',
                        'f95314a2-f916-4f71-8881-1f6eb4e31a2f': ''
                    }
                },
                'global_fqdn': [
                    'elastic-9200.cb06ac.22b3a1.3bc6a816.ep.nalej55.nalej.tech',
                    'nifi-8080.cb06ac.22b3a1.3bc6a816.ep.nalej55.nalej.tech',
                    'kibana-5601.cb06ac.22b3a1.3bc6a816.ep.nalej55.nalej.tech'
                ]
            }
        ],
        'status_name': 'RUNNING'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
        'app_instance_id': '25209627-0c5b-4f90-bd19-9e3762a83c4d',
        'name': 'reping',
        'labels': {
            'app': 'ping'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
                'rule_id': '1f863fb5-6797-4d74-977a-31369d95ac16',
                'name': 'Expose a ping server',
                'target_service_name': 'ping',
                'target_port': 8989,
                'access_name': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
                'app_instance_id': '25209627-0c5b-4f90-bd19-9e3762a83c4d',
                'service_group_id': '33489f5a-cd92-418e-9470-dd5a6111a70f',
                'service_group_instance_id': '82591187-4dbf-4c50-96ce-3c407a404c9d',
                'name': 'group',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
                        'app_instance_id': '25209627-0c5b-4f90-bd19-9e3762a83c4d',
                        'service_group_id': '33489f5a-cd92-418e-9470-dd5a6111a70f',
                        'service_group_instance_id': '82591187-4dbf-4c50-96ce-3c407a404c9d',
                        'service_id': 'bb7651e4-1ad3-451e-a698-3b596faed329',
                        'service_instance_id': '903aca1e-8f4b-42af-987e-d15fb65489bf',
                        'name': 'ping',
                        'type_name': 'DOCKER',
                        'image': 'nalejpublic.azurecr.io/nalej/ping:v0.0.1',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8989,
                                'exposed_port': 8989
                            }
                        ],
                        'labels': {
                            'app': 'ping'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            '13.95.86.168'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31',
                        'run_arguments': [
                            'run'
                        ]
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
                    'app_instance_id': '25209627-0c5b-4f90-bd19-9e3762a83c4d',
                    'monitored_instance_id': '82591187-4dbf-4c50-96ce-3c407a404c9d',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '903aca1e-8f4b-42af-987e-d15fb65489bf'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '903aca1e-8f4b-42af-987e-d15fb65489bf': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '903aca1e-8f4b-42af-987e-d15fb65489bf': ''
                    }
                },
                'global_fqdn': [
                    'ping-8989.825911.252096.3bc6a816.ep.nalej55.nalej.tech'
                ]
            }
        ],
        'status_name': 'RUNNING'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
        'app_instance_id': '2f1424d1-112e-41ae-b4e7-8397d9ab4c82',
        'name': 'scatteredkuard01',
        'labels': {
            'app': 'scattered-kuard'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'rule_id': '50d0db9c-6add-4773-bbb5-4e2d75f1e1fa',
                'name': 'allow access to kuard web',
                'target_service_name': 'scattered-kuard-1',
                'target_port': 8080,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'rule_id': '73eed294-48d6-44af-8f83-5f7a1b935bee',
                'name': 'allow access to kuard web',
                'target_service_name': 'scattered-kuard-2',
                'target_port': 8080,
                'access_name': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'app_instance_id': '2f1424d1-112e-41ae-b4e7-8397d9ab4c82',
                'service_group_id': '705c5d4b-16b1-4b9a-9e7b-3b89559b39bb',
                'service_group_instance_id': '02e03b02-658f-4918-9c40-e6910b5f2133',
                'name': 'kuard-group-1',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                        'app_instance_id': '2f1424d1-112e-41ae-b4e7-8397d9ab4c82',
                        'service_group_id': '705c5d4b-16b1-4b9a-9e7b-3b89559b39bb',
                        'service_group_instance_id': '02e03b02-658f-4918-9c40-e6910b5f2133',
                        'service_id': '28b314bb-44d4-4073-8a4d-6b014bb5fe44',
                        'service_instance_id': 'fc04a1e8-1efd-446d-b6c4-33a070dc2917',
                        'name': 'scattered-kuard-1',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'scattered-kuard'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'scattered-kuard-1-8080.02e03b.2f1424.appcluster.app2.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'aebf82f3-72b9-4e9e-a0c2-aacb35f557e7'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                    'app_instance_id': '2f1424d1-112e-41ae-b4e7-8397d9ab4c82',
                    'monitored_instance_id': '02e03b02-658f-4918-9c40-e6910b5f2133',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        'fc04a1e8-1efd-446d-b6c4-33a070dc2917'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        'fc04a1e8-1efd-446d-b6c4-33a070dc2917': 'SERVICE_RUNNING'
                    },
                    'info': {
                        'fc04a1e8-1efd-446d-b6c4-33a070dc2917': ''
                    }
                },
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'cluster': 'app1'
                    }
                },
                'global_fqdn': [
                    'scattered-kuard-1-8080.02e03b.2f1424.3bc6a816.ep.nalej55.nalej.tech'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'app_instance_id': '2f1424d1-112e-41ae-b4e7-8397d9ab4c82',
                'service_group_id': 'fd431c7b-7931-45c0-8b5e-cf67f0ca0e78',
                'service_group_instance_id': '65be041c-689a-4a66-8939-b53c38424701',
                'name': 'kuard-group-2',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                        'app_instance_id': '2f1424d1-112e-41ae-b4e7-8397d9ab4c82',
                        'service_group_id': 'fd431c7b-7931-45c0-8b5e-cf67f0ca0e78',
                        'service_group_instance_id': '65be041c-689a-4a66-8939-b53c38424701',
                        'service_id': 'f4be6915-01af-4d37-be6f-91065143fd49',
                        'service_instance_id': '072850db-4744-4e86-986f-b89f5be6082e',
                        'name': 'scattered-kuard-2',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'scattered-kuard'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'scattered-kuard-2-8080.65be04.2f1424.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                    'app_instance_id': '2f1424d1-112e-41ae-b4e7-8397d9ab4c82',
                    'monitored_instance_id': '65be041c-689a-4a66-8939-b53c38424701',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '072850db-4744-4e86-986f-b89f5be6082e'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '072850db-4744-4e86-986f-b89f5be6082e': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '072850db-4744-4e86-986f-b89f5be6082e': ''
                    }
                },
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'cluster': 'app2'
                    }
                },
                'global_fqdn': [
                    'scattered-kuard-2-8080.65be04.2f1424.3bc6a816.ep.nalej55.nalej.tech'
                ]
            }
        ],
        'status_name': 'RUNNING'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
        'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
        'name': 'testee',
        'labels': {
            'app': 'wordpress'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'rule_id': 'fdb637c9-81c7-4196-a7fa-377dd5406bca',
                'name': 'allow access to wordpress',
                'target_service_name': 'simple-wordpress',
                'target_port': 80,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'rule_id': '79c8a5fb-4397-4a6c-8ba9-71bf35645ab3',
                'name': 'allow access to mysql',
                'target_service_name': 'simple-mysql',
                'target_port': 3306,
                'access_name': 'APP_SERVICES',
                'auth_service_group_name': 'group1',
                'auth_services': [
                    'simple-wordpress'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                'service_group_id': 'f42ec0ae-beec-414a-88da-0b244dcd50f6',
                'service_group_instance_id': 'a3727a51-5c85-44cc-a399-848a51487573',
                'name': 'group1',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                        'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                        'service_group_id': 'f42ec0ae-beec-414a-88da-0b244dcd50f6',
                        'service_group_instance_id': 'a3727a51-5c85-44cc-a399-848a51487573',
                        'service_id': '6fc508e1-d32a-445e-aa54-5b2d89e7ff2e',
                        'service_instance_id': '5f27cd80-ef74-4419-be2c-80a11aae5f04',
                        'name': 'simple-wordpress',
                        'type_name': 'DOCKER',
                        'image': 'wordpress:5.0.0',
                        'specs': {
                            'replicas': 1
                        },
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
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'simple-wordpress.a3727a.aec3b0.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                    'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                    'monitored_instance_id': 'a3727a51-5c85-44cc-a399-848a51487573',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '5f27cd80-ef74-4419-be2c-80a11aae5f04'
                    ],
                    'desired_replicas': 2,
                    'available_replicas': 2,
                    'status_name': {
                        '5f27cd80-ef74-4419-be2c-80a11aae5f04': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '5f27cd80-ef74-4419-be2c-80a11aae5f04': ''
                    }
                },
                'specs': {
                    'multi_cluster_replica': true
                },
                'global_fqdn': [
                    'simple-wordpress.a3727a.aec3b0.3bc6a816.ep.nalej55.nalej.tech'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                'service_group_id': 'f42ec0ae-beec-414a-88da-0b244dcd50f6',
                'service_group_instance_id': '9b49966f-8db6-4ffd-870e-c0c53d94aa93',
                'name': 'group1',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                        'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                        'service_group_id': 'f42ec0ae-beec-414a-88da-0b244dcd50f6',
                        'service_group_instance_id': '9b49966f-8db6-4ffd-870e-c0c53d94aa93',
                        'service_id': '6fc508e1-d32a-445e-aa54-5b2d89e7ff2e',
                        'service_instance_id': 'b0a5ee84-1a0d-4cd4-aa57-6c943e19d1ed',
                        'name': 'simple-wordpress',
                        'type_name': 'DOCKER',
                        'image': 'wordpress:5.0.0',
                        'specs': {
                            'replicas': 1
                        },
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
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'simple-wordpress.9b4996.aec3b0.appcluster.app2.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'aebf82f3-72b9-4e9e-a0c2-aacb35f557e7'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                    'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                    'monitored_instance_id': '9b49966f-8db6-4ffd-870e-c0c53d94aa93',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        'b0a5ee84-1a0d-4cd4-aa57-6c943e19d1ed'
                    ],
                    'desired_replicas': 2,
                    'available_replicas': 2,
                    'status_name': {
                        'b0a5ee84-1a0d-4cd4-aa57-6c943e19d1ed': 'SERVICE_RUNNING'
                    },
                    'info': {
                        'b0a5ee84-1a0d-4cd4-aa57-6c943e19d1ed': ''
                    }
                },
                'specs': {
                    'multi_cluster_replica': true
                },
                'global_fqdn': [
                    'simple-wordpress.9b4996.aec3b0.3bc6a816.ep.nalej55.nalej.tech'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                'service_group_id': 'c2abd98a-6c0a-4db3-a93c-4ab06b97ec08',
                'service_group_instance_id': 'aa92d3b4-aff3-4faf-971c-74a14ba2891f',
                'name': 'group2',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                        'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                        'service_group_id': 'c2abd98a-6c0a-4db3-a93c-4ab06b97ec08',
                        'service_group_instance_id': 'aa92d3b4-aff3-4faf-971c-74a14ba2891f',
                        'service_id': 'a553a2b7-3949-4df7-b276-dc5c0eedc4ca',
                        'service_instance_id': 'a5c607fc-ad05-48a5-bda1-7b2cc33becfc',
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
                        'status_name': 'SERVICE_RUNNING',
                        'deployed_on_cluster_id': 'aebf82f3-72b9-4e9e-a0c2-aacb35f557e7'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                    'app_instance_id': 'aec3b003-0277-47fa-ae16-3e8ab01769e1',
                    'monitored_instance_id': 'aa92d3b4-aff3-4faf-971c-74a14ba2891f',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        'a5c607fc-ad05-48a5-bda1-7b2cc33becfc'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        'a5c607fc-ad05-48a5-bda1-7b2cc33becfc': 'SERVICE_RUNNING'
                    },
                    'info': {
                        'a5c607fc-ad05-48a5-bda1-7b2cc33becfc': ''
                    }
                }
            }
        ],
        'status_name': 'RUNNING'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '6b6cd2a4-8142-46ef-91e1-f007ac2939ed',
        'app_instance_id': 'b4b03f50-f296-4ffc-bcba-5397a73b93e4',
        'name': 'testPara',
        'labels': {
            'app': 'virtualdevice'
        },
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '6b6cd2a4-8142-46ef-91e1-f007ac2939ed',
                'app_instance_id': 'b4b03f50-f296-4ffc-bcba-5397a73b93e4',
                'service_group_id': 'ab38df02-539b-4241-a2d9-b99d1ad9db08',
                'service_group_instance_id': '4826cf79-57be-4cca-b29e-8ddd69b4d728',
                'name': 'virtualdevices',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '6b6cd2a4-8142-46ef-91e1-f007ac2939ed',
                        'app_instance_id': 'b4b03f50-f296-4ffc-bcba-5397a73b93e4',
                        'service_group_id': 'ab38df02-539b-4241-a2d9-b99d1ad9db08',
                        'service_group_instance_id': '4826cf79-57be-4cca-b29e-8ddd69b4d728',
                        'service_id': 'e7f49fd3-edb3-4b7d-93c8-a1fa645fe998',
                        'service_instance_id': '19cd54bd-f592-4c56-98db-62ff85a819c4',
                        'name': 'virtualdevice',
                        'type_name': 'DOCKER',
                        'image': 'nalejpublic.azurecr.io/nalej/virtualdevice:v0.3.0',
                        'credentials': {
                            'username': 'b69be5be-9347-4abe-9cf5-bacbade23580',
                            'password': 'redacted',
                            'email': 'gdiaz@nalej.com',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'environment_variables': {
                            'DEVICE_GROUP_API_KEY': '00000000-0000-0000-0000-000000000000',
                            'DEVICE_GROUP_ID': '00000000-0000-0000-0000-000000000000',
                            'DEVICE_GROUP_NAME': 'deviceGroupName',
                            'NALEJ_PLATFORM': 'xxx.xx.com',
                            'ORGANIZATION_ID': '00000000-0000-0000-0000-000000000000'
                        },
                        'labels': {
                            'app': 'virtualdevice'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': '6b6cd2a4-8142-46ef-91e1-f007ac2939ed',
                    'app_instance_id': 'b4b03f50-f296-4ffc-bcba-5397a73b93e4',
                    'monitored_instance_id': '4826cf79-57be-4cca-b29e-8ddd69b4d728',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '19cd54bd-f592-4c56-98db-62ff85a819c4'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '19cd54bd-f592-4c56-98db-62ff85a819c4': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '19cd54bd-f592-4c56-98db-62ff85a819c4': ''
                    }
                },
                'specs': {
                    'replicas': 1
                }
            }
        ],
        'status_name': 'RUNNING'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
        'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
        'name': 'gaizkuarduple',
        'labels': {
            'app': 'gaizkuarduple'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': 'f0a8ba4e-9f3b-44c0-9772-f19023ecdc00',
                'name': 'allow access to kuard web',
                'target_service_name': 'kuard1',
                'target_port': 8080,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': '7545a54c-2dc1-4aca-8b1a-d43733e3868c',
                'name': 'allow access to kuard web',
                'target_service_name': 'kuard2',
                'target_port': 8080,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': '49f980c7-703a-45d2-875e-eaf37695e997',
                'name': 'allow access to kuard web',
                'target_service_name': 'kuard3',
                'target_port': 8080,
                'access_name': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': 'c9b92a00-a4c1-4052-a4d5-a893bcdbc64f',
                'name': 'allow access to kuard web',
                'target_service_name': 'kuard4',
                'target_port': 8080,
                'access_name': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                'service_group_id': '2584c18b-f903-4445-8bfb-55f8c4af118f',
                'service_group_instance_id': '85a2da9c-eb88-4fbe-a1a0-73f57c6b548b',
                'name': 'kuard-group-1',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                        'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                        'service_group_id': '2584c18b-f903-4445-8bfb-55f8c4af118f',
                        'service_group_instance_id': '85a2da9c-eb88-4fbe-a1a0-73f57c6b548b',
                        'service_id': '35ad5dfb-7b3f-4ad8-ad8d-9846c6eff3ef',
                        'service_instance_id': '2b13b03e-bda4-431c-ab8f-f18785dc764a',
                        'name': 'kuard1',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard1'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'kuard1-8080.85a2da.f5f582.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                        'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                        'service_group_id': '2584c18b-f903-4445-8bfb-55f8c4af118f',
                        'service_group_instance_id': '85a2da9c-eb88-4fbe-a1a0-73f57c6b548b',
                        'service_id': '1351718a-350d-4615-a045-9d7bfa58e3b7',
                        'service_instance_id': '54e490d8-0d4d-4b31-a1c1-fd1c03825aa1',
                        'name': 'kuard2',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard2'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'kuard2-8080.85a2da.f5f582.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                    'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                    'monitored_instance_id': '85a2da9c-eb88-4fbe-a1a0-73f57c6b548b',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '2b13b03e-bda4-431c-ab8f-f18785dc764a',
                        '54e490d8-0d4d-4b31-a1c1-fd1c03825aa1'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '2b13b03e-bda4-431c-ab8f-f18785dc764a': 'SERVICE_RUNNING',
                        '54e490d8-0d4d-4b31-a1c1-fd1c03825aa1': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '2b13b03e-bda4-431c-ab8f-f18785dc764a': '',
                        '54e490d8-0d4d-4b31-a1c1-fd1c03825aa1': ''
                    }
                },
                'global_fqdn': [
                    'kuard1-8080.85a2da.f5f582.3bc6a816.ep.nalej55.nalej.tech',
                    'kuard2-8080.85a2da.f5f582.3bc6a816.ep.nalej55.nalej.tech'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                'service_group_id': 'a3feb883-7ff9-46e6-a191-1b45ec5f906e',
                'service_group_instance_id': '7e9c9089-1440-4a6a-8601-8c9054411b5f',
                'name': 'kuard-group-2',
                'service_instances': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                        'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                        'service_group_id': 'a3feb883-7ff9-46e6-a191-1b45ec5f906e',
                        'service_group_instance_id': '7e9c9089-1440-4a6a-8601-8c9054411b5f',
                        'service_id': '9f88b50f-7bbb-4e6e-b34a-2635a1d8940c',
                        'service_instance_id': '31b2e2ab-cefa-4520-9d51-0d6c482170fb',
                        'name': 'kuard3',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard3'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'kuard3-8080.7e9c90.f5f582.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                        'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                        'service_group_id': 'a3feb883-7ff9-46e6-a191-1b45ec5f906e',
                        'service_group_instance_id': '7e9c9089-1440-4a6a-8601-8c9054411b5f',
                        'service_id': '3d365b86-e73b-4ddd-8b85-de8f23203b50',
                        'service_instance_id': 'fb9ab4fb-75ab-4333-9e4c-56b3fc9e1093',
                        'name': 'kuard4',
                        'type_name': 'DOCKER',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type_name': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard4'
                        },
                        'status_name': 'SERVICE_RUNNING',
                        'endpoints': [
                            'kuard4-8080.7e9c90.f5f582.appcluster.app1.nalej55.nalej.tech'
                        ],
                        'deployed_on_cluster_id': 'a6e875a9-7350-43f1-b46e-17f17ad51d31'
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'metadata': {
                    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                    'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                    'app_instance_id': 'f5f582c7-4134-4944-a149-0c9f19df00c9',
                    'monitored_instance_id': '7e9c9089-1440-4a6a-8601-8c9054411b5f',
                    'type_name': 'SERVICE_GROUP_INSTANCE',
                    'instances_id': [
                        '31b2e2ab-cefa-4520-9d51-0d6c482170fb',
                        'fb9ab4fb-75ab-4333-9e4c-56b3fc9e1093'
                    ],
                    'desired_replicas': 1,
                    'available_replicas': 1,
                    'status_name': {
                        '31b2e2ab-cefa-4520-9d51-0d6c482170fb': 'SERVICE_RUNNING',
                        'fb9ab4fb-75ab-4333-9e4c-56b3fc9e1093': 'SERVICE_RUNNING'
                    },
                    'info': {
                        '31b2e2ab-cefa-4520-9d51-0d6c482170fb': '',
                        'fb9ab4fb-75ab-4333-9e4c-56b3fc9e1093': ''
                    }
                },
                'global_fqdn': [
                    'kuard3-8080.7e9c90.f5f582.3bc6a816.ep.nalej55.nalej.tech',
                    'kuard4-8080.7e9c90.f5f582.3bc6a816.ep.nalej55.nalej.tech'
                ]
            }
        ],
        'status_name': 'RUNNING'
    }
];

/**
 * Mocked registered apps list (descriptors) - fields still not defined
 */
export const mockRegisteredAppsList = [
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
        'name': 'Twitter sentiment analysis tool',
        'labels': {
            'app': 'sentiment-app'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': '99f06fb7-b96e-4ab0-ab10-68a2fbfd245a',
                'name': 'NIFI Web UI public access',
                'target_service_group_name': 'sentiment',
                'target_service_name': 'nifi',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': 'dc529031-c640-4c62-b92d-64c898a7dce9',
                'name': 'Elastic public access',
                'target_service_group_name': 'sentiment',
                'target_service_name': 'elastic',
                'target_port': 9200,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': 'cee2ef09-e8be-4d1c-8d9a-1f5683b5c687',
                'name': 'Kibana public access',
                'target_service_group_name': 'sentiment',
                'target_service_name': 'kibana',
                'target_port': 5601,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': '336ba591-d214-42aa-b4c9-3e4112c626a3',
                'name': 'Allow access to sentiment API 8180',
                'target_service_group_name': 'sentiment',
                'target_service_name': 'sentimentapi',
                'target_port': 8180,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'sentiment',
                'auth_services': [
                    'nifi'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': '55bdab41-8929-4342-b14c-c7f5d8d4d332',
                'name': 'Allow access to elastic 9200',
                'target_service_group_name': 'sentiment',
                'target_service_name': 'elastic',
                'target_port': 9200,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'sentiment',
                'auth_services': [
                    'kibana',
                    'nifi'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'rule_id': 'b310ce09-a392-4747-b22b-2437464a8f57',
                'name': 'Allow access to elastic 9300',
                'target_service_group_name': 'sentiment',
                'target_service_name': 'elastic',
                'target_port': 9300,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'sentiment',
                'auth_services': [
                    'kibana',
                    'nifi'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                'name': 'sentiment',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_id': 'f247a865-f661-40ee-89ce-acd48702ed78',
                        'name': 'nifi',
                        'image': 'nalejpublic.azurecr.io/nalej/sentimentnifi:v0.0.1',
                        'credentials': {
                            'username': 'username',
                            'password': 'password',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'nifiport',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'KAFKA_BROKER': 'NALEJ_SERV_KAFKASVC'
                        },
                        'labels': {
                            'app': 'nifi',
                            'component': 'sentiment-app'
                        }
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_id': '91a301e8-fad9-4a38-8f0f-17ed151b32d3',
                        'name': 'sentimentapi',
                        'image': 'nalejpublic.azurecr.io/nalej/sentiment-api:v0.0.1',
                        'credentials': {
                            'username': 'username',
                            'password': 'password',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'sentimentport',
                                'internal_port': 8180,
                                'exposed_port': 8180
                            }
                        ],
                        'labels': {
                            'app': 'sentimentapi',
                            'component': 'sentiment-app'
                        }
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_id': '6db5237e-b762-4d02-a977-42b65aa8ed88',
                        'name': 'elastic',
                        'image': 'docker.elastic.co/elasticsearch/elasticsearch:6.4.2',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'mount_path': '/usr/share/elasticsearch/data'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'elasticport92',
                                'internal_port': 9200,
                                'exposed_port': 9200,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'elasticport93',
                                'internal_port': 9300,
                                'exposed_port': 9300
                            }
                        ],
                        'environment_variables': {
                            'ES_JAVA_OPTS': '-Xms512m -Xmx512m',
                            'bootstrap.memory_lock': 'true',
                            'cluster.name': 'elasticsearch',
                            'discovery.type': 'single-node'
                        },
                        'labels': {
                            'app': 'elastic',
                            'component': 'sentiment-app'
                        },
                        'deploy_after': [
                            'nifi'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0e1e828a-14b5-4d80-8471-b7130216af2d',
                        'service_group_id': '2ca3fb09-4c6f-40d0-a5c7-9bd5dc9a9d9d',
                        'service_id': '02b6df31-6fa1-4f52-9ec3-ab08d6ba6d86',
                        'name': 'kibana',
                        'image': 'docker.elastic.co/kibana/kibana:6.4.2',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'kibanaport',
                                'internal_port': 5601,
                                'exposed_port': 5601,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'ELASTICSEARCH_URL': 'http://NALEJ_SERV_ELASTIC:9200'
                        },
                        'labels': {
                            'app': 'kibana',
                            'component': 'sentiment-app'
                        },
                        'deploy_after': [
                            'elastic'
                        ]
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
        'name': 'Scattered Kuard',
        'labels': {
            'app': 'scattered-kuard'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'rule_id': '50d0db9c-6add-4773-bbb5-4e2d75f1e1fa',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-group-1',
                'target_service_name': 'scattered-kuard-1',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'rule_id': '73eed294-48d6-44af-8f83-5f7a1b935bee',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-group-2',
                'target_service_name': 'scattered-kuard-2',
                'target_port': 8080,
                'access': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'service_group_id': '705c5d4b-16b1-4b9a-9e7b-3b89559b39bb',
                'name': 'kuard-group-1',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                        'service_group_id': '705c5d4b-16b1-4b9a-9e7b-3b89559b39bb',
                        'service_id': '28b314bb-44d4-4073-8a4d-6b014bb5fe44',
                        'name': 'scattered-kuard-1',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'scattered-kuard'
                        }
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'cluster': 'app1'
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                'service_group_id': 'fd431c7b-7931-45c0-8b5e-cf67f0ca0e78',
                'name': 'kuard-group-2',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '0f8c5c70-a7c7-44d3-b3ff-53c0472886ba',
                        'service_group_id': 'fd431c7b-7931-45c0-8b5e-cf67f0ca0e78',
                        'service_id': 'f4be6915-01af-4d37-be6f-91065143fd49',
                        'name': 'scattered-kuard-2',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'scattered-kuard'
                        }
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'cluster': 'app2'
                    }
                }
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
        'name': 'Thingsboard application DEV',
        'labels': {
            'app': 'thingsboard-app'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '73fda8ba-c4f7-49b5-8f6c-e5d0e08b3aad',
                'name': 'Web UI open',
                'target_service_group_name': 'core',
                'target_service_name': 'tbwebui',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': 'e57811c6-ec9c-46be-a522-cdf55713ace3',
                'name': 'Allow access to tbwebui from core',
                'target_service_group_name': 'core',
                'target_service_name': 'tbwebui',
                'target_port': 8080,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'inittbservice'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '9f96560c-a345-46fb-ae31-cb5e22b0f9f7',
                'name': 'Allow access to tbwebui from gateway',
                'target_service_group_name': 'core',
                'target_service_name': 'tbwebui',
                'target_port': 8080,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'gateway',
                'auth_services': [
                    'tbgateway'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '19d980e6-c141-400b-b42e-fc73d6badc63',
                'name': 'Allow access to zookeeper',
                'target_service_group_name': 'core',
                'target_service_name': 'zookeeper',
                'target_port': 2181,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'kafkasvc',
                    'tbnode'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': 'ead904dc-cb7f-4225-b597-8f7393a81469',
                'name': 'Allow access to Kafka',
                'target_service_group_name': 'core',
                'target_service_name': 'kafkasvc',
                'target_port': 9092,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'tbjsexecutor',
                    'tbmqtttransport',
                    'tbnode'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': 'b2a09f80-e50c-42e6-b37c-3cb69a532e3e',
                'name': 'Allow access to Redis',
                'target_service_group_name': 'core',
                'target_service_name': 'redis',
                'target_port': 6379,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'tbnode'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '6c2b081c-215b-4816-8ab6-80ed365049f1',
                'name': 'Allow access to cassandra',
                'target_service_group_name': 'core',
                'target_service_name': 'cassandra',
                'target_port': 2181,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'tbnode'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '8dafb5a0-e5c7-48ef-bd55-f29e2a7cfd8e',
                'name': 'Allow access to tbmqtttransport from core',
                'target_service_group_name': 'core',
                'target_service_name': 'tbmqtttransport',
                'target_port': 1883,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'kafkasvc'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': 'bc148391-22d8-4b40-9dde-96656a8dbb99',
                'name': 'Allow access to tbmqtttransport from gateway',
                'target_service_group_name': 'core',
                'target_service_name': 'tbmqtttransport',
                'target_port': 1883,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'gateway',
                'auth_services': [
                    'tbgateway'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '1fe3c109-5dc4-409f-bbaf-6b5d8eba38ce',
                'name': 'Allow access to tb-node',
                'target_service_group_name': 'core',
                'target_service_name': 'tbnode',
                'target_port': 8080,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'zookeeper',
                    'redis',
                    'tbwebui'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '1180944e-5c09-427f-a924-a21aab00d472',
                'name': 'Allow access to thingsboard gateway',
                'target_service_group_name': 'gateway',
                'target_service_name': 'tbgateway',
                'target_port': 9090,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'gateway',
                'auth_services': [
                    'mqtt'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'rule_id': '645a02b2-edb3-4f28-8219-e6f990fb5e1a',
                'name': 'allow access to mqtt from device groups',
                'target_service_group_name': 'gateway',
                'target_service_name': 'mqtt',
                'target_port': 1883,
                'access': 'DEVICE_GROUP',
                'device_group_names': [
                    'group1'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                'name': 'core',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': '8b3fc6c5-c9ef-441a-b54e-78eb74e895f8',
                        'name': 'zookeeper',
                        'image': 'zookeeper:3.5',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'zookeeper-port',
                                'internal_port': 2181,
                                'exposed_port': 2181
                            }
                        ],
                        'environment_variables': {
                            'ZOO_MY_ID': '1',
                            'ZOO_SERVERS': 'server.1=0.0.0.0:2888:3888;0.0.0.0:2181'
                        },
                        'labels': {
                            'app': 'zookeeper',
                            'component': 'thingsboard-app'
                        }
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': '8a0aa900-f24b-4e74-addc-d784e2ae87ad',
                        'name': 'kafkasvc',
                        'image': 'wurstmeister/kafka',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'kafka-port',
                                'internal_port': 9092,
                                'exposed_port': 9092
                            }
                        ],
                        'environment_variables': {
                            'KAFKA_ADVERTISED_LISTENERS': 'INSIDE://:9093,OUTSIDE://NALEJ_SERV_KAFKASVC:9092',
                            'KAFKA_AUTO_CREATE_TOPICS_ENABLE': 'false',
                            // tslint:disable-next-line:max-line-length
                            'KAFKA_CREATE_TOPICS': 'js.eval.requests:100:1:delete --config=retention.ms=60000 --config=segment.bytes=26214400\n  --config=retention.bytes=104857600,tb.transport.api.requests:30:1:delete --config=retention.ms=60000\n  --config=segment.bytes=26214400 --config=retention.bytes=104857600,tb.rule-engine:30:1:delete\n  --config=retention.ms=60000 --config=segment.bytes=26214400 --config=retention.bytes=104857600',
                            'KAFKA_INTER_BROKER_LISTENER_NAME': 'INSIDE',
                            'KAFKA_LISTENERS': 'INSIDE://:9093,OUTSIDE://:9092',
                            'KAFKA_LISTENER_SECURITY_PROTOCOL_MAP': 'INSIDE:PLAINTEXT,OUTSIDE:PLAINTEXT',
                            'KAFKA_LOG_CLEANUP_POLICY': 'delete',
                            'KAFKA_LOG_RETENTION_BYTES': '1073741824',
                            'KAFKA_LOG_RETENTION_MS': '300000',
                            'KAFKA_LOG_SEGMENT_BYTES': '268435456',
                            'KAFKA_ZOOKEEPER_CONNECT': 'NALEJ_SERV_ZOOKEEPER:2181'
                        },
                        'labels': {
                            'app': 'kafkasvc',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'zookeeper'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': '836f06e0-9323-405c-b8a3-992fe1fe0784',
                        'name': 'redis',
                        'image': 'redis:4.0',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'redis-port',
                                'internal_port': 6379,
                                'exposed_port': 6379
                            }
                        ],
                        'labels': {
                            'app': 'redis',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'kafkasvc'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': '755ba94c-70ea-46d3-afdc-44fdcee7619a',
                        'name': 'cassandra',
                        'image': 'cassandra:3.11.3',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '5368709120',
                                'mount_path': '/var/lib/cassandra',
                                'type': 'CLUSTER_LOCAL'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'cassandra-port',
                                'internal_port': 9042,
                                'exposed_port': 9042
                            }
                        ],
                        'labels': {
                            'app': 'cassandra',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'redis'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': '385eff15-c6f9-4ca6-aa47-753d853f30b3',
                        'name': 'tbjsexecutor',
                        'image': 'thingsboard/tb-js-executor:latest',
                        'specs': {
                            'replicas': 1
                        },
                        'environment_variables': {
                            'DOCKER_MODE': 'true',
                            'LOGGER_FILENAME': 'tbjsexecutor-%DATE%.log',
                            'LOGGER_LEVEL': 'info',
                            'LOG_FOLDER': 'logs',
                            'REMOTE_JS_EVAL_REQUEST_TOPIC': 'js.eval.requests',
                            'TB_KAFKA_SERVERS': 'NALEJ_SERV_KAFKASVC:9092'
                        },
                        'labels': {
                            'app': 'tbjsexecutor',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'cassandra'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': '11be577f-d265-4007-9246-8b854a677f9e',
                        'name': 'tbmqtttransport',
                        'image': 'nalejpublic.azurecr.io/nalej/tbmqtttransport:v0.0.1',
                        'credentials': {
                            'username': 'b69be5be-9347-4abe-9cf5-bacbade23580',
                            'password': '6b2a7c3a-ba7a-4de1-98ae-92741ef2dae9',
                            'email': 'cdelope@daisho.group',
                            'docker_repository': 'https://nalejdev.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'tb-mqtt-port',
                                'internal_port': 1883,
                                'exposed_port': 1883
                            }
                        ],
                        'environment_variables': {
                            'CLUSTER_NODE_ID': 'NALEJ_SERV_TBMQTTTRANSPORT',
                            'MQTT_BIND_ADDRESS': '0.0.0.0',
                            'MQTT_BIND_PORT': '1883',
                            'MQTT_TIMEOUT': '10000',
                            'TB_HOST': 'NALEJ_SERV_TBMQTTTRANSPORT',
                            'TB_KAFKA_SERVERS': 'NALEJ_SERV_KAFKASVC:9092'
                        },
                        'labels': {
                            'app': 'tbmqtttransport',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'cassandra'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': 'b52d849c-5f07-4a02-8315-e9e94af4e649',
                        'name': 'tbnode',
                        'image': 'nalejpublic.azurecr.io/nalej/tbnode:v0.0.1',
                        'credentials': {
                            'username': 'b69be5be-9347-4abe-9cf5-bacbade23580',
                            'password': '6b2a7c3a-ba7a-4de1-98ae-92741ef2dae9',
                            'email': 'cdelope@daisho.group',
                            'docker_repository': 'https://nalejdev.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'tb-node-port',
                                'internal_port': 8080,
                                'exposed_port': 8080
                            }
                        ],
                        'environment_variables': {
                            'CACHE_TYPE': 'redis',
                            'CASSANDRA_URL': 'NALEJ_SERV_CASSANDRA:9042',
                            'CLUSTER_NODE_ID': 'NALEJ_SERV_TBNODE',
                            'DATABASE_ENTITIES_TYPE': 'cassandra',
                            'DATABASE_TS_TYPE': 'cassandra',
                            'HTTP_LOG_CONTROLLER_ERROR_STACK_TRACE': 'false',
                            'INSTALL_TB': 'false',
                            'JS_EVALUATOR': 'remote',
                            'LOAD_DEMO': 'false',
                            'REDIS_HOST': 'NALEJ_SERV_REDIS',
                            'REDIS_PORT': '6379',
                            'RPC_HOST': 'NALEJ_SERV_TBNODE',
                            'TB_HOST': 'NALEJ_SERV_TBNODE',
                            'TB_KAFKA_SERVERS': 'NALEJ_SERV_KAFKASVC:9092',
                            'TRANSPORT_TYPE': 'remote',
                            'ZOOKEEPER_ENABLED': 'true',
                            'ZOOKEEPER_URL': 'NALEJ_SERV_ZOOKEEPER:2181'
                        },
                        'labels': {
                            'app': 'tbnode',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'tbmqtttransport'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': '315c207c-41be-41eb-b9a8-42d508f07cd7',
                        'name': 'tbwebui',
                        'image': 'thingsboard/tb-web-ui:latest',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'tb-web-ui-port',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'DOCKER_MODE': 'true',
                            'HTTP_BIND_ADDRESS': '0.0.0.0',
                            'HTTP_BIND_PORT': '8080',
                            'LOGGER_FILENAME': 'tb-web-ui-%DATE%.log',
                            'LOGGER_LEVEL': 'info',
                            'LOG_FOLDER': 'logs',
                            'TB_ENABLE_PROXY': 'true',
                            'TB_HOST': 'NALEJ_SERV_TBNODE'
                        },
                        'labels': {
                            'app': 'tbwebui',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'tbnode'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '8d2b7398-7ccd-4cd4-b010-1b83021111d6',
                        'service_id': 'b8adad00-cd12-486a-af85-e30d04be9cc9',
                        'name': 'inittbservice',
                        'image': 'nalejpublic.azurecr.io/nalej/inittbservice:v0.0.1',
                        'credentials': {
                            'username': 'b69be5be-9347-4abe-9cf5-bacbade23580',
                            'password': '6b2a7c3a-ba7a-4de1-98ae-92741ef2dae9',
                            'email': 'cdelope@daisho.group',
                            'docker_repository': 'https://nalejdev.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'labels': {
                            'app': 'inittbservice',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'tbwebui'
                        ]
                    }
                ],
                'specs': {
                    'replicas': 1,
                    'deployment_selectors': {
                        'cloud': 'azure'
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                'service_group_id': '34c5d903-d33d-4353-b4e1-0f303819ab31',
                'name': 'gateway',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '34c5d903-d33d-4353-b4e1-0f303819ab31',
                        'service_id': '0d47e221-6a14-40c0-89fb-fcdfe5d121d9',
                        'name': 'tbgateway',
                        'image': 'nalejpublic.azurecr.io/nalej/tbgateway:v0.0.1',
                        'credentials': {
                            'username': 'b69be5be-9347-4abe-9cf5-bacbade23580',
                            'password': '6b2a7c3a-ba7a-4de1-98ae-92741ef2dae9',
                            'email': 'cdelope@daisho.group',
                            'docker_repository': 'https://nalejdev.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'tbgateway-port',
                                'internal_port': 9090,
                                'exposed_port': 9090
                            }
                        ],
                        'environment_variables': {
                            'GATEWAY_ACCESS_TOKEN': 'gateway_token',
                            'GATEWAY_HOST': 'NALEJ_SERV_TBMQTTTRANSPORT'
                        },
                        'labels': {
                            'app': 'tbgateway',
                            'component': 'thingsboard-app'
                        },
                        'deploy_after': [
                            'mqtt'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '20517b7b-4b23-4a55-b9ef-749a75cd97a0',
                        'service_group_id': '34c5d903-d33d-4353-b4e1-0f303819ab31',
                        'service_id': 'f4ee777c-3fc7-467a-a139-c12515d4a712',
                        'name': 'mqtt',
                        'image': 'nalejpublic.azurecr.io/nalej/vernemq:v0.0.1',
                        'credentials': {
                            'username': 'b69be5be-9347-4abe-9cf5-bacbade23580',
                            'password': '6b2a7c3a-ba7a-4de1-98ae-92741ef2dae9',
                            'email': 'cdelope@daisho.group',
                            'docker_repository': 'https://nalejdev.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'mqtt-port',
                                'internal_port': 1883,
                                'exposed_port': 1883
                            },
                            {
                                'name': 'status-port',
                                'internal_port': 8888,
                                'exposed_port': 8888
                            }
                        ],
                        'environment_variables': {
                            'NALEJ_TRUSTED_HOST': 'NALEJ_SERV_TBGATEWAY',
                            'NALEJ_TRUSTED_PASSWORD': 'NALEJ_SERV_TBGATEWAY',
                            'NALEJ_TRUSTED_USER': 'tbgateway'
                        },
                        'labels': {
                            'app': 'ingestion-layer',
                            'component': 'thingsboard-app'
                        }
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true
                }
            }
        ],
        'parameters': [
            {
                'name': 'deviceGroupName',
                'description': 'device group name',
                'path': 'rules.11.device_group_names.0',
                'type': 'STRING',
                'default_value': 'group1'
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '37c087d2-40b9-4359-9ffe-39b3871673e5',
        'name': 'Gitlab',
        'labels': {
            'app': 'gitlab'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '37c087d2-40b9-4359-9ffe-39b3871673e5',
                'rule_id': 'cea4da47-6b2e-4fcb-8a97-cbb5b7a0c762',
                'name': 'allow access to gitlab http',
                'target_service_group_name': 'gitlab-group',
                'target_service_name': 'gitlab',
                'target_port': 80,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '37c087d2-40b9-4359-9ffe-39b3871673e5',
                'rule_id': '911659dd-9c76-4dec-965e-a3834056ec3f',
                'name': 'allow access to gitlab ssh',
                'target_service_group_name': 'gitlab-group',
                'target_service_name': 'gitlab',
                'target_port': 22,
                'access': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '37c087d2-40b9-4359-9ffe-39b3871673e5',
                'service_group_id': 'c94ab472-4f5e-46cb-8f57-0d346a4bd98e',
                'name': 'gitlab-group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '37c087d2-40b9-4359-9ffe-39b3871673e5',
                        'service_group_id': 'c94ab472-4f5e-46cb-8f57-0d346a4bd98e',
                        'service_id': 'da1452af-d0f0-4888-b3dd-f654aadd6c61',
                        'name': 'gitlab',
                        'image': 'gitlab/gitlab-ce:11.8.6-ce.0',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '1040857600',
                                'mount_path': '/etc/gitlab'
                            },
                            {
                                'size': '1040857600',
                                'mount_path': '/var/log/gitlab'
                            },
                            {
                                'size': '1040857600',
                                'mount_path': '/var/opt/gitlab'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'http',
                                'internal_port': 80,
                                'exposed_port': 80,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'ssh',
                                'internal_port': 22,
                                'exposed_port': 22
                            }
                        ],
                        'labels': {
                            'app': 'gitlab'
                        }
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
        'name': 'Topology analysis',
        'labels': {
            'app': 'topology-analytics'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'rule_id': 'd2f83dd9-e3a2-480b-bef7-2e3e1e13bccd',
                'name': 'allow access to dash server',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 80,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'rule_id': '4474bbc0-77aa-401c-a342-159e2a915f0f',
                'name': 'allow access to master',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 8888,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'slave1',
                'auth_services': [
                    'slave1'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'rule_id': 'cf763476-851c-4003-8c38-6ba269594e8a',
                'name': 'allow access to master for slave2',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 8888,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'slave2',
                'auth_services': [
                    'slave2'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'rule_id': '8788b5c2-10dd-4663-92d1-652a2627c081',
                'name': 'allow access to master for slave3',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 8888,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'slave3',
                'auth_services': [
                    'slave3'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'service_group_id': '4899ac47-a5ca-46ef-8a6d-85b1a8872ddd',
                'name': 'master',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                        'service_group_id': '4899ac47-a5ca-46ef-8a6d-85b1a8872ddd',
                        'service_id': 'f11e7d62-d43b-4f4b-98d5-cc3b36e8f347',
                        'name': 'master',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.2',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'dashport',
                                'internal_port': 80,
                                'exposed_port': 80,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'masterport',
                                'internal_port': 8888,
                                'exposed_port': 8888,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'run_arguments': [
                            '--type master'
                        ]
                    }
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'service_group_id': '61e4eb08-1128-4b42-bb62-5871a4cfb535',
                'name': 'slave1',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                        'service_group_id': '61e4eb08-1128-4b42-bb62-5871a4cfb535',
                        'service_id': 'b259a584-5209-4e2b-a218-7e8df991ecb6',
                        'name': 'slave1',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.2',
                        'specs': {
                            'replicas': 1
                        },
                        'run_arguments': [
                            '--type slave',
                            '--labels slave1'
                        ]
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'slave1': 'true'
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'service_group_id': '23a0e724-08b2-4e18-929e-9bb342e95ef5',
                'name': 'slave2',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                        'service_group_id': '23a0e724-08b2-4e18-929e-9bb342e95ef5',
                        'service_id': 'e38636b5-d3dc-4ca4-81c0-b537b538de65',
                        'name': 'slave2',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.2',
                        'specs': {
                            'replicas': 1
                        },
                        'run_arguments': [
                            '--type slave',
                            '--labels slave2'
                        ]
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'slave2': 'true'
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                'service_group_id': 'a2cd14e4-6352-4527-a3ac-43e385b2ad9b',
                'name': 'slave3',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '3ec10cf0-ad46-4ab0-913f-9738a49bfb72',
                        'service_group_id': 'a2cd14e4-6352-4527-a3ac-43e385b2ad9b',
                        'service_id': '3f4d5b5b-1d48-4893-a085-6e7ca68eb728',
                        'name': 'slave3',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.1',
                        'specs': {
                            'replicas': 1
                        },
                        'run_arguments': [
                            '--type slave',
                            '--labels slave3'
                        ]
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'slave3': 'true'
                    }
                }
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '3f17ee95-6d36-4f98-87d6-d0249e0983fb',
        'name': 'Plex Media Server',
        'labels': {
            'app': 'plex-media-server'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3f17ee95-6d36-4f98-87d6-d0249e0983fb',
                'rule_id': 'c467947e-8584-47b3-be65-16403e42475a',
                'name': 'allow access to plex media server',
                'target_service_group_name': 'pms-group',
                'target_service_name': 'pms-svc',
                'target_port': 32400,
                'access': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '3f17ee95-6d36-4f98-87d6-d0249e0983fb',
                'service_group_id': 'b64a6db6-d172-4224-9bdc-33935b135621',
                'name': 'pms-group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '3f17ee95-6d36-4f98-87d6-d0249e0983fb',
                        'service_group_id': 'b64a6db6-d172-4224-9bdc-33935b135621',
                        'service_id': 'b903867e-3a53-40c3-a6f7-447141efeb5d',
                        'name': 'pms-svc',
                        'image': 'plexinc/pms-docker',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '100057600',
                                'mount_path': '/config'
                            },
                            {
                                'size': '100057600',
                                'mount_path': '/data'
                            },
                            {
                                'size': '100057600',
                                'mount_path': '/transcode'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'pms-port',
                                'internal_port': 32400,
                                'exposed_port': 32400,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'PUBLIC_IP': 'http://NALEJ_SERV_PMS-SVC:32400/'
                        },
                        'labels': {
                            'app': 'plex'
                        }
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '619ed2b4-2db1-46c5-bacf-9839e40316e3',
        'name': 'Simple wordpress dhiguero',
        'labels': {
            'app': 'simple-wordpress'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '619ed2b4-2db1-46c5-bacf-9839e40316e3',
                'rule_id': 'cea82945-15a0-42a3-aa43-f8e1e50e0659',
                'name': 'allow access to wordpress',
                'target_service_group_name': 'group1',
                'target_service_name': 'simple-wordpress',
                'target_port': 80,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '619ed2b4-2db1-46c5-bacf-9839e40316e3',
                'rule_id': 'd95458e8-25c0-49a2-80a2-7fa3195b6a90',
                'name': 'allow access to mysql',
                'target_service_group_name': 'group1',
                'target_service_name': 'simple-mysql',
                'target_port': 3306,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'group1',
                'auth_services': [
                    'simple-wordpress'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '619ed2b4-2db1-46c5-bacf-9839e40316e3',
                'service_group_id': '48b3b840-4f41-4fd8-8931-3222c22a2ad4',
                'name': 'group1',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '619ed2b4-2db1-46c5-bacf-9839e40316e3',
                        'service_group_id': '48b3b840-4f41-4fd8-8931-3222c22a2ad4',
                        'service_id': 'a681ba02-fac0-4da6-8c51-70357e894f63',
                        'name': 'simple-wordpress',
                        'image': 'wordpress:5.0.0',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '104857600',
                                'mount_path': '/tmp'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'wordpressport',
                                'internal_port': 80,
                                'exposed_port': 80,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
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
                            'simple-mysql'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '619ed2b4-2db1-46c5-bacf-9839e40316e3',
                        'service_group_id': '48b3b840-4f41-4fd8-8931-3222c22a2ad4',
                        'service_id': 'e4c63405-d07f-499e-bb88-4cc58d546a6a',
                        'name': 'simple-mysql',
                        'image': 'mysql:5.6',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '104857600',
                                'mount_path': '/tmp'
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
                        'labels': {
                            'app': 'simple-mysql',
                            'component': 'simple-app'
                        }
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '6b6cd2a4-8142-46ef-91e1-f007ac2939ed',
        'name': 'Virtual device',
        'labels': {
            'app': 'virtualdevice'
        },
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '6b6cd2a4-8142-46ef-91e1-f007ac2939ed',
                'service_group_id': 'ab38df02-539b-4241-a2d9-b99d1ad9db08',
                'name': 'virtualdevices',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '6b6cd2a4-8142-46ef-91e1-f007ac2939ed',
                        'service_group_id': 'ab38df02-539b-4241-a2d9-b99d1ad9db08',
                        'service_id': 'e7f49fd3-edb3-4b7d-93c8-a1fa645fe998',
                        'name': 'virtualdevice',
                        'image': 'nalejpublic.azurecr.io/nalej/virtualdevice:v0.3.0',
                        'credentials': {
                            'username': 'b69be5be-9347-4abe-9cf5-bacbade23580',
                            'password': '6b2a7c3a-ba7a-4de1-98ae-92741ef2dae9',
                            'email': 'gdiaz@nalej.com',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'environment_variables': {
                            'DEVICE_GROUP_API_KEY': '00000000-0000-0000-0000-000000000000',
                            'DEVICE_GROUP_ID': '00000000-0000-0000-0000-000000000000',
                            'DEVICE_GROUP_NAME': 'deviceGroupName',
                            'NALEJ_PLATFORM': 'xxx.xx.com',
                            'ORGANIZATION_ID': '00000000-0000-0000-0000-000000000000'
                        },
                        'labels': {
                            'app': 'virtualdevice'
                        }
                    }
                ],
                'specs': {
                    'replicas': 1
                }
            }
        ],
        'parameters': [
            {
                'name': 'platform',
                'description': 'platform url',
                'path': 'groups.0.services.0.environment_variables.NALEJ_PLATFORM',
                'type': 'STRING',
                'default_value': 'xxx.xx.com'
            },
            {
                'name': 'organizationID',
                'description': 'organization identifier',
                'path': 'groups.0.services.0.environment_variables.ORGANIZATION_ID',
                'type': 'STRING',
                'default_value': '00000000-0000-0000-0000-000000000000'
            },
            {
                'name': 'deviceGroupName',
                'description': 'device group name',
                'path': 'groups.0.services.0.environment_variables.DEVICE_GROUP_NAME',
                'type': 'STRING',
                'default_value': 'deviceGroupName'
            },
            {
                'name': 'deviceGroupID',
                'description': 'device group identifier',
                'path': 'groups.0.services.0.environment_variables.DEVICE_GROUP_ID',
                'type': 'STRING',
                'default_value': '00000000-0000-0000-0000-000000000000'
            },
            {
                'name': 'deviceGroupAPIKEY',
                'description': 'device group API key',
                'path': 'groups.0.services.0.environment_variables.DEVICE_GROUP_API_KEY',
                'type': 'STRING',
                'default_value': '00000000-0000-0000-0000-000000000000'
            }
        ],
        'inbound_net_interfaces': [
            {
               'name': 'inbound'
            }
         ],
         'outbound_net_interfaces': [
            {
               'name': 'outbound'
            }
         ],
         'inbound_connections': [
            {
               'organization_id': 'f60c9bad-d6cc-42dc-b05d-32837aa4b621',
               'connection_id': 'c6ea0855-fc27-47f6-9354-2b74ccb41fab',
               'source_instance_id': '47ab7751-651f-4e36-b213-0031909ee11e',
               'source_instance_name': 'KUARD_OUT',
               'target_instance_id': 'a1d954e3-8a0a-4254-8fca-333e3f80e227',
               'target_instance_name': 'KUARD_IN',
               'inbound_name': 'inbound',
               'outbound_name': 'outbound'
            }
         ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '726cc549-98ee-4da3-b78c-62a97833229c',
        'name': 'Nalej_VDI',
        'labels': {
            'app': 'vdi-app'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '726cc549-98ee-4da3-b78c-62a97833229c',
                'rule_id': '3fb4878b-94e6-40ae-9223-796f49421173',
                'name': 'WAT public',
                'target_service_group_name': 'core',
                'target_service_name': 'vdinode',
                'target_port': 443,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '726cc549-98ee-4da3-b78c-62a97833229c',
                'rule_id': '7ca6d26d-4147-4ea2-bfe0-f612c45e58bc',
                'name': 'VDI public',
                'target_service_group_name': 'core',
                'target_service_name': 'vdinode',
                'target_port': 8443,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '726cc549-98ee-4da3-b78c-62a97833229c',
                'rule_id': '73db4f27-5851-4513-b127-89a0e4f87d8f',
                'name': 'allow access to POSTGRES from VDI node',
                'target_service_group_name': 'core',
                'target_service_name': 'vdipostgres',
                'target_port': 5432,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'vdinode'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '726cc549-98ee-4da3-b78c-62a97833229c',
                'service_group_id': 'be2e9bb4-1f46-484a-8c00-87a0d123ccf2',
                'name': 'core',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '726cc549-98ee-4da3-b78c-62a97833229c',
                        'service_group_id': 'be2e9bb4-1f46-484a-8c00-87a0d123ccf2',
                        'service_id': 'cfcd72b2-2013-48dd-8ac5-737def57dbe1',
                        'name': 'vdipostgres',
                        'image': 'postgres:9.5-alpine',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'vdipostgresport',
                                'internal_port': 5432,
                                'exposed_port': 5432
                            }
                        ],
                        'environment_variables': {
                            'POSTGRES_DB': 'qvd',
                            'POSTGRES_PASSWORD': 'qvd',
                            'POSTGRES_USER': 'qvd'
                        },
                        'labels': {
                            'app': 'vdipostgres',
                            'component': 'vdi-app'
                        }
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '726cc549-98ee-4da3-b78c-62a97833229c',
                        'service_group_id': 'be2e9bb4-1f46-484a-8c00-87a0d123ccf2',
                        'service_id': 'bd92dbc6-07ce-4b3a-8c48-a5e4b00ed606',
                        'name': 'vdinode',
                        'image': 'nalejpublic.azurecr.io/nalej/vdinode:v0.0.1',
                        'credentials': {
                            'username': 'ec31156a-3874-42f4-823a-e67af7db4281',
                            'password': 'Iw<BbzK>)*sRuJz4@{C&=v!#Wfx1)1F+',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'wat-port',
                                'internal_port': 443,
                                'exposed_port': 443,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'vdi-port',
                                'internal_port': 8443,
                                'exposed_port': 8443,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'vdinode',
                            'component': 'vdi-app'
                        },
                        'deploy_after': [
                            'vdipostgres'
                        ]
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '7332c5a2-2de0-4337-a359-d0dffd00b042',
        'name': 'Two Replicas Blan Rule Test',
        'labels': {
            'app': 'simple-app'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7332c5a2-2de0-4337-a359-d0dffd00b042',
                'rule_id': 'c14ae85a-7f9a-474b-9417-240dca72d2cf',
                'name': 'allow access to wordpress',
                'target_service_group_name': 'application',
                'target_service_name': 'simple-wordpress',
                'target_port': 80,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7332c5a2-2de0-4337-a359-d0dffd00b042',
                'rule_id': 'cc52a851-8fdf-412f-8a93-6cb27ab220a8',
                'name': 'test rule for device',
                'target_service_group_name': 'application',
                'target_service_name': 'simple-wordpress',
                'target_port': 90,
                'access': 'DEVICE_GROUP',
                'device_group_names': [
                    'device_group2'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7332c5a2-2de0-4337-a359-d0dffd00b042',
                'service_group_id': '15180e4b-0c2e-41ec-a2e9-463bf49afd2a',
                'name': 'application',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '7332c5a2-2de0-4337-a359-d0dffd00b042',
                        'service_group_id': '15180e4b-0c2e-41ec-a2e9-463bf49afd2a',
                        'service_id': 'e56b187e-8919-4b93-80c3-1f9c0b220f62',
                        'name': 'simple-mysql',
                        'image': 'mysql:5.6',
                        'specs': {
                            'replicas': 2
                        },
                        'storage': [
                            {
                                'size': '104857600',
                                'mount_path': '/tmp'
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
                        'labels': {
                            'app': 'simple-mysql',
                            'component': 'simple-app'
                        }
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '7332c5a2-2de0-4337-a359-d0dffd00b042',
                        'service_group_id': '15180e4b-0c2e-41ec-a2e9-463bf49afd2a',
                        'service_id': 'e14433af-f8ff-4670-b9d2-efed240ee7f3',
                        'name': 'simple-wordpress',
                        'image': 'wordpress:5.0.0',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '104857600',
                                'mount_path': '/tmp'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'wordpressport',
                                'internal_port': 80,
                                'exposed_port': 80,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
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
                            'simple-mysql'
                        ]
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
        'name': 'Jenkins',
        'labels': {
            'app': 'jenkins'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                'rule_id': 'f22aaf8a-3477-4929-83bb-ec73de84ea89',
                'name': 'allow access to jenkins http',
                'target_service_group_name': 'jenkins-group',
                'target_service_name': 'jenkins-master',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                'rule_id': '6047edc1-673b-4b6a-a0b4-e9d3bfe02e9e',
                'name': 'allow access to jenkins',
                'target_service_group_name': 'jenkins-group',
                'target_service_name': 'jenkins-master',
                'target_port': 50000,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                'rule_id': 'a6ff3a25-0b30-4864-94af-850a06f4612e',
                'name': 'allow access to jenkins ssh',
                'target_service_group_name': 'jenkins-group',
                'target_service_name': 'jenkins-master',
                'target_port': 22,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                'rule_id': 'f89bc099-689c-4f2e-99e1-bfb63d0585df',
                'name': 'allow access to jenkins http',
                'target_service_group_name': 'jenkins-group',
                'target_service_name': 'jenkins-slave',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                'rule_id': '70d619a5-361c-4e61-bbb3-5b3d7a40f01e',
                'name': 'allow access to jenkins',
                'target_service_group_name': 'jenkins-group',
                'target_service_name': 'jenkins-slave',
                'target_port': 50000,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                'rule_id': 'b2230990-8eb9-46cd-a3bd-03c0046e45e4',
                'name': 'allow access to jenkins ssh',
                'target_service_group_name': 'jenkins-group',
                'target_service_name': 'jenkins-slave',
                'target_port': 22,
                'access': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                'service_group_id': '0b657ab7-f025-468a-ac02-814b230e1bf2',
                'name': 'jenkins-group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                        'service_group_id': '0b657ab7-f025-468a-ac02-814b230e1bf2',
                        'service_id': '1acb41c0-b325-478c-9a6f-cd3387ff5f98',
                        'name': 'jenkins-master',
                        'image': 'jenkins/jenkins:lts',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '1000000000',
                                'mount_path': '/var/jenkins_home'
                            },
                            {
                                'mount_path': '/var/jenkins_home/.ssh'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'http',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'jenkins',
                                'internal_port': 50000,
                                'exposed_port': 50000
                            }
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '7fdff356-1899-44df-83c4-abb39827cc6b',
                        'service_group_id': '0b657ab7-f025-468a-ac02-814b230e1bf2',
                        'service_id': '0c06997e-a852-4c8d-a433-90fc0b665f9f',
                        'name': 'jenkins-slave',
                        'image': 'jenkins/jenkins:lts',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '1000000000',
                                'mount_path': '/var/jenkins_home'
                            },
                            {
                                'mount_path': '/var/jenkins_home/.ssh'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'http',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'jenkins',
                                'internal_port': 50000,
                                'exposed_port': 50000
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
        'name': 'Topology analysis',
        'labels': {
            'app': 'topology-analytics'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'rule_id': '1069b935-1203-4980-b15a-7dd153b89caf',
                'name': 'allow access to dash server',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 80,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'rule_id': 'b9365c3e-e0a6-41f9-8a04-35f7f5126ec6',
                'name': 'allow access to master',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 8888,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'slave1',
                'auth_services': [
                    'slave1'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'rule_id': '4e0abbae-e71c-4c7e-98ba-a56abd2416b8',
                'name': 'allow access to master for slave2',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 8888,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'slave2',
                'auth_services': [
                    'slave2'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'rule_id': 'ed4e6217-e3bc-49ee-bf51-2b9c2abc8b95',
                'name': 'allow access to master for slave3',
                'target_service_group_name': 'master',
                'target_service_name': 'master',
                'target_port': 8888,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'slave3',
                'auth_services': [
                    'slave3'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'service_group_id': '4c1be2b0-d431-44b6-bbbb-d4643d5e4cf4',
                'name': 'master',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                        'service_group_id': '4c1be2b0-d431-44b6-bbbb-d4643d5e4cf4',
                        'service_id': '0c7e4608-17f8-48c7-bb44-ec4d4f0835ec',
                        'name': 'master',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.2',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'dashport',
                                'internal_port': 80,
                                'exposed_port': 80,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            },
                            {
                                'name': 'masterport',
                                'internal_port': 8888,
                                'exposed_port': 8888,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'run_arguments': [
                            '--type master'
                        ]
                    }
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'service_group_id': 'c6660fc2-2e37-4ef3-b026-70351194ee2f',
                'name': 'slave1',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                        'service_group_id': 'c6660fc2-2e37-4ef3-b026-70351194ee2f',
                        'service_id': 'be917b64-de74-4ad9-a508-3c7404561e97',
                        'name': 'slave1',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.2',
                        'specs': {
                            'replicas': 1
                        },
                        'run_arguments': [
                            '--type slave',
                            '--labels slave1'
                        ]
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'slave1': 'true'
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'service_group_id': '0ea2d08b-2632-4a24-b0f3-5ebe115140bf',
                'name': 'slave2',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                        'service_group_id': '0ea2d08b-2632-4a24-b0f3-5ebe115140bf',
                        'service_id': '1bfff0ba-75ae-4ec5-aff9-bce49d10ce71',
                        'name': 'slave2',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.2',
                        'specs': {
                            'replicas': 1
                        },
                        'run_arguments': [
                            '--type slave',
                            '--labels slave2'
                        ]
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'slave2': 'true'
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                'service_group_id': 'feb50359-98b5-48d8-b2d2-9855ed92eb95',
                'name': 'slave3',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '8923ddf1-94bf-4c51-9a1f-8d1836ffe465',
                        'service_group_id': 'feb50359-98b5-48d8-b2d2-9855ed92eb95',
                        'service_id': '74edac23-4eaf-467e-926c-c6e54ada907d',
                        'name': 'slave3',
                        'image': 'nalejpublic.azurecr.io/nalej/topology:v0.0.1',
                        'specs': {
                            'replicas': 1
                        },
                        'run_arguments': [
                            '--type slave',
                            '--labels slave3'
                        ]
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true,
                    'deployment_selectors': {
                        'slave3': 'true'
                    }
                }
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
        'name': 'Drone Demo backend ERROR',
        'labels': {
            'app': 'drone'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'rule_id': '14275169-e41b-4636-8eb9-97d504e562fb',
                'name': 'Allow public access to kibana',
                'target_service_group_name': 'core',
                'target_service_name': 'kibana',
                'target_port': 5601,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'rule_id': '62a9c929-4fc0-439d-8eb0-4d44b78b4060',
                'name': 'Allow kibana access to elastic',
                'target_service_group_name': 'core',
                'target_service_name': 'elastic',
                'target_port': 9200,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'kibana'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'rule_id': 'bd1b667d-2123-47a3-92ca-cfa715a9cd0d',
                'name': 'Allow local alerts access to elastic',
                'target_service_group_name': 'core',
                'target_service_name': 'elastic',
                'target_port': 9200,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'gateway',
                'auth_services': [
                    'localalerts'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'rule_id': '079d8a0b-0931-41ad-8b23-e0e9ece9bda3',
                'name': 'Allow global alerts to access core mqtt',
                'target_service_group_name': 'core',
                'target_service_name': 'coremqtt',
                'target_port': 1883,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'core',
                'auth_services': [
                    'globalalerts'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'rule_id': '594afe63-c6a4-4f11-8a51-c95ddfd45753',
                'name': 'Allow local alerts to access gateway mqtt',
                'target_service_group_name': 'gateway',
                'target_service_name': 'mqtt',
                'target_port': 1883,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'gateway',
                'auth_services': [
                    'localalerts'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'rule_id': 'e6e2a935-fc1b-4d2f-b2ba-78a053ebe814',
                'name': 'Allow local alerts to access core mqtt',
                'target_service_group_name': 'core',
                'target_service_name': 'coremqtt',
                'target_port': 1883,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'gateway',
                'auth_services': [
                    'localalerts'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'rule_id': '3e90c8d5-ad69-46c4-9958-b1b3105adecb',
                'name': 'allow access to mqtt from device groups',
                'target_service_group_name': 'gateway',
                'target_service_name': 'mqtt',
                'target_port': 1883,
                'access': 'DEVICE_GROUP',
                'device_group_names': [
                    'drone'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'service_group_id': 'e927babf-9b91-484e-9907-025cdbc25998',
                'name': 'core',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                        'service_group_id': 'e927babf-9b91-484e-9907-025cdbc25998',
                        'service_id': '35775b5c-7232-431c-8ee5-70f280c81dd0',
                        'name': 'globalalerts',
                        'image': 'nalejpublic.azurecr.io/nalej/hhhhglobal-alerts:v0.0.1',
                        'specs': {
                            'replicas': 1
                        },
                        'deploy_after': [
                            'coremqtt'
                        ],
                        'run_arguments': [
                            'run',
                            '--debug',
                            '--GlobalMQTTAddress',
                            '$(NALEJ_SERV_COREMQTT):1883',
                            '--GlobalMQTTUsername',
                            'globalalerts',
                            '--GlobalMQTTPassword',
                            '$(NALEJ_SERV_GLOBALALERTS)'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                        'service_group_id': 'e927babf-9b91-484e-9907-025cdbc25998',
                        'service_id': '0543c6ce-d8d0-4a35-b7f1-725524a13aec',
                        'name': 'kibana',
                        'image': 'docker.elastic.co/kibana/kibana:6.4.2',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'public',
                                'internal_port': 5601,
                                'exposed_port': 5601,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'ELASTICSEARCH_URL': 'http://NALEJ_SERV_ELASTIC:9200'
                        },
                        'deploy_after': [
                            'elastic'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                        'service_group_id': 'e927babf-9b91-484e-9907-025cdbc25998',
                        'service_id': '9f1f90f8-4f51-492a-9fa5-f130c6fbab5c',
                        'name': 'elastic',
                        'image': 'docker.elastic.co/elasticsearch/elasticsearch:6.4.2',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '104857600',
                                'mount_path': '/usr/share/elasticsearch/data'
                            }
                        ],
                        'exposed_ports': [
                            {
                                'name': 'elasticport',
                                'internal_port': 9200,
                                'exposed_port': 9200
                            }
                        ],
                        'environment_variables': {
                            'ES_JAVA_OPTS': '-Xms512m -Xmx512m',
                            'bootstrap.memory_lock': 'true',
                            'cluster.name': 'elastic-cluster',
                            'discovery.type': 'single-node'
                        }
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                        'service_group_id': 'e927babf-9b91-484e-9907-025cdbc25998',
                        'service_id': 'ced61820-e54a-4bd7-a7f4-39b09d84c80c',
                        'name': 'coremqtt',
                        'image': 'nalejpublic.azurecr.io/nalej/vernemq:v0.0.1',
                        'credentials': {
                            'username': 'ec31156a-3874-42f4-823a-e67af7db4281',
                            'password': 'Iw<BbzK>)*sRuJz4@{C&=v!#Wfx1)1F+',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'mqtt-port',
                                'internal_port': 1883,
                                'exposed_port': 1883
                            }
                        ],
                        'environment_variables': {
                            'NALEJ_TRUSTED_PASSWORD': 'NALEJ_SERV_GLOBALALERTS',
                            'NALEJ_TRUSTED_USER': 'globalalerts'
                        }
                    }
                ],
                'specs': {
                    'replicas': 1,
                    'deployment_selectors': {
                        'cloud': 'azure'
                    }
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                'service_group_id': '6a5a8faf-61b4-443d-9727-f286cdfebb35',
                'name': 'gateway',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                        'service_group_id': '6a5a8faf-61b4-443d-9727-f286cdfebb35',
                        'service_id': '7d24d248-6e96-4571-ad44-cce7a8fe82bb',
                        'name': 'localalerts',
                        'image': 'nalejpublic.azurecr.io/nalej/local-alerts:v0.0.1',
                        'credentials': {
                            'username': 'ec31156a-3874-42f4-823a-e67af7db4281',
                            'password': 'Iw<BbzK>)*sRuJz4@{C&=v!#Wfx1)1F+',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'deploy_after': [
                            'mqtt'
                        ],
                        'run_arguments': [
                            'run',
                            '--debug',
                            '--DroneMQTTAddress',
                            '$(NALEJ_SERV_MQTT):1883',
                            '--DroneMQTTUsername',
                            'localalerts',
                            '--DroneMQTTPassword',
                            '$(NALEJ_SERV_LOCALALERTS)',
                            '--GlobalMQTTAddress',
                            '$(NALEJ_SERV_COREMQTT):1883',
                            '--GlobalMQTTUsername',
                            'globalalerts',
                            '--GlobalMQTTPassword',
                            '$(NALEJ_SERV_GLOBALALERTS)',
                            '--ESAddress',
                            '$(NALEJ_SERV_ELASTIC):9200',
                            '--clientID',
                            '$(NALEJ_SERV_LOCALALERTS)'
                        ]
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '970963f3-dddb-42c7-b43d-4182c2a1305f',
                        'service_group_id': '6a5a8faf-61b4-443d-9727-f286cdfebb35',
                        'service_id': '9e93b2fe-7745-44f2-b337-229016754ab0',
                        'name': 'mqtt',
                        'image': 'nalejpublic.azurecrddd.io/nalej/vernemq:v0.0.1',
                        'credentials': {
                            'username': 'ec31156a-3874-42f4-823a-e67af7db4281',
                            'password': 'Iw<BbzK>)*sRuJz4@{C&=v!#Wfx1)1F+',
                            'email': 'jlopez@daisho.group',
                            'docker_repository': 'https://nalejpublic.azurecr.io'
                        },
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'mqtt-port',
                                'internal_port': 1883,
                                'exposed_port': 1883
                            }
                        ],
                        'environment_variables': {
                            'NALEJ_TRUSTED_PASSWORD': 'NALEJ_SERV_LOCALALERTS',
                            'NALEJ_TRUSTED_USER': 'localalerts'
                        }
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true
                }
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
        'name': 'Ping onboarding Marcos Garcia',
        'labels': {
            'app': 'ping'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
                'rule_id': '1f863fb5-6797-4d74-977a-31369d95ac16',
                'name': 'Expose a ping server',
                'target_service_group_name': 'group',
                'target_service_name': 'ping',
                'target_port': 8989,
                'access': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
                'service_group_id': '33489f5a-cd92-418e-9470-dd5a6111a70f',
                'name': 'group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': '9db098fc-ff87-4e31-bcf2-68ea3da75716',
                        'service_group_id': '33489f5a-cd92-418e-9470-dd5a6111a70f',
                        'service_id': 'bb7651e4-1ad3-451e-a698-3b596faed329',
                        'name': 'ping',
                        'image': 'nalejpublic.azurecr.io/nalej/ping:v0.0.1',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8989,
                                'exposed_port': 8989
                            }
                        ],
                        'labels': {
                            'app': 'ping'
                        },
                        'run_arguments': [
                            'run'
                        ]
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': 'b96c9206-33ea-45c7-aad0-ec069fdf2508',
        'name': 'KuardDouble',
        'labels': {
            'app': 'kuardDouble'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'b96c9206-33ea-45c7-aad0-ec069fdf2508',
                'rule_id': 'c1801fee-7b87-4c48-bb51-0539623c91a6',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-group',
                'target_service_name': 'kuard',
                'target_port': 8080,
                'access': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'b96c9206-33ea-45c7-aad0-ec069fdf2508',
                'service_group_id': 'f098a59e-2084-474f-a234-4fbf1ddc60ec',
                'name': 'kuard-group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'b96c9206-33ea-45c7-aad0-ec069fdf2508',
                        'service_group_id': 'f098a59e-2084-474f-a234-4fbf1ddc60ec',
                        'service_id': 'e4585ae4-6d90-4618-98a2-4773394b231b',
                        'name': 'kuard',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 2
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuardDouble'
                        }
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
        'name': 'Kuard',
        'labels': {
            'app': 'kuard'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'rule_id': '52425199-fbb9-4aa6-b7fb-78a7a01e5941',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-front-group',
                'target_service_name': 'kuardfront',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'rule_id': '78dc4ead-3d08-4bf3-8b39-6fcce9745ac8',
                'name': 'allow access to processing',
                'target_service_group_name': 'kuard-processing-group',
                'target_service_name': 'kuardprocessing',
                'target_port': 8080,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'kuard-front-group',
                'auth_services': [
                    'kuardfront'
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'rule_id': '3b63e6a6-dd35-4748-8e35-516c517d3842',
                'name': 'allow access to storage',
                'target_service_group_name': 'kuard-storage-group',
                'target_service_name': 'kuardstorage',
                'target_port': 8080,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'kuard-processing-group',
                'auth_services': [
                    'kuardprocessing'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'service_group_id': 'e36e0f01-9aeb-4fba-87dd-6ebd42197be8',
                'name': 'kuard-front-group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                        'service_group_id': 'e36e0f01-9aeb-4fba-87dd-6ebd42197be8',
                        'service_id': '6018a6a3-fddf-47e0-a612-fb617cc782ea',
                        'name': 'kuardfront',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 2
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard'
                        }
                    }
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'service_group_id': 'b1b93c71-55d5-460a-8321-c0d8b0804693',
                'name': 'kuard-processing-group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                        'service_group_id': 'b1b93c71-55d5-460a-8321-c0d8b0804693',
                        'service_id': '80de5802-9d1d-4690-8993-eef87e36c5df',
                        'name': 'kuardprocessing',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 3
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard'
                        }
                    }
                ]
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                'service_group_id': '22a9cc33-14bc-40ca-b7aa-6ffbdf20f190',
                'name': 'kuard-storage-group',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'cec73c4a-f1ec-4550-a58e-79a42cdf7da4',
                        'service_group_id': '22a9cc33-14bc-40ca-b7aa-6ffbdf20f190',
                        'service_id': '99966f94-4037-4f2a-8e26-82d779fc74bc',
                        'name': 'kuardstorage',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard'
                        }
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
        'name': 'WP-rules',
        'labels': {
            'app': 'wordpress'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'rule_id': 'fdb637c9-81c7-4196-a7fa-377dd5406bca',
                'name': 'allow access to wordpress',
                'target_service_group_name': 'group1',
                'target_service_name': 'simple-wordpress',
                'target_port': 80,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'rule_id': '79c8a5fb-4397-4a6c-8ba9-71bf35645ab3',
                'name': 'allow access to mysql',
                'target_service_group_name': 'group2',
                'target_service_name': 'simple-mysql',
                'target_port': 3306,
                'access': 'APP_SERVICES',
                'auth_service_group_name': 'group1',
                'auth_services': [
                    'simple-wordpress'
                ]
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'service_group_id': 'f42ec0ae-beec-414a-88da-0b244dcd50f6',
                'name': 'group1',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                        'service_group_id': 'f42ec0ae-beec-414a-88da-0b244dcd50f6',
                        'service_id': '6fc508e1-d32a-445e-aa54-5b2d89e7ff2e',
                        'name': 'simple-wordpress',
                        'image': 'wordpress:5.0.0',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'wordpressport',
                                'internal_port': 80,
                                'exposed_port': 80,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'environment_variables': {
                            'WORDPRESS_DB_HOST': 'NALEJ_SERV_SIMPLE-MYSQL:3306',
                            'WORDPRESS_DB_PASSWORD': 'root'
                        }
                    }
                ],
                'specs': {
                    'multi_cluster_replica': true
                }
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                'service_group_id': 'c2abd98a-6c0a-4db3-a93c-4ab06b97ec08',
                'name': 'group2',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'd0ec5b4b-97c6-4bad-a02c-95bf091bb06d',
                        'service_group_id': 'c2abd98a-6c0a-4db3-a93c-4ab06b97ec08',
                        'service_id': 'a553a2b7-3949-4df7-b276-dc5c0eedc4ca',
                        'name': 'simple-mysql',
                        'image': 'mysql:5.6',
                        'specs': {
                            'replicas': 1
                        },
                        'storage': [
                            {
                                'size': '104857600',
                                'mount_path': '/tmp'
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
                        }
                    }
                ]
            }
        ]
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
        'name': 'Kuard',
        'labels': {
            'app': 'gaizkuarduple'
        },
        'rules': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': 'f0a8ba4e-9f3b-44c0-9772-f19023ecdc00',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-group-1',
                'target_service_name': 'kuard1',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': '7545a54c-2dc1-4aca-8b1a-d43733e3868c',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-group-1',
                'target_service_name': 'kuard2',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': '49f980c7-703a-45d2-875e-eaf37695e997',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-group-2',
                'target_service_name': 'kuard3',
                'target_port': 8080,
                'access': 'PUBLIC'
            },
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'rule_id': 'c9b92a00-a4c1-4052-a4d5-a893bcdbc64f',
                'name': 'allow access to kuard web',
                'target_service_group_name': 'kuard-group-2',
                'target_service_name': 'kuard4',
                'target_port': 8080,
                'access': 'PUBLIC'
            }
        ],
        'groups': [
            {
                'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                'service_group_id': '2584c18b-f903-4445-8bfb-55f8c4af118f',
                'name': 'kuard-group-1',
                'services': [
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                        'service_group_id': '2584c18b-f903-4445-8bfb-55f8c4af118f',
                        'service_id': '35ad5dfb-7b3f-4ad8-ad8d-9846c6eff3ef',
                        'name': 'kuard1',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard1'
                        }
                    },
                    {
                        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
                        'app_descriptor_id': 'dbdb6e77-245d-460d-b735-2f825421e41d',
                        'service_group_id': '2584c18b-f903-4445-8bfb-55f8c4af118f',
                        'service_id': '1351718a-350d-4615-a045-9d7bfa58e3b7',
                        'name': 'kuard2',
                        'image': 'gcr.io/kuar-demo/kuard-amd64:blue',
                        'specs': {
                            'replicas': 1
                        },
                        'exposed_ports': [
                            {
                                'name': 'web',
                                'internal_port': 8080,
                                'exposed_port': 8080,
                                'endpoints': [
                                    {
                                        'type': 'WEB',
                                        'path': '/'
                                    }
                                ]
                            }
                        ],
                        'labels': {
                            'app': 'kuard2'
                        }
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

    },
    {
        'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
        'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
        'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
        'name': 'Kuard22',
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
                        'deployed_on_cluster_id': '6769d264-4ba7-4cd7-b221-a7f4f14e481d2',
                        'endpoints': [
                            'nalej.com',
                        ]
                    },
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
                'service_group_instance_id': 'd8863b33-b55a-4b0d-9b2d-5cefcfb6ac5266',
                'name': 'g2',
                'service_instances': [
                    {
                        'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                        'app_descriptor_id': '89c9dd8e-ad04-437f-ae63-73d1960396a8',
                        'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4b',
                        'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
                        'service_group_instance_id': 'd8863b33-b55a-4b0d-9b2d-5cefcfb6ac5266',
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
                        'deployed_on_cluster_id': '6769d264-4ba7-4cd7-b221-a7f4f14e481d2',
                        'endpoints': [
                            'nalej.com',
                        ]
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
                        'deployed_on_cluster_id': '6769d264-4ba7-4cd7-b221-a7f4f14e481d4'
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
    },
    {
        'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
        'app_descriptor_id': '1ae8e3ca-dc97-4e49-8ee8-302a15dbd58a',
        'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4aa',
        'name': 'swift76',
        'labels': {
            'app': 'simple-app'
        },
        'rules': [
            {
                'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                'app_descriptor_id': '1ae8e3ca-dc97-4e49-8ee8-302a15dbd58a',
                'rule_id': 'fefec0af-ac57-42f1-9741-a25abfa77db6',
                'name': 'allow access to wordpress',
                'target_service_group_name': 'g55',
                'target_service_name': '2',
                'target_port': 80,
                'access_name': 'PUBLIC'
            },
        ],
        'groups': [
            {
                'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                'app_descriptor_id': '1ae8e3ca-dc97-4e49-8ee8-302a15dbd58a',
                'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4aa',
                'service_group_id': '338b4ca5-a189-4c6d-a7f2-5ed3e2f641f3',
                'service_group_instance_id': 'd8863b33-b55a-4b0d-9b2d-5cefcfb6ac52',
                'name': 'g55',
                'service_instances': [
                    {
                        'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                        'app_descriptor_id': '1ae8e3ca-dc97-4e49-8ee8-302a15dbd58a',
                        'app_instance_id': '01da4a74-c02a-49f8-aa4f-8561ab597a4aa',
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
                                'app_descriptor_id': '1ae8e3ca-dc97-4e49-8ee8-302a15dbd58a',
                                'config_file_id': '8f0737bb-0356-40ec-8171-45ca037d09b1',
                                'content': 'SG9sYQo=',
                                'mount_path': '/config/saludo.conf'
                            },
                            {
                                'organization_id': '0baa866a-c894-4f2e-97ec-ca1d3cabed42',
                                'app_descriptor_id': '1ae8e3ca-dc97-4e49-8ee8-302a15dbd58a',
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
                        'endpoints': [
                            'nalej.com',
                        ]
                    }
                ],
                'policy_name': 'SAME_CLUSTER',
                'status_name': 'SERVICE_RUNNING',
                'specs': {
                    'num_replicas': 1
                }
            }
        ],
        'status_name': 'RUNNING',
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
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
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
    }, {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56b',
        ip: '10.240.0.58',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
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
    }, {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d7c',
        ip: '10.240.0.57',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
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
    }, {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56d',
        ip: '10.240.0.56',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
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
    }, {
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d5e',
        ip: '10.240.0.55',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
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
    }, {
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56f',
        ip: '10.240.0.53',
        credentials: 'Private',
        labels: {
            'agentpool': 'default',
            'beta.kubernetes.io/arch': 'amd64',
            'beta.kubernetes.io/instance-type': 'Standard_D2s_v3',
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
    [
        {
           'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
           'device_group_id': '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
           'device_id': 'dh006',
           'register_since': '1550746714',
           'enabled': true,
           'device_status_name': 'OFFLINE',
            'labels': {
                'app': 'kuard4',
                'the': 'label'
            }
        },
        {
            'organization_id': 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            'device_group_id': 'a56b9900-0fef-41b0-bb7c-adf0055274cd',
            'device_id': 'dh007',
            'register_since': '1550746656',
            'enabled': true,
            'device_status_name': 'ONLINE',
            'labels': {
                'lab12': 'label12',
                'lab23': 'label22',
                'lab24': 'label22',
                'lab22': 'label22',
                'lab25': 'label22',
                'lab16': 'label12654',
                'lab27': 'label22',
                'lab28': 'label22',
                'lab29': 'label22',
                'lab30': 'label22654',
                'lab31': 'label12',
                'lab32': 'label22',
                'lab33': 'label2298754',
                'lab34': 'label22',
                'lab35': 'label22',
                'lab56': 'label22',
                'lab37': 'label22654',
                'lab38': 'label12',
                'lab39': 'label22',
                'lab40': 'label2298754',
                'lab41': 'label22',
                'lab42': 'label22',
            }
        }
    ],
    [
        {
            'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            'device_group_id': '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
            'device_id': 'dh001',
            'register_since': '1550746644',
            'enabled': true,
            'device_status_name': 'OFFLINE',
            'labels': {
            }
        }
    ],
    [
        {
            'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            'device_group_id': '90651fde-4090-47e9-a838-735969d94302',
            'device_id': 'dh002',
            'register_since': '1550746647',
            'enabled': false,
            'device_status_name': 'OFFLINE',
            'labels': {
            }
        },
        {
            'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            'device_group_id': '90651fde-4090-47e9-a838-735969d94302',
            'device_id': 'dh003',
            'register_since': '1550746651',
            'enabled': true,
            'device_status_name': 'OFFLINE',
            'labels': {
                'app2': 'quee2',
                'drone': '321'
            }
        }
    ],
    [
        {
            'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            'device_group_id': 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
            'device_id': 'dh004',
            'register_since': '1550746653',
            'enabled': true,
            'device_status_name': 'OFFLINE',
            'labels': {
            }
        },
        {
            'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            'device_group_id': 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
            'device_id': 'dh005',
            'register_since': '1550746656',
            'enabled': true,
            'device_status_name': 'OFFLINE',
            'labels': {
            }
        }
    ]
];

/**
 * Mocked devices group list
 */
export const mockGroupList: Group[] = [
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'device_group_id': '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
        'name': 'drone',
        'created': '1566808602',
        'enabled': true,
        'default_device_connectivity': true,
        'device_group_api_key': 'ce6cc094-300e-4982-bc98-17ca02982e9e'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'device_group_id': '90651fde-4090-47e9-a838-735969d94302',
        'name': 'group1',
        'created': '1564125271',
        'enabled': true,
        'default_device_connectivity': true,
        'device_group_api_key': 'b0bd74ad-cc16-475b-b748-cedc94f4e0f1'
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'device_group_id': 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
        'name': 'device_group2',
        'created': '1566986300',
        'device_group_api_key': '982df0a4-843d-401e-9653-ee50ae3636c9'
    }
];

/**
 * Mocked Infrastructure Pie Chart
 */
export const mockInfrastructurePieChart = [
    {
        name: 'Online',
        value: 3
    },
    {
        name: 'Offline',
        value: 5
    }
];

/**
 * Mock inventory summary containing total cpu, moemory and storage
 */
export const mockInventorySummary = {
    total_num_cpu: 10,
    total_ram: 20,
    total_storage: 30,
};

/**
 * Mocked inventory list
 */
export const mockInventoryList: Inventory = {
    devices: [
        {
            organization_id: 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            device_group_id: 'a2ed5462-76b7-4085-98fb-27c1cd9b79a5',
            device_id: 'dh0011',
            register_since: 1550746520,
            labels: {
                lab11: 'label11',
                lab21: 'label21'
            },
            enabled: true,
            device_status_name : 'ONLINE'
        },
        {
            organization_id: 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            device_group_id: 'a56b9900-0fef-41b0-bb7c-adf0055274cd',
            device_id: 'dh007',
            register_since: 1550746520,
            labels: {
                lab12: 'label12',
                lab23: 'label22',
                lab24: 'label22',
                lab22: 'label22',
                lab25: 'label22',
                lab16: 'label12654',
                lab27: 'label22',
                lab28: 'label22',
                lab29: 'label22',
                lab30: 'label22654',
                lab31: 'label12',
                lab32: 'label22',
                lab33: 'label2298754',
                lab34: 'label22',
                lab35: 'label22',
                lab56: 'label22',
                lab37: 'label22654',
                lab38: 'label12',
                lab39: 'label22',
                lab40: 'label2298754',
                lab41: 'label22',
                lab42: 'label22',
        },
            enabled: true,
            device_status_name : 'ONLINE'
        },
        {
            organization_id: 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            device_group_id: 'd94ac398-fd77-4937-b7f7-9fa0ff8b1eab',
            device_id: 'dh010',
            register_since: 1550746520,
            labels: {
                lab1: 'label13',
                lab23: 'label23'
            },
            enabled: false,
            device_status_name : 'OFFLINE'
        },
        {
            organization_id: 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            device_group_id: 'e94ac398-fd77-4937-b7f7-9fa0ff8b1eab',
            device_id: 'dh009',
            register_since: 1550746520,
            labels: {
                lab4: 'label14',
                lab24: 'label24'
            },
            enabled: false,
            device_status_name : 'OFFLINE'
        }
    ],
    assets: [
        {
            organization_id: 'b6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            edge_controller_id: '7777-0fef-41b0-bb7c-adf0055274cd',
            asset_id: '4320957c-5377-4a8b-98e4-b6f988646be7',
            agent_id: '905512fb-67c1-8eb2-7d4f-754839e8dd45',
            eic_net_ip: '10.253.10.78',
            show: true,
            created: 1550746520,
            labels: {
                lab1: 'label1',
                lab2: 'label2654',
                lab3: 'label2',
                lab4: 'label255',
                lab6: 'label2',
                lab7: 'label2654897',
                lab8: 'label2',
                lab9: 'label2',
            },
            os: {
                name: 'Darwin',
                version: '18.6.0',
                class: 'DARWIN',
                class_name: 'DARWIN',
                architecture: 'amd64'
            },
            hardware: {
                cpus: [
                    {
                        manufacturer: 'Apple',
                        model: 'yes',
                        architecture: 'Fanix',
                        num_cores: 3
                    }
                ],
                installed_ram: 2,
                net_interfaces: [
                    {
                        type: 'capacity',
                        link_capacity: 5
                    },
                    {
                        type: 'capacity_big',
                        link_capacity: 123
                    },
                ]
            },
            storage: [
                {
                    type: 'ram',
                    total_capacity: 7
                }
            ],
            last_op_summary: {
                operation_id: '8690b81e-9757-4272-9a48-84af007cb713',
                timestamp:  1550746669,
                op_status_name: 'INPROGRESS',
                status: 'INPROGRESS',
                info: 'metrics enabled',
            },
            last_alive_timestamp: '654654654',
            status_name: 'OFFLINE'
        },
        {
            organization_id: 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            edge_controller_id: '1010101-0fef-41b0-bb7c-adf0055274cd',
            asset_id: 'e94ac398-5555-4937-b7f7-9fa0ff8b1eab1',
            agent_id: '905512fb-67c1-8eb2-7d4f-754839e8dd44',
            eic_net_ip: '98.105.55.18',
            show: true,
            created: 1550746669,
            labels: {
                lab1: 'label1',
                lab2: 'label2'
            },
            os: {
                name: 'petra',
                version: 'v1',
                class: 'linux',
                class_name: 'LINUX',
                architecture: 'amd64'
            },
            hardware: {
                cpus: [
                    {
                        manufacturer: 'GenuineIntel',
                        model: 'Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz',
                        architecture: 'amd64',
                        num_cores: 3
                    }
                ],
                installed_ram: 2,
                net_interfaces: [
                    {
                        type: 'capacity',
                        link_capacity: 5
                    },
                ]
            },
            storage: [
                {
                    type: 'VBOX HARDDISK',
                    total_capacity: 10240
                },
                {
                    type: 'Apple',
                    total_capacity: 15
                }
            ],
            last_op_summary: {
                operation_id: '54654asd-654654-qweqwe',
                timestamp:  1563299414,
                op_status_name: 'SCHEDULED',
                status: 'SCHEDULED',
                info: 'info'
            },
            last_alive_timestamp: '654654654',
            status_name: 'ONLINE'
        },
    ],
    controllers:
    [
        {
            organization_id: '8888-2ed7-41c1-90fb-f561eb81ea42',
            edge_controller_id: '7777-0fef-41b0-bb7c-adf0055274cd',
            show: true,
            created: 1563298074,
            name: 'edge25',
            labels: {
                lab1: 'label1',
               lab2: 'label2'
            },
            assets:  [
                {
                    eic_net_ip: '10.253.10.78',
                    status: 'OFFLINE',
                    asset_id: '4320957c-5377-4a8b-98e4-b6f988646be7',
                    edge_controller_id: '7777-0fef-41b0-bb7c-adf0055274cd'
                }
            ],
            location: 'OR, USA',
            status_name: 'ONLINE'
        },
        {
            organization_id: '999-2ed7-41c1-90fb-f561eb81ea42',
            edge_controller_id: '1010101-0fef-41b0-bb7c-adf0055274cd',
            show: true,
            created: 1550746676,
            name: 'edge65',
            labels: {
                'lab334': 'label344',
                'lab244': 'label244'
            },
            assets:  [
                {
                    eic_net_ip: '98.105.55.18',
                    status: 'ONLINE',
                    asset_id: 'e94ac398-5555-4937-b7f7-9fa0ff8b1eab1',
                    edge_controller_id: '1010101-0fef-41b0-bb7c-adf0055274cd'
                }
            ],
            location: 'OR, USA',
            status_name: 'ONLINE'
        }
    ]
};

/**
 * Mocked Edge Controller Join Token
 */
export const mockEICJoinToken = {
    organization_id: '999-2ed7-41c1-90fb-f561eb81ea42',
    token: '9wf59-2ed7-41c1-90fb-f561eb81ea42',
    // tslint:disable-next-line: max-line-length
    cacert: '-----BEGIN CERTIFICATE----- MIIC9zCCAd+gAwIBAgIBATANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQKEwVOYWxlajAeFw0xOTA1MjgxMzQ0NDBaFw0yMTA1MjcxMzQ0NDBaMBAxDjAMBgNVBAoTBU5hbGVqMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwGJffV/afFQ2SEe7G3rvUFJCjBUCeQX+LsQevY8DSc9LRuWl67TwfzrS2fyFMOUeVZyd5D/9nwreTun3FhvyMkQKHOpoa2cYcYOFcxHGrSeE0iL+VH5+/g7bBiaAZUUh0paHQE6xiKpGxBQhGJrPDyMxlbBrb5fb5VDJA09ph3eZ4DXfC30MiB0Doc/GNEBAlN8qMXschgQV+w/PVtNObUz8jvrxYHM36vT7iWtJQ7zdzv4SxYB21emPrBdzbVkB36fVyQ7RqheLKu6rqYMUV4Nj5kPP6eTza4N32IYvB6SKOnT1Ro1iTHvTPdZhM48d7txQ1ff+cVgG+5EiBi8MKwIDAQABo1wwWjAOBgNVHQ8BAf8EBAMCAqQwEwYDVR0lBAwwCgYIKwYBBQUHAwEwEgYDVR0TAQH/BAgwBgEB/wIBADAfBgNVHREEGDAWghQqLm5hbGVqNDgubmFsZWoudGVjaDANBgkqhkiG9w0BAQsFAAOCAQEAclw2YqEuvWtTaw+fJzX4ByfZh8nrfT1mKoAcJDDHXcEbvES0b8xqXqrGYW1QO92tUgFEw23C43wKJPdzmqIYmy0sR6sghsZJLEQzY3DOXNx2GirREm7jrv66REs1tohhukB1s9PU8oxp+lYzdFtWYW88BB2tg75MMTxS/KxW10966j4aSO53osHXC1/NgWJM/Mm4WG3jAgZFFZc6BBxmjmH8O98KEsQqQOOl3zmOQAtikuE0K2hHOa5dEM5ft5569Fh53WeQr+PFlfNhlaFmmRpKHU9k2eeB7VTTwxIqx3TvA5t41RRyb5X4dr2MVizh04hMhyf4MNGuVy94B6yVw== -----END CERTIFICATE-----',
    join_url: 'http://qwerty',
    expires_on: 1550746676,
    dns_url: 'asdad1231.es'
};

/**
 * Mocked Agent Join Token
 */
export const mockAgentJoinToken = {
    organization_id: '999-2ed7-41c1-90fb-f561eb81ea42',
    edge_controller_id: '7777-0fef-41b0-bb7c-adf0055274cd',
    token: '9wf59-2ed7-41c1-90fb-f561eb81ea42',
    expires_on: 1550746676,
    // tslint:disable-next-line: max-line-length
    ca_cert: '-----BEGIN CERTIFICATE----- MIIC9zCCAd+gAwIBAgIBATANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQKEwVOYWxlajAeFw0xOTA1MjgxMzQ0NDBaFw0yMTA1MjcxMzQ0NDBaMBAxDjAMBgNVBAoTBU5hbGVqMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwGJffV/afFQ2SEe7G3rvUFJCjBUCeQX+LsQevY8DSc9LRuWl67TwfzrS2fyFMOUeVZyd5D/9nwreTun3FhvyMkQKHOpoa2cYcYOFcxHGrSeE0iL+VH5+/g7bBiaAZUUh0paHQE6xiKpGxBQhGJrPDyMxlbBrb5fb5VDJA09ph3eZ4DXfC30MiB0Doc/GNEBAlN8qMXschgQV+w/PVtNObUz8jvrxYHM36vT7iWtJQ7zdzv4SxYB21emPrBdzbVkB36fVyQ7RqheLKu6rqYMUV4Nj5kPP6eTza4N32IYvB6SKOnT1Ro1iTHvTPdZhM48d7txQ1ff+cVgG+5EiBi8MKwIDAQABo1wwWjAOBgNVHQ8BAf8EBAMCAqQwEwYDVR0lBAwwCgYIKwYBBQUHAwEwEgYDVR0TAQH/BAgwBgEB/wIBADAfBgNVHREEGDAWghQqLm5hbGVqNDgubmFsZWoudGVjaDANBgkqhkiG9w0BAQsFAAOCAQEAclw2YqEuvWtTaw+fJzX4ByfZh8nrfT1mKoAcJDDHXcEbvES0b8xqXqrGYW1QO92tUgFEw23C43wKJPdzmqIYmy0sR6sghsZJLEQzY3DOXNx2GirREm7jrv66REs1tohhukB1s9PU8oxp+lYzdFtWYW88BB2tg75MMTxS/KxW10966j4aSO53osHXC1/NgWJM/Mm4WG3jAgZFFZc6BBxmjmH8O98KEsQqQOOl3zmOQAtikuE0K2hHOa5dEM5ft5569Fh53WeQr+PFlfNhlaFmmRpKHU9k2eeB7VTTwxIqx3TvA5t41RRyb5X4dr2MVizh04hMhyf4MNGuVy94B6yVw== -----END CERTIFICATE-----',
};

/**
 * Mocked apps Inbounds
 */
export const mockAppsInboundsList = {
    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
    'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
    'instance_name': 'dbInbound',
    'inbound_name': 'MySQL'
};

/**
 * Mocked apps Outbound
 */
export const mockAppsOutboundsList = {
    'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
    'app_instance_id': '0a261182-728e-4633-9578-3e1322c05d20',
    'instance_name': 'dbInbound',
    'outbound_name': 'OpenCast1'
};

/**
 * Mocked connections list
 */
export const mockConnectionsList =   [
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'connection_id': '3bc6a816-6548-4b5f-a2b7-23921dd6548a',
        'source_instance_id': '3bc6a816-6548-4b5f-a2b7-239123',
        'source_instance_name': 'WordPress1',
        'target_instance_id': '3bc6a816-6548-4b5f-a2b7-239456',
        'target_instance_name': 'WordPress',
        'inbound_name': 'dbInbound',
        'outbound_name': 'dbOutbound',
        'outbound_required': true
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'connection_id': '3bc6a816-6548-4b5f-a2b7-23921dd6548a',
        'source_instance_id': '3bc6a816-6548-4b5f-a2b7-239123',
        'source_instance_name': 'WordPress1',
        'target_instance_id': '3bc6a816-6548-4b5f-a2b7-239456',
        'target_instance_name': 'WordPress',
        'inbound_name': 'dbInbound',
        'outbound_name': 'dbOutbound',
        'outbound_required': true
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'connection_id': '3bc6a816-6548-4b5f-a2b7-23921dd6548a',
        'source_instance_id': '3bc6a816-6548-4b5f-a2b7-239123',
        'source_instance_name': 'WordPress1',
        'target_instance_id': '3bc6a816-6548-4b5f-a2b7-239456',
        'target_instance_name': 'WordPress',
        'inbound_name': 'dbInbound',
        'outbound_name': 'dbOutbound',
        'outbound_required': true
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'connection_id': '3bc6a816-6548-4b5f-a2b7-23921dd6548a',
        'source_instance_id': '3bc6a816-6548-4b5f-a2b7-239123',
        'source_instance_name': 'WordPress1',
        'target_instance_id': '3bc6a816-6548-4b5f-a2b7-239456',
        'target_instance_name': 'WordPress',
        'inbound_name': 'dbInbound',
        'outbound_name': 'dbOutbound',
        'outbound_required': true
    },
    {
        'organization_id': '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
        'connection_id': '3bc6a816-6548-4b5f-a2b7-23921dd6548a',
        'source_instance_id': '3bc6a816-6548-4b5f-a2b7-239123',
        'source_instance_name': 'WordPress1',
        'target_instance_id': '3bc6a816-6548-4b5f-a2b7-239456',
        'target_instance_name': 'WordPress',
        'inbound_name': 'dbInbound',
        'outbound_name': 'dbOutbound',
        'outbound_required': true
    }
];



