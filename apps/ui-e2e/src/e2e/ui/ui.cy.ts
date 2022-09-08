describe('ui: Ui component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=ui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Ui!');
    });
});
