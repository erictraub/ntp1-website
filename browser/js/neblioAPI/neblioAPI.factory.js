app.factory('NeblioAPIFactory', function ($http, TransactionFactory) {

    const NeblioAPIFactory = {};

    NeblioAPIFactory.fetchAllTokenMetaData = function(tokenId) {
		return $http.get(`/api/neblioAPI/token/${tokenId}/metadata`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.getTokenMetadataForArrayOfTokenIds = function(tokenIdArray) {
    	const promises = [];
    	tokenIdArray.forEach(id => {
    		promises.push(NeblioAPIFactory.fetchAllTokenMetaData(id));
    	});
    	return Promise.all(promises);
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
			if (!txData.vin.length || !txData.vout.length) throw "No data for transaction searched.";

			txData.displayTime = TransactionFactory.getDisplayTime(txData.time);
			let totalInput = 0;
			let tokenId = null;
			let tokenAmount = 0;
			txData.vin.forEach(obj => {
				totalInput += obj.value;
				if (obj.tokens && obj.tokens.length) {
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
				if (vinObj.previousOutput) vinObj.previousOutput.addresses.forEach(address => {
					fromAddresses.push(address);
				});
			});

			let receivingAddresses = [];
			txData.vout.forEach(voutObj => {
				if (voutObj.scriptPubKey.addresses) voutObj.scriptPubKey.addresses.forEach(address => {
					receivingAddresses.push(address);
				});
			});

			let tokenTxInfo = {};
			txData.vin.forEach(vinObj => {
				if (vinObj.tokens && vinObj.tokens.length) {
					vinObj.tokens.forEach(tokenObj => {
						// tokenTxInfo.amount = tokenObj.amount;
						// tokenTxInfo.tokenId = tokenObj.tokenId;
						tokenTxInfo.fromAddress = vinObj.previousOutput.addresses[0];
					});
				}
			});
			txData.vout.forEach(voutObj => {
				if (voutObj.tokens && voutObj.tokens.length) {
					voutObj.tokens.forEach(tokenObj => {
						tokenTxInfo.amount = tokenObj.amount;
						tokenTxInfo.tokenId = tokenObj.tokenId;
						tokenTxInfo.toAddress = voutObj.scriptPubKey.addresses[0];
					});
				}
			});

			txData.totalInput = totalInput / 10000000;
			txData.totalOutput = totalOutput / 10000000;
			txData.tokenId = tokenId;
			txData.tokenAmount = tokenAmount;
			txData.fromAddresses = fromAddresses;
			txData.receivingAddresses = receivingAddresses;
			txData.tokenTxInfo = tokenTxInfo;

			return txData;
		});
    };

    NeblioAPIFactory.fetchBlockByHash = function(blockHash) {
		return $http.get(`/api/neblioAPI/ins/block/${blockHash}`)
		.then(function(response) {
			let blockData = response.data;
			blockData.displayTime = TransactionFactory.getDisplayTime(blockData.time * 1000);
			return blockData;
		});
    };

    NeblioAPIFactory.fetchBlockHashByIndex = function(blockIndex) {
		return $http.get(`/api/neblioAPI/ins/block/index/${blockIndex}`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchAllTransactionsForAddress = function(address) {
    	return $http.get(`/api/neblioAPI/ins/address/${address}/transactions`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchLatestBlock = function() {
    	return $http.get(`/api/neblioAPI/block/latest`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchLatestBlocks = function() {
    	return $http.get(`/api/neblioAPI/block-list/latest`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchPopularTokens = function() {
    	return $http.get(`/api/neblioAPI/tokens/popular`)
		.then(function(response) {
			return response.data;
		});
    };


    return NeblioAPIFactory;

});