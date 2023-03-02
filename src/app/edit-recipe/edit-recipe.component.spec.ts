import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Recipe } from '../shared';
import { recipesFixtures } from '../test/fixtures/recipes.fixture';

import { EditRecipeComponent } from './edit-recipe.component';
import { RecipeNameValidatorDirective } from './recipe-name-validator.directive';

describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;
  let compiled: any;
  const recipe: Recipe = recipesFixtures[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditRecipeComponent,
        RecipeNameValidatorDirective,
        RouterTestingModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            recipes: recipesFixtures
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: recipe._id })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default name value', () => {
    expect(compiled.querySelector('h1 > .highlight-text').innerText).toEqual(recipe.name);
    expect(fixture.debugElement.nativeElement.querySelector('#name').value).toEqual(recipe.name);
  });

  it('should have a default preparation time', () => {
    expect(compiled.querySelector('#preparationTimeInMinutes').value).toEqual(
      recipe.preparationTimeInMinutes.toString()
    );
  });

  it('should have a default description', () => {
    expect(compiled.querySelector('#description').value).toEqual(recipe.description);
  });

  it('should have a default ingredients', () => {
    const rows = compiled.querySelectorAll('h3 + table > tbody > tr');
    expect(rows.length).toEqual(recipe.ingredients.length);

    for (const [index, ingredient] of recipe.ingredients.entries()) {
      const inputs = rows[index].querySelectorAll('input');
      expect(inputs[0].value).toEqual(ingredient.name);
      expect(inputs[1].value).toEqual(ingredient.quantity);
    }
  });

  it('should add a new ingredient', () => {
    component.addNewIngredient();
    fixture.detectChanges();

    const rows = compiled.querySelectorAll('h3 + table > tbody > tr');
    expect(rows.length).toEqual(recipe.ingredients.length + 1);
  });

  it('should remove the ingredient', () => {
    component.deleteIngredient(0);
    fixture.detectChanges();

    const rows = compiled.querySelectorAll('h3 + table > tbody > tr');
    expect(rows.length).toEqual(recipe.ingredients.length - 1);
    expect(rows[0].querySelectorAll('input')[0].value).toEqual(recipe.ingredients[1].name);
  });
});
