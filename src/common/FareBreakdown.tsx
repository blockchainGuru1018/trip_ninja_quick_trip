import React from 'react';
import { Pricing } from "../trip/results/PricingInterfaces";
import { currencySymbol } from '../helpers/CurrencySymbolHelper';

interface FareBreakdownProps {
    pricing: Pricing;
    pricingDisplay?: boolean;
    currency: string;
}

class FareBreakdown extends React.Component<FareBreakdownProps> {

  render() {
    const pricing = this.props.pricing!;
    return (
      <div>
        {this.props.pricingDisplay ? <h5>Fare Breakdown</h5> : <h5 className="section-header">Booking Costs</h5>}
        <div className={(this.props.pricingDisplay ? 'book-container' : '') +  ' standard-text'}>
          {pricing 
            ? <div>
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
            : <div className="row">
              <p>Information is not available.</p>
            </div>
          }
          
        </div>
      </div>
    );
  }
  formatPrice = (price: number) => {
    const currency = this.props.currency;
    return `${currencySymbol(currency)}${price.toFixed()} ${currency}`;
  }

}

export default FareBreakdown;
