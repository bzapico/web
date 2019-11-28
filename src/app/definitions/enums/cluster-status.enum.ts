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

export enum ClusterStatus {
    // STATE
    // Provisioning indicates that the cluster is now being provisioned in a cloud provider or through baremetal provisioning.
    Provisioning = 'provisioning',
    // Provisioned indicates that the cluster has been successfully provisioned and it is ready to be installed.
    Provisioned = 'provisioned',
    // InstallInProgress indicates that the Nalej platform is being installed on the target cluster.
    InstallInProgress = 'install_in_progress',
     // STATUS_NAME
    Online = 'online',
    OnlineCordon = 'online_cordon',
    OfflineCordon = 'offline_cordon',
    Offline = 'offline',
    // Scaling indicates that the cluster is now being modified in terms of number of available nodes.
    Scaling = 'scaling',
    // Uninstalling indicates that the cluster is now being uninstalled and the platform is being undeployed.
    Uninstalling = 'uninstalling',
    // Decomisioning indicates that the hardware resources are being freed.
    Decomisioning = 'decomisioning',
    // Failure indicates that a process related to provisioning or installation has failed.
    Failure = 'failure',
    // Unknown indicates that the cluster has just been created in system model and no provisioning or install operation has taken place.
    Unknown = 'unknown',
    // TODO
    // Installed indicates that the Nalej platform has been successfully deployed on the target cluster.
    Installed = 'installed',
    Error = 'error',
    Running = 'running',
}
