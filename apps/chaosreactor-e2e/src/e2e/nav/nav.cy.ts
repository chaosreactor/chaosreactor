describe('ui: Nav component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nav--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Nav!');
    });
});
