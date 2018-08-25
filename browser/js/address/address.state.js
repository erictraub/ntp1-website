app.config(function ($stateProvider) {

    $stateProvider.state('address', {
        url: '/address/:address',
        controller: 'AddressController',
        templateUrl: 'js/address/address.template.html',
        resolve: {
        	AddressInfo: function($stateParams, NeblioAPIFactory, TransactionFactory) {
                return NeblioAPIFactory.fetchNTP1AddressInfo($stateParams.address)
                .then(data => {
                    const utxoTxsAndData = TransactionFactory.formatUtxosAsTransactionsAndBalances(data.utxos);
                    return utxoTxsAndData;
                })
            }
        }
    });

});