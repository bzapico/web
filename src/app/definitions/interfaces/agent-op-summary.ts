/**
 * AgentOpSummary contains the result of an asset operation this is a provisional result!
 */
import { OpStatus } from '../enums/op-status.enum';

export interface AgentOpSummary {
    /**
     * OperationId with the operation identifier.
     */
    operation_id?: string;
    // Timestamp of the response.
    timestamp?: string;
    // Status indicates if the operation was successful
    status?: OpStatus;
    // Info with additional information for an operation.
    info?: string;
}
