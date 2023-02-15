import { HttpClient, HttpResponse } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { Recipe } from '../shared';
import { recipesFixtures } from '../test/fixtures/recipes.fixture';
import { environment } from 'src/environments/environment';

import { RecipeHttpService } from './recipe-http.service';

describe('RecipeHttpService', () => {
  let service: RecipeHttpService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);
  const RECIPE_ENDPOINT = `${environment.API_URL}/recipes`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore(),
        RecipeHttpService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(RecipeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch recipes', fakeAsync(() => {
    httpClientSpy.get.and.returnValue(of(recipesFixtures));
    const recipes$: Observable<Recipe[]> = service.fetchRecipes();
    expect(httpClientSpy.get).toHaveBeenCalledWith(RECIPE_ENDPOINT);

    let recipes: Recipe[] = [];

    recipes$.subscribe((fetchedRecipes) => {
      recipes = fetchedRecipes;
    });

    expect(recipes).toBe(recipesFixtures);
  }));

  it('should fetch one recipe', () => {
    const recipeId = '1';

    httpClientSpy.get.and.returnValue(
      of(recipesFixtures.find((recipe) => recipe._id === recipeId))
    );

    const recipe$: Observable<Recipe> = service.fetchRecipe(recipeId);
    expect(httpClientSpy.get).toHaveBeenCalledWith(`${RECIPE_ENDPOINT}/${recipeId}`);

    let recipe: Recipe = {} as Recipe;
    recipe$.subscribe((fetchedRecipe: Recipe) => {
      recipe = fetchedRecipe;
    });

    expect(recipe).toBe(recipesFixtures.find((recipe) => recipe._id === recipeId) as Recipe);
  });

  it('should create recipe', () => {
    const recipeParam: Partial<Pick<Recipe, '_id'>> & Omit<Recipe, '_id'> = recipesFixtures[0];
    httpClientSpy.post.and.returnValue(of(recipeParam));

    const recipe = { ...recipeParam };
    const recipeId = recipe._id;
    delete recipe._id;

    const createdRecipe$: Observable<Recipe> = service.createRecipe(recipe);
    expect(httpClientSpy.post).toHaveBeenCalledWith(RECIPE_ENDPOINT, recipe);

    let newRecipe: Recipe = {} as Recipe;

    createdRecipe$.subscribe((createdRecipe) => {
      newRecipe = createdRecipe;
    });

    expect(recipeId).toEqual(newRecipe._id);
  });

  it('should update recipe', () => {
    const newDescription = "It's a new description!";
    const updatedRecipe: Recipe = { ...recipesFixtures[0], description: newDescription };

    httpClientSpy.put.and.returnValue(of({ ok: true } as Partial<HttpResponse<unknown>>));
    const updatedRecipeWithStrippedId: Partial<Recipe> = updatedRecipe;
    delete updatedRecipeWithStrippedId._id;

    const response$: Observable<string> = service.updateRecipe(updatedRecipe);
    expect(httpClientSpy.put).toHaveBeenCalledWith(
      `${RECIPE_ENDPOINT}/${updatedRecipe._id}`,
      updatedRecipe,
      { observe: 'response' }
    );

    let response = '';

    response$.subscribe((res) => {
      response = res;
    });

    expect(response).toBe(updatedRecipe._id);
  });

  it('should delete recipe', () => {
    const recipeIdToDelete: string = recipesFixtures[0]._id;

    httpClientSpy.delete.and.returnValue(of({ ok: true } as Partial<HttpResponse<unknown>>));

    const response$: Observable<string> = service.deleteRecipe(recipeIdToDelete);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(`${RECIPE_ENDPOINT}/${recipeIdToDelete}`, {
      observe: 'response'
    });

    let response = '';

    response$.subscribe((res) => {
      response = res;
    });

    expect(response).toBe(recipeIdToDelete);
  });
});
