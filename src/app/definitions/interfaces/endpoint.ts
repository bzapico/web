import { EndpointType } from '../enums/endpoint-type.enum';

export interface Endpoint {
    type?: EndpointType;
    path?: string;
}

