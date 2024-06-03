import { TestBed } from '@angular/core/testing';

import { FitnessProgramServiceService } from './fitness-program-service.service';

describe('FitnessProgramServiceService', () => {
  let service: FitnessProgramServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessProgramServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
