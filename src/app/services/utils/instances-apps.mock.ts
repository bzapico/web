/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
