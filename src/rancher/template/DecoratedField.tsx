import * as React from 'react';
import * as Col from 'react-bootstrap/lib/Col';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as HelpBlock from 'react-bootstrap/lib/HelpBlock';
import { Field, WrappedFieldProps } from 'redux-form';

import { required } from '@waldur/core/validators';

import { DecoratedLabel } from './DecoratedLabel';
import { FieldProps } from './types';

interface OwnProps extends FieldProps {
  component: React.ComponentType<WrappedFieldProps>;
}

export const DecoratedField: React.FC<OwnProps> = props => (
  <Col sm={6}>
    <FormGroup>
      <p>
        <DecoratedLabel label={props.label} required={props.required} />
      </p>
      <Field
        name={props.variable}
        component={props.component}
        validate={props.required ? required : undefined}
      />
      <HelpBlock>
        <span className="text-muted">{props.description}</span>
      </HelpBlock>
    </FormGroup>
  </Col>
);
