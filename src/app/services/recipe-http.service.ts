import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Recipe } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class RecipeHttpService {
  private readonly RECIPE_ENDPOINT = `${environment.API_URL}/recipes`;

  constructor(private http: HttpClient) {}

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.RECIPE_ENDPOINT);
  }

  public fetchRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.RECIPE_ENDPOINT}/${recipeId}`);
  }

  public createRecipe(recipe: Omit<Recipe, '_id'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.RECIPE_ENDPOINT, recipe);
  }

  public updateRecipe(recipe: Omit<Partial<Recipe>, '_id'>): Observable<Recipe> {
    return this.http.patch<Recipe>(this.RECIPE_ENDPOINT, recipe);
  }

  public deleteRecipe(recipeId: string): Observable<boolean> {
    return this.http.delete(`${this.RECIPE_ENDPOINT}/${recipeId}`, { observe: 'response' }).pipe(
      switchMap((response: HttpResponse<Object>) => {
        return of(response.ok);
      })
    );
  }
}
