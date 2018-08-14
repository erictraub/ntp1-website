app.controller('TokenController', function ($scope, AllTokenData) {

	console.log('All Token Data: ', AllTokenData);

	$scope.holders = AllTokenData.tokenHolders.holders;
	setTimeout(function() {
		$('#holders-table').DataTable();
	}, 3000);

});