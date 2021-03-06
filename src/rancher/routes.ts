import { withStore } from '@waldur/store/connect';

import { CatalogTemplatesList } from './template/CatalogTemplateList';
import { TemplateDetail } from './template/TemplateDetail';

export const states = [
  {
    name: 'rancher-catalog-details',
    url: 'rancher-catalog-details/:clusterUuid/:catalogUuid/',
    component: withStore(CatalogTemplatesList),
    parent: 'project',
  },
  {
    name: 'rancher-template-details',
    url: 'rancher-template-details/:clusterUuid/:templateUuid/',
    component: withStore(TemplateDetail),
    parent: 'project',
  },
];

export default function registerRoutes($stateProvider) {
  states.forEach(({ name, ...rest }) => $stateProvider.state(name, rest));
}
registerRoutes.$inject = ['$stateProvider'];
