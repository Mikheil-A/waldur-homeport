// @ngInject
export default function helpRoutes($stateProvider) {
  $stateProvider
    .state('help', {
      url: '/help/',
      abstract: true,
      template: '<customer-workspace></customer-workspace>',
      data: {
        pageTitle: 'Help'
      }
    })

    .state('help.list', {
      url: '',
      templateUrl: 'views/help/list.html',
      auth: true,
      noInitialData: true,
    })

    .state('help.details', {
      url: ':name/',
      templateUrl: 'views/help/details.html',
      auth: true,
      noInitialData: true,
    });
};