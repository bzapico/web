import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';
import { HttpModule } from '@angular/http';

describe('ErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [ErrorHandlerService]
  }));

  it('should be created', () => {
    const service: ErrorHandlerService = TestBed.get(ErrorHandlerService);
    expect(service).toBeTruthy();
  });


});
