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

    return AddressFactory;

});