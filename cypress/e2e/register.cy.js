describe('Inscription et connexion', () => {
  const user = {
    full_name: 'Jeanne Loli',
    email: 'llolli@example.com',
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

    cy.visit('/login');

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenue').should('be.visible');
  });
});
