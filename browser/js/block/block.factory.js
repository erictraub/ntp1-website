app.factory('BlockFactory', function ($http, NeblioAPIFactory) {

    const BlockFactory = {};

	BlockFactory.getBlockHashFromIdentifier = function(blockIdentifier) {
		if (blockIdentifier.length < 14) {
            const blockIndex = Number(blockIdentifier);
			return NeblioAPIFactory.fetchBlockHashByIndex(blockIndex)
			.then(data => {
				return data.blockHash;
			});
		} else {
			return new Promise((resolve, reject) => {
				resolve(blockIdentifier);
			});
		}
	};

	BlockFactory.getAllBlockData = function(blockHash) {
		let blockData = {};
		return NeblioAPIFactory.fetchBlockByHash(blockHash)
		.then(block => {
			blockData = block;
			return BlockFactory.fetchNTP1TxInfoForArray(blockData.tx);
		})
		.then(txInfoArray => {
			blockData.txInfo = txInfoArray;
			const promises = [];
			blockData.txInfo.forEach(txObj => {
				if (txObj.tokenId) promises.push(NeblioAPIFactory.fetchAllTokenMetaData(txObj.tokenId));
			});
			return Promise.all(promises)
		}).then(results => {
			blockData.allTokensMetadata = {};
			results.forEach(result => {
				blockData.allTokensMetadata[result.tokenId] = result;
			});
			return blockData;
		});
	};

	BlockFactory.fetchNTP1TxInfo = function(txId) {
		return NeblioAPIFactory.fetchNTP1TransactionInfo(txId);
	};

	BlockFactory.fetchNTP1TxInfoForArray = function(txIdArray) {
		const promises = [];
		txIdArray.forEach(txId => {
			promises.push(BlockFactory.fetchNTP1TxInfo(txId));
		});

		return Promise.all(promises);
	};

    return BlockFactory;

});