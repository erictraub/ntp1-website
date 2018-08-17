app.config(function ($stateProvider) {

    $stateProvider.state('transaction', {
        url: '/tx/:txId',
        controller: 'TransactionController',
        templateUrl: 'js/transaction/transaction.template.html',
        resolve: {
        	TxInfo: function($stateParams, NeblioAPIFactory) {
                return NeblioAPIFactory.fetchNTP1TransactionInfo($stateParams.txId);
            }
        }
    });

});