import { TestBed } from '@angular/core/testing';

import { UpdateEventsService } from './update-events.service';

describe('UpdateEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateEventsService = TestBed.get(UpdateEventsService);
    expect(service).toBeTruthy();
  });
});
