import routes from './routes';
import marketplaceLanding from './landing/LandingPageContainer';
import marketplaceCompare from './compare/ComparisonContainer';
import comparisonIndicator from './compare/ComparisonIndicator';
import marketplaceCheckout from './cart/CheckoutPage';
import cartIndicator from './cart/ShoppingCartIndicator';
import marketplaceOffering from './details/DetailsPage';
import marketplaceCategory from './category/CategoryPage';
import marketplaceProviderDetails from './service-providers/CustomerDetailsContainer';
import marketplaceServiceProviderButton from './service-providers/ServiceProviderRegisterButtonContainer';
import marketplaceVendorOfferings from './offerings/OfferingsList';
import marketplaceOfferingCreate from './offerings/create/OfferingCreateContainer';
import marketplaceOfferingUpdate from './offerings/update/OfferingUpdateContainer';
import marketplaceOrdersList from './orders/OrdersList';
import marketplaceOrderItemsList from './orders/OrderItemsContainer';
import marketplaceOrderDetails from './orders/OrderDetailsContainer';
import marketplaceOrderItemDetails from './orders/OrderItemDetailsContainer';
import marketplaceProjectResourcesList from './orders/ProjectResourcesContainer';
import marketplaceOfferingDetailsButton from './orders/OfferingDetailsButton';
import marketplaceOfferingDetailsDialog from './orders/OfferingDetailsDialog';
import marketplaceAttributeFilterListDialog from './category/filters/AttributeFilterListDialog';
import registerExtensionPoint from './extension-point';
import providersService from './providers-service';
import registerSidebarExtension from './sidebar';
import shoppingCartConfig from './shoppingCartConfig';

export default module => {
  module.component('marketplaceLanding', marketplaceLanding);
  module.component('marketplaceCompare', marketplaceCompare);
  module.component('comparisonIndicator', comparisonIndicator);
  module.component('marketplaceCheckout', marketplaceCheckout);
  module.component('cartIndicator', cartIndicator);
  module.component('marketplaceOffering', marketplaceOffering);
  module.component('marketplaceCategory', marketplaceCategory);
  module.component('marketplaceProviderDetails', marketplaceProviderDetails);
  module.component('marketplaceServiceProviderButton', marketplaceServiceProviderButton);
  module.component('marketplaceVendorOfferings', marketplaceVendorOfferings);
  module.component('marketplaceOfferingCreate', marketplaceOfferingCreate);
  module.component('marketplaceOfferingUpdate', marketplaceOfferingUpdate);
  module.component('marketplaceOrdersList', marketplaceOrdersList);
  module.component('marketplaceOrderItemsList', marketplaceOrderItemsList);
  module.component('marketplaceProjectResourcesList', marketplaceProjectResourcesList);
  module.component('marketplaceOrderDetails', marketplaceOrderDetails);
  module.component('marketplaceOrderItemDetails', marketplaceOrderItemDetails);
  module.component('marketplaceAttributeFilterListDialog', marketplaceAttributeFilterListDialog);
  module.component('marketplaceOfferingDetailsButton', marketplaceOfferingDetailsButton);
  module.component('marketplaceOfferingDetailsDialog', marketplaceOfferingDetailsDialog);
  module.service('providersService', providersService);
  module.config(routes);
  module.run(registerSidebarExtension);
  module.run(shoppingCartConfig);
  module.run(registerExtensionPoint);
};
