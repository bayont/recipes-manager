import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { RecipeHttpService } from './recipe-http.service';

describe('RecipeHttpService', () => {
  let service: RecipeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideMockStore(), RecipeHttpService]
    });
    service = TestBed.inject(RecipeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
