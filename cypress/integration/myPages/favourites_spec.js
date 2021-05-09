describe('Favourites in My Pages', () => {

  // 1. Visit newbuilds.com
  // 2. Login (using login credentials you registered with manually earlier)
  beforeEach(() => {
    cy.login("testvisitor@mailinator.com", "TestPass1");

    // Extra step: This block cleans up Favorites screen so that test always starts with no favorite listings.
    // Here I would ideally do this using APIs, not UI.
    cy.visit('/profile/favourites');
    cy.document().then(() => {
      if (Cypress.$('[data-testid="property-card-link"]').length > 0) {
        cy.get('[data-testid="property-card-link"]')
          .each(() => {
            cy.get('[x-show="isFavourite"]').first().click();
            cy.reload();
          })
      }
    });
    cy.get('.no-favourites-message').should('be.visible');
  });

  it('allows to save a listing as a favorite', () => {
    // 3. Using search functionality, search for specific entity (you may choose which entity)
    // Extra step: Choosing would mean hardcoded text. As listings might change, but I want my test to work - I take first available listing from home page.
    cy.get('.logo').first().click();
    cy.get('.property-title').first().invoke('text').invoke('trim').then((propertyTitle) => {
      cy.get('#autocomplete').type(propertyTitle);
    })
    cy.get('[data-type="listing"]').first().click();
    // Extra step: Check unfavorite button is not visible, i.e. listing is not favorite (at least visually)
    cy.get('button.favourite.btn.btn-primary.btn-reverse.favourited').should('not.exist');
    // 4. Favorite the found entity
    cy.get('[data-testid=project-favourite-button]').last().click();
    // Extra step: Check unfavorite button is now visible.
    cy.get('button.favourite.btn.btn-primary.btn-reverse.favourited').should('be.visible');
    // 5. Visit the favorites section of user profile and assert that the chosen entity is present
    cy.visit('/profile/favourites');
    // Extra step: Check 'no favorites' message is not visible anymore and there is 1 favorite on the screen
    cy.get('.no-favourites-message').should('not.exist');
    cy.get('[data-testid=favourites]').should('be.visible');
    cy.get('[data-testid="property-card-link"]').should('to.have.length', 1)
    // Extra step: Unfavorite the listing and check favorite button changes. Also reload the page to verify listing disappears from favorites and 'no favorites' message takes it's place.
    cy.get('[x-show="isFavourite"]').click();
    cy.get('[x-show="isFavourite"]').should('not.be.visible');
    cy.get('[x-show="!isFavourite"]').should('be.visible');
    cy.reload();
    cy.get('.no-favourites-message').should('be.visible');
  })
});