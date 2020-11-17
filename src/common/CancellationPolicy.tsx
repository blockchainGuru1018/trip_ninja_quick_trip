import React from 'react';
import { BookingItinerary } from '../bookings/BookingsInterfaces';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import { Segment, Penalty } from '../trip/results/ResultsInterfaces';
import { isFirstPositionInStructure } from '../helpers/MiscHelpers';

interface CancellationPolicyProps {
  currency: string;
  price: number;
  segments?: Array<Segment>;
  itineraries?: Array<BookingItinerary>
  tripTotal: boolean;
}

export default function CancellationPolicy(props: CancellationPolicyProps) {
  const convertPercentageToAmount = (percent: number, segmentPrice: number) => {
    return percent/100 * segmentPrice;
  };

  const calculateRefundAmount = (cancelCost: number, price: number) => {
    return price - cancelCost;
  };
  
  const getCancelAmount = (cancelPenalty: Penalty, price: number) => {
    return cancelPenalty.percentage 
      ? convertPercentageToAmount(cancelPenalty.percentage, price) 
      : cancelPenalty.amount!;
  };

  const getChangeAmount = (changePenalty: Penalty, price: number) => {
    return changePenalty.percentage 
      ? convertPercentageToAmount(changePenalty.percentage, price) 
      : changePenalty.amount!;
  };

  let cancelAmount: number = 0;
  let changeAmount: number = 0;

  if (props.segments) {
    props.segments!.forEach((segment: Segment) => {
      if ((props.tripTotal && isFirstPositionInStructure(segment)) || !props.tripTotal) {
        cancelAmount += getCancelAmount(segment.additional_details.cancel_penalty, segment.price);
        changeAmount += getChangeAmount(segment.additional_details.change_penalty, segment.price); 
      }
    });
  }

  if (props.itineraries) {
    props.itineraries!.forEach((itinerary: BookingItinerary) => {
      cancelAmount += getCancelAmount(itinerary.segments[0].additional_details.cancel_penalty, itinerary.price_breakdown.confirmed_total_price);
      changeAmount += getChangeAmount(itinerary.segments[0].additional_details.change_penalty, itinerary.price_breakdown.confirmed_total_price); 
    });
  }

  let refundAmount: number = calculateRefundAmount(cancelAmount, props.price);

  return (
    <div className="row cancel-policy-group">
      <div className="col">
        <p className="standard-text">
          <span className="text-bold">Cancellation Cost: </span> 
          {currencySymbol(props.currency)}{cancelAmount.toFixed()}, refund of {currencySymbol(props.currency)}{refundAmount.toFixed()}.
        </p>
        <p className="standard-text">
          <span className="text-bold">Change Cost: </span> 
          {currencySymbol(props.currency)}{changeAmount.toFixed()} + fare differences.
        </p>
      </div>
    </div>
  );
}