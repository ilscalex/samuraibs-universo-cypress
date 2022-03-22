import faker from '@faker-js/faker'

import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    context.only('quando o usuario eh novato', function () {
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

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            cy.wait(2370)
            cy.get('body')
        })
    })

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
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

            cy.wait(2370)
            cy.get('body')
        })

    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.gmail.com',
            password: 'pwd123',
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()

            signupPage.alertHaveText('Informe um email válido')
        })


    })

    context('quando a senha e muito curta', function () {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function(){
            signupPage.go()
        })

        passwords.forEach(function (p) {

            it('nao deve cadastrar cadastrar com a senha:' + p, function () {   
                const user = {
                    name: 'Jason Friday',
                    email: 'jason@gmail.com',
                    password: p
                }
                
                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function(){
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando nao preencho nenhum dos campos', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
        it('Deve exibir: ' + alert.toLowerCase(), function(){
           
                signupPage.alertHaveText(alert)
            })
            

        })
})
})
