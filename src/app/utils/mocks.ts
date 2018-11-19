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
        name: 'Cluster1',
        id: '0800200c9a61',
        totalNodes: '10',
        runningNodes: '1',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster2',
        id: '0800200c9a62',
        totalNodes: '10',
        runningNodes: '2',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster3',
        id: '0800200c9a63',
        totalNodes: '10',
        runningNodes: '3',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster4',
        id: '0800200c9a64',
        totalNodes: '10',
        runningNodes: '4',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster5',
        id: '0800200c9a65',
        totalNodes: '10',
        runningNodes: '5',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Error',
        tags: 'ny, edge',
        multitenant: 'No'
    },
    {
        name: 'Cluster6',
        id: '0800200c9a66',
        totalNodes: '10',
        runningNodes: '6',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster7',
        id: '0800200c9a67',
        totalNodes: '10',
        runningNodes: '7',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
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
            'name': '-6h',
            'min': 28,
            'max': 49
          },
          {
            'value': 79,
            'name': '-5h',
            'min': 66,
            'max': 91
          },
          {
            'value': 23,
            'name': '-4h',
            'min': 3,
            'max': 14
          },
          {
            'value': 96,
            'name': '-3h',
            'min': 76,
            'max': 16
          },
          {
            'value': 73,
            'name': '-2h',
            'min': 45,
            'max': 100
          },
          {
            'value': 73,
            'name': '-1h',
            'min': 45,
            'max': 100
          },
          {
            'value': 73,
            'name': 'now',
            'min': 45,
            'max': 100
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
    totalClusters: mockClusterList.length,
    totalNodes: mockClusterList.length * 10
};

/**
 * Mocked App list
 */
export const mockAppsList = [
    {
        name: 'Assets Application',
        id: '0800200c9a61',
        description: 'Instance of MongoDB',
        tags: 'ny, edge',
        configuration: 'Kubernetes',
        service: 'Running',
    },
    {
        name: 'SIG Application',
        id: '0800200c9a62',
        description: 'Instance of MongoDB',
        tags: 'ny, edge',
        configuration: 'NativeDocker',
        service: 'Running',
    },
    {
        name: 'Engine App',
        id: '0800200c9a63',
        description: 'Instance of MongoDB',
        tags: 'ny, edge',
        configuration: 'Kubernetes',
        service: 'Running',
    },
    {
        name: 'Darby App',
        id: '0800200c9a64',
        description: 'Instance of MongoDB',
        tags: 'ny, edge',
        configuration: 'NativeDocker',
        service: 'Running',
    },
    {
        name: 'Darby App',
        id: '0800200c9a65',
        description: 'Instance of MongoDB',
        tags: 'ny, edge',
        configuration: 'Kubernetes',
        service: 'Running',
    }
];

/**
 * Mocked nodes list
 */
export const mockNodeList = [
    {
        id: '0800200c9a69',
        ip: '100.022.0129',
        credentials: 'Private',
        tags: 'ny, edge',
        status: 'Running',
    },
    {
        id: '0800200c9a68',
        ip: '100.022.0128',
        credentials: 'Private',
        tags: 'ny, edge',
        status: 'Running',
    },
    {
        id: '0800200c9a67',
        ip: '100.022.0127',
        credentials: 'Private',
        tags: 'ny, edge',
        status: 'Running',
    },
    {
        id: '0800200c9a66',
        ip: '100.022.0126',
        credentials: 'Public',
        tags: 'ny, edge',
        status: 'Error',
    },
    {
        id: '0800200c9a65',
        ip: '100.022.0125',
        credentials: 'Private',
        tags: 'ny, edge',
        status: 'Running',
    },
    {
        id: '0800200c9a65',
        ip: '100.022.0125',
        credentials: 'Private',
        tags: 'ny, edge',
        status: 'Error',
    },
    {
        id: '0800200c9a65',
        ip: '100.022.0125',
        credentials: 'Private',
        tags: 'ny, edge',
        status: 'Running',
    },
    {
        id: '0800200c9a65',
        ip: '100.022.0125',
        credentials: 'Private',
        tags: 'ny, edge',
        status: 'Running',
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
            'name': '-6h',
            'min': 28,
            'max': 49
          },
          {
            'value': 79,
            'name': '-5h',
            'min': 66,
            'max': 91
          },
          {
            'value': 23,
            'name': '-4h',
            'min': 3,
            'max': 14
          },
          {
            'value': 96,
            'name': '-3h',
            'min': 76,
            'max': 16
          },
          {
            'value': 40,
            'name': '-2h',
            'min': 45,
            'max': 100
          },
          {
            'value': 73,
            'name': '-1h',
            'min': 3,
            'max': 15
          },
          {
            'value': 23,
            'name': 'now',
            'min': 45,
            'max': 100
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
        multitenant: 'All'
    }
];
