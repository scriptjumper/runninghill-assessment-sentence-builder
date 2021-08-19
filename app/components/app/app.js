;(function () {
  angular
    .module('SentenceBuilderApp', ['ngComponentRouter', 'ngRoute'])
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true)
    })
    .value('$routerRootComponent', 'app')
    .component('app', {
      template: '<h1>AngularJS is working!</h1>'
    })
})()
