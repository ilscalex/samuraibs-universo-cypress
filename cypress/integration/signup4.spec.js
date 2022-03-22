import faker from '@faker-js/faker'

describe('cadastro', function () {

    //const name = 'Alex Yui'
    //const email = 'lex.txt@hotmail.com'
    //const email = faker.internet.email()
    //const password = 'pwd123'

    context('quando o usuario eh novato', function () {
        const user = {
            name: 'Alex Ito',
            email: 'lex.txt@hotmail.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar um novo usuario', function () {

            cy.visit('/signup')

            //preenchendo e submetendo o formulario de cadastro
            cy.get('input[placeholder^="Nome"]').type(user.name)

            cy.get('input[placeholder$="email"]').type(user.email)

            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Cadastrar').click()

            //validacao do resultado esperado
            cy.get('.toast', { timeout: 50000 })
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            cy.wait(2370)
            cy.get('body')
        })
    })
    /*
        it('deve cadastrar um novo usuario', function () {
    
            //const name = 'Alex Yui'
            //const email = 'lex.txt@hotmail.com'
            //const email = faker.internet.email()
            //const password = 'pwd123'
    
            //definindo a massa de teste
            //const user = {
           //     name: 'Alex Ito',
           //     email: 'lex.txt@hotmail.com',
           //     password: 'pwd123'
           // }
    
            //removendo o usuario para que a massa seja sempre valida
            //cy.task('removeUser', user.email)
            //    .then(function (result) {
            //        console.log(result)
            //    })
    
            //acessando a pagina de cadastro
            cy.visit('/signup')
    
            //preenchendo e submetendo o formulario de cadastro
            cy.get('input[placeholder=Nome]').type(user.name)
    
            cy.get('input[placeholder=E-mail]').type(user.email)
    
            cy.get('input[placeholder=Senha]').type(user.password)
    
            //cy.intercept('POST', '/users', {statusCode:200}).as('postUser')
    
            cy.contains('button', 'Cadastrar').click()
    
            //cy.wait('@postUser')
    
            //cy.contains('button[type=submit]', 'Cadastrar').click()
    
            //validacao do resultado esperado
            cy.get('.toast', { timeout: 50000 })
                .should('be.visible')
                .find('p')
                //.should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    
    
            cy.wait(2370)
            cy.get('body')
        })
    */

    context('nao deve cadastrar o usuario', function () {
        const user = {
            name: 'Alex Yui',
            email: 'alexyuir@gmail.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
                
            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })

        })
        it('deve exibir email ja cadastrado', function () {
            cy.visit('/signup')

            cy.get('input[placeholder^="Nome"]').type(user.name)

            cy.get('input[placeholder$="email"]').type(user.email)

            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Cadastrar').click()

            cy.get('.toast', { timeout: 50000 })
                .should('be.visible')
                .find('p')
                .should('have.text', 'Email já cadastrado para outro usuário.')

            cy.wait(2370)
            cy.get('body')
        })

    })
    /*
    
        it('deve exibir email ja cadastrado', function () {
    
            // const name = 'Alex Yui'
            // const email = 'lex.txt@hotmail.com'
            //const email = faker.internet.email()
            // const password = 'pwd123'
    
           // const user = {
           //     name: 'Alex Yui',
           //     email: 'alexyuir@gmail.com',
           //     password: 'pwd123',
           //     is_provider: true
          //  }
    
          //  cy.task('removeUser', user.email)
          //      .then(function (result) {
          //          console.log(result)
          //      })
    
            //pre cadastro e ver se retorna 200
           // cy.request(
           //     'POST',
          //      'http://localhost:3333/users',
          //      user
          //  ).then(function (response) {
          //      expect(response.status).to.eq(200)
          //  })
    
            cy.visit('/signup')
    
            cy.get('input[placeholder=Nome]').type(user.name)
    
            cy.get('input[placeholder=E-mail]').type(user.email)
    
            cy.get('input[placeholder=Senha]').type(user.password)
    
            //cy.intercept('POST', '/users', {statusCode:200}).as('postUser')
    
            cy.contains('button', 'Cadastrar').click()
    
            //cy.wait('@postUser')
    
            //cy.contains('button[type=submit]', 'Cadastrar').click()
    
            cy.get('.toast', { timeout: 50000 })
                .should('be.visible')
                .find('p')
                .should('have.text', 'Email já cadastrado para outro usuário.')
    
            cy.wait(2370)
            cy.get('body')
        })
        */
})

