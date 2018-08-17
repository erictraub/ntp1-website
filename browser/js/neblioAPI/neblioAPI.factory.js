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

    NeblioAPIFactory.fetchNTP1AddressInfo = function(address) {
		return $http.get(`/api/neblioAPI/address/${address}/ntp1/info`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchAddressInsightsData = function(address) {
		return $http.get(`/api/neblioAPI/ins/address/${address}`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchNTP1TransactionInfo = function(txId) {
		return $http.get(`/api/neblioAPI/ntp1/tx/${txId}`)
		.then(function(response) {
			let txData = response.data;
			txData.displayTime = new Date(txData.time);
			
			let totalInput = 0;
			let tokenId = null;
			let tokenAmount = 0;
			txData.vin.forEach(obj => {
				totalInput += obj.value;
				if (obj.tokens.length) {
					obj.tokens.forEach(tokenObj => {
						if (tokenObj.tokenId) tokenId = tokenObj.tokenId;
						if (tokenObj.amount) tokenAmount = tokenObj.amount;
					});
				};
			});

			let totalOutput = 0;
			txData.vout.forEach(obj => {
				totalOutput += obj.value;
			});

			let fromAddresses = [];
			txData.vin.forEach(vinObj => {
				vinObj.previousOutput.addresses.forEach(address => {
					fromAddresses.push(address);
				});
			});

			let receivingAddresses = [];
			txData.vout.forEach(voutObj => {
				if (voutObj.scriptPubKey.addresses) voutObj.scriptPubKey.addresses.forEach(address => {
					receivingAddresses.push(address);
				});
			});

			txData.totalInput = totalInput / 10000000;
			txData.totalOutput = totalOutput / 10000000;
			txData.tokenId = tokenId;
			txData.tokenAmount = tokenAmount;
			txData.fromAddresses = fromAddresses;
			txData.receivingAddresses = receivingAddresses;

			return txData;
		});
    };


    return NeblioAPIFactory;

});