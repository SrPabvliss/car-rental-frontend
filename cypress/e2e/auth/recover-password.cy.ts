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
})
