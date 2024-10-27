import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

// Main application configuration settings
export const appConfig: ApplicationConfig = {
    providers: [

        provideClientHydration(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),

        // Provides an HTTP client with Fetch API support for network requests
        provideHttpClient(withFetch()),
    ],
};
