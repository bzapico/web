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
import { DownloadLogResponse } from 'src/app/definitions/interfaces/download-log-response';
import { LogResponse } from 'src/app/definitions/interfaces/log-response';
import { DownloadLogState } from 'src/app/definitions/enums/download-log-state.enum';
/**
 * Mocked Logs list
 */
export const mockLogsList: LogResponse = {
    organization_id: 'c5c289a3-dca0-49ef-973d-40bb554ae0c7',
    from: 1575457623642000000,
    to: 1575457623642000000,
    entries: [
    {
        app_descriptor_id: '7c77dd11-0910-486a-a55e-edfbb87fcb16',
        app_descriptor_name: 'Virtual-Drone-Blan',
        app_instance_id: '9648fb20-d592-4fad-905c-aac68a6e5971',
        app_instance_name: 'visrtua444lDroneBlan',
        service_group_id: 'ec831d1a-50e1-447d-86c0-734b01e8fb3a',
        service_group_instance_id: 'c30a77d5-23f1-4048-b028-432c55274b51',
        service_group_name: 'dronegroup',
        service_id: '3dd92d8f-7d51-4d50-ba91-ed2dbeb346b8',
        service_instance_id: '4d052e57-ef9c-4009-b6b6-9504d57d2da3',
        service_name: 'drone',
        timestamp: 1575457623642000000,
        msg: 'ERROR:root:Invalid Nalej domain string',
    },
    {
        app_descriptor_id: '7c77dd11-0910-486a-a55e-edfbb87fcb16',
        app_descriptor_name: 'Virtual-Drone-Blan',
        app_instance_id: '9648fb20-d592-4fad-905c-aac68a6e5971',
        app_instance_name: 'visrtua444lDroneBlan',
        service_group_id: 'ec831d1a-50e1-447d-86c0-734b01e8fb3a',
        service_group_instance_id: 'c30a77d5-23f1-4048-b028-432c55274b51',
        service_group_name: 'dronegroup',
        service_id: '3dd92d8f-7d51-4d50-ba91-ed2dbeb34622',
        service_instance_id: '4d052e57-ef9c-4009-b6b6-9504d57d2da3',
        service_name: 'drone',
        timestamp: 1575457623642000000,
        msg: 'ERROR:root:Invalid Nalej domain string',
    },
    {
        app_descriptor_id: '7c77dd11-0910-486a-a55e-edfbb87fcb16',
        app_descriptor_name: 'Virtual-Drone-Blan',
        app_instance_id: '9648fb20-d592-4fad-905c-aac68a6e5971',
        app_instance_name: 'visrtua444lDroneBlan',
        service_group_id: 'ec831d1a-50e1-447d-86c0-734b01e8fb3a',
        service_group_instance_id: 'c30a77d5-23f1-4048-b028-432c55274b51',
        service_group_name: 'dronegroup',
        service_id: '3dd92d8f-7d51-4d50-ba91-ed2dbeb34622',
        service_instance_id: '4d052e57-ef9c-4009-b6b6-9504d57d2da3',
        service_name: 'drone',
        timestamp: 1575457623642000000,
        msg: 'ERROR:root:Invalid Nalej domain string',
    },
    {
        app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
        app_descriptor_name: 'Simple-wordpress',
        app_instance_id: 'cd018695-5270-44d4-9f47-ae58f59cfd31',
        app_instance_name: 'WP005',
        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
        service_group_instance_id: '8af2e663-ff67-499e-8e55-59c42d4bc557',
        service_group_name: 'group1',
        service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
        service_instance_id: 'c2b94673-c95f-4131-9b56-dafe56b13b6b',
        service_name: 'simple-mysql',
        timestamp: 1576512286707000000,
        msg: '2019-12-16 16:04:46 48 [Note] InnoDB: Waiting for purge to start'
    },
    {
        app_descriptor_id: '7c77dd11-0910-486a-a55e-edfbb87fcb16',
        app_descriptor_name: 'Virtual-Drone-Bla2',
        app_instance_id: '9648fb20-d592-4fad-905c-aac68a6e5972',
        app_instance_name: 'visrtualDroneBlan',
        service_group_id: 'ec831d1a-50e1-447d-86c0-734b01e8fb3a',
        service_group_instance_id: 'c30a77d5-23f1-4048-b028-432c55274b51',
        service_group_name: 'dronegroup',
        service_id: '3dd92d8f-7d51-4d50-ba91-ed2dbeb346b8',
        service_instance_id: '4d052e57-ef9c-4009-b6b6-9504d57d2da3',
        service_name: 'drone',
        timestamp: 1575457623642000000,
        msg: 'ERROR:root:Login failed. Trying again in 2 seconds.',
    },
    {
        app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
        app_descriptor_name: 'Simple-wordpress',
        app_instance_id: 'cd018695-5270-44d4-9f47-ae58f59cfd31',
        app_instance_name: 'WP005',
        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
        service_group_instance_id: '8af2e663-ff67-499e-8e55-59c42d4bc557',
        service_group_name: 'group1',
        service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
        service_instance_id: 'c2b94673-c95f-4131-9b56-dafe56b13b6b',
        service_name: 'simple-mysql',
        timestamp: 1576512332490000000,
        msg: '2019-12-16 16:05:32+00:00 [Note] [Entrypoint]: Stopping temporary server'
    },
    {
        app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
        app_descriptor_name: 'Simple-wordpress',
        app_instance_id: 'cd018695-5270-44d4-9f47-ae58f59cfd34',
        app_instance_name: 'WP006',
        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad275',
        service_group_instance_id: '8af2e663-ff67-499e-8e55-59c42d4bc554',
        service_group_name: 'group1',
        service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce4',
        service_instance_id: 'c2b94673-c95f-4131-9b56-dafe56b13b6b',
        service_name: 'simple-mysql',
        timestamp: 1576512303911000000,
        msg: '  http://www.mysql.com'
    },
    ],
    app_descriptor_log_summary: [
    {
        organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
        app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
        app_descriptor_name: 'Simple wordpress',
        current_labels: {
            app: 'simple-wordpress'
        },
        instances: [
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: '027126e4-4269-4aa7-8c6a-97bf373b2ddb',
                app_instance_name: 'WP002',
                app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
                app_descriptor_name: 'Simple wordpress',
                current_labels: {
                    app: 'simple-wordpress'
                },
                groups: [
                    {
                        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                        service_group_instance_id: 'aaac3187-efea-41f0-9f35-78877d33be20',
                        name: 'group1',
                        service_instances: [
                            {
                                service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                                service_instance_id: '9a1c68ba-0bb9-4767-af75-8095f3756587',
                                name: 'simple-wordpress'
                            },
                            {
                                service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                                service_instance_id: '9a1c68ba-0bb9-4767-af75-8095f3756589',
                                name: 'simple-wordpress'
                            },
                            {
                                service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
                                service_instance_id: 'f1581e8b-16f2-4d45-a784-f856ee88d6b2',
                                name: 'simple-mysql'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: '2216fd15-c4f4-49a5-9e55-71b475a2351a',
                app_instance_name: 'WP004',
                app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
                app_descriptor_name: 'Simple wordpress',
                current_labels: {
                    app: 'simple-wordpress'
                },
                groups: [
                    {
                        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                        service_group_instance_id: '1f434bde-b35c-494f-b4f6-c4c01efb6e55',
                        name: 'group1',
                        service_instances: [
                            {
                                service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8f3',
                                service_instance_id: '20d46028-85da-40fe-ae88-69424e83891f',
                                name: 'simple-mysql'
                            },
                            {
                                service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8f4',
                                service_instance_id: '4acf9d26-d6d3-4623-b3a8-0401f0b5a5f2',
                                name: 'simple-wordpress'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: '5adb24cd-355a-46f7-85ca-67366419a4e3',
                app_instance_name: 'WP001',
                app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
                app_descriptor_name: 'Simple wordpress',
                current_labels: {
                    app: 'simple-wordpress'
                },
                groups: [
                    {
                        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                        service_group_instance_id: '8ca37ab2-2b5c-4c02-aeb4-b7a57c95c201',
                        name: 'group1',
                        service_instances: [
                            {
                                service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8f3',
                                service_instance_id: '25256794-3891-4852-8b9f-e221ea0570ce',
                                name: 'simple-wordpress'
                            },
                            {
                                service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce2',
                                service_instance_id: 'adcba6e4-782c-4c6d-a323-b62c2674d808',
                                name: 'simple-mysql'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: 'cd018695-5270-44d4-9f47-ae58f59cfd31',
                app_instance_name: 'WP005',
                app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
                app_descriptor_name: 'Simple wordpress',
                current_labels: {
                    app: 'simple-wordpress'
                },
                groups: [
                    {
                        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                        service_group_instance_id: '8af2e663-ff67-499e-8e55-59c42d4bc557',
                        name: 'group1',
                        service_instances: [
                            {
                                service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce6',
                                service_instance_id: 'c2b94673-c95f-4131-9b56-dafe56b13b6b',
                                name: 'simple-mysql'
                            },
                            {
                                service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8f6',
                                service_instance_id: 'f39ebfaa-5831-43be-b5f8-df0340d33b43',
                                name: 'simple-wordpress'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: 'dccb8307-6e29-4862-b949-8fe57a4e3aab',
                app_instance_name: 'WP003',
                app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
                app_descriptor_name: 'Simple wordpress',
                current_labels: {
                    app: 'simple-wordpress'
                },
                groups: [
                    {
                        service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                        service_group_instance_id: 'd2675830-f5af-4cbf-a70d-60728bbc41be',
                        name: 'group1',
                        service_instances: [
                            {
                                service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
                                service_instance_id: 'bb2796db-dc58-4437-84a1-25017ec7842c',
                                name: 'simple-mysql'
                            },
                            {
                                service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                                service_instance_id: 'ed735094-97be-43e5-b205-4203792f0ee5',
                                name: 'simple-wordpress'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
        app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
        app_descriptor_name: 'Pinger',
        current_labels: {
            app: 'ping'
        },
        instances: [
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: '390d0d70-63ad-40c7-a126-86b80f1bb8c9',
                app_instance_name: 'yotromas',
                app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
                app_descriptor_name: 'Pinger',
                current_labels: {
                    app: 'ping'
                },
                groups: [
                    {
                        service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                        service_group_instance_id: '9885f143-d897-4d2c-a7c6-e5107f5c391e',
                        name: 'ping-group',
                        service_instances: [
                            {
                                service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                                service_instance_id: '8abc7e92-351d-4fcd-bd6e-21b90c759ebe',
                                name: 'ping'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: 'a158d2d6-20d8-4b5d-ae3b-6a66fec853ff',
                app_instance_name: 'Ping02',
                app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
                app_descriptor_name: 'Pinger',
                current_labels: {
                    app: 'ping'
                },
                groups: [
                    {
                        service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                        service_group_instance_id: '8fc63cff-064c-4e59-a280-9761403449be',
                        name: 'ping-group',
                        service_instances: [
                            {
                                service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                                service_instance_id: 'e88d0175-b482-440a-a88f-650744824487',
                                name: 'ping'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: 'a78806a4-82a5-48a2-8c25-0d119a85b685',
                app_instance_name: 'otro',
                app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
                app_descriptor_name: 'Pinger',
                current_labels: {
                    app: 'ping'
                },
                groups: [
                    {
                        service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                        service_group_instance_id: 'a5ea5615-641f-4fb5-8ab1-9983e4e282b0',
                        name: 'ping-group',
                        service_instances: [
                            {
                                service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                                service_instance_id: '9e4d00a7-5999-4350-81f6-3a52e7f48928',
                                name: 'ping'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: 'd4b3836c-560d-490d-b4ba-97783ba4fb2f',
                app_instance_name: 'Ping03',
                app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
                app_descriptor_name: 'Pinger',
                current_labels: {
                    app: 'ping'
                },
                groups: [
                    {
                        service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                        service_group_instance_id: '24e27306-e078-4430-835a-a41e7ae48c3e',
                        name: 'ping-group',
                        service_instances: [
                            {
                                service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                                service_instance_id: 'e56c5abd-03f9-4367-9064-9e76cb20ea84',
                                name: 'ping'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: 'e9229600-ea50-478d-8def-e80064612d9a',
                app_instance_name: 'otromas',
                app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
                app_descriptor_name: 'Pinger',
                current_labels: {
                    app: 'ping'
                },
                groups: [
                    {
                        service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                        service_group_instance_id: '47d10e07-1527-419b-bb5c-e3aa886ed73e',
                        name: 'ping-group',
                        service_instances: [
                            {
                                service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                                service_instance_id: 'bbbb8a39-8766-4df7-83fa-038646122b5c',
                                name: 'ping'
                            }
                        ]
                    }
                ]
            },
            {
                organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
                app_instance_id: 'f9ed842e-1c45-439c-9e4a-98cdd28948ee',
                app_instance_name: 'Ping01',
                app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
                app_descriptor_name: 'Pinger',
                current_labels: {
                    app: 'ping'
                },
                groups: [
                    {
                        service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                        service_group_instance_id: '1ba9c5fb-a287-4d3f-8ce5-47fc5498785f',
                        name: 'ping-group',
                        service_instances: [
                            {
                                service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                                service_instance_id: 'fd731d24-3570-4552-bd52-313314aa04fc',
                                name: 'ping'
                            }
                        ]
                    }
                ]
            }
        ]
    }
    ],
    app_instance_log_summary: [
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: '027126e4-4269-4aa7-8c6a-97bf373b2ddb',
            app_instance_name: 'WP002',
            app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
            app_descriptor_name: 'Simple wordpress',
            current_labels: {
                app: 'simple-wordpress'
            },
            groups: [
                {
                    service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                    service_group_instance_id: 'aaac3187-efea-41f0-9f35-78877d33be20',
                    name: 'group1',
                    service_instances: [
                        {
                            service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                            service_instance_id: '9a1c68ba-0bb9-4767-af75-8095f3756587',
                            name: 'simple-wordpress'
                        },
                        {
                            service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
                            service_instance_id: 'f1581e8b-16f2-4d45-a784-f856ee88d6b2',
                            name: 'simple-mysql'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: '2216fd15-c4f4-49a5-9e55-71b475a2351a',
            app_instance_name: 'WP004',
            app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
            app_descriptor_name: 'Simple wordpress',
            current_labels: {
                app: 'simple-wordpress'
            },
            groups: [
                {
                    service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                    service_group_instance_id: '1f434bde-b35c-494f-b4f6-c4c01efb6e55',
                    name: 'group1',
                    service_instances: [
                        {
                            service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
                            service_instance_id: '20d46028-85da-40fe-ae88-69424e83891f',
                            name: 'simple-mysql'
                        },
                        {
                            service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                            service_instance_id: '4acf9d26-d6d3-4623-b3a8-0401f0b5a5f2',
                            name: 'simple-wordpress'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: '5adb24cd-355a-46f7-85ca-67366419a4e3',
            app_instance_name: 'WP001',
            app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
            app_descriptor_name: 'Simple wordpress',
            current_labels: {
                app: 'simple-wordpress'
            },
            groups: [
                {
                    service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                    service_group_instance_id: '8ca37ab2-2b5c-4c02-aeb4-b7a57c95c201',
                    name: 'group1',
                    service_instances: [
                        {
                            service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                            service_instance_id: '25256794-3891-4852-8b9f-e221ea0570ce',
                            name: 'simple-wordpress'
                        },
                        {
                            service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
                            service_instance_id: 'adcba6e4-782c-4c6d-a323-b62c2674d808',
                            name: 'simple-mysql'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: 'cd018695-5270-44d4-9f47-ae58f59cfd31',
            app_instance_name: 'WP005',
            app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
            app_descriptor_name: 'Simple wordpress',
            current_labels: {
                app: 'simple-wordpress'
            },
            groups: [
                {
                    service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                    service_group_instance_id: '8af2e663-ff67-499e-8e55-59c42d4bc557',
                    name: 'group1',
                    service_instances: [
                        {
                            service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
                            service_instance_id: 'c2b94673-c95f-4131-9b56-dafe56b13b6b',
                            name: 'simple-mysql'
                        },
                        {
                            service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                            service_instance_id: 'f39ebfaa-5831-43be-b5f8-df0340d33b43',
                            name: 'simple-wordpress'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: 'dccb8307-6e29-4862-b949-8fe57a4e3aab',
            app_instance_name: 'WP003',
            app_descriptor_id: 'a1029e19-44d6-4ca6-b480-610cf51f5716',
            app_descriptor_name: 'Simple wordpress',
            current_labels: {
                app: 'simple-wordpress'
            },
            groups: [
                {
                    service_group_id: '1eb45ba6-c588-4c3e-b5ab-0afb414ad276',
                    service_group_instance_id: 'd2675830-f5af-4cbf-a70d-60728bbc41be',
                    name: 'group1',
                    service_instances: [
                        {
                            service_id: '7e88c9c7-9e7d-4ab7-99ad-b708c6486ce9',
                            service_instance_id: 'bb2796db-dc58-4437-84a1-25017ec7842c',
                            name: 'simple-mysql'
                        },
                        {
                            service_id: 'b57e4138-a0ed-4804-a0de-3787e5d9e8ff',
                            service_instance_id: 'ed735094-97be-43e5-b205-4203792f0ee5',
                            name: 'simple-wordpress'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: '390d0d70-63ad-40c7-a126-86b80f1bb8c9',
            app_instance_name: 'yotromas',
            app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
            app_descriptor_name: 'Pinger',
            current_labels: {
                app: 'ping'
            },
            groups: [
                {
                    service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                    service_group_instance_id: '9885f143-d897-4d2c-a7c6-e5107f5c391e',
                    name: 'ping-group',
                    service_instances: [
                        {
                            service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                            service_instance_id: '8abc7e92-351d-4fcd-bd6e-21b90c759ebe',
                            name: 'ping'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: 'a158d2d6-20d8-4b5d-ae3b-6a66fec853ff',
            app_instance_name: 'Ping02',
            app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
            app_descriptor_name: 'Pinger',
            current_labels: {
                app: 'ping'
            },
            groups: [
                {
                    service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                    service_group_instance_id: '8fc63cff-064c-4e59-a280-9761403449be',
                    name: 'ping-group',
                    service_instances: [
                        {
                            service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                            service_instance_id: 'e88d0175-b482-440a-a88f-650744824487',
                            name: 'ping'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: 'a78806a4-82a5-48a2-8c25-0d119a85b685',
            app_instance_name: 'otro',
            app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
            app_descriptor_name: 'Pinger',
            current_labels: {
                app: 'ping'
            },
            groups: [
                {
                    service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                    service_group_instance_id: 'a5ea5615-641f-4fb5-8ab1-9983e4e282b0',
                    name: 'ping-group',
                    service_instances: [
                        {
                            service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                            service_instance_id: '9e4d00a7-5999-4350-81f6-3a52e7f48928',
                            name: 'ping'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: 'd4b3836c-560d-490d-b4ba-97783ba4fb2f',
            app_instance_name: 'Ping03',
            app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
            app_descriptor_name: 'Pinger',
            current_labels: {
                app: 'ping'
            },
            groups: [
                {
                    service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                    service_group_instance_id: '24e27306-e078-4430-835a-a41e7ae48c3e',
                    name: 'ping-group',
                    service_instances: [
                        {
                            service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                            service_instance_id: 'e56c5abd-03f9-4367-9064-9e76cb20ea84',
                            name: 'ping'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: 'e9229600-ea50-478d-8def-e80064612d9a',
            app_instance_name: 'otromas',
            app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
            app_descriptor_name: 'Pinger',
            current_labels: {
                app: 'ping'
            },
            groups: [
                {
                    service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                    service_group_instance_id: '47d10e07-1527-419b-bb5c-e3aa886ed73e',
                    name: 'ping-group',
                    service_instances: [
                        {
                            service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                            service_instance_id: 'bbbb8a39-8766-4df7-83fa-038646122b5c',
                            name: 'ping'
                        }
                    ]
                }
            ]
        },
        {
            organization_id: 'e44dbc6c-df58-41e2-9810-a788fcbe4f5a',
            app_instance_id: 'f9ed842e-1c45-439c-9e4a-98cdd28948ee',
            app_instance_name: 'Ping01',
            app_descriptor_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
            app_descriptor_name: 'Pinger',
            current_labels: {
                app: 'ping'
            },
            groups: [
                {
                    service_group_id: '66b5a5e8-0070-4599-9915-fb8265646825',
                    service_group_instance_id: '1ba9c5fb-a287-4d3f-8ce5-47fc5498785f',
                    name: 'ping-group',
                    service_instances: [
                        {
                            service_id: '189b4d89-8dce-4b2e-89cc-569b8ea35704',
                            service_instance_id: 'fd731d24-3570-4552-bd52-313314aa04fc',
                            name: 'ping'
                        }
                    ]
                }
            ]
        }
    ]
};
/**
 * Mocked download logs response
 */
export const mockDownloadLogs: DownloadLogResponse = {
    organization_id: 'c5c289a3-dca0-49ef-973d-40bb554ae0c7',
    request_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
    from: 1575457623642000000,
    to: 1575457623642000000,
    state: DownloadLogState.Generating,
    state_name: 'Generating',
    url: 'https://web.nalej.tech/v1/logs/download/c5c289a3-dca0-49ef-973d-40bb554ae0c7.zip',
    expiration: 6,
    info: 'info'
};
/**
 * Mocked download logs response list
 */
export const mockDownloadLogResponseList = {
    responses: [
        {
            organization_id: 'c5c289a3-dca0-49ef-973d-40bb554ae0c7',
            request_id: 'b80799bb-ec7a-41d2-b161-0327e01903ca',
            from: 1575457623642000000,
            to: 1575457623642000000,
            state: DownloadLogState.Generating,
            state_name: 'Generating',
            url: 'https://web.nalej.tech/v1/logs/download/0ada41fb-6e2e-4ed7-ba3c-69c73ca8e172.zip',
            expiration: 6,
            info: 'info'
        },
        {
            organization_id: 'c5c289a3-dca0-49ef-973d-40bb554ae033',
            request_id: 'b80799bb-ec7a-41d2-b161-0327e0190333',
            from: 1575457623642000000,
            to: 1575457623642000000,
            state: DownloadLogState.Generating,
            state_name: 'Generating',
            url: 'https://web.nalej.tech/v1/logs/download/c5c289a3-dca0-49ef-973d-40bb554ae033.zip',
            expiration: 6,
            info: 'info'
        }
    ]
};
