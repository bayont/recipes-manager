import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Recipe } from '../shared';

import { RecipeListElementComponent } from './recipe-list-element.component';

describe('RecipeListElementComponent', () => {
  let component: RecipeListElementComponent;
  let fixture: ComponentFixture<RecipeListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListElementComponent, MatIconModule, MatButtonModule, RouterTestingModule],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeListElementComponent);
    component = fixture.componentInstance;
    component.value = {
      _id: '1',
      description: 'This is a description',
      ingredients: [{ _id: '1', name: 'Ingredient1', quantity: '2' }],
      name: 'RecipeName',
      preparationTimeInMinutes: 25
    } as Recipe;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
