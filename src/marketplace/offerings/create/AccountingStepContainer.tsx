import { connect } from 'react-redux';
import { compose } from 'redux';

import { withTranslation } from '@waldur/i18n';
import { showComponentsList } from '@waldur/marketplace/common/registry';

import { removeOfferingComponent, removeOfferingQuotas } from '../store/actions';
import { getType, getOfferingComponents } from '../store/selectors';
import { AccountingStep } from './AccountingStep';

const mapStateToProps = state => {
  const type = getType(state);
  const showComponents = type && showComponentsList(type);
  const builtinComponents = getOfferingComponents(state, type);
  return {showComponents, type, builtinComponents};
};

const mapStateToDispatch = {
  removeOfferingComponent,
  removeOfferingQuotas,
};

const connector = compose(connect(mapStateToProps, mapStateToDispatch), withTranslation);

export const AccountingStepContainer = connector(AccountingStep);
