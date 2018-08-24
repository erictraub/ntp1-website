app.factory('AddressFactory', function ($http, NeblioAPIFactory) {

    const AddressFactory = {};

    AddressFactory.getNTP1AddressInfoAndTxData = function(address) {
    	let allUtxosData = {};
    	return NeblioAPIFactory.fetchNTP1AddressInfo(address)
    	.then(addressInfo => {
    		allUtxosData = addressInfo;
    		const utxoArray = addressInfo.utxos;
    		const promises = [];
    		utxoArray.forEach(utxoObj => {
    			promises.push(NeblioAPIFactory.fetchNTP1TransactionInfo(utxoObj.txid));
    		});
    		return Promise.all(promises);
    	}).then(results => {
    		return { allUtxosData: allUtxosData, utxoTxData: results };
    	});
    };

    AddressFactory.getTokenBalancesFromUtxoArray = function(utxoArray, address) {
        const balancesObj = {};
        utxoArray.forEach(utxo => {
            if (utxo.tokenTxInfo.tokenId && utxo.tokenTxInfo.toAddress === address) {
                if (!balancesObj[utxo.tokenTxInfo.tokenId]) balancesObj[utxo.tokenTxInfo.tokenId] = 0;
                balancesObj[utxo.tokenTxInfo.tokenId] += utxo.tokenTxInfo.amount;
            }
        });
        return balancesObj;
    };

    return AddressFactory;

});