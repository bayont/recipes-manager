import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAuthorDetailsComponent } from '../dialog-author-details/dialog-author-details.component';

@Component({
  selector: 'app-author-button',
  templateUrl: './author-button.component.html',
  styleUrls: ['./author-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorButtonComponent {
  constructor(private dialog: MatDialog) {}

  public openDialog(): void {
    this.dialog.open(DialogAuthorDetailsComponent);
  }
}
