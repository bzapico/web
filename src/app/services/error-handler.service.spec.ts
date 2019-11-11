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

import { TestBed, inject } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';


describe('ErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [ErrorHandlerService]
  }));

  it('should be created', () => {
    const service: ErrorHandlerService = TestBed.get(ErrorHandlerService);
    expect(service).toBeTruthy();
  });

  it('handleError() - It will test if handleError method is called with error parameter',
      inject([ErrorHandlerService], (service: ErrorHandlerService) => {
    const error: Error = new Error('ERROR');
    const handleError = spyOn(service, 'handleError').and.returnValue(true);
    handleError(error);
    expect(handleError).toHaveBeenCalledWith(error);
  }));



});


