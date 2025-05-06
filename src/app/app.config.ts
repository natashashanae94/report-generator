import { ApplicationConfig, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const firestoreProvider = () => {
  const platformId = inject(PLATFORM_ID);
  return isPlatformBrowser(platformId) ? getFirestore() : ({} as any);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Example: Configuring router providers
    provideHttpClient(), provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(firestoreProvider), 
  ]
};