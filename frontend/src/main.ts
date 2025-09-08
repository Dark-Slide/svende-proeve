import { platformBrowser} from '@angular/platform-browser';

import { AppModule } from './app/app.module';


platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      })
    ),
  ],
});
