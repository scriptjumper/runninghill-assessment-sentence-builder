;(function () {
  angular.module('app.welcome', []).component('welcome', {
    templateUrl: 'app/pages/welcome/welcome.html',
    controllerAs: '$ctrl',
    controller: [
      function () {
        var $ctrl = this

        $ctrl.welcomeHeading = 'Ready to build sentences?'
      }
    ]
  })
})()
