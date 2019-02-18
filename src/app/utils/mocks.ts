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
            app2: 'simple-app',
            app1: 'web-test',
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
                status_name: 'RUNNING'
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
                status_name: 'RUNNING'
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
                status_name: 'SERVICE_WAITING'
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
                status_name: 'RUNNING'
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
            app1: 'web-test',
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
                status_name: 'SERVICE_WAITING'
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
                status_name: 'RUNNING'
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
                status_name: 'RUNNING'
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
                status_name: 'RUNNING'
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
            app2: 'simple-app',
            app1: 'web-test',
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
                status_name: 'SERVICE_WAITING'
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
                status_name: 'RUNNING'
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
                status_name: 'RUNNING'
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
                status_name: 'RUNNING'
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
            app2: 'simple-app',
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
                status_name: 'RUNNING'
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
                status_name: 'RUNNING'
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
                status_name: 'SERVICE_WAITING'
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
                status_name: 'RUNNING'
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
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d9',
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
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56',
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
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d7',
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
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56',
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
        node_id: '6769d264-4ba7-4cd7-b221-a7f4f14e481d5',
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
        node_id: 'fcd88a93-9b06-4d3b-a5c0-27f9a3bd1b56',
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
    [
        {
          organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
          device_group_id: 'a1',
          device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
          register_since: 1550506924515,
          labels: {
              type: 'phone',
              os: 'arm',
          },
          enabled: 'true',
          device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
          status_name: 'Connected'
        },
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'a1',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1550417971000,
            labels: {
                type: 'phone',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Connected'
        }
    ],
    [
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'b2',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1549899571000,
            labels: {
                type: 'phone',
                os: 'arm',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Connected'
        },
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'b2',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1547825971000,
            labels: {
                type: 'phone',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Connected'
        },
        {
            organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
            device_group_id: 'b2',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1518968371000,
            labels: {
                type: 'phone',
                os: 'arm',
            },
            enabled: 'false',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Disonected'
        },
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'b2',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1516087991000,
            labels: {
                type: 'phone',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Connected'
        }
    ],
    [
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'c3',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1527261837000,
            labels: {
                type: 'phone',
                os: 'arm',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Disonected'
        },
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'c3',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1515486791000,
            labels: {
                type: 'phone',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Disonected'
        },
        {
            organization_id: '7ad1a7a8-e4b1-4798-9071-e456908fad13',
            device_group_id: 'c3',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1513413191000,
            labels: {
                type: 'phone',
                os: 'arm',
            },
            enabled: 'false',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Disonected'
        },
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'c3',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1527261837000,
            labels: {
                type: 'phone',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Disonected'
        }
    ],
    [
        {
            organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
            device_group_id: 'd4',
            device_id: '792989c-4ae4-460f-92b5-bca7ed36f016',
            register_since: 1497108201000,
            labels: {
                type: 'phone',
                os: 'arm',
            },
            enabled: 'true',
            device_api_key: '7bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3',
            status_name: 'Disonected'
        }
    ]
];

/**
 * Mocked devices group list
 */
export const mockGroupList: Group[] = [
    {
        organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
        device_group_id: 'a1',
        enabled: true,
        default_device_connectivity: true,
        name: 'Voice controllers',
        device_group_api_key: '2bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c79'
    },
    {
        organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
        device_group_id: 'b2',
        enabled: false,
        default_device_connectivity: false,
        name: 'Nest cams Outdoor',
        device_group_api_key: '3bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c78'
    },
    {
        organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
        device_group_id: 'c3',
        enabled: true,
        default_device_connectivity: true,
        name: 'Tracking devices',
        device_group_api_key: '4bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c76'
    },
    {
        organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
        device_group_id: 'd4',
        enabled: true,
        default_device_connectivity: true,
        name: 'Bluetooth sensors',
        device_group_api_key: '5bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c75'
    },
    {
        organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
        device_group_id: 'e5',
        enabled: true,
        default_device_connectivity: true,
        name: 'Droids with force',
        device_group_api_key: '5bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c75'
    },
    {
        organization_id: 'a792989c-4ae4-460f-92b5-bca7ed36f017',
        device_group_id: 'f6',
        enabled: true,
        default_device_connectivity: true,
        name: 'Smart thermostats',
        device_group_api_key: '5bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c75'
    }
  ];

/**
 * Mocked new group API Key
 */
export const mockGroupApiKey = '9cd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-3352-ac7a-398a-3c11ac797c74';
