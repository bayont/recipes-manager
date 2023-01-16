import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

@NgModule({
  declarations: [AppComponent, RecipeComponent, RecipesListComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
