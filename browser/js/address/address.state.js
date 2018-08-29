app.config(function ($stateProvider) {

    $stateProvider.state('address', {
        url: '/address/:address',
        controller: 'AddressController',
        templateUrl: 'js/address/address.template.html',
        resolve: {
        	AddressInfo: function($stateParams, NeblioAPIFactory, TransactionFactory) {
                let utxoTxsAndData = {};
                return NeblioAPIFactory.fetchNTP1AddressInfo($stateParams.address)
                .then(data => {
                    utxoTxsAndData = TransactionFactory.formatUtxosAsTransactionsAndBalances(data.utxos);
                    const tokenPromises = [];
                    utxoTxsAndData.allTokenIds.forEach(id => {
                        tokenPromises.push(NeblioAPIFactory.fetchAllTokenMetaData(id));
                    });
                    return Promise.all(tokenPromises);
                }).then(tokensData => {
                    const tokensDataObject = {};
                    tokensData.forEach(token => {
                        tokensDataObject[token.tokenId] = token;
                    });
                    utxoTxsAndData.tokensDataObject = tokensDataObject;
                    return NeblioAPIFactory.fetchAddressInsightsData($stateParams.address);
                }).then(addressInsights => {
                    utxoTxsAndData.addressInsights = addressInsights;
                    return utxoTxsAndData;
                });
            }
        }
    });

});