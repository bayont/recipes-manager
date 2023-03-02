import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DialogAuthorDetailsComponent } from './dialog-author-details.component';

describe('DialogAuthorDetailsComponent', () => {
  let component: DialogAuthorDetailsComponent;
  let fixture: ComponentFixture<DialogAuthorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAuthorDetailsComponent, MatDialogModule, MatIconModule, MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
