app.config(function ($stateProvider) {

    $stateProvider.state('block', {
        url: '/block/:blockIdentifier',
        controller: 'BlockController',
        templateUrl: 'js/block/block.template.html',
        resolve: {
        	BlockData: function($stateParams, BlockFactory) {
                return BlockFactory.getBlockHashFromIdentifier($stateParams.blockIdentifier)
                .then(blockHash => {
                    return BlockFactory.getAllBlockData(blockHash);
                });
            }
        }
    });

});