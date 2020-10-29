import React from 'react';
import { Pricing } from "../trip/results/PricingInterfaces";
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import { withTranslation, WithTranslation } from 'react-i18next';
import FareBreakdownDetails from "./FareBreakdownDetails";
import { Button } from "@material-ui/core";
import { ResultsDetails } from "../trip/results/ResultsInterfaces";

interface FareBreakdownProps extends WithTranslation {
    pricing: Pricing;
    pricingDisplay?: boolean;
    currency: string;
    resultsDetails?: ResultsDetails
    pathSequence: Array<string>
}

class FareBreakdown extends React.Component<FareBreakdownProps> {
  state = {
    expanded: false
  }
  render() {
    const pricing = this.props.pricing!;

    return (
      <div>
        {this.props.pricingDisplay ? <h5>{this.props.t("common.fareBreakdown.title")}</h5> : <h5 className="section-header">{this.props.t("common.fareBreakdown.altTitle")}</h5>}
        <Button onClick={() => this.setState({expanded: !this.state.expanded})}>See more details</Button>
        <div className={(this.props.pricingDisplay ? 'book-container' : '') +  ' standard-text'}>
          {pricing 
            ? <FareBreakdownDetails pricing={pricing} expanded={this.state.expanded} currency={this.props.currency}
              resultsDetails={this.props.resultsDetails} pathSequence={this.props.pathSequence}/>
            : <div className="row">
              <p>{this.props.t("common.fareBreakdown.infoMissing")}</p>
            </div>
          }
          
        </div>
      </div>
    );
  }

}

export default withTranslation('common')(FareBreakdown);
