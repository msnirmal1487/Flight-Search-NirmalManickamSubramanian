import { platformBrowser } from '@angular/platform-browser';

import 'zone.js';
import { AppModule } from './app.module';

platformBrowser().bootstrapModule(AppModule);
