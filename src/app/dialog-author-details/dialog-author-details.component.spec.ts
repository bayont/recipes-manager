import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAuthorDetailsComponent } from './dialog-author-details.component';

describe('DialogAuthorDetailsComponent', () => {
  let component: DialogAuthorDetailsComponent;
  let fixture: ComponentFixture<DialogAuthorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAuthorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
