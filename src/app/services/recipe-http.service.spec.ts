import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockInstance, MockModule, MockProvider, MockService } from 'ng-mocks';

import { RecipeHttpService } from './recipe-http.service';

describe('RecipeHttpService', () => {
  MockInstance.scope();

  let service = MockService(RecipeHttpService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(HttpClientModule)],
      providers: [MockProvider(Store), MockProvider(RecipeHttpService)]
    });
    service = TestBed.inject(RecipeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
