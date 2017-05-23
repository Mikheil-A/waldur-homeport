import gravatarServiceProviderConfig from './avatar-config';
import ENV from './base-config';
import translateProvider from './i18n-config';
import resourceProvider from './resource-config';

export function configModule(module) {
  module.constant('ENV', ENV);
  module.config(translateProvider);
  module.config(resourceProvider);
}

export function gravatarModule(module) {
  module.config(gravatarServiceProviderConfig);
}
