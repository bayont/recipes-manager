import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';

import { DialogAuthorDetailsComponent } from './dialog-author-details.component';

describe('DialogAuthorDetailsComponent', () => {
  let component: DialogAuthorDetailsComponent;
  let fixture: ComponentFixture<DialogAuthorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAuthorDetailsComponent, MaterialModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
