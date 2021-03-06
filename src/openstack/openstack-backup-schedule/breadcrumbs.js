import { getUUID } from '@waldur/core/utils';

import { getInstanceListState } from '../utils';

// @ngInject
export default function breadcrumbsConfig(ResourceBreadcrumbsService) {
  ResourceBreadcrumbsService.register(
    'OpenStackTenant.BackupSchedule',
    resource => {
      const instance_uuid = getUUID(resource.instance);
      return [
        getInstanceListState(resource.project_uuid),
        {
          label: resource.instance_name,
          state: 'resources.details',
          params: {
            uuid: instance_uuid,
            resource_type: 'OpenStackTenant.Instance',
          },
        },
        {
          label: gettext('Backup schedules'),
          state: 'resources.details',
          params: {
            uuid: instance_uuid,
            resource_type: 'OpenStackTenant.Instance',
            tab: 'backup_schedules',
          },
        },
      ];
    },
  );
}
