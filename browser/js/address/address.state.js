app.config(function ($stateProvider) {

    $stateProvider.state('address', {
        url: '/address/:address',
        controller: 'AddressController',
        templateUrl: 'js/address/address.template.html',
        resolve: {
        	AllAddressData: function($stateParams, AddressFactory) {
                return AddressFactory.getNTP1AddressInfoAndTxData($stateParams.address);
                
            }
        }
    });

});