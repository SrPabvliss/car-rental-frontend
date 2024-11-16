describe('Recover password flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should navigate from login to recover password', () => {
    cy.contains('¿Olvidaste tu contraseña?').click()
    cy.url().should('include', '/recover-password')
    cy.contains('Recuperar contraseña').should('be.visible')
  })

  it('Should show loading state when submitting the form', () => {
    cy.visit('/recover-password')
    cy.get('input[name="email"]').type('pablovillacres4@gmail.com')
    cy.get('button[type="submit"]').click()
    cy.get('.spinner').should('be.visible')
  })

  it('Should navigate back to login', () => {
    cy.visit('/recover-password')
    cy.contains('Inicia sesión').click()
    cy.url().should('include', '/login')
  })

  describe('Reset Password', () => {
    beforeEach(() => {
      cy.visit('/reset-password?email=test@example.com')
    })

    it('Should show validation errors if fields are empty', () => {
      cy.get('button[type="submit"]').click()

      cy.contains('El token es requerido.').should('be.visible')
      cy.contains('La contraseña es requerida.').should('be.visible')
      cy.contains('La confirmación de contraseña es requerida.').should(
        'be.visible',
      )
    })

    it('Should show error if passwords dont match', () => {
      cy.get('input[name="token"]').type('valid-token')
      cy.get('input[name="newPassword"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password321')
      cy.get('button[type="submit"]').click()

      cy.contains('Las contraseñas no coinciden.').should('be.visible')
    })
  })
})
