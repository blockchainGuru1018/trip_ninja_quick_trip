import React from 'react';
import { Pricing } from "../trip/results/PricingInterfaces";
import { withTranslation, WithTranslation } from 'react-i18next';
import FareBreakdownDetails from "./FareBreakdownDetails";
import { Results, Segment } from "../trip/results/ResultsInterfaces";
import { BookingItinerary } from "../bookings/BookingsInterfaces";
import { updateAdditionalMarkup } from '../actions/PricingActions';


interface FareBreakdownProps extends WithTranslation {
    pricing: Pricing;
    pricingDisplay?: boolean;
    currency: string;
    trip?: Results;
    actives?: Array<Segment>;
    itineraries?: Array<BookingItinerary>
    pathSequence?: Array<string>
    flightDetailsDisplay?: boolean;
    updateAdditionalMarkup?: typeof updateAdditionalMarkup;
}

class FareBreakdown extends React.Component<FareBreakdownProps> {
  state = {
    expanded: false
  }
  render() {
    const pricing = this.props.pricing!;

    return (
      <div className={this.props.flightDetailsDisplay ? 'flight-details-drawer' : ''}>
        <div className='booking-details-title-container'>
          {
            this.props.pricingDisplay || this.props.flightDetailsDisplay
              ? <h5>{this.props.t("common.fareBreakdown.title")}</h5>
              : <h5 className="section-header">{this.props.t("common.fareBreakdown.altTitle")}</h5>
          }
          <div onClick={() => this.setState({expanded: !this.state.expanded})} className='btn-fare-breakdown-details'>{`Show ${this.state.expanded ? 'less' : 'more'} details`}</div>
        </div>
        <div className={(this.props.pricingDisplay ? 'book-container' : '') +  ' standard-text'}>
          {pricing 
            ? <FareBreakdownDetails pricing={pricing} expanded={this.state.expanded} currency={this.props.currency}
              trip={this.props.trip} actives={this.props.actives} itineraries={this.props.itineraries}
              pathSequence={this.props.pathSequence} pricingDisplay={this.props.pricingDisplay}
              updateAdditionalMarkup={this.props.updateAdditionalMarkup}/>
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
