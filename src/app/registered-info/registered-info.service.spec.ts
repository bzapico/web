import { TestBed } from '@angular/core/testing';

import { RegisteredInfoService } from './registered-info.service';

describe('RegisteredInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisteredInfoService = TestBed.get(RegisteredInfoService);
    expect(service).toBeTruthy();
  });
});
