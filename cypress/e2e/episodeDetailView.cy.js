describe('Episode Detail View', () => {
    it('should render the episode detail view with audio player', () => {
        const podcastId = '1535809341';
        const episodeId = '1000634878746';

        cy.visit(`/podcast/${podcastId}/episode/${episodeId}`);
        cy.contains('h1', 'Episode Title').should('exist');
        cy.get('audio').should('exist');
    });
});