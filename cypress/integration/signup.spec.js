import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'


describe('Signup', () => {

    /*     beforeEach(function() {
            cy.fixture('deliver').then((d) => {
                this.deliver = d
            })
        })
     */
    /*     before(function() {
            cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
        })

        beforeEach(function() {
            cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
        })

        after(function() {
            cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
        })

        afterEach(function() {
            cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
        }) */

    it('User should be deliver', function() {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('Incorrect document', function() {

        var deliver = signupFactory.deliver()

        deliver.cpf = 'x12345789qw'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertContentShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function() {

        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.net'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertContentShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function() {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'deliver_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function() {
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function() {
                signup.alertContentShouldBe(msg.output)
            })
        })
    })

    it('Required fields', function() {
        signup.go()
        signup.submit()
        signup.alertContentShouldBe('É necessário informar o nome')
        signup.alertContentShouldBe('É necessário informar o CPF')
        signup.alertContentShouldBe('É necessário informar o email')
        signup.alertContentShouldBe('É necessário informar o CEP')
        signup.alertContentShouldBe('É necessário informar o número do endereço')
        signup.alertContentShouldBe('Selecione o método de entrega')
        signup.alertContentShouldBe('Adicione uma foto da sua CNH')
    })
})




//npm run test