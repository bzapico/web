import { TestBed } from '@angular/core/testing';

import { LabelsCardServiceService } from './labels-card-service.service';

describe('LabelsCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabelsCardServiceService = TestBed.get(LabelsCardServiceService);
    expect(service).toBeTruthy();
  });
});
