angular.module('rtfmApp', ['ui.router', 'firebase'])
.constant('fb', {url: 'https://blazing-inferno.firebaseio.com/'})
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/threads')

  $stateProvider
    .state('threads', {
      url: '/threads',
      templateUrl: 'js/views/threads.html',
      controller: 'threadsCtrl',
      resolve: {
        threadsRef: function(threadsService) {
          return threadsService.getThreads();
        }
      }
    })
    .state('thread', {
      url: '/thread/:threadId',
      templateUrl: 'js/views/thread.html',
      controller: 'threadCtrl',
      resolve: {
        threadRef: function(threadsService, $stateParams) {
          return threadsService.getThread($stateParams.threadId)
        },
        commentsRef: function(threadsService, $stateParams) {
          return threadsService.getComments($stateParams.threadId);
        }
      }
    });


})
