describe('Register Flow', () => {
  it('should load the register form correctly', () => {
    cy.visit('/login')
    cy.contains('Regístrate').click()

    cy.url().should('include', '/register')
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="lastName"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('input[name="phone"]').should('be.visible')
    cy.get('input[name="address"]').should('be.visible')
    cy.get('button[type="submit"]').contains('Registrarse').should('be.visible')
  })

  it('should register successfully and redirect to login', () => {
    cy.intercept('POST', '**/auth/signup', {
      statusCode: 201,
      body: { message: 'Registro exitoso' },
    }).as('registerRequest')

    cy.visit('/login')
    cy.contains('Regístrate').click()

    cy.get('input[name="name"]').type('Juan')
    cy.get('input[name="lastName"]').type('Pérez')
    cy.get('input[name="email"]').type('juan.perez@example.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('input[name="phone"]').type('0984198999')
    cy.get('input[name="address"]').type('Calle Falsa 123')

    cy.get('select#role').should('be.visible').select('Cliente')

    cy.get('button[type="submit"]').click()

    cy.wait('@registerRequest')
    cy.url().should('include', '/login')
    cy.contains('Iniciar sesión').should('be.visible')
  })

  it('should show a generic error message on backend failure', () => {
    cy.intercept('POST', '**/auth/signup', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('registerFailure')

    cy.visit('/login')
    cy.contains('Regístrate').click()

    cy.get('input[name="name"]').type('Juan')
    cy.get('input[name="lastName"]').type('Pérez')
    cy.get('input[name="email"]').type('juan.perez@example.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('input[name="phone"]').type('0984198999')
    cy.get('input[name="address"]').type('Calle Falsa 123')
    cy.get('select[name="role"]').select('Cliente')

    cy.get('button[type="submit"]').click()

    cy.wait('@registerFailure')
    cy.contains('Error').should('be.visible')
  })
})
