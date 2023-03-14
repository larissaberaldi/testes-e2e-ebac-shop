/// <reference types="cypress" />
import PaginaFaturamento from "../support/page_objects/pag-faturamento.page";
import {faker} from '@faker-js/faker'
   faker.locale = 'pt_BR'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta, sem otimização (somente variável)', () => { //////OK////
        var quantidade1 = 2
        var quantidade2 = 3
    
        cy.contains('div.products h3 > a', 'Abominable Hoodie').click()
        cy.contains('ul.variable-items-wrapper li', 'XS').click()
        cy.contains('ul.variable-items-wrapper li', 'Blue').click()
        cy.get('.input-text').clear().type(quantidade1)
        cy.get('.single_add_to_cart_button').click()    
        cy.get('.woocommerce-message').should('contain' , quantidade1 + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.contains('div.products h3 > a', 'Ajax Full-Zip Sweatshirt').click()
        cy.contains('ul.variable-items-wrapper li', 'L').click()
        cy.contains('ul.variable-items-wrapper li', 'Red').click()
        cy.get('.input-text').clear().type(quantidade2)
        cy.get('.single_add_to_cart_button').click()    
        cy.get('.woocommerce-message').should('contain' , quantidade2 +' × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click() 
        cy.get('#billing_first_name').type('Lavínia')
        cy.get('#billing_last_name').type('Rocha')
        cy.get('#billing_company').type('Google')
        cy.get('#select2-billing_country-container').click()
        cy.contains('li', 'Brasil').click()
        cy.get('#billing_address_1').type('Rua Rocha Pombo 757')
        cy.get('#billing_address_2').type('Casa')
        cy.get('#billing_city').type('Londrina')
        cy.get('#select2-billing_state-container').click()
        cy.contains('li' , 'Paraná').click()
        cy.get('#billing_postcode').type('46891891')
        cy.get('#billing_phone').type('3697-2598')
        cy.get('#billing_email').type('lavinia2@teste.com')
        cy.get('#payment_method_cheque').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')  
    

    });

    it('Deve escolher produtos e finalizar o pedido utilizando comandos customizados', () => { /////OK////
        cy.novoProduto('Abominable Hoodie', 'XS', 'Blue', '2') //comando pers
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.novoProduto('Ajax Full-Zip Sweatshirt', 'L', 'Red', '3')
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.novoProduto('Arcadio Gym Short', '33', 'Red', '4')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click() 
        cy.preencherFaturamento('Lavína', 'Rocha', 'Google', 'Brasil', 'Rua Rocha Pombo 77','casa', 'Londrina','Paraná', '86025799', '43996547899', 'lavinia21@teste.com')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')  

    });

    it('Deve escolher produtos e finalizar o pedido utilizando page objects', () => { ////OK////
        PaginaFaturamento.compraCompleta('Abominable Hoodie','XS','Blue', '2','Lavínia','Rocha','Google','Brasil', 'Rua Rocha Pombo','Casa','Londrina', 'Paraná','86135900', '4396541899','laviniateste@teste.com')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')  
    });

  
    it('Deve escolher produtos e finalizar o pedido utilizando comandos avançados e page objects', () => {  /////OK////
        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let empresa = faker.company.name()
        let pais = faker.address.country()
   
        cy.novoProduto('Abominable Hoodie', 'XS', 'Blue', '2') //comando pers
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click() 
        PaginaFaturamento.preencherDadosFaturamento(nome, sobrenome, empresa, pais, 'Rua Rocha Pombo','Casa','Londrina', 'Paraná','86135900', '4396541899','laviniateste@teste.com')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        
    });

    it.only('Deve escolher produtos e finalizar o pedido utilizando comandos avançados e page objects (faker)', () => {  /////OK////
        cy.novoProduto('Abominable Hoodie', 'XS', 'Blue', '2') //comando pers
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click() 
        PaginaFaturamento.preencherDadosFaturamentoAuto()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        
    });

})