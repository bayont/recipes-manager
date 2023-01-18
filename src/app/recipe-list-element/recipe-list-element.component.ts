import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from '../shared';
import { actionDeleteRecipe, actionDeleteRecipeWithDialog } from '../store/recipe.actions';
import { RecipeListState } from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-list-element',
  templateUrl: './recipe-list-element.component.html',
  styleUrls: ['./recipe-list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListElementComponent {
  @Input() value!: Recipe;
  constructor(private store: Store<RecipeListState>) {}

  public deleteRecipe() {
    this.store.dispatch(actionDeleteRecipeWithDialog({ recipe: this.value }));
  }
}
