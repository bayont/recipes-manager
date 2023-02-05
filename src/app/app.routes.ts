import { Route } from '@angular/router';
import { DefaultViewComponent } from './default-view/default-view.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const APP_ROUTES: Route[] = [
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
