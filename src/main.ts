import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { HttpApiInterceptor } from './app/http-api.interceptor';
import { HttpErrorInterceptor } from './app/http-error.interceptor';
import { RecipeListEffects } from './app/store/recipe.effects';
import { recipesReducer } from './app/store/recipe.reducer';
import { RECIPES_FEATURE_NAME } from './app/store/recipe.select';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideState(RECIPES_FEATURE_NAME, recipesReducer),
    provideEffects([RecipeListEffects]),
    provideStoreDevtools(),
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([HttpErrorInterceptor, HttpApiInterceptor])),
    importProvidersFrom([MatDialogModule, MatSnackBarModule]),
    provideAnimations()
  ]
});
