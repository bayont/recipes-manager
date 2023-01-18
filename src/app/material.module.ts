import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
