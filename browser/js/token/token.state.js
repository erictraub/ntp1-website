app.config(function ($stateProvider) {

    $stateProvider.state('token', {
        url: '/token/:tokenIdentifier',
        controller: 'TokenController',
        templateUrl: 'js/token/token.template.html',
        resolve: {
        	TokenMetadata: function($stateParams, NeblioAPIFactory, TokenFactory) {
                return TokenFactory.getTokenIdFromIdentifier($stateParams.tokenIdentifier)
                .then(tokenId => {
                    return NeblioAPIFactory.fetchAllTokenMetaData(tokenId);
                });
            }
        }
    });

});