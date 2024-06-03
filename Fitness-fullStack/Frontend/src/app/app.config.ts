import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FeaturedWorkoutsService } from './_services/featured-workouts-service.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient()



  ]
  
};
