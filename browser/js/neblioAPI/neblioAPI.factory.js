app.factory('NeblioAPIFactory', function ($http) {

    const NeblioAPIFactory = {};

    NeblioAPIFactory.fetchTokenMetaData = function(tokenId) {
		return $http.get(`/api/neblioAPI/token/${tokenId}/metadata`)
		.then(function(response) {
			return response.data;
		});
    };

    NeblioAPIFactory.fetchTokenId = function(tokenSymbol) {
		return $http.get(`/api/neblioAPI/token/${tokenSymbol}/tokenId`)
		.then(function(response) {
			return response.data;
		});
    };


    return NeblioAPIFactory;

});