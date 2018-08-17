app.factory('TokenFactory', function ($http, NeblioAPIFactory) {

    const TokenFactory = {};

    TokenFactory.getAllTokenDataById = function(tokenId) {
        const tokenData = {};

    	const promises = [
    		NeblioAPIFactory.fetchTokenMetaData(tokenId),
    		NeblioAPIFactory.fetchTokenHolders(tokenId)
    	];

    	return Promise.all(promises)
    	.then(results => {
            tokenData.tokenMetadata = results[0];
            tokenData.tokenHolders = results[1];
            return NeblioAPIFactory.fetchTokenMetaDataUTXO(tokenId, tokenData.tokenMetadata.someUtxo);
    	})
        .then(utxoMetadata => {
            tokenData.utxoMetadata = utxoMetadata;
            return tokenData;
        });
    };

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