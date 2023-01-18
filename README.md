# ngRecipes

## About the project

The ngRecipes allows you to manage your recipes and share them to whoever you want.

Application is using [CrudCrud]('https://crudcrud.com/') to mimic backend.
To insert your `CrudCrud` api url - go to `/src/environments/environment.ts` and replace the `API_URL` with your own.

## Tech stack

- [Angular 15]('https://angular.io/')
- [Angular Material]('https://material.angular.io/')
- [ngRx]('https://ngrx.io/')
- [Cypress]('https://www.cypress.io/')

## Todos

There is still some work to be done:

- write unit tests (and fix existing)
- check for unsaved data and display warning message while editing recipe
- implement a cache for recipes
