

it('webapp dee estar online', function(){
    // um simples comentario
    cy.visit('/')

    cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')
})
