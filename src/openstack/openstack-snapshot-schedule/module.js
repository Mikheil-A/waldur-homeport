import * as ResourceSummary from '@waldur/resource/summary/registry';

import breadcrumbsConfig from './breadcrumbs';
import { OpenStackSnapshotScheduleSummary } from './OpenStackSnapshotScheduleSummary';
import './tabs';

// @ngInject
function actionConfig(ActionConfigurationProvider) {
  ActionConfigurationProvider.register('OpenStackTenant.SnapshotSchedule', {
    order: ['update', 'activate', 'deactivate', 'destroy'],
    options: {
      update: {
        title: gettext('Edit'),
        successMessage: gettext('Snapshot schedule has been updated.'),
        fields: {
          schedule: {
            type: 'crontab',
          },
          timezone: {
            type: 'timezone',
          },
        },
      },
    },
  });
}

// @ngInject
function stateConfig(ResourceStateConfigurationProvider) {
  ResourceStateConfigurationProvider.register(
    'OpenStackTenant.SnapshotSchedule',
    {
      error_states: ['error'],
    },
  );
}

export default module => {
  ResourceSummary.register(
    'OpenStackTenant.SnapshotSchedule',
    OpenStackSnapshotScheduleSummary,
  );
  module.config(actionConfig);
  module.run(breadcrumbsConfig);
  module.config(stateConfig);
};
