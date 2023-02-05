import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of, startWith, switchMap } from 'rxjs';
import { RecipeListElementComponent } from '../recipe-list-element/recipe-list-element.component';
import { Recipe } from '../shared';
import { actionCreateMockRecipe, actionFetchRecipes } from '../store/recipe.actions';
import { selectRecipes } from '../store/recipe.select';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    NgFor,
    AsyncPipe,
    RecipeListElementComponent,
    MatButtonModule
  ]
})
export class RecipesListComponent implements OnInit {
  public recipes$: Observable<Recipe[]> = of([]);
  public searchBar = new FormControl('');

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actionFetchRecipes());
    this.recipes$ = combineLatest([
      this.store.select(selectRecipes),
      this.searchBar.valueChanges.pipe(startWith(''))
    ]).pipe(
      switchMap(([recipes, searchValue]) => {
        if (!searchValue) {
          return of(recipes);
        }
        return of(
          recipes.filter((recipe) => {
            const regex = new RegExp(searchValue, 'i');
            for (const ingredient of recipe.ingredients) {
              if (regex.test(ingredient.name)) {
                return true;
              }
            }
            return regex.test(recipe.name);
          })
        );
      })
    );
  }

  public addNewRecipe(): void {
    this.store.dispatch(actionCreateMockRecipe());
  }
}
