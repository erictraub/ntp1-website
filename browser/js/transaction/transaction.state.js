app.config(function ($stateProvider) {

    $stateProvider.state('transaction', {
        url: '/tx/:txId',
        controller: 'TransactionController',
        templateUrl: 'js/transaction/transaction.template.html',
        resolve: {
        	TxInfo: function($stateParams, NeblioAPIFactory) {
                let allTxInfo;
                return NeblioAPIFactory.fetchNTP1TransactionInfo($stateParams.txId)
                .then(txInfo => {
                    allTxInfo = txInfo;
                    return NeblioAPIFactory.fetchAllTokenMetaData(txInfo.tokenId)
                }).then(tokenMetadata => {
                    allTxInfo.tokenMetadata = tokenMetadata;
                    return allTxInfo;
                });
            }
        }
    });

});