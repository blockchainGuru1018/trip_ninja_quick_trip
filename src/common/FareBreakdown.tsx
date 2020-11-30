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
    markupVisible: boolean;
    trip?: Results;
    actives?: Array<Segment>;
    itineraries?: Array<BookingItinerary>;
    pathSequence?: Array<string>;
    flightDetailsDisplay?: boolean;
    updateAdditionalMarkup?: typeof updateAdditionalMarkup;
    expanded?: boolean;
}

class FareBreakdown extends React.Component<FareBreakdownProps> {
  state = {
    expanded: !!this.props.expanded
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
          <div onClick={() => this.setState({expanded: !this.state.expanded})} className='btn-breakdown-details'>{`Show ${this.state.expanded ? 'fewer' : 'more'} details`}</div>
        </div>
        <div className={(this.props.pricingDisplay ? 'book-container' : '') +  ' standard-text'}>
          {pricing && pricing.base_fare !== 0
            ? <FareBreakdownDetails
              pricing={pricing}
              expanded={this.state.expanded}
              currency={this.props.currency}
              trip={this.props.trip}
              actives={this.props.actives}
              itineraries={this.props.itineraries}
              pathSequence={this.props.pathSequence}
              markupVisible={this.props.markupVisible}
              pricingDisplay={this.props.pricingDisplay}
              updateAdditionalMarkup={this.props.updateAdditionalMarkup}
            />
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
