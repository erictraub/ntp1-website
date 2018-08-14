app.factory('TokenFactory', function ($http, NeblioAPIFactory) {

    const TokenFactory = {};

    TokenFactory.getAllTokenDataById = function(tokenId) {
    	const promises = [
    		NeblioAPIFactory.fetchTokenMetaData(tokenId),
    		NeblioAPIFactory.fetchTokenHolders(tokenId)
    	];

    	return Promise.all(promises)
    	.then(results => {
    		return {
    			tokenMetadata: results[0],
    			tokenHolders: results[1]
    		};
    	});
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