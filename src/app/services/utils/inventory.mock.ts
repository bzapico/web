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

import { Inventory } from '../../definitions/interfaces/inventory';
import { OperatingSystemClass } from '../../definitions/enums/operating-system-class.enum';
import { OpStatus } from '../../definitions/enums/op-status.enum';

/**
 * Mock inventory summary containing total cpu, memory and storage
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
                class: OperatingSystemClass.Darwin,
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
            last_op_result: {
                operation_id: '8690b81e-9757-4272-9a48-84af007cb713',
                timestamp:  '1550746669',
                status: OpStatus.INPROGRESS,
                info: 'metrics enabled',
            },
            last_alive_timestamp: '654654654'
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
                class: OperatingSystemClass.Linux,
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
            last_op_result: {
                operation_id: '54654asd-654654-qweqwe',
                timestamp:  '1563299414',
                status: OpStatus.SCHEDULED,
                info: 'info'
            },
            last_alive_timestamp: '654654654'
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
