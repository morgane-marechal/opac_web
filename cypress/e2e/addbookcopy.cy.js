describe('Formulaire d’ajout d’exemplaire', () => {
  beforeEach(() => {
    // Remplace l’URL par celle qui affiche ton formulaire
    cy.visit('/admin/registerBookCopy/59');
  });

  it('soumet le formulaire avec un état sélectionné et vérifie le message de succès', () => {
    // Choisir "Disponible" dans le select
    cy.get('[data-cy=bookcopy-state-select]').click();
    cy.get('[data-cy=state-disponible]').click();

    // Cliquer sur le bouton de soumission
    cy.get('[data-cy=submit-bookcopy]').click();

    // Vérifier l’apparition du message de succès
    cy.contains('Exemplaire de livre créé avec succès !').should('be.visible');
  });

  it('affiche un message d’erreur si l’état n’est pas sélectionné', () => {
    // Ne rien sélectionner et soumettre
    cy.get('[data-cy=submit-bookcopy]').click();

    // Vérifier l’erreur de champ requis
    cy.contains('Ce champ est requis').should('be.visible');
  });

  it('affiche un message d’erreur serveur si le fetch échoue', () => {
    // Simuler une réponse d’erreur via interception (si possible)
    cy.intercept('POST', '/admin/registerBookCopy/59', {
      statusCode: 500,
      body: { message: 'Erreur serveur simulée' },
    }).as('postRegisterBookCopy');

    cy.get('[data-cy=bookcopy-state-select]').click();
    cy.get('[data-cy=state-disponible]').click();
    cy.get('[data-cy=submit-bookcopy]').click();

    cy.wait('@postRegisterBookCopy');
    cy.contains('Erreur serveur simulée').should('be.visible');
  });
});
