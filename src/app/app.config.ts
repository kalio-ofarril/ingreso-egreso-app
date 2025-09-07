import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { provideStore, provideState, ActionReducer } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { environment } from '../environments/environment.development';
import { appReducers } from './app.reducer';

function clearAllOnLogout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === '[Auth] Unset User') {
      state = undefined; // resets root; features will re-register cleanly
    }
    return reducer(state, action);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // NgRx
    // provideStore(appReducers),
    provideStore(appReducers, { metaReducers: [clearAllOnLogout] }),
    provideStoreDevtools({
      name: 'IngresoEgresoApp',
      maxAge: 25,
      logOnly: !isDevMode(),
      serialize: true,
    }),

    // Firebase SDKs
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
