import React from 'react';
import { Pricing } from "../trip/results/PricingInterfaces";
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FareBreakdownProps extends WithTranslation {
    pricing: Pricing;
    pricingDisplay?: boolean;
    currency: string;
}

class FareBreakdown extends React.Component<FareBreakdownProps> {

  render() {
    const pricing = this.props.pricing!;
    return (
      <div>
        {this.props.pricingDisplay ? <h5>{this.props.t("common.fareBreakdown.title")}</h5> : <h5 className="section-header">{this.props.t("common.fareBreakdown.altTitle")}</h5>}
        <div className={(this.props.pricingDisplay ? 'book-container' : '') +  ' standard-text'}>
          {pricing 
            ? <div>
              <div className="row">
                <div className="col-sm-8 fare-breakdown-text">
                  <p>{this.props.t("common.fareBreakdown.airTransportationCharges")}</p>
                </div>
                <div className="col-sm-4 fare-breakdown-price">
                  <p>{this.formatPrice(pricing.base_fare)}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8 fare-breakdown-text">
                  <p>{this.props.t("common.fareBreakdown.taxes")}</p>
                </div>
                <div className="col-sm-4 fare-breakdown-price">
                  <p>{this.formatPrice(pricing.taxes+pricing.fees)}</p>
                </div>
              </div>
              <div className="row fare-breakdown-total">
                <div className="col-sm-8 fare-breakdown-text">
                  <p className="text-bold">{this.props.t("commonWords.total")}</p>
                  <p className="text-bold">Total</p>
                </div>
                <div className="col-sm-4 fare-breakdown-price">
                  <p className="text-bold">{this.formatPrice(pricing.confirmed_total_price)}</p>
                </div>
              </div>
            </div>
            : <div className="row">
              <p>{this.props.t("common.fareBreakdown.infoMissing")}</p>
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

export default withTranslation('common')(FareBreakdown);
