import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { RecipeHttpService } from '../services/recipe-http.service';
import { Recipe } from '../shared';
import {
  actionCreateMockRecipe,
  actionCreateRecipe,
  actionFetchRecipes
} from '../store/recipe.actions';
import { RecipeListState } from '../store/recipe.reducer';
import { selectRecipes } from '../store/recipe.select';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {
  public recipes$: Observable<Recipe[]> = of([]);

  constructor(private store: Store<RecipeListState>) {}

  ngOnInit(): void {
    this.store.dispatch(actionFetchRecipes());
    this.recipes$ = this.store.select(selectRecipes);
  }

  public addNewRecipe(): void {
    this.store.dispatch(actionCreateMockRecipe());
  }
}
