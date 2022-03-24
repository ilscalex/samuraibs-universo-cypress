

class Header {
    userLoggedIn(userName){
        cy.get('header div div div a strong', {timeout: 7000})
            .should('be.visible')
            .should('have.text', userName)
    }
}

export default new Header()