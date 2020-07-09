import React from 'react';
import {Pricing} from "../results/PricingInterfaces";

interface FareBreakdownProps {
    pricing: Pricing;
}

class FareBreakdown extends React.Component<FareBreakdownProps> {

  render() {

    return (
      <div>
        <h5>Fare Breakdown</h5>       
        <div className="book-container">
          <p>Fare Breakdown goes here! {this.props.pricing.confirmed_total_price}</p>
        </div>
      </div>
    );
  }

}

export default FareBreakdown;
