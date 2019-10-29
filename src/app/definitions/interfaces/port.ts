import { Endpoint } from './endpoint';

export interface Port {
    name?: string;
    internal_port?: number;
    exposed_port?: number;
    endpoints?: Endpoint[];
}
