import authActivation from './auth-activation';
import authButtonText from './auth-button-text';
import initAuthProvider from './auth-config';
import { authInit } from './auth-init';
import { authLogin } from './auth-login';
import { AuthService } from './auth-service';
import callbacksModule from './callbacks/module';
import interceptorModule from './interceptor';
import poweredBy from './powered-by';
import authRoutes from './routes';
import saml2Module from './saml2/module';
import storeLastState from './store-state';
import UserSettings from './user-settings';
import valimoModule from './valimo/module';
import './events';

export default module => {
  module.service('authService', AuthService);
  module.component('authButtonText', authButtonText);
  module.component('authLogin', authLogin);
  module.component('poweredBy', poweredBy);
  module.component('authInit', authInit);
  module.directive('authActivation', authActivation);
  module.config(authRoutes);
  module.config(initAuthProvider);
  interceptorModule(module);
  callbacksModule(module);
  saml2Module(module);
  valimoModule(module);
  module.service('UserSettings', UserSettings);
  module.run(storeLastState);
};
