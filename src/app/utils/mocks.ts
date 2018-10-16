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
        nodes: '10',
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
        'name': 'CPU LOAD',
        'value': 8940000
    },
    // {
    //     'name': 'STORAGE',
    //     'value': 5000000
    // },
    // {
    //     'name': 'STORAGE',
    //     'value': 5000000
    // }
];

/**
 * Mocked nodes list
 */
export const mockNodesChart = [
    {
        'name': 'Dominican Republic',
        'series': [
          {
            'value': 2390,
            'name': '2016-09-13T00:45:49.946Z',
            'min': 2283,
            'max': 2497
          },
          {
            'value': 3791,
            'name': '2016-09-14T22:53:57.309Z',
            'min': 3663,
            'max': 3919
          },
          {
            'value': 4749,
            'name': '2016-09-14T04:20:27.185Z',
            'min': 4356,
            'max': 5142
          },
          {
            'value': 3966,
            'name': '2016-09-21T04:52:40.898Z',
            'min': 3766,
            'max': 4166
          },
          {
            'value': 6736,
            'name': '2016-09-23T22:20:28.506Z',
            'min': 6453,
            'max': 7019
          }
        ]
      },
];

export const mockResetPasword = 'NEW_PASSWORD_1234';
