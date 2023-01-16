import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecipeHttpService } from '../services/recipe-http.service';
import { Recipe } from '../shared';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {
  public recipes$: Observable<Recipe[]> = of([]);

  constructor(private recipeHttpService: RecipeHttpService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeHttpService.fetchRecipes();
  }
}
