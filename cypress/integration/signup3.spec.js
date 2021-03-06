import faker from '@faker-js/faker'

it('deve cadastrar um novo usuario', function(){
    
    const name = 'Alex Yui'
    //const email = 'lex.txt@hotmail.com'
    const email = faker.internet.email()
    const password = 'pwd123'

   // cy.task('removeUser',email)
  //      .then(function(result){
   //         console.log(result)
   //     })
    
    cy.visit('/signup')

    cy.get('input[placeholder=Nome]').type(name)

    cy.get('input[placeholder=E-mail]').type(email)

    cy.get('input[placeholder=Senha]').type(password)

    //cy.intercept('POST', '/users', {statusCode:200}).as('postUser')

    cy.contains('button', 'Cadastrar').click()

    //cy.wait('@postUser')

    //cy.contains('button[type=submit]', 'Cadastrar').click()

    cy.get('.toast', {timeout:50000})
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
    
    cy.wait(2370)
    cy.get('body')
})