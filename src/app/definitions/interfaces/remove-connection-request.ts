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

export interface RemoveConnectionRequest {
    // OrganizationId with the organization identifier
    organization_id: string;
    // SourceInstanceId with the identifier of the outbound instance
    source_instance_id: string;
    // TargetInstanceId with the identifier of the inbound instance
    target_instance_id: string;
    // InboundName with the name of the inbound identifier
    inbound_name: string;
    // OutboundName with the name of the outbound identifier
    outbound_name: string;
    // UserConfirmation is a flag required to remove a connection between and inbound and a required outbound
    user_confirmation: boolean;
}
