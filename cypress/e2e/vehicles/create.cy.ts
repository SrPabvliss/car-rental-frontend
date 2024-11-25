describe('Create Car Workflow', () => {
  beforeEach(() => {
    cy.visit('/dashboard/cars')
  })

  it('should navigate to the create car page and render the form correctly', () => {
    cy.get('[data-testid="create-car-button"]').click()

    cy.url().should('include', '/dashboard/cars/create')

    cy.get('form').should('be.visible')

    cy.get('select#brand').should('exist')
    cy.get('input#model').should('exist')
    cy.get('input#color').should('exist')
    cy.get('input#plate').should('exist')
    cy.get('select#type').should('exist')
    cy.get('select#status').should('exist')
    cy.get('input#year').should('exist')
    cy.get('input#mileage').should('exist')
    cy.get('input#dailyRate').should('exist')
    cy.get('[data-testid="submit-car-form"]').should(
      'contain.text',
      'Crear vehículo',
    )
  })

  describe('Real-time Validation', () => {
    beforeEach(() => {
      cy.get('[data-testid="create-car-button"]').click()
    })

    it('should show an error for short model', () => {
      cy.get('input#model').type('Co')
      cy.contains('El modelo debe tener más de 3 caracters.').should(
        'be.visible',
      )
    })

    it('should show an error for invalid year', () => {
      cy.get('input#year').type('1999')
      cy.contains('El año debe ser 2000 o posterior.').should('be.visible')

      cy.get('input#year').clear()
      cy.get('input#year').type((new Date().getFullYear() + 1).toString())
      cy.contains('El año no puede superar el actual.').should('be.visible')
    })

    it('should show an error for negative mileage', () => {
      cy.get('input#mileage').type('-5000')
      cy.contains('El kilometraje no puede ser negativo.').should('be.visible')
    })

    it('should show an error for missing or invalid daily rate', () => {
      cy.get('input#dailyRate').type('-27')
      cy.contains('La tarifa diaria debe ser mayor a 0.').should('be.visible')
    })

    it('should show an error for invalid plate', () => {
      cy.get('input#plate').type('12')
      cy.contains('La placa debe tener más de 3 caracteres.').should(
        'be.visible',
      )
    })

    it('should show an error for missing or short color', () => {
      cy.get('input#color').type('Bl')
      cy.contains('El color debe tener más de 3 caracteres ').should(
        'be.visible',
      )
    })
  })

  it('should create a car successfully and navigate to /cars', () => {
    cy.get('[data-testid="create-car-button"]').click()

    cy.intercept('POST', '**/cars', {
      statusCode: 201,
      body: { message: 'Vehículo creado exitosamente' },
    }).as('createCar')

    cy.get('select#brand').select('Toyota')
    cy.get('input#model').type('Corolla')
    cy.get('input#color').type('Azul')
    cy.get('input#plate').type('XYZ123')
    cy.get('select#type').select('Económico')
    cy.get('select#status').select('Disponible')
    cy.get('input#year').type('2023')
    cy.get('input#mileage').type('15000')
    cy.get('input#dailyRate').type('45')

    cy.get('[data-testid="submit-car-form"]').click()

    cy.wait('@createCar')
    cy.url().should('include', '/dashboard/cars')
  })
})
