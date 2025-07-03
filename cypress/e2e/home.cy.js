describe('Page d\'accueil', () => {
  it('affiche le titre et permet la navigation', () => {
    cy.visit('/'); // charge la page d'accueil

    cy.contains('Bienvenue sur mon app React avec Webpack !').should('be.visible');
    cy.contains('Inscription').click();
    cy.url().should('include', '/register');
    cy.get('input[name="full_name"]').should('be.visible');

    cy.contains('S’inscrire').should('be.visible');  });
});