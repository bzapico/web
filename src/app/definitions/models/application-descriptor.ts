/**
 * Interface that defines the AppDescriptor structure defines the top
 * level abstraction for an application and all the associated services.
 */
import { ServiceGroup } from '../interfaces/service-group';
import { AppParameter } from '../interfaces/app-parameter';
import { Application } from './application';

export class ApplicationDescriptor extends Application {
    /**
     * Groups with the Service collocation strategies.
     */
    groups?: ServiceGroup[];
    /**
     * AppParameter with the parameters definition of an application
     */
    parameters?: AppParameter[];

    getId(): string {
        return this.app_descriptor_id;
    }
}
