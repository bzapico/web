import { TestBed } from '@angular/core/testing';

import { MockupBackendService } from './mockup-backend.service';

describe('MockupBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockupBackendService = TestBed.get(MockupBackendService);
    expect(service).toBeTruthy();
  });
});
