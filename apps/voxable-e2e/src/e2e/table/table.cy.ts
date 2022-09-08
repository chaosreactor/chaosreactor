describe('ui: Table component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=table--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Table!');
    });
});
