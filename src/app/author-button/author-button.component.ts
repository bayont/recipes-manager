import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogAuthorDetailsComponent } from '../dialog-author-details/dialog-author-details.component';

@Component({
  selector: 'app-author-button',
  templateUrl: './author-button.component.html',
  styleUrls: ['./author-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
})
export class AuthorButtonComponent {
  constructor(private dialog: MatDialog) {}

  public openDialog(): void {
    this.dialog.open(DialogAuthorDetailsComponent);
  }
}
