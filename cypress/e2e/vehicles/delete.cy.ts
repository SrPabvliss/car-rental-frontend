describe('Delete Car Flow', () => {
  it('should delete a car after confirmation', () => {
    cy.intercept('DELETE', '**/cars/1', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteCar')

    cy.visit('/dashboard/cars')

    cy.get('[data-testid="delete-button-1"]').click()

    cy.get('[data-testid="confirm-button"]').click()

    cy.wait('@deleteCar')
  })

  it('should not delete a car if canceled', () => {
    cy.visit('/dashboard/cars')

    cy.get('[data-testid="delete-button-1"]').click()

    cy.get('[data-testid="cancel-button"]').click()

    cy.get('.car-card').should('exist')
  })
})
