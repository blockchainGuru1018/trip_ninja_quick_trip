import React from 'react';
import Button from '@material-ui/core/Button';

class PricingRequest extends React.Component {

  render() {
    return (
      <div className="float-right">
        <Button
          color="primary"
          variant="contained">
          Continue to Price Confirm
        </Button>
      </div>
    );
  }
}

export default PricingRequest;
