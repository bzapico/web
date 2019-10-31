/**
 * NetworkingHardwareInfo with the list of network interfaces that are available.
 */
export interface NetworkingHardwareInfo {
    // Type of network interface. For example, ethernet, wifi, infiniband, etc.
    type?: string;
    // Link capacity in Mbps.
    link_capacity?: number;
}
