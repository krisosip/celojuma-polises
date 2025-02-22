describe('Travel insurance', () => {
  it('Checks it is possile to change travel insurance details', () => {
    let policyTitle: string;
    let policyPrice: string;

    cy.visit('https://www.bta.lv/');

    // page is not created to be tested, elements do not have IDs or special "testid" attributes

    // close cookies modal
    cy.get('#module-284').find('.button.focus-button').click();

    // Open "Travel" tab
    // Text content differs depending on selected language, so using "img" 
    cy.get('.item.quick-menu-btn').find('img[src*="travel"]').click();

    // Choose destination
    cy.get('#regionalSelectorRegion-open .text-icon').should('be.visible'); // ensure field data fully loaded
    cy.get('#regionalSelectorRegion-open').click();
    cy.get('#regionalSelectorCountry-showListSearch').click();
    cy.get('#regionalSelectorCountry-addCountry').click();
    cy.get('#regionalSelectorCountry-typedValue').click().type('Indija');
    cy.get('#regionalSelectorCountry-selectItem[data-value="Indija"]').click();
    cy.get('#regionalSelectorCountry-applyButton').click();

    // Check selected destination
    cy.get('#regionalSelectorRegion-open').should('contain.text', 'Visa pasaule');

    // Change "Activities"
    cy.get('#travelActivities-open').click();
    cy.get('#travelActivities-popup-select-option-1').click();

    // Submit first step
    cy.get('[data-type="travelSubmit"]').click();
    cy.get('h2.title').contains('Izvēlies programmu').should('be.visible'); // ensure the data was processed

    // Select optimal policy
    cy.get('[data-type="policyItemOPTIMAL"] .title').then(($el) => {
      policyTitle = $el[0].textContent;
      cy.get('[data-type="policyItemPriceOPTIMAL"]').then(($el) => {
        policyPrice = $el[0].textContent;

        cy.get('[data-type="policyItemOPTIMAL"]').find('[datatype="selectPolicyPlanOPTIMAL"]').click({ force: true });
        cy.get('h2.title').should('contain.text', 'Vēlies pievienot papildu aizsardzību?'); // ensure data was processed
    
        //Checking selected policy
        cy.get('#insurance-plan-widget .title').should('contain.text', 'Mana polise');
        cy.get('#insurance-plan-widget .item-name').should('contain.text', policyTitle);
        cy.get('#insurance-plan-widget .item-value').should('contain.text', policyPrice);
      });
    });

    //Edit details
    cy.get('.edit-details').click({ force: true });
    cy.get('#deductible-open').click();
    cy.get('#deductible-dropdown-select-option-1').click();
    cy.get('.confirm-details').click();
    cy.get('.single-popup').should('not.be.visible'); // ensure popup and loading closed

    // Proceed to the next step
    cy.get('#insurance-plan-widget button').click({ force: true });
    cy.get('h3.title').should('contain.text', 'Ceļotāju dati'); // ensure data was processed
    cy.get

    // Check fields are not prefilled
    cy.get('#travelerFirstName0 input').should('be.empty');
    cy.get('#travelerLastName0 input').should('be.empty');
    cy.get('#travelerIdentityNumber0 input').should('be.empty');
  });
})