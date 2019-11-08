import { Group } from '../../definitions/interfaces/group';

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
export const mockResetPassword = 'NEW_PASSWORD_1234';

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
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
            device_id: 'dh006',
            register_since: '1550746714',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
                'app': 'kuard4',
                'the': 'label'
            }
        },
        {
            organization_id: 'a6ccf95e-2ed7-41c1-90fb-f561eb81ea42',
            device_group_id: 'a56b9900-0fef-41b0-bb7c-adf0055274cd',
            device_id: 'dh007',
            register_since: '1550746656',
            enabled: true,
            device_status_name: 'ONLINE',
            labels: {
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
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '70e3b907-54b4-4aa1-9f9b-3b15f1af7d99',
            device_id: 'dh001',
            register_since: '1550746644',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
            }
        }
    ],
    [
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '90651fde-4090-47e9-a838-735969d94302',
            device_id: 'dh002',
            register_since: '1550746647',
            enabled: false,
            device_status_name: 'OFFLINE',
            labels: {
            }
        },
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: '90651fde-4090-47e9-a838-735969d94302',
            device_id: 'dh003',
            register_since: '1550746651',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
                'app2': 'quee2',
                'drone': '321'
            }
        }
    ],
    [
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
            device_id: 'dh004',
            register_since: '1550746653',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
            }
        },
        {
            organization_id: '3bc6a816-bbb8-4b5f-a2b7-23921dde4146',
            device_group_id: 'dbc47863-4bad-4ea9-92dd-52bad1b395cf',
            device_id: 'dh005',
            register_since: '1550746656',
            enabled: true,
            device_status_name: 'OFFLINE',
            labels: {
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
    'instance_inbounds':
        [{
            'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
            'app_instance_id': '4979fdce-35c4-40fc-a9cf-36fce6e4ff90',
            'instance_name': 'MySQL-Appnet2',
            'inbound_name': 'mysqlinbound'
        },
        {
            'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
            'app_instance_id': 'b5e6c22b-e1c9-40a9-be68-2d05d6942b20',
            'instance_name': 'MySQL-Appnet1',
            'inbound_name': 'mysqlinbound'
        },
        {
            'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
            'app_instance_id': 'e96afc8e-03ff-4a1d-93f2-47c6fe328950',
            'instance_name': 'InboundTest01',
            'inbound_name': 'INBOUND'
        }]
    };

/**
 * Mocked apps Outbound
 */
export const mockAppsOutboundsList = {
    'instance_outbounds':
    [{
        'organization_id': '01014ea3-022a-40d6-943f-8a6b150eb144',
        'app_instance_id': 'c0bbd957-5dfb-488c-b7aa-7d1f910cb094',
        'instance_name': 'OutboundTest01',
        'outbound_name': 'OUTBOUND'
    }]
};
