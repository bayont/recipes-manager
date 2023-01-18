describe('Recipes tests', () => {
  it('should see homepage', () => {
    cy.visit('/');
    cy.contains('ngRecipes');
  });
  it('should add recipe', () => {
    cy.visit('/recipes');
    cy.contains('Create new recipe').click();
    cy.get('#name').clear().type('Test recipe');
    cy.get('#preparationTimeInMinutes').clear().type('35');
    cy.get('#description').clear().type('Description of recipe created by automation testing');
    cy.get('#save').click();
  });
  it('should find added recipe in searchbar', () => {
    cy.visit('/recipes');
    cy.get('#searchbar').type('Test recipe');
    cy.get('#list .recipe-list-element').contains('Test recipe');
  });
});
