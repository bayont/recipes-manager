import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../material.module';
import { Recipe } from '../shared';
import { recipesFixtures } from '../test/fixtures/recipes.fixture';

import { DialogConfirmDeleteComponent } from './dialog-confirm-delete.component';

describe('DialogConfirmDeleteComponent', () => {
  let component: DialogConfirmDeleteComponent;
  let fixture: ComponentFixture<DialogConfirmDeleteComponent>;

  const recipeFixture: Recipe = recipesFixtures[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, DialogConfirmDeleteComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: recipeFixture }, provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
