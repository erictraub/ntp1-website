app.config(function ($stateProvider) {

    $stateProvider.state('transaction', {
        url: '/transaction',
        controller: 'TransactionController',
        templateUrl: 'js/transaction/transaction.template.html'
    });

});