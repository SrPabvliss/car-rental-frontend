describe('Edit Car Workflow', () => {
  beforeEach(() => {
    cy.visit('/dashboard/cars')
  })

  it('should navigate to the edit car page for the third car and render the form correctly', () => {
    cy.get('[data-testid="edit-car-button"]').eq(2).click()

    cy.url().should('include', '/dashboard/cars/3')

    cy.get('form').should('be.visible')
    cy.get('select#brand').should('have.value', 'Ford')
    cy.get('input#model').should('have.value', 'Mustang')
    cy.get('input#color').should('have.value', 'Rojo')
    cy.get('input#plate').should('have.value', 'MUS501')
    cy.get('select#type').should('have.value', 'Deportivo')
    cy.get('select#status').should('have.value', 'Disponible')
    cy.get('input#year').should('have.value', '2023')
    cy.get('input#mileage').should('have.value', '5000')
    cy.get('input#dailyRate').should('have.value', '75')
    cy.get('[data-testid="submit-car-form"]').should(
      'contain.text',
      'Editar vehículo',
    )
  })

  it('should update the mileage for the third car and reset it after test', () => {
    cy.get('[data-testid="edit-car-button"]').eq(2).click()

    cy.intercept('PUT', '**/cars/3', {
      statusCode: 200,
    }).as('editCar')

    cy.get('input#mileage').clear()
    cy.get('input#mileage').type('6000')
    cy.get('[data-testid="submit-car-form"]').click()

    cy.url().should('include', '/dashboard/cars')

    cy.get('[data-testid="edit-car-button"]').eq(2).click()
    cy.get('input#mileage').clear()
    cy.get('input#mileage').type('5000')
    cy.get('[data-testid="submit-car-form"]').click()

    cy.url().should('include', '/dashboard/cars')
  })

  it('should show an error when no changes are made to the third car', () => {
    cy.get('[data-testid="edit-car-button"]').eq(2).click()

    cy.intercept('PUT', '**/cars/3', {
      statusCode: 400,
    }).as('noChangesError')

    cy.get('[data-testid="submit-car-form"]').click()

    cy.contains('No se han modificado los campos').should('be.visible')
  })
})
