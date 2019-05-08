// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the app root url', () => {
    cy.contains('span', 'Foreign Exchange');
  });

  it('loads card-list', () => {
    cy.get('.card-list').should('have.length.gt', 3);
  });
});
