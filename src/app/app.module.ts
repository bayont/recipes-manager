import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
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
import { reducers } from './store/recipe.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DefaultViewComponent } from './default-view/default-view.component';
import { FormatTimePipe } from './format-time.pipe';

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
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([RecipeListEffects]),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
