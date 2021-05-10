# newbuilds.com test automation using Cypress

# Install:

`npm install` - will install Cypress

# Run: 

`npm run cypress:open` - launches cypress gui runner
`npm run cypress:all` - runs test suite in terminal

# Test framework todo's:

1. Replace login through UI with login programmatically
2. Replace user's favourites cleanup using UI clicks with using API on beforeEach
3. Introduce Fixtures for user profiles when there will be more than 1 test user and/or tests that test login/signup/profile
4. Introduce constants for static texts and labels