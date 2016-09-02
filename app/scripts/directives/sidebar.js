'use strict';

(function() {

  angular.module('ncsaas')
    .directive('sidebar', ['$state', '$uibModal', sidebar]);

  function sidebar($state, $uibModal) {
    return {
      restrict: 'E',
      scope: {
        items: '=',
        context: '='
      },
      templateUrl: 'views/directives/sidebar.html',
      link: function(scope) {
        scope.$state = $state;
        scope.selectWorkspace = function() {
          $uibModal.open({
            templateUrl: 'views/directives/select-workspace.html',
            controller: 'SelectWorkspaceController',
            controllerAs: 'Ctrl',
            bindToController: true,
            size: 'lg'
          })
        }
      }
    };
  }

  angular.module('ncsaas')
    .controller('SelectWorkspaceController', [
      '$scope',
      '$rootScope',
      '$uibModal',
      '$state',
      '$q',
      'customersService',
      'projectsService',
      'currentStateService',
      SelectWorkspaceController]);

  function SelectWorkspaceController(
    $scope,
    $rootScope,
    $uibModal,
    $state,
    $q,
    customersService,
    projectsService,
    currentStateService
  ) {
    var ctrl = this;
    ctrl.organizations = [];
    ctrl.projects = [];
    ctrl.selectedOrganization = {};
    ctrl.selectedProject = {};

    ctrl.selectOrganization = function(organization) {
      ctrl.$close();
      $state.go('organizations.details.events', {
        uuid: organization.uuid
      });
    };

    ctrl.selectProject = function(project) {
      ctrl.$close();
      $state.go('projects.details.events', {
        uuid: project.uuid
      });
    };

    ctrl.createOrganization = function() {
      ctrl.$close();
      $uibModal.open({
        templateUrl: 'views/customer/edit-dialog.html',
        controller: 'CustomerEditDialogController'
      });
    }

    ctrl.createProject = function() {
      ctrl.$close();
      $state.go('projects.create');
    }

    function loadInitial() {
      return $q.all([
        currentStateService.getCustomer().then(function(organization) {
          ctrl.organizations.unshift(organization);
          ctrl.selectedOrganization = organization;
        }),

        currentStateService.getProject().then(function(project) {
          ctrl.selectedProject = project;
        }),

        customersService.getAll({
          field: ['name', 'uuid', 'projects']
        }).then(function(organizations) {
          ctrl.organizations = ctrl.organizations.concat(organizations.filter(function(organization) {
            return organization.uuid !== ctrl.selectedOrganization.uuid;
          }));
        })
      ]);
    }

    ctrl.loadingOrganizations = true;
      loadInitial().finally(function() {
      ctrl.loadingOrganizations = false;
    });
  }
})();
