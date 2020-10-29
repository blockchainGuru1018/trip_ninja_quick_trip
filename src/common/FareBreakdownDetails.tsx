
import React from "react";
import { WithTranslation, withTranslation } from 'react-i18next';
import { currencySymbol } from "../helpers/CurrencySymbolHelper";
import { Pricing } from "../trip/results/PricingInterfaces";
import {Results, ResultsDetails, Segment} from "../trip/results/ResultsInterfaces";
import {getLinkedViSegment} from "../helpers/VirtualInterliningHelpers";
import {act} from "react-dom/test-utils";
import {createPassengersString} from "../helpers/PassengersListHelper";
import {create} from "domain";

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
      if (!activeSegment.virtual_interline && this.isSecondPartOfOpenJaw(activeSegment)) {
        return;
      } else if (activeSegment.virtual_interline) {
        const baseFare: number = activeSegment.vi_segment_base_price || 0;
        const taxesAndFees: number = (activeSegment.vi_segment_taxes || 0) + (activeSegment.vi_segment_fees || 0);
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml(activeSegment, (baseFare + taxesAndFees)),
          this.setPricingHtml(baseFare, taxesAndFees, true)
        );
        const linkedViSegment: Segment | undefined = getLinkedViSegment(activeSegment, this.state.trip.segments[segmentIndex]);
        const viBaseFare: number = linkedViSegment!.vi_segment_base_price || 0;
        const viTaxesAndFees: number = (linkedViSegment!.vi_segment_taxes || 0) + (linkedViSegment!.vi_segment_fees || 0);
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml(linkedViSegment!, (viBaseFare + viTaxesAndFees)),
          this.setPricingHtml(viBaseFare, viTaxesAndFees, true)
        );
      } else {
        const taxesAndFees: number = activeSegment.taxes + (activeSegment.fees || 0);
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml(activeSegment, (activeSegment.base_price + taxesAndFees)),
          this.setPricingHtml(activeSegment.base_price, taxesAndFees, true)
        );
      }
    });
    return pricesByTicketHtml;
  }

  isSecondPartOfOpenJaw = (segment: Segment) => {
    const segment_structure: Array<number> = JSON.parse(segment.itinerary_structure);
    return segment.itinerary_type === 'OPEN_JAW' &&
      segment.segment_position !== segment_structure[0];
  }

  setSegmentHeaderHtml = (segment: Segment, itineraryTotal: number) => this.props.pathSequence && <div className='row'>
    <div className='col-sm-8 fare-breakdown-text'>
      <div className='text-bold'>
        {this.createItineraryPathSequenceString(segment)}
      </div>
      <div className='text-small'>
        {createPassengersString([segment])}
      </div>
    </div>
    <div className='col-sm-4 fare-breakdown-price'>
      <p className="text-bold">{this.formatPrice(itineraryTotal)}</p>
    </div>
  </div>

  createItineraryPathSequenceString = (segment: Segment) => {
    let pathSequenceString = '';
    const itineraryStructure: Array<number> = JSON.parse(segment.itinerary_structure);
    itineraryStructure.forEach((itineraryPosition: number) => segment.virtual_interline
      ? pathSequenceString += `${segment.origin} - ${segment.destination}, `
      : pathSequenceString += `${this.props.pathSequence![itineraryPosition]}, `);
    return pathSequenceString.slice(0, -2);
  }

  setPricingHtml = (baseFare: number, taxesAndFees: number, expanded: boolean = false) => <div>
    <div className="row">
      <div className={`col-sm-8 ${expanded ? '' : 'fare-breakdown-text'}`}>
        <p className='text-bold'>{this.props.t("common.fareBreakdown.airTransportationCharges")}</p>
      </div>
      <div className="col-sm-4 fare-breakdown-price">
        <p className={expanded ? '' : 'text-bold'}>{this.formatPrice(baseFare)}</p>
      </div>
    </div>
    <div className="row">
      <div className={`col-sm-8 ${expanded ? '' : 'fare-breakdown-text'}`}>
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


