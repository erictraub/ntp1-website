app.factory('TransactionFactory', function ($http) {

    const TransactionFactory = {};

	TransactionFactory.getDisplayTime = function(timeMS) {
		const d = new Date(timeMS);
		const month = d.getMonth() + 1;
		const day = d.getDay();
		const year = d.getFullYear();
		const hour = d.getHours();
		const minute = d.getMinutes();
		const second = d.getSeconds();
		return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
	}

    return TransactionFactory;

});