import { locales } from "../utils/localisation";

describe('Travel insurance', () => {
  it('Checks it is possile to change travel insurance details', () => {
    let policyTitle: string;
    let policyPrice: string;

    // Visit BTA page
    cy.visit('https://www.bta.lv/');

    // Close cookies modal
    cy.get('.cookies-notification .focus-button').click();

    // Open "Travel" tab
    cy.get('.item.quick-menu-btn').contains(locales.lv.travel).click();

    // Choose destination
    cy.get('#regionalSelectorRegion-open .text-icon').should('be.visible'); // ensure field data fully loaded
    cy.get('#regionalSelectorRegion-open').click();
    cy.get('#regionalSelectorCountry-showListSearch').click();
    cy.get('#regionalSelectorCountry-addCountry').click();
    cy.get('#regionalSelectorCountry-typedValue').click().type(locales.lv.India);
    cy.get(`#regionalSelectorCountry-selectItem[data-value="${locales.lv.India}"]`).click();
    cy.get('#regionalSelectorCountry-applyButton').click();

    // Check selected destination
    cy.get('#regionalSelectorRegion-open').should('contain.text', locales.lv.worldwide);

    // Change "Activities"
    cy.get('#travelActivities-open').click();
    cy.get('#travelActivities-popup-select-option-1').click();

    // Submit first step
    cy.get('[data-type="travelSubmit"]').click();
    cy.get('h2.title').contains(locales.lv.choosePlan).should('be.visible'); // ensure the data was processed

    // Select optimal policy
    cy.get('[data-type="policyItemOPTIMAL"] .title').then(($el) => {
      policyTitle = $el[0].textContent;
      cy.get('[data-type="policyItemPriceOPTIMAL"]').then(($el) => {
        policyPrice = $el[0].textContent;

        cy.get('[data-type="policyItemOPTIMAL"]').find('[datatype="selectPolicyPlanOPTIMAL"]').click({ force: true });
        cy.get('h2.title').should('contain.text', locales.lv.extraCover); // ensure data was processed
    
        //Checking selected policy
        cy.get('#insurance-plan-widget .title').should('contain.text', locales.lv.myPolicy);
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

    // Not possile to check Sum insured as it is not visible after closing popup 

    // Proceed to the next step
    cy.get('#insurance-plan-widget button').click({ force: true });
    cy.get('h3.title').should('contain.text', locales.lv.travelersData); // ensure data was processed

    // Check fields are not prefilled
    cy.get('#travelerFirstName0 input').should('be.empty');
    cy.get('#travelerLastName0 input').should('be.empty');
    cy.get('#travelerIdentityNumber0 input').should('be.empty');
  });
})