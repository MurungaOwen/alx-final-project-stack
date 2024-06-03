import { TestBed } from '@angular/core/testing';

import { FeaturedWorkoutsService } from './featured-workouts-service.service';

describe('FeaturedWorkoutsServiceService', () => {
  let service: FeaturedWorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedWorkoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
