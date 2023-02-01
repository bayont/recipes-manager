import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';

import { AuthorButtonComponent } from './author-button.component';

describe('AuthorButtonComponent', () => {
  let component: AuthorButtonComponent;
  let fixture: ComponentFixture<AuthorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorButtonComponent],
      imports: [MaterialModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
