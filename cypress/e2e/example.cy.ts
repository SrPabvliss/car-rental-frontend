describe('Componente de bienvenida', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Debe contener el título de bienvenida', () => {
    cy.contains('Bienvenido de vuelta!').should('be.visible');
  });

  it('Debe mostrar la imagen de fondo de Renta de autos', () => {
    cy.get('img[alt="Renta de autos"]').should('exist');
  });
  
  it('Debe contener el mensaje de solución de transporte', () => {
    cy.contains('Tu solución de transporte y comodidad').should('exist');
    cy.contains('Selección a tu gusto. ¡Asesoría en todo momento!').should('exist');
  });
  
});
