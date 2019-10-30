/**
 * CPUInfo contains information about a CPU.
 */
export interface CpuInfo {
    // Manufacturer of the CPU.
    manufacturer?: string;
    // Model of the CPU.
    model?: string;
    // Architecture of the CPU.
    architecture?: string;
    // NumCores with the number of cores.
    num_cores?: number;
}
