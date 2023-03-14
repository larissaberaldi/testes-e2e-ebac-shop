import {faker} from '@faker-js/faker'

class PaginaFaturamento {
 
    compraCompleta(produto, tamanho, cor, quantidade, nome, sobrenome, empresa, pais, endereco, tipo, cidade, estado, cep, telefone, email){
        cy.novoProduto(produto, tamanho, cor, quantidade) //comando pers
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click() 
        cy.get('#billing_first_name').type(nome)
        cy.get('#billing_last_name').type(sobrenome)
        cy.get('#billing_company').type(empresa)
        cy.get('#select2-billing_country-container').click()
        cy.contains('li', pais).click()
        cy.get('#billing_address_1').type(endereco)
        cy.get('#billing_address_2').type(tipo)
        cy.get('#billing_city').type(cidade)
        cy.get('#select2-billing_state-container').click()
        cy.contains('li' , estado).click()
        cy.get('#billing_postcode').type(cep)
        cy.get('#billing_phone').type(telefone)
        cy.get('#billing_email').type(email)
        cy.get('#payment_method_cheque').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
       
    }

    preencherDadosFaturamento(nome, sobrenome, empresa, pais, endereco, tipo, cidade, estado, cep, telefone, email){
        cy.get('#billing_first_name').type(nome)
        cy.get('#billing_last_name').type(sobrenome)
        cy.get('#billing_company').type(empresa)
        cy.get('#select2-billing_country-container').click()
        cy.contains('li', pais).click()
        cy.get('#billing_address_1').type(endereco)
        cy.get('#billing_address_2').type(tipo)
        cy.get('#billing_city').type(cidade)
        cy.get('#select2-billing_state-container').click()
        cy.contains('li' , estado).click()
        cy.get('#billing_postcode').type(cep)
        cy.get('#billing_phone').type(telefone)
        cy.get('#billing_email').type(email)
        cy.get('#payment_method_cheque').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
       
    }

    preencherDadosFaturamentoAuto(){

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let empresa = faker.company.name()
        let pais = faker.address.country()
        let endereco = faker.address.street() + faker.address.buildingNumber()
        let tipo = faker.address.timeZone()
        let cidade = faker.address.cityName()
        let estado = faker.address.state()
        let cep = faker.address.zipCode()
        let telefone = faker.phone.number()
        let email = faker.internet.email()

        cy.get('#billing_first_name').type(nome)
        cy.get('#billing_last_name').type(sobrenome)
        cy.get('#billing_company').type(empresa)
        cy.get('#select2-billing_country-container').click()
        cy.contains('li', pais).click()
        cy.get('#billing_address_1').type(endereco)
        cy.get('#billing_address_2').type(tipo)
        cy.get('#billing_city').type(cidade)
        cy.get('#select2-billing_state-container').click()
        cy.contains('li' , estado).click()
        cy.get('#billing_postcode').type(cep)
        cy.get('#billing_phone').type(telefone)
        cy.get('#billing_email').type(email)
        cy.get('#payment_method_cheque').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        
       
    }


}

export default new PaginaFaturamento()