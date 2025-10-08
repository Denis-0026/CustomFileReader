import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './core/core.config';
import { CoreComponent } from './core/core.component';

bootstrapApplication(CoreComponent, appConfig)
  .catch((err) => console.error(err));
