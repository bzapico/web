export const mockJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    // tslint:disable-next-line:max-line-length
    '.eyJVc2VySWQiOiJqb2huLmRvZUBtYWlsLmNvbSIsIk9yZ2FuaXphdGlvbklkIjoiMjE0MzQ2NTQzNDM0MyIsIlByaW1pdGl2ZXMiOlsiMCIsIjEiLCIyIiwiMyJdLCJSb2xlbmFtZSI6Ik93bmVyIiwiRXhwaXJlc0F0IjoxMjMzODU3MjcxMjc0M30' +
    '.kF9ac17V9mWoWMYjhHyc9GD8hGw6wRT6wwNgdUJ1v4c';

export const mockUserProfileInfo = {
    name: 'John Doe',
    email: 'john.doe@mail.com',
    role: 'Owner'
};

export const mockOrganizationInfo = {
    name: 'Nike'
};

export const mockUserList = [
    {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        role: 'Owner'
    },
    {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        role: 'Owner'
    },
    {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        role: 'Owner'
    },
    {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        role: 'Owner'
    },
    {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        role: 'Owner'
    },
    {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        role: 'Owner'
    },
];
/**
 * Mocked clusters list
 */
export const mockClusterList = [
    {
        name: 'Cluster1',
        id: '0800200c9a66',
        nodes: '10',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster1',
        id: '0800200c9a66',
        nodes: '10',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster1',
        id: '0800200c9a66',
        nodes: '10',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster1',
        id: '0800200c9a66',
        nodes: '10',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Running',
        tags: 'ny, edge',
        multitenant: 'All'
    },
    {
        name: 'Cluster1',
        id: '0800200c9a66',
        nodes: '8',
        description: 'Ny Cluster',
        type: 'Kubernetes',
        status: 'Error',
        tags: 'ny, edge',
        multitenant: 'No'
    },
    {
        name: 'Cluster1',
        id: '0800200c9a66',
        nodes: '10',
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
        'name': 'Running',
        'value': 5
    },
    {
        'name': 'Error',
        'value': 1
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
      },
];

export const mockResetPasword = 'NEW_PASSWORD_1234';

export const mockClusterId = [
    {
        name: 'Cluster 1',
        description: 'Ny Cluster',
        tags: 'ny, edge'
    }
];
