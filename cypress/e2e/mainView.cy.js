describe('Main View', () => {
  it('should render the main view', () => {
    cy.visit('/');
    cy.contains('Podcaster').should('exist');
  });
})