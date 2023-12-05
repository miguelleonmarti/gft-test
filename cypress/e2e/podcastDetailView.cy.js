describe('Podcast Detail View', () => {
    it('should render the podcast detail view', () => {
        const podcastId = '1535809341';

        cy.visit(`/podcast/${podcastId}`);
        cy.contains('h2', 'The Joe Budden Podcast - The Joe Budden Network').should('exist');
    });
});
  