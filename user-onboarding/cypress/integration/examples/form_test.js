describe('Tests my Form', function() {
    it('visits form page', function(){
        cy.visit('http://localhost:3000')
    })
    it('Gets the Name field and types a name into it', function() {
        cy.get('input.name').type('John Smith')
        .should('have.value', 'John Smith')
    })
    it('Gets Email field and types an email address', function() {
        cy.get('input.email').type('john@smith.com')
    })
    it('Gets password field and types a password', function() {
        cy.get('input.password').type('PaSsWoRd123')
    })
    it('Ensures user can check Terms of Service box', function() {
        cy.get('[type="checkbox"]').check()
    })
    it('Checks that the form can be submitted', function() {
        cy.get('button.submit').click()
    })
    it('Checks validation', function() {
        cy.get('[type="checkbox"]').check().uncheck()
        cy.get('.errors').its('.tosError')
        .should('contain', 'You must agree to Terms of Service')
})
})