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

/**
 * OpStatus contains the status of the execution of a given operation.
 */
export enum OpStatus {
    /**
     *  Scheduled to represent that the operation is on the queue pending execution.
     */
    SCHEDULED = 'SCHEDULED',
    /**
     * Inprogress to represent that the operation is being executed.
     */
    INPROGRESS = 'INPROGRESS',
    /**
     * Success to indicate that the operation was successfully executed.
     */
    SUCCESS = 'SUCESS',
    /**
     * Fail to indicate that the operation failed.
     */
    FAIL = 'FAIL',
    /**
     * Canceled to indicate that the operation was canceled by the user
     */
    CANCELED = 'CANCELED'
}
