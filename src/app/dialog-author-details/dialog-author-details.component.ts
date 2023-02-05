import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-author-details',
  templateUrl: './dialog-author-details.component.html',
  styleUrls: ['./dialog-author-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule]
})
export class DialogAuthorDetailsComponent {}
