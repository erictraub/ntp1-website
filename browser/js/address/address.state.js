app.config(function ($stateProvider) {

    $stateProvider.state('address', {
        url: '/address/:address',
        controller: 'AddressController',
        templateUrl: 'js/address/address.template.html',
        resolve: {
        	AllAddressData: function($stateParams, NeblioAPIFactory) {
                const promises = [ 
                    NeblioAPIFactory.fetchNTP1AddressInfo($stateParams.address)
                    // NeblioAPIFactory.fetchAddressInsightsData($stateParams.address)
                ];
                
                return Promise.all(promises)
                .then(results => {
                    return results;
                });
            }
        }
    });

});