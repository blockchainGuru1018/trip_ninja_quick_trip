import React from 'react';
import { Errors } from '../CommonInterfaces';

interface PricingErrorModalProps {
  errors: Errors;
}

class PricingErrorModal extends React.Component<PricingErrorModalProps> {
  render() {
    return (
      <div>
        {this.props.errors.errorFound
          ? <div></div>
          : ''
        }
      </div>
    );
  }
}

export default PricingErrorModal;