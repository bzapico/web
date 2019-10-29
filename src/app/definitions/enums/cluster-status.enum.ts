export enum ClusterStatus {
    // STATUS_NAME
    Online = 'online',
    Offline = 'offline',
    OnlineCordon = 'online_cordon',
    OfflineCordon = 'offline_cordon',
    Error = 'error',
    // STATE
    Running = 'running',
    Unknown = 'unknown',
    Provisioning = 'provisioning',
    Provisioned = 'provisioned',
    Installing = 'installing',
    Installed = 'installed',
    Uninstalling = 'uninstalling',
    Decommissioning = 'decommissioning'
}
