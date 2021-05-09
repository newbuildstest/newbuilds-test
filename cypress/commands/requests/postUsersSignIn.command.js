export const loginViaApi = (email, password) => {
    cy.visit('');
    cy.document().then(() => {
        cy.get('head meta[name="csrf-token"]').invoke('attr', 'content').then((token) => {
            cy.task('setCSRFToken', token);
        }).then(() => {
            cy.task('getCSRFToken').then((token) => {
                cy.request({
                    method: 'POST',
                    url: '/users/sign_in',
                    body:
                    {
                        user: {
                            email: email,
                            password: password,
                            password_confirmation: "",
                            accept_privacy_policy: true,
                        }
                    },
                    headers: {
                        'X-CSRF-Token': token
                    }
                })
            }).then((resp) => {
                expect(resp.status).to.eq(200)
            });
        });
    });
};