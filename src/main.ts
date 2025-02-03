import { bootstrapApplication } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import {AuthInterceptor} from './app/core/services/interceptors/auth-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()), // Enable interceptors from DI
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ]
});
