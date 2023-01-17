import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from '../shared';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent {
  @Input() value!: Recipe;
}
