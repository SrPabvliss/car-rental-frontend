describe('Change Status Flow', () => {
  beforeEach(() => {
    cy.visit('/dashboard/cars')
  })

  it('should change the car status through the dropdown menu', () => {
    cy.get('[data-testid="car-status-1"]').should('exist')

    cy.get('[data-testid="car-status-1"]').should('contain.text', 'Disponible')

    cy.get('[data-testid="menu-trigger"]').eq(0).click()

    cy.get('[data-testid="status-option-mantenimiento"]').click()

    cy.get('[data-testid="car-status-1"]').should(
      'contain.text',
      'En mantenimiento',
    )
  })

  it('should change the car status through the status to rented', () => {
    cy.get('[data-testid="car-status-1"]').should('exist')

    cy.get('[data-testid="menu-trigger"]').eq(0).click()

    cy.get('[data-testid="status-option-alquilado"]').click()

    cy.get('[data-testid="car-status-1"]').should('contain.text', 'Alquilado')
  })

  it('should revert the car status back to "Disponible"', () => {
    cy.get('[data-testid="car-status-2"]').should(
      'contain.text',
      'En mantenimiento',
    )

    cy.get('[data-testid="menu-trigger"]').eq(0).click()

    cy.get('[data-testid="status-option-disponible"]').should('exist')

    cy.get('[data-testid="status-option-disponible"]').click()

    cy.get('[data-testid="car-status-1"]').should('contain.text', 'Disponible')
  })
})
