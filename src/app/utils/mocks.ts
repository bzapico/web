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
        cluster_id: '0800200c9a61',
        name: 'Cluster1',
        description: 'Ny Cluster',
        total_nodes: '1',
        running_nodes: '0',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a62',
        name: 'Cluster2',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '2',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3',
            lab4: 'label4'
        },
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a63',
        name: 'Cluster3',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '3',
        cluster_type_name: 'Kubernetes',
        status_name: 'Error',
        labels: 'ny, edge',
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a64',
        name: 'Cluster4',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '4',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a65',
        name: 'Cluster5',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '5',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: 'ny, edge',
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a66',
        name: 'Cluster6',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '6',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3'
        },
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a67',
        name: 'Cluster7',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '7',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a68',
        name: 'Cluster8',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '8',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3'
        },
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a69',
        name: 'Cluster9',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '9',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'All'
    }, {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        cluster_id: '0800200c9a70',
        name: 'Cluster10',
        description: 'Ny Cluster',
        total_nodes: '10',
        running_nodes: '10',
        cluster_type_name: 'Kubernetes',
        status_name: 'Running',
        labels: {
            lab1: 'label1',
            lab2: 'label2'
        },
        multitenant_support: 'All'
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
        organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
        app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
        app_instance_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
        name: 'UI - Tableau',
        description: 'Instance of Tableau',
        configuration_options: {
            option1: 'value1',
            option2: 'value2',
            option3: 'value3'
        },
        environment_variables: {
            var1: 'value1',
            var2: 'value2',
            var3: 'value3'
        },
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3',
            lab4: 'label1',
            lab5: 'label2'
        },
        rules: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '1',
                source_port: '1234',
                access_name: 'root',
                auth_services: [

                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '2',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '3',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '3',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '2',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '4',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            }
        ],
        groups: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_2',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                service_group_id: 'service_group_id_2',
                name: 'group_2',
                description: 'Databases',
                service_instances: [
                    '1',
                    '5'
                ],
                policy_name: 'recursive'
            }
        ],
        services: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_1',
                app_descriptor_id: 'app_descriptor_id_1',
                service_id: '1',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '0'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_2',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                service_id: '2',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '1'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_3',
                app_descriptor_id: 'app_descriptor_id_3',
                service_id: '3',
                name: 'simple-wordpress',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '2'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_4',
                app_descriptor_id: 'app_descriptor_id_4',
                service_id: '4',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '3'
                ],
                status_name: 'Running'
            }
        ],
        status_name: 'Running',
    },
    {
        organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
        app_descriptor_id: 'app_descriptor_id_3',
        app_instance_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
        name: 'UI - Grafana',
        description: 'Grafana dashboard',
        configuration_options: {
            option1: 'value1',
            option2: 'value2',
            option3: 'value3'
        },
        environment_variables: {
            var1: 'value1',
            var2: 'value2',
            var3: 'value3'
        },
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3'
        },
        rules: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_3',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '1',
                source_port: '1234',
                access_name: 'root',
                auth_services: [

                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_3',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '2',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '3',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_3',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '3',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '2',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_3',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '4',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            }
        ],
        groups: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_3',
                app_descriptor_id: 'app_descriptor_id_3',
                service_group_id: 'service_group_id_3',
                name: 'group_3',
                description: 'Databases',
                service_instances: [
                    '1',
                    '5'
                ],
                policy_name: 'recursive'
            }
        ],
        services: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_1',
                app_descriptor_id: 'app_descriptor_id_3',
                service_id: '1',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '0'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_2',
                app_descriptor_id: 'app_descriptor_id_3',
                service_id: '2',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '1'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_3',
                app_descriptor_id: 'app_descriptor_id_3',
                service_id: '3',
                name: 'simple-wordpress',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '2'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_4',
                app_descriptor_id: 'app_descriptor_id_4',
                service_id: '4',
                name: 'simple-wordpress',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '3'
                ],
                status_name: 'Running'
            }
        ],
        status_name: 'Running',
    },
    {
        organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
        app_descriptor_id: 'app_descriptor_id_4',
        app_instance_id: 'f9641333-3100-4bab-be3e-b0d33c227634',
        name: 'Assets Application',
        description: 'Instance of Cassandra',
        configuration_options: {
            option1: 'value1',
            option2: 'value2',
            option3: 'value3'
        },
        environment_variables: {
            var1: 'value1',
            var2: 'value2',
            var3: 'value3'
        },
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3'
        },
        rules: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_4',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '1',
                source_port: '1234',
                access_name: 'root',
                auth_services: [

                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_4',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '2',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '3',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_4',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '3',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '2',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_4',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '4',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            }
        ],
        groups: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_2',
                app_descriptor_id: 'app_descriptor_id_4',
                service_group_id: 'service_group_id_2',
                name: 'group_2',
                description: 'Databases',
                service_instances: [
                    '1',
                    '5'
                ],
                policy_name: 'recursive'
            }
        ],
        services: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_1',
                app_descriptor_id: 'app_descriptor_id_4',
                service_id: '1',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '0'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_2',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                service_id: '2',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '1'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_3',
                app_descriptor_id: 'app_descriptor_id_3',
                service_id: '3',
                name: 'simple-wordpress',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '2'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_4',
                app_descriptor_id: 'app_descriptor_id_4',
                service_id: '4',
                name: 'simple-wordpress',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '3'
                ],
                status_name: 'Running'
            }
        ],
        status_name: 'Running',
    },
    {
        organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
        app_descriptor_id: 'app_descriptor_id_5',
        app_instance_id: 'f9641333-3100-4bab-be3e-b0d33c227634',
        name: 'Assets Application',
        description: 'Instance of MongoDB',
        configuration_options: {
            option1: 'value1',
            option2: 'value2',
            option3: 'value3'
        },
        environment_variables: {
            var1: 'value1',
            var2: 'value2',
            var3: 'value3'
        },
        labels: {
            lab1: 'label1',
            lab2: 'label2',
            lab3: 'label3'
        },
        rules: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_5',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '1',
                source_port: '1234',
                access_name: 'root',
                auth_services: [

                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_5',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '2',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '3',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_5',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '3',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                    '2',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_descriptor_id: 'app_descriptor_id_5',
                rule_id: '83799773-1fe6-44ad-a32c-04fab6212c84',
                name: 'all open',
                source_service_id: '4',
                source_port: '1234',
                access_name: 'root',
                auth_services: [
                    '1',
                ],
                device_groups: [
                    'device_group1',
                    'device_group2',
                    'device_group3',
                ],
            }
        ],
        groups: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_2',
                app_descriptor_id: 'app_descriptor_id_5',
                service_group_id: 'service_group_id_2',
                name: 'group_2',
                description: 'Databases',
                service_instances: [
                    '1',
                    '5'
                ],
                policy_name: 'recursive'
            }
        ],
        services: [
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_1',
                app_descriptor_id: 'app_descriptor_id_1',
                service_id: '1',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '0'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_2',
                app_descriptor_id: '174a1888-a7ed-49a1-940a-7a648ca3ec8f',
                service_id: '2',
                name: 'simple-mysql',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '1'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_3',
                app_descriptor_id: 'app_descriptor_id_3',
                service_id: '3',
                name: 'simple-wordpress',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '2'
                ],
                status_name: 'Running'
            },
            {
                organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
                app_instance_id: 'app_instance_id_4',
                app_descriptor_id: 'app_descriptor_id_4',
                service_id: '4',
                name: 'simple-wordpress',
                description: 'Great service',
                type_name: 'DB',
                image: 'https://urlofservice:8080/',
                credentials: {},
                specs: {},
                storage: [
                    'storage_restriction_1',
                    'storage_restriction_2'
                ],
                exposed_ports: [
                    '8080',
                    '4300',
                    '23422'
                ],
                environment_variables: {
                    var1: 'value1',
                    var2: 'value2',
                    var3: 'value3'
                },
                configs: [
                    {
                        name: 'db config',
                        port: '12312'
                    }
                ],
                labels: {
                    lab1: 'label1',
                    lab2: 'label2',
                    lab3: 'label3'
                },
                deploy_after: [
                    '3'
                ],
                status_name: 'Running'
            }
        ],
        status_name: 'Running',
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
        node_id: '0800200c9a69',
        ip: '100.022.0129',
        credentials: 'Private',
        labels: {lab1:  'lab1'},
        status_name: 'Running',
        state_name: 'Unregistered',

    },
    {
        node_id: '0800200c9a68',
        ip: '100.022.0128',
        credentials: 'Private',
        labels: {lab8:  'lab8'},
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: '0800200c9a67',
        ip: '100.022.0127',
        credentials: 'Private',
        labels: {lab1:  'lab1'},
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: '0800200c9a66',
        ip: '100.022.0126',
        credentials: 'Private',
        labels: {lab1:  'lab1'},
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: '0800200c9a65',
        ip: '100.022.0125',
        credentials: 'Private',
        labels: {lab1:  'lab1'},
        status_name: 'Running',
        state_name: 'Unregistered',

    },    {
        node_id: '0800200c9a64',
        ip: '100.022.0123',
        credentials: 'Private',
        labels: {lab1:  'lab1'},
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
        id: '0800200c9a61',
        totalNodes: '10',
        runningNodes: '1',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant_support: 'All'
    }
];
