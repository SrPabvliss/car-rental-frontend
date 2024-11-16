describe('Recuperar Contraseña - E2E', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Debe navegar desde login a recuperar contraseña', () => {
    cy.contains('¿Olvidaste tu contraseña?').click()
    cy.url().should('include', '/recover-password')
    cy.contains('Recuperar contraseña').should('be.visible')
  })

  it('Debe mostrar estado de carga al enviar el formulario', () => {
    cy.visit('/recover-password')
    cy.get('input[name="email"]').type('pablovillacres4@gmail.com')
    cy.get('button[type="submit"]').click()
    cy.get('.spinner').should('be.visible')
  })

  it('Debe navegar de vuelta a login', () => {
    cy.visit('/recover-password')
    cy.contains('Inicia sesión').click()
    cy.url().should('include', '/login')
  })

  describe('Resetear Contraseña', () => {
    beforeEach(() => {
      cy.visit('/reset-password?email=test@example.com')
    })

    it('Debe mostrar errores de validación si los campos están vacíos', () => {
      cy.get('button[type="submit"]').click()

      cy.contains('El token es requerido.').should('be.visible')
      cy.contains('La contraseña es requerida.').should('be.visible')
      cy.contains('La confirmación de contraseña es requerida.').should(
        'be.visible',
      )
    })

    it('Debe mostrar error si las contraseñas no coinciden', () => {
      cy.get('input[name="token"]').type('valid-token')
      cy.get('input[name="newPassword"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password321')
      cy.get('button[type="submit"]').click()

      cy.contains('Las contraseñas no coinciden.').should('be.visible')
    })

    it('Debe mostrar error al intentar resetear sin éxito', () => {
      cy.intercept('POST', '/auth/reset-password', {
        statusCode: 400,
        body: { error: 'Error al intentar restablecer la contraseña.' },
      }).as('resetPassword')

      cy.get('input[name="token"]').type('valid-token')
      cy.get('input[name="newPassword"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password123')
      cy.get('button[type="submit"]').click()

      cy.wait('@resetPassword')
      cy.contains('Error al intentar restablecer la contraseña.').should(
        'be.visible',
      )
    })
  })
})
