import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Recipe } from '../shared';
import { actionDeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DialogConfirmDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public recipe: Recipe, private store: Store) {}

  public deleteRecipe(): void {
    this.store.dispatch(actionDeleteRecipe({ recipeId: this.recipe._id }));
  }
}
