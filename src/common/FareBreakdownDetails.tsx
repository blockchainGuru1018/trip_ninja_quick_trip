
import React from "react";
import { WithTranslation, withTranslation } from 'react-i18next';
import { currencySymbol } from "../helpers/CurrencySymbolHelper";
import { Pricing } from "../trip/results/PricingInterfaces";
import {Results, ResultsDetails, Segment} from "../trip/results/ResultsInterfaces";
import {getLinkedViSegment} from "../helpers/VirtualInterliningHelpers";

interface FareBreakdownDetailsProps extends WithTranslation {
  pricing: Pricing;
  expanded: boolean;
  currency: string;
  resultsDetails?: ResultsDetails
  pathSequence?: Array<string>
}

class FareBreakdownDetails extends React.Component<FareBreakdownDetailsProps> {

  state = {
    trip: this.props.resultsDetails![this.props.resultsDetails!.tripType],
    actives: [...this.props.resultsDetails?.activeSegments.values()]
  }
  render() {
    return (
      <div>
        {
          this.props.expanded && this.props.resultsDetails
            ? <div>
              {this.getActiveSegmentExpandedPricing()}
              {this.fareBreakdownTotalHtml()}
            </div>
            : <div>
              {this.setPricingHtml(this.props.pricing.base_fare, (this.props.pricing.taxes + this.props.pricing.fees))}
              {this.fareBreakdownTotalHtml()}
            </div>
        }
      </div>
    );
  }

  getActiveSegmentExpandedPricing = () => {
    const pricesByTicketHtml: any = [];
    this.state.actives!.forEach((activeSegment: Segment, segmentIndex: number) => {
      console.log(activeSegment)
      if (!activeSegment.virtual_interline && activeSegment.segment_position !== 0) {
        return;
      } else if (activeSegment.virtual_interline) {
        const baseFare: number = activeSegment.vi_segment_price || 0;
        const taxesAndFees: number = activeSegment.vi_segment_taxes || 0;
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml(activeSegment, (baseFare + taxesAndFees)),
          this.setPricingHtml(baseFare, taxesAndFees)
        );
        const linkedViSegment: Segment | undefined = getLinkedViSegment(activeSegment, this.state.trip.segments[segmentIndex])
        const viBaseFare: number = linkedViSegment!.vi_segment_price || 0;
        const viTaxesAndFees: number = linkedViSegment!.vi_segment_taxes || 0;
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml(linkedViSegment!, (viBaseFare + viTaxesAndFees)),
          this.setPricingHtml(viBaseFare, viTaxesAndFees)
        );
      } else {
        console.log('should be here');
        const taxesAndFees: number = activeSegment.taxes + (activeSegment.fees || 0);
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml(activeSegment, (activeSegment.base_price + taxesAndFees)),
          this.setPricingHtml(activeSegment.base_price, taxesAndFees)
        );
      }
    });
    return pricesByTicketHtml;
  }

  setSegmentHeaderHtml = (segment: Segment, itineraryTotal: number) => this.props.pathSequence && <div className='row'>
    <div className='col-sm-8'>
      {this.createItineraryPathSequenceString(segment)}
    </div>
    <div className='col-sm-4 fare-breakdown-price'>
      <p className="text-bold">{this.formatPrice(itineraryTotal)}</p>
    </div>

  </div>

  createItineraryPathSequenceString = (segment: Segment) => {
    let pathSequenceString = '';
    const itineraryStructure: Array<number> = JSON.parse(segment.itinerary_structure);
    console.log(itineraryStructure);
    console.log(this.props.pathSequence);
    itineraryStructure.forEach((itineraryPosition: number, path) => pathSequenceString += `${this.props.pathSequence![itineraryPosition]}, `);
    return pathSequenceString.slice(0, -2);
  }

  setPricingHtml = (baseFare: number, taxesAndFees: number) => <div>
    <div className="row">
      <div className="col-sm-8 fare-breakdown-text">
        <p className='text-bold'>{this.props.t("common.fareBreakdown.airTransportationCharges")}</p>
      </div>
      <div className="col-sm-4 fare-breakdown-price">
        <p className='text-bold'>{this.formatPrice(baseFare)}</p>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-8 fare-breakdown-text">
        <p>{this.props.t("common.fareBreakdown.taxes")}</p>
      </div>
      <div className="col-sm-4 fare-breakdown-price">
        <p className='text-bold'>{this.formatPrice(taxesAndFees)}</p>
      </div>
    </div>
  </div>



  formatPrice = (price: number) => {
    const currency = this.props.currency;
    return `${currencySymbol(currency)}${price.toFixed()} ${currency}`;
  }

  fareBreakdownTotalHtml = () =>
    <div className="row fare-breakdown-total">
      <div className="col-sm-8 fare-breakdown-text">
        <p className="text-bold">{this.props.t("commonWords.total")}</p>
      </div>
      <div className="col-sm-4 fare-breakdown-price">
        <p className="text-bold">{this.formatPrice(this.props.pricing.confirmed_total_price)}</p>
      </div>
    </div>

}

export default withTranslation('common')(FareBreakdownDetails);


