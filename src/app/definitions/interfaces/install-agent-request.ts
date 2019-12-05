/*
 * Copyright 2019 Nalej
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SshCredentials } from './ssh-credentials';
import { AgentType } from '../enums/agent-type.enum';

export interface InstallAgentRequest {
    /**
     * OrganizationId with the organization identifier.
     */
    organization_id: string;
    /**
     * EdgeControllerId with the EIC identifier that will receive the operation.
     */
    edge_controller_id: string;
    /**
     * AgentType with the type of agent to be installed.
     */
    agent_type: AgentType;
    /**
     * Credentials to be used to connect to the machine and install the agent.
     */
    credentials: SshCredentials;
    /**
     * TargetHost to be installed.
     */
    target_host: string;
    /**
     * CACert used by the agent to authenticate the edge controller it connects to. This value is set by the
     * inventory manager.
     */
    ca_cert: string;
}
