app.factory('NeblioAPIFactory', function ($http) {

    const NeblioAPIFactory = {};

    NeblioAPIFactory.fetchTokenMetaData = function(tokenId) {
		return $http.get(`/api/neblioAPI/token/${tokenId}/metadata`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchTokenMetaDataUTXO = function(tokenId, utxo) {
		return $http.get(`/api/neblioAPI/token/${tokenId}/utxo/${utxo}/metadata`)
		.then(function(response) {
			let metadata = response.data;
			metadata.metadataOfIssuence.data.urls.forEach(urlObj => {
				if (urlObj.name === "icon") metadata.iconUrl = urlObj.url;
			});
			return metadata;
		});
    };

    NeblioAPIFactory.fetchTokenId = function(tokenSymbol) {
		return $http.get(`/api/neblioAPI/token/${tokenSymbol}/tokenId`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchTokenHolders = function(tokenId) {
    	return $http.get(`/api/neblioAPI/token/${tokenId}/holders`)
		.then(function(response) {
			let data = response.data;
			data.holders = data.holders.sort((a, b) => b.amount - a.amount);
			
			let totalTokenCount = 0;
			data.holders.forEach(holder => {
				totalTokenCount += holder.amount;
			});

			data.holders.forEach(holder => {
				holder.percentage = holder.amount / totalTokenCount;
			});

			return data;
		});
    };


    return NeblioAPIFactory;

});