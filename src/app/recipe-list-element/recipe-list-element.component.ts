import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../shared';
import { actionDeleteRecipeWithDialog } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list-element',
  templateUrl: './recipe-list-element.component.html',
  styleUrls: ['./recipe-list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, RouterLink, MatButtonModule]
})
export class RecipeListElementComponent {
  @Input() value!: Recipe;
  constructor(private store: Store) {}

  public deleteRecipe() {
    this.store.dispatch(actionDeleteRecipeWithDialog({ recipe: this.value }));
  }
}
