import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Recipe } from '../shared';
import { RecipeListState } from '../store/recipe.reducer';
import { selectRecipes } from '../store/recipe.select';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  private destructor: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<RecipeListState>) {}

  public recipe$!: Observable<Recipe | undefined>;

  ngOnDestroy() {
    this.destructor.next(true);
  }

  ngOnInit() {
    this.recipe$ = combineLatest([this.route.params, this.store.select(selectRecipes)]).pipe(
      takeUntil(this.destructor),
      switchMap(([params, recipes]) => {
        const searchedRecipe = recipes.find((recipe) => params['id'] === recipe._id);
        return of(searchedRecipe);
      })
    );
  }
}
