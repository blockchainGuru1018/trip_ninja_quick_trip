import React from 'react';
import { BookingItinerary } from '../bookings/BookingsInterfaces';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import { Segment, Penalty } from '../trip/results/ResultsInterfaces';
import { getTotal, isFirstPositionInStructure } from '../helpers/MiscHelpers';
import { calculateDistributedMarkup, getItinerariesMarkupTotal } from '../helpers/MarkupHelper';
import { useTranslation } from 'react-i18next';


interface CancellationPolicyProps {
  currency: string;
  price: number;
  segments?: Array<Segment>;
  itineraries?: Array<BookingItinerary>
  tripTotal: boolean;
  tripMarkup: number;
}

export default function CancellationPolicy(props: CancellationPolicyProps) {
  const [ t ] = useTranslation('common');
  
  const convertPercentageToAmount = (percent: number, segmentPrice: number) => {
    return percent > 0 ? (percent/100 * segmentPrice) : 0;
  };

  const calculateRefundAmount = (cancelCost: number, price: number) => {
    return price - cancelCost;
  };
  
  const noPenaltiesExist = (penalty: Penalty) => {
    return (penalty.percentage === undefined && penalty.amount === undefined);
  }

  const getCancelAmount = (cancelPenalty: Penalty, price: number) => {
    if (noPenaltiesExist(cancelPenalty)) return 0;
    return cancelPenalty.percentage !== undefined
      ? convertPercentageToAmount(cancelPenalty.percentage, price) 
      : cancelPenalty.amount!;
  };

  const getChangeAmount = (changePenalty: Penalty, price: number) => {
    if (noPenaltiesExist(changePenalty)) return 0;
    if (changePenalty.percentage === undefined && changePenalty.amount === undefined) {
      return 0;
    }
    return changePenalty.percentage !== undefined
      ? convertPercentageToAmount(changePenalty.percentage, price) 
      : changePenalty.amount!;
  };

  let cancelAmount: number = 0;
  let changeAmount: number = 0;
  let totalMarkup: number = props.tripMarkup;

  if (props.segments) {
    totalMarkup = props.tripMarkup > 0 ? props.tripMarkup : getTotal(props.segments, 'itinerary_markup');
    props.segments.forEach((segment: Segment) => {
      let markup: number = segment.itinerary_markup > 0 ? segment.itinerary_markup : calculateDistributedMarkup(props.tripMarkup, segment.price, props.price);
      if ((props.tripTotal && isFirstPositionInStructure(segment)) || !props.tripTotal) {
        cancelAmount += getCancelAmount(segment.additional_details.cancel_penalty, segment.price + markup);
        changeAmount += getChangeAmount(segment.additional_details.change_penalty, segment.price + markup);
      }
    });
  }

  if (props.itineraries) {
    totalMarkup = props.tripMarkup > 0 ? props.tripMarkup : getItinerariesMarkupTotal(props.itineraries);
    props.itineraries.forEach((itinerary: BookingItinerary) => {
      cancelAmount += getCancelAmount(itinerary.segments[0].additional_details.cancel_penalty, itinerary.price_breakdown.confirmed_total_price + itinerary.itinerary_markup);
      changeAmount += getChangeAmount(itinerary.segments[0].additional_details.change_penalty, itinerary.price_breakdown.confirmed_total_price + itinerary.itinerary_markup); 
    });
  }


  let refundAmount: number = calculateRefundAmount(cancelAmount, props.price + totalMarkup);

  return (
    <div className="row cancel-policy-group">
      <div className="col">
        <p className="standard-text">
          <span className="text-bold">{t('common.cancellationPolicy.cancellationCost')} </span> 
          {currencySymbol(props.currency)}{cancelAmount.toFixed()}, {t('common.cancellationPolicy.refundOf')} {currencySymbol(props.currency)}{refundAmount.toFixed()}.
        </p>
        <p className="standard-text">
          <span className="text-bold">{t('common.cancellationPolicy.changeCost')} </span> 
          {currencySymbol(props.currency)}{changeAmount.toFixed()} {t('common.cancellationPolicy.fareDifferences')}
        </p>
      </div>
    </div>
  );
}