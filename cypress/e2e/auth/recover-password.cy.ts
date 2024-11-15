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
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('button[type="submit"]').click()
    cy.get('.loading-spinner').should('be.visible')
  })

  it('Debe navegar de vuelta a login', () => {
    cy.visit('/recover-password')
    cy.contains('Inicia sesión').click()
    cy.url().should('include', '/login')
  })

  it('Debe redirigir al formulario de restablecimiento tras enviar datos válidos', () => {
    cy.intercept('POST', '/auth/reset', { statusCode: 200 }).as('resetRequest')
    cy.visit('/recover-password')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('button[type="submit"]').click()
    cy.wait('@resetRequest')
    cy.url().should('include', '/reset-password')
  })
})
