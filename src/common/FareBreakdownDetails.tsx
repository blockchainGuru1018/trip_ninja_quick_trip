
import React from "react";
import { WithTranslation, withTranslation } from 'react-i18next';
import { currencySymbol } from "../helpers/CurrencySymbolHelper";
import { Pricing } from "../trip/results/PricingInterfaces";
import { FlightResultsDetails, Results, Segment } from "../trip/results/ResultsInterfaces";
import { getLinkedViSegment } from "../helpers/VirtualInterliningHelpers";
import { createPassengersString, createStringFromPassengerList } from "../helpers/PassengersListHelper";
import {BookingItinerary, BookingPassenger, BookingSegment} from "../bookings/BookingsInterfaces";

interface FareBreakdownDetailsProps extends WithTranslation {
  pricing: Pricing;
  expanded: boolean;
  currency: string;
  trip?: Results;
  actives?: Array<Segment>;
  pathSequence?: Array<string>;
  itineraries?: Array<BookingItinerary>;
  markupVisible: boolean;
}

class FareBreakdownDetails extends React.Component<FareBreakdownDetailsProps> {
  render() {
    return (
      <div>
        {
          this.props.expanded
            ? <div>
              {
                this.props.actives && this.props.trip
                  ? this.getActiveSegmentExpandedPricing()
                  : this.getActiveSegmentExpandedPricingBookingTable()
              }
              {this.fareBreakdownTotalHtml()}
            </div>
            : <div>
              {this.setPricingHtml(this.props.pricing.base_fare, (this.props.pricing.taxes + this.props.pricing.fees), this.props.pricing.markup)}
              {this.fareBreakdownTotalHtml()}
            </div>
        }
      </div>
    );
  }

