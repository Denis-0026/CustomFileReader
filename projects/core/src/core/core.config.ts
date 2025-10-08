import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './core.routes';
import { mockDataInterceptor } from '@libs/mock-data';
import { API_BASE_URL } from './tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: API_BASE_URL, useValue: 'http://localhost:4200' },
    // Mock Data
    provideHttpClient(withInterceptors([mockDataInterceptor])),
  ],
};
