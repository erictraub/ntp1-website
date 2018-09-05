app.config(function ($stateProvider) {
    $stateProvider.state('contact', {
        url: '/contact',
        controller: 'ContactController',
        templateUrl: 'js/contact/contact.template.html'
    });
});


app.controller('ContactController', function ($scope) {

});