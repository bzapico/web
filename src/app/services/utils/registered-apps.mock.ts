/**
 * Mocked registered apps list (descriptors) - fields still not defined
 */
export const mockRegisteredAppsList = [
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

    }
];
