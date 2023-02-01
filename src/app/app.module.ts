import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListElementComponent } from './recipe-list-element/recipe-list-element.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { AuthorButtonComponent } from './author-button/author-button.component';
import { DialogAuthorDetailsComponent } from './dialog-author-details/dialog-author-details.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpApiInterceptor } from './http-api.interceptor';
import { RecipeListEffects } from './store/recipe.effects';
import { recipesReducer } from './store/recipe.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DefaultViewComponent } from './default-view/default-view.component';
import { FormatTimePipe } from './format-time.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmDeleteComponent } from './dialog-confirm-delete/dialog-confirm-delete.component';
import { RecipeNameValidatorDirective } from './edit-recipe/recipe-name-validator.directive';
import { MaterialModule } from './material.module';
import { RecipeHttpService } from './services/recipe-http.service';
import { RECIPES_FEATURE_NAME } from './store/recipe.select';

const routes: Routes = [
  {
    path: 'recipes/:id/edit',
    component: EditRecipeComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailsComponent
  },
  {
    path: 'recipes',
    component: DefaultViewComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    RecipeListElementComponent,
    RecipesListComponent,
    AuthorButtonComponent,
    DialogAuthorDetailsComponent,
    DefaultViewComponent,
    RecipeDetailsComponent,
    EditRecipeComponent,
    FormatTimePipe,
    DialogConfirmDeleteComponent,
    RecipeNameValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(),
    StoreModule.forFeature(RECIPES_FEATURE_NAME, recipesReducer),
    EffectsModule.forRoot([RecipeListEffects]),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    RecipeHttpService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
