// @ngInject
export default function issuesService(baseServiceClass) {
  var ServiceClass = baseServiceClass.extend({
    init: function() {
      this._super();
      this.endpoint = '/waldur-issues/';
      this.filterByCustomer = false;
    },
    setDefaultFilter: function() {
      // New issues come first
      this.defaultFilter = {o: '-created'};
    },
    createIssue: function(instance) {
      var issue = this.$create();
      angular.extend(issue, instance);
      return issue.$save();
    }
  });
  return new ServiceClass();
}
