import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MaterialModule } from '../material.module';
import { recipesFixtures } from '../test/fixtures/recipes.fixture';

import { EditRecipeComponent } from './edit-recipe.component';
import { RecipeNameValidatorDirective } from './recipe-name-validator.directive';

describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRecipeComponent, RecipeNameValidatorDirective],
      imports: [
        RouterTestingModule,
        MaterialModule,
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
            params: of({ id: recipesFixtures[0]._id })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default name value', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#name').value).toEqual(
      recipesFixtures[0].name
    );
  });
});
