;(function () {
  angular
    .module('SentenceBuilderApp', ['ngComponentRouter', 'ngRoute', 'app.welcome', 'app.builder'])
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true)
    })
    .value('$routerRootComponent', 'app')
    .component('app', {
      template: '<main class="container"><ng-outlet></ng-outlet></main>',
      $routeConfig: [
        { path: '/', component: 'welcome', name: 'Welcome' },
        { path: '/builder', component: 'builder', name: 'Builder' }
      ]
    })
})()
