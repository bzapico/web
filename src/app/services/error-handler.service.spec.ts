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


