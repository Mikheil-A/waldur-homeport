'use strict';

(function() {
  angular.module('ncsaas')
    .service('baseServiceListController', [
      'baseControllerListClass',
      'ENTITYLISTFIELDTYPES',
      'customerPermissionsService',
      'usersService',
      'joinService',
      baseServiceListController]);

  // need for service tab
  function baseServiceListController(
    baseControllerListClass,
    ENTITYLISTFIELDTYPES,
    customerPermissionsService,
    usersService,
    joinService
    ) {
    var ControllerListClass = baseControllerListClass.extend({
      init: function() {
        this.service = joinService;
        this._super();
        this.searchFieldName = 'name';
        this.canUserAddService();
        this.actionButtonsListItems = [
          {
            title: 'Remove',
            clickFunction: this.remove.bind(this.controllerScope)
          }
        ];
        this.entityOptions = {
          entityData: {
            noDataText: 'No services yet.',
            createLink: 'services.create',
            createLinkText: 'Create service',
          },
          list: [
            {
              name: 'Name',
              propertyName: 'name',
              type: ENTITYLISTFIELDTYPES.name,
              link: 'services.details({uuid: entity.uuid, provider: entity.provider})',
              className: 'name'
            }
          ]
        };
      },

      canUserAddService: function() {
        var vm = this;
        usersService.getCurrentUser().then(function(user) {
          /*jshint camelcase: false */
          if (user.is_staff) {
            vm.canUserAddService = true;
          }
          customerPermissionsService.userHasCustomerRole(user.username, 'owner').then(function(hasRole) {
            vm.canUserAddService = hasRole;
          });
        });
      }
    });

    return ControllerListClass;
  }

  angular.module('ncsaas')
    .controller('ServiceListController',
      ['baseServiceListController', ServiceListController]);

  function ServiceListController(baseServiceListController) {
    var controllerScope = this;
    var ServiceController = baseServiceListController.extend({
      init:function() {
        this.controllerScope = controllerScope;
        this._super();

      }
    });

    controllerScope.__proto__ = new ServiceController();
  }

})();

(function() {
  angular.module('ncsaas')
    .controller('ServiceAddController', [
      'servicesService',
      'joinServiceProjectLinkService',
      'joinService',
      'currentStateService',
      'projectsService',
      'baseControllerClass',
      '$q',
      '$state',
      '$rootScope',
      ServiceAddController]);

  function ServiceAddController(
    servicesService,
    joinServiceProjectLinkService,
    joinService,
    currentStateService,
    projectsService,
    baseControllerClass,
    $q,
    $state,
    $rootScope) {
    var controllerScope = this;
    var ServiceController = baseControllerClass.extend({
      init: function() {
        this.controllerScope = controllerScope;
        this.setSignalHandler('currentCustomerUpdated', this.activate.bind(this));
        this._super();
        this.activate();
      },
      categories: [
        {
          name: 'Virtual machines',
          services: ['Amazon', 'Azure', 'DigitalOcean', 'OpenStack'],
        },
        {
          name: 'Applications',
          services: ['Oracle', 'GitLab']
        }
      ],
      setService: function(service) {
        this.service = service;
        this.service.serviceName = service.name;
        this.errors = {};
      },
      setCategory: function(category) {
        this.category = category;
        this.categoryServices = [];
        for (var i = 0; i < category.services.length; i++) {
          var name = category.services[i];
          var service = this.services[name];
          this.categoryServices.push(service);
        }
        this.setService(this.categoryServices[0]);
      },
      activate: function() {
        var vm = this;
        currentStateService.getCustomer().then(function(customer) {
          vm.customer = customer;
        });
        servicesService.getServicesOptions().then(function(services) {
          vm.services = services;
          vm.setCategory(vm.categories[0]);
        });
      },

      save: function() {
        var vm = this;
        this.createService(vm.service).then(function() {
          vm.flashMessage('info', 'Provider has been created');
          $state.go('services.list');
        }, function(response) {
          vm.errors = response.data;
        });
      },

      cancel: function() {
        $state.go('services.list');
      },

      createService: function(service) {
        var options = this.prepareServiceOptions(service);
        var vm = this;
        return joinService.createService(service.url, options).success(function() {
          vm.errors = {};
        }).error(function(errors) {
          vm.errors = errors;
        });
      },

      prepareServiceOptions: function(service){
        var result = {};
        for (var i = 0; i < service.options.length; i++) {
          var option = service.options[i];
          if (option.value) {
            result[option.key] = option.value;
          }
          result['customer'] = this.customer.url;
          result['name'] = service.serviceName;
        }
        return result;
      },

      connectServiceWithProjects: function(service) {
        var vm = this;
        return projectsService.getList().then(function(response) {
          var promises = [];
          for (var i = 0; response.length > i; i++) {
            promises.push(joinServiceProjectLinkService.add(response[i], service.url));
          }
          return $q.all(promises).then(function() {
            $rootScope.$broadcast('refreshProjectList');
          });
        });
      }
    });

    controllerScope.__proto__ = new ServiceController();
  }

})();

(function() {
  angular.module('ncsaas')
    .controller('ServiceDetailUpdateController',
      ['baseControllerClass', 'joinService', '$stateParams', '$state', ServiceDetailUpdateController]);

  function ServiceDetailUpdateController(baseControllerClass, joinService, $stateParams, $state) {
    var controllerScope = this;
    var Controller = baseControllerClass.extend({
      service: null,
      activeTab: 'projects',

      init:function() {
        this._super();
        this.activate();
      },
      activate:function() {
        var vm = this;
        joinService.$get($stateParams.provider, $stateParams.uuid).then(function(response) {
          vm.service = response;
        });
      },
      remove:function() {
        if (confirm('Are you sure you want to delete service?')) {
          this.service.$delete(
            function() {
              $state.go('services.list');
            },
            function(errors) {
              alert(errors.data.detail);
            }
          );
        }
      }
    });

    controllerScope.__proto__ = new Controller();
  }
})();

(function() {
  angular.module('ncsaas')
    .controller('ServiceProjectTabController', [
      '$stateParams',
      'joinService',
      'baseControllerClass',
      'joinServiceProjectLinkService',
      ServiceProjectTabController
    ]);

  function ServiceProjectTabController(
    $stateParams,
    joinService,
    baseControllerClass,
    joinServiceProjectLinkService) {
    var controllerScope = this;
    var Controller = baseControllerClass.extend({
      service: null,
      serviceProjects: [],

      init: function() {
        this._super();
        this.activate();
      },
      activate: function() {
        var vm = this;
        joinService.$get($stateParams.provider, $stateParams.uuid).then(function(response) {
          vm.service = response;
          vm.getServiceProjects();
        });
      },
      getServiceProjects: function() {
        var vm = this;
        joinServiceProjectLinkService.getList({'service': vm.service}).then(function(response) {
          vm.serviceProjects = response;
        });
      }
    });

    controllerScope.__proto__ = new Controller();
  }
})();
