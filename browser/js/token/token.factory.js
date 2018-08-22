app.factory('TokenFactory', function ($http, NeblioAPIFactory) {

    const TokenFactory = {};

	TokenFactory.getTokenIdFromIdentifier = function(tokenIdentifier) {
		if (tokenIdentifier.length < 8) {
            tokenIdentifier = tokenIdentifier.toUpperCase();
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