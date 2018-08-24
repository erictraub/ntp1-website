app.config(function ($stateProvider) {

    $stateProvider.state('address', {
        url: '/address/:address',
        controller: 'AddressController',
        templateUrl: 'js/address/address.template.html',
        resolve: {
        	AllAddressData: function($stateParams, AddressFactory, NeblioAPIFactory) {
                let allInfo = {};
                return AddressFactory.getNTP1AddressInfoAndTxData($stateParams.address)
                .then(addrInfo => {
                    allInfo = addrInfo;
                    const tokenIds = [];
                    allInfo.utxoTxData.forEach(obj => {
                        if (obj.tokenId) tokenIds.push(obj.tokenId);
                    });
                    return NeblioAPIFactory.getTokenMetadataForArrayOfTokenIds(tokenIds);
                }).then(tokensArray => {
                    const tokensObj = {};
                    tokensArray.forEach(token => {
                        tokensObj[token.tokenId] = token;
                    });
                    allInfo.tokensData = tokensObj;

                    // get token blances
                    const tokenBalancesObj = AddressFactory.getTokenBalancesFromUtxoArray(allInfo.utxoTxData, $stateParams.address);
                    allInfo.tokenBalances = tokenBalancesObj;

                    return allInfo;
                });
            }
        }
    });

});