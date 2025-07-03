describe('Inscription et connexion', () => {
  const user = {
    full_name: 'Jean Dupont',
    email: 'lebossdu02@example.com',
    password: 'MotDePasse123',
  };

  it('permet de s’inscrire puis de se connecter', () => {
    // Inscription
    cy.visit('/register');

    cy.get('input[name="full_name"]').type(user.full_name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);

    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.contains('Inscription réussie !', { timeout: 10000 }).should('be.visible');

    // Connexion
    cy.visit('/login');

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);

    cy.get('button[type="submit"]').click();

    // Vérifie que la connexion a réussi,
    // par exemple en s’assurant que l’URL contient /dashboard
    cy.url().should('include', '/dashboard');

    // Ou vérifier qu’un élément spécifique du dashboard est visible
    cy.contains('Bienvenue').should('be.visible');
  });
});
