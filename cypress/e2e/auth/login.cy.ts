describe('Login Flow', () => {
  it('should load the login form correctly', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]')
      .contains('Iniciar sesión')
      .should('be.visible')
  })

  describe('Real-time Validation', () => {
    it('should show an error for invalid email', () => {
      cy.visit('/login')
      cy.get('input[name="email"]').type('invalid-email')
      cy.contains('El email no es válido.').should('be.visible')
    })

    it('should show an error for short password', () => {
      cy.visit('/login')
      cy.get('input[name="password"]').type('12')
      cy.contains('La contraseña debe tener al menos 3 caracteres.').should(
        'be.visible',
      )
    })
  })

  it('should log in successfully and redirect to the first module', () => {
    cy.intercept('POST', '**/auth/signin', req => {
      req.headers['Sec-Ch-Ua-Platform'] = 'Windows'
      delete req.headers['Proxy-Connection']
    }).as('loginRequest')

    cy.visit('/login')
    cy.get('input[name="email"]').type('pablovillacres4@gmail.com')
    cy.get('input[name="password"]').type('12345')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest')

    cy.url().should('include', '/cars')
  })

  it('should show an error message for invalid credentials', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('invaliduser@example.com')
    cy.get('input[name="password"]').type('invalidpassword')
    cy.get('button[type="submit"]').click()
    cy.contains('Error').should('be.visible')
  })
})
