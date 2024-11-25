describe('FILTER_CARS Flow', () => {
  beforeEach(() => {
    cy.visit('/dashboard/cars')
  })

  it('should paginate correctly', () => {
    cy.get('[data-testid="pagination-stats"]').should(
      'contain.text',
      'Mostrando 1 a 6 de 11 vehículos',
    )

    cy.get('[data-testid="next-page-button"]').click()
    cy.get('[data-testid="pagination-stats"]').should(
      'contain.text',
      'Mostrando 7 a 11 de 11 vehículos',
    )

    cy.get('[data-testid="first-page-button"]').click()
    cy.get('[data-testid="pagination-stats"]').should(
      'contain.text',
      'Mostrando 1 a 6 de 11 vehículos',
    )
  })

  it('should load the car list page correctly', () => {
    cy.contains('Vehículos').should('be.visible')
    cy.get('input#search').should('be.visible')
    cy.get('select#brand').should('be.visible')
    cy.get('select#type').should('be.visible')
    cy.get('select#status').should('be.visible')
    cy.get('select#year').should('be.visible')
    cy.get('select#orderBy').should('be.visible')
  })

  it('should filter cars by brand', () => {
    cy.intercept('GET', '**/cars/filter?brand=Toyota**', {
      statusCode: 200,
    }).as('filterByBrand')

    cy.get('select#brand').select('Honda')

    cy.get('.car-card').should('exist')
    cy.get('.car-card').within(() => {
      cy.contains('Honda ').should('be.visible')
    })
  })

  it('should filter cars by type', () => {
    cy.intercept('GET', '**/cars/filter?type=Deportivo**', {
      statusCode: 200,
    }).as('filterByType')

    cy.get('select#type').select('Lujo')

    cy.get('.car-card').should('exist')
    cy.get('.car-card').within(() => {
      cy.contains('Mercedes').should('be.visible')
      cy.contains('Clase S').should('be.visible')
    })
  })

  it('should show a message when no cars are found using the search input', () => {
    cy.intercept('GET', '**/cars/filter?search=adawfwa**', {
      statusCode: 200,
      body: {
        items: [],
        totalItems: 0,
      },
    }).as('noResults')

    cy.get('input#search').type('adawfwa')

    cy.contains('No se encontraron vehículos').should('be.visible')
    cy.get('.car-card').should('not.exist')
  })

  it('should filter cars with multiple criteria', () => {
    cy.intercept(
      'GET',
      '**/cars/filter?brand=Toyota&type=Económico&status=Disponible**',
      {
        statusCode: 200,
      },
    ).as('filterMultiple')

    cy.get('select#brand').select('Toyota')
    cy.get('select#type').select('Económico')
    cy.get('select#status').select('Disponible')

    cy.get('.car-card').should('exist')
    cy.get('.car-card').within(() => {
      cy.contains('Toyota').should('be.visible')
      cy.contains('Corolla').should('be.visible')
    })
  })
})