  getActiveSegmentExpandedPricing = () => {
    const pricesByTicketHtml: any = [];
    this.props.actives!.forEach((activeSegment: Segment, segmentIndex: number) => {
      if (!activeSegment.virtual_interline && this.isSecondPartOfOpenJaw(activeSegment)) {
        return;
      } else if (activeSegment.virtual_interline) {
        const baseFare: number = activeSegment.vi_segment_base_price || 0;
        const taxesAndFees: number = (activeSegment.vi_segment_taxes || 0) + (activeSegment.vi_segment_fees || 0);
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml((baseFare + taxesAndFees), activeSegment),
          this.setPricingHtml(baseFare, taxesAndFees, this.props.pricing.markup, true)
        );
        const linkedViSegment: Segment | undefined = getLinkedViSegment(activeSegment, this.props.trip!.segments[segmentIndex]);
        const viBaseFare: number = linkedViSegment!.vi_segment_base_price || 0;
        const viTaxesAndFees: number = (linkedViSegment!.vi_segment_taxes || 0) + (linkedViSegment!.vi_segment_fees || 0);
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml((viBaseFare + viTaxesAndFees), linkedViSegment),
          this.setPricingHtml(viBaseFare, viTaxesAndFees, this.props.pricing.markup, true)
        );
      } else {
        const taxesAndFees: number = activeSegment.taxes + (activeSegment.fees || 0);
        pricesByTicketHtml.push(
          this.setSegmentHeaderHtml((activeSegment.base_price + taxesAndFees), activeSegment),
          this.setPricingHtml(activeSegment.base_price, taxesAndFees, this.props.pricing.markup, true)
        );
      }
    });
    return pricesByTicketHtml;
  }

  getActiveSegmentExpandedPricingBookingTable = () => {
    const pricesByTicketHtml: any = [];
    this.props.itineraries?.forEach((itinerary: BookingItinerary) => {
      const baseFare: number = itinerary.price_breakdown.base_fare;
      const taxesAndFees: number = itinerary.price_breakdown.fees + itinerary.price_breakdown.taxes;
      pricesByTicketHtml.push(
        this.setSegmentHeaderHtml((baseFare + taxesAndFees), undefined, itinerary),
        this.setPricingHtml(baseFare, taxesAndFees, itinerary.price_breakdown.markup, true)
      );
    });
    return pricesByTicketHtml;
  }

  isSecondPartOfOpenJaw = (segment: Segment) => {
    const segment_structure: Array<number> = JSON.parse(segment.itinerary_structure);
    return segment.itinerary_type === 'OPEN_JAW' &&
      segment.segment_position !== segment_structure[0];
  }

  setSegmentHeaderHtml = (itineraryTotal: number, segment?: Segment, itinerary?: BookingItinerary) =>
    <div className='row'>
      <div className='col-sm-8 fare-breakdown-text'>
        <div className='text-bold'>
          {
            segment
              ? this.createItineraryPathSequenceString(segment)
              : this.createItineraryPathSequenceStringBooking(itinerary!)
          }
        </div>
        <div className='text-small'>
          {
            segment
              ? createPassengersString([segment])
              : this.createPassengersStringBooking(itinerary!)
          }

        </div>
      </div>
      <div className='col-sm-4 fare-breakdown-price'>
        <p className="text-bold">{this.formatPrice(itineraryTotal)}</p>
      </div>
    </div>

  createPassengersStringBooking = (itinerary: BookingItinerary) => {
    const passengers: Array<BookingPassenger> = itinerary.passengers;
    const passengerTypeList: Array<string> = passengers.map((passenger: BookingPassenger) => passenger.passenger_type);
    return createStringFromPassengerList(passengerTypeList);
  }

  createItineraryPathSequenceString = (segment: any) => {
    let pathSequenceString = '';
    const itineraryStructure: Array<number> = JSON.parse(segment.itinerary_structure);
    itineraryStructure.forEach((itineraryPosition: number) => segment.virtual_interline
      ? pathSequenceString += `${segment.origin} - ${segment.destination}, `
      : pathSequenceString += `${this.props.pathSequence![itineraryPosition]}, `);
    return pathSequenceString.slice(0, -2);
  }

  createItineraryPathSequenceStringBooking = (itinerary: BookingItinerary) => {
    let pathSequenceString = '';
    itinerary.segments.forEach((segment: BookingSegment) => {
      const flightDetails: Array<FlightResultsDetails> = segment.flight_details;
      pathSequenceString += `${flightDetails[0].origin}-${flightDetails[flightDetails.length - 1].destination}, `;
    });
    return pathSequenceString.slice(0, -2);
  }

  setPricingHtml = (baseFare: number, taxesAndFees: number, markup: number, expanded: boolean = false) => <div className='pricing-header-container'>
    <div className="row charges-row">
      <div className={`col-sm-8 ${expanded ? '' : 'fare-breakdown-text'}`}>
        <p>{this.props.t("common.fareBreakdown.airTransportationCharges")}</p>
      </div>
      <div className="col-sm-4 fare-breakdown-price">
        <p>{this.formatPrice(baseFare)}</p>
      </div>
    </div>
    <div className="row charges-row">
      <div className={`col-sm-8 ${expanded ? '' : 'fare-breakdown-text'}`}>
        <p>{this.props.t("common.fareBreakdown.taxes")}</p>
      </div>
      <div className="col-sm-4 fare-breakdown-price">
        <p>{this.formatPrice(taxesAndFees)}</p>
      </div>
    </div>
    {this.props.markupVisible && !expanded &&
    <div className="row charges-row">
      <div className={`col-sm-8 ${expanded ? '' : 'fare-breakdown-text'}`}>
        <p>Markup</p>
      </div>
      <div className="col-sm-4 fare-breakdown-price">
        <p>{this.formatPrice(markup)}</p>
      </div>
    </div>
    }
  </div>


  formatPrice = (price: number) => {
    const currency = this.props.currency;
    return `${currencySymbol(currency)}${price.toFixed()} ${currency}`;
  }

  fareBreakdownTotalHtml = () =>
    <div className="fare-breakdown-total">
      {this.props.markupVisible && this.props.expanded &&
      <div className="row charges-row">
        <div className="col-sm-8 fare-breakdown-text">
          <p>Markup</p>
        </div>
        <div className="col-sm-4 fare-breakdown-price">
          <p>{this.formatPrice(this.props.pricing.markup)}</p>
        </div>
      </div>
      }
      <div className="row">
        <div className="col-sm-8 fare-breakdown-text">
          <p className="text-bold">{this.props.t("commonWords.total")}</p>
        </div>
        <div className="col-sm-4 fare-breakdown-price">
          <p className="text-bold">{this.formatPrice(this.props.pricing.confirmed_total_price + this.props.pricing.markup)}</p>
        </div>
      </div>
    </div>
}

export default withTranslation('common')(FareBreakdownDetails);


