app.config(function ($stateProvider) {

    $stateProvider.state('token', {
        url: '/token/:tokenIdentifier',
        controller: 'TokenController',
        templateUrl: 'js/token/token.template.html',
        resolve: {
        	AllTokenData: function($stateParams, TokenFactory) {
                return TokenFactory.getTokenIdFromIdentifier($stateParams.tokenIdentifier)
                .then(tokenId => {
                    return TokenFactory.getAllTokenDataById(tokenId);
                });
            }
        }
    });

});