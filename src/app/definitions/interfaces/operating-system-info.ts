import { OperatingSystemClass } from '../enums/operating-system-class.enum';

// OperatingSystemInfo contains information about the operating system of an asset. Notice that no
// enums have been used for either the name or the version as to no constraint the elements of the
// inventory even if we do not have an agent running supporting those.
export interface OperatingSystemInfo {
    // Name of the operating system. Expecting full name.
    name?: string;
    // Version installed.
    version?: string;
    // Class of the operating system - determines the binary format together with architecture
    class?: OperatingSystemClass;
    // ClassName with the string representation of the name.
    class_name?: string;
    // Architecture of the OS.
    architecture?: string;
}
