import { TestBed } from '@angular/core/testing';

import { ActionButtonsServiceService } from './action-buttons-service.service';

describe('ActionButtonsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionButtonsServiceService = TestBed.get(ActionButtonsServiceService);
    expect(service).toBeTruthy();
  });
});
