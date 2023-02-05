import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';
import { Ingredient, Recipe } from '../shared';
import { actionUpdateRecipe } from '../store/recipe.actions';
import { selectRecipes } from '../store/recipe.select';
import { RecipeNameValidatorDirective } from './recipe-name-validator.directive';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RecipeNameValidatorDirective,
    NgIf,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    AsyncPipe,
    MatInputModule,
    MatButtonModule
  ]
})
export class EditRecipeComponent implements OnDestroy, OnInit {
  private destructor: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public recipe$!: Observable<Recipe | undefined>;
  public initialRecipe: Recipe | undefined;

  public editRecipeForm!: FormGroup;

  public ingredientsSource = new BehaviorSubject<AbstractControl[]>([]);

  ngOnDestroy() {
    this.destructor.next(true);
  }

  ngOnInit() {
    this.recipe$ = combineLatest([this.route.params, this.store.select(selectRecipes)]).pipe(
      takeUntil(this.destructor),
      switchMap(([params, recipes]) => {
        const searchedRecipe = recipes.find((recipe) => params['id'] === recipe._id);
        if (!searchedRecipe) {
          this.router.navigateByUrl('/recipes');
        }
        this.buildForm(searchedRecipe);
        return of(searchedRecipe);
      })
    );
  }

  public get ingredientsArr() {
    return this.editRecipeForm?.get('ingredients') as FormArray;
  }

  public addNewIngredient() {
    this.ingredientsArr.push(this.buildIngredientRow((this.ingredientsArr.length + 1).toString()));
    this.ingredientsArr.markAsDirty();
    this.updateIngredientsView();
  }

  public deleteIngredient(index: number) {
    this.ingredientsArr.removeAt(index);
    this.ingredientsArr.markAsDirty();
    this.updateIngredientsView();
  }

  public onSubmit() {
    if (this.editRecipeForm.valid) {
      this.store.dispatch(actionUpdateRecipe({ recipe: this.editRecipeForm.value as Recipe }));
    }
  }

  private buildForm(recipe: Recipe | undefined) {
    this.editRecipeForm = this.fb.group({
      _id: [recipe?._id],
      name: this.fb.control(recipe?.name || '', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(80)]
      }),
      preparationTimeInMinutes: this.fb.control(recipe?.preparationTimeInMinutes || 0, {
        validators: [Validators.required]
      }),
      description: this.fb.control(recipe?.description || '', {
        validators: [Validators.required, Validators.minLength(15), Validators.maxLength(255)]
      }),
      ingredients: this.fb.array(this.initIngredientRow(recipe?.ingredients), {
        validators: [Validators.required, Validators.minLength(2)]
      })
    });
    this.updateIngredientsView();
  }

  private buildIngredientRow(id = '1') {
    return this.fb.group({
      _id: [id],
      name: [''],
      quantity: ['']
    });
  }

  private initIngredientRow(ingredients: Ingredient[] | undefined) {
    const groups: FormGroup[] = [];
    if (!ingredients || ingredients.length === 0) {
      return [this.buildIngredientRow('1'), this.buildIngredientRow('2')];
    }
    for (const ingredient of ingredients) {
      groups.push(
        this.fb.group({
          _id: [ingredient._id],
          name: [ingredient.name],
          quantity: [ingredient.quantity]
        })
      );
    }
    return groups;
  }

  private updateIngredientsView(): void {
    this.ingredientsSource.next(this.ingredientsArr.controls);
  }
}
