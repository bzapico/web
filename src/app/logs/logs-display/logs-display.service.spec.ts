import { TestBed } from '@angular/core/testing';

import { LogsDisplayService } from './logs-display.service';

describe('LogsDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogsDisplayService = TestBed.get(LogsDisplayService);
    expect(service).toBeTruthy();
  });
});
