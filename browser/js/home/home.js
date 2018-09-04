app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'js/home/home.html',
        resolve: {
            PopularTokens: function(NeblioAPIFactory) {
                return NeblioAPIFactory.fetchPopularTokens();
            },
            LatestBlock: function(NeblioAPIFactory) {
                return NeblioAPIFactory.fetchLatestBlock()
                .then(latestBlockData => {
                    return NeblioAPIFactory.fetchBlockByHash(latestBlockData.lastblockhash);
                });
            }
        }
    });
});


app.controller('HomeController', function ($scope, PopularTokens, LatestBlock) {
	$scope.PopularTokens = PopularTokens;
    $scope.LatestBlock = LatestBlock;
    console.log('LatestBlock', LatestBlock);
});