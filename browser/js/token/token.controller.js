app.controller('TokenController', function ($scope, AllTokenData) {

	console.log('All Token Data: ', AllTokenData);

	$scope.tokenMetadata = AllTokenData.tokenMetadata;
	$scope.utxoMetadata = AllTokenData.utxoMetadata;
	$scope.holders = AllTokenData.tokenHolders.holders;
	setTimeout(function() {
		$('#holders-table').DataTable();
	}, 0);

});