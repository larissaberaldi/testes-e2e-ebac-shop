// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('novoProduto', (produto, tamanho, cor, quantidade) => {
    cy.contains('div.products h3 > a', produto).click()
    cy.contains('ul.variable-items-wrapper li', tamanho).click()
    cy.contains('ul.variable-items-wrapper li', cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').should('contain' , 'no seu carrinho.')
 
   
});

Cypress.Commands.add('preencherFaturamento', (nome, sobrenome, empresa, pais, endereco, tipo, cidade, estado, cep, telefone, email) =>{
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


})

