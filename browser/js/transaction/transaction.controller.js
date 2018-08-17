app.controller('TransactionController', function ($scope, TxInfo) {
	console.log('TxInfo: ', TxInfo);
	$scope.txInfo = TxInfo;
});