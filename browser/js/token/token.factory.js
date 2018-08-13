app.factory('TokenFactory', function ($http, NeblioAPIFactory) {

    const TokenFactory = {};

    TokenFactory.getAllTokenDataById = function(tokenId) {
    	return NeblioAPIFactory.fetchTokenMetaData(tokenId);
    };

	TokenFactory.getTokenIdFromIdentifier = function(tokenIdentifier) {
		if (tokenIdentifier.length < 8) {
			return NeblioAPIFactory.fetchTokenId(tokenIdentifier)
			.then(data => {
				return data.tokenId;
			});
		} else {
			return new Promise((resolve, reject) => {
				resolve(tokenIdentifier);
			});
		}
	};


    return TokenFactory;

});