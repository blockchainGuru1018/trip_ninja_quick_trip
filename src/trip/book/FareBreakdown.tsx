import React from 'react';
import {PricingDetails} from "../results/PricingInterfaces";
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';

interface FareBreakdownProps {
    pricingDetails: PricingDetails;
}

class FareBreakdown extends React.Component<FareBreakdownProps> {

  render() {
    const pricing = this.props.pricingDetails.pricing!;
    return (
      <div>
        <h5>Fare Breakdown</h5>
        <div className="book-container standard-text">
          <div className="row">
            <div className="col-sm-8 fare-breakdown-text">
              <p>Air Transportation Charges</p>
            </div>
            <div className="col-sm-4 fare-breakdown-price">
              <p>{this.formatPrice(pricing.base_fare)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 fare-breakdown-text">
              <p>Taxes and Fees</p>
            </div>
            <div className="col-sm-4 fare-breakdown-price">
              <p>{this.formatPrice(pricing.taxes+pricing.fees)}</p>
            </div>
          </div>
          <div className="row text-bold fare-breakdown-total">
            <div className="col-sm-8 fare-breakdown-text">
              <p>Total</p>
            </div>
            <div className="col-sm-4 fare-breakdown-price">
              <p>{this.formatPrice(pricing.confirmed_total_price)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  formatPrice = (price: number) => {
    const currency = this.props.pricingDetails.currency;
    return `${currencySymbol(currency)}${price.toFixed()} ${currency}`;
  }

}

export default FareBreakdown;
