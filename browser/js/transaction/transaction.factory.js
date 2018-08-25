app.factory('TransactionFactory', function ($http) {

    const TransactionFactory = {};

	TransactionFactory.getDisplayTime = function(timeMS) {
		const d = new Date(timeMS);
		const month = d.getMonth() + 1;
		const day = d.getDay();
		const year = d.getFullYear();
		const hour = d.getHours();
		const minute = d.getMinutes();
		const second = d.getSeconds();
		return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
	}

	TransactionFactory.formatUtxosAsTransactionsAndBalances = function(utxosArray) {
		const allTokenIds = [];
		const tokenBalancesObj = {};
		utxosArray.forEach(txObj => {
			txObj.displayData = {};
			if (txObj.tokens.length) {
				txObj.displayData.txType = 'NTP1';
				txObj.displayData.tokenId = txObj.tokens[0].tokenId;
				txObj.displayData.tokenAmount = txObj.tokens[0].amount;
				// for token balances
				if (!tokenBalancesObj[txObj.displayData.tokenId]) tokenBalancesObj[txObj.displayData.tokenId] = 0;
				tokenBalancesObj[txObj.displayData.tokenId] += txObj.displayData.tokenAmount;
				// for tokenIds array
				if (allTokenIds.indexOf(txObj.displayData.tokenId) < 0) allTokenIds.push(txObj.displayData.tokenId);
			} else {
				txObj.displayData.txType = 'NEBL';
			}
			txObj.displayData.displayTime = TransactionFactory.getDisplayTime(txObj.blocktime);
			txObj.blockHeight = txObj.blockheight;
		});

		const tokenBalancesArray = [];
		for (var key in tokenBalancesObj) {
			tokenBalancesArray.push({ tokenId: key, tokenBalance: tokenBalancesObj[key] })
		};

		return {
			utxosArray: utxosArray,
			allTokenIds: allTokenIds,
			tokenBalances: tokenBalancesArray
		};
	};

    return TransactionFactory;

});