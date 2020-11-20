import React from 'react';
import { BookingItinerary } from '../bookings/BookingsInterfaces';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import { Segment, Penalty } from '../trip/results/ResultsInterfaces';
import { isFirstPositionInStructure } from '../helpers/MiscHelpers';
import { calculateDistributedMarkup } from '../helpers/MarkupHelper';
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
  
  const noPenaltiesExist = (penalty: Penalty) => {
    return (penalty.percentage === undefined && penalty.amount === undefined);
  };

  const getCancelAmount = (cancelPenalty: Penalty, price: number) => {
    if (noPenaltiesExist(cancelPenalty)) return price;
    return cancelPenalty.percentage !== undefined
      ? convertPercentageToAmount(cancelPenalty.percentage, price) 
      : cancelPenalty.amount!;
  };

  const getChangeAmount = (changePenalty: Penalty, price: number) => {
    if (noPenaltiesExist(changePenalty)) return price;
    if (changePenalty.percentage === undefined && changePenalty.amount === undefined) {
      return 0;
    }
    return changePenalty.percentage !== undefined
      ? convertPercentageToAmount(changePenalty.percentage, price) 
      : changePenalty.amount!;
  };

  let cancelAmount: number = 0;
  let changeAmount: number = 0;

  if (props.segments) {
    props.segments.forEach((segment: Segment) => {
      let price: number = 0;
      if (props.tripTotal) {
        price = segment.price;
      } else {
        price = segment.vi_segment_base_price ? (segment.vi_segment_base_price + segment.vi_segment_fees! + segment.vi_segment_taxes!) : segment.price;
      }  
      let markup: number = segment.itinerary_markup > 0 ? segment.itinerary_markup : calculateDistributedMarkup(props.tripMarkup, price, props.price);
      if ((props.tripTotal && isFirstPositionInStructure(segment)) || !props.tripTotal) {
        cancelAmount += getCancelAmount(segment.additional_details.cancel_penalty, price + markup);
        changeAmount += getChangeAmount(segment.additional_details.change_penalty, price + markup);
      }
    });
  }

  if (props.itineraries) {
    props.itineraries.forEach((itinerary: BookingItinerary) => {
      cancelAmount += getCancelAmount(itinerary.segments[0].additional_details.cancel_penalty, itinerary.price_breakdown.confirmed_total_price + itinerary.itinerary_markup);
      changeAmount += getChangeAmount(itinerary.segments[0].additional_details.change_penalty, itinerary.price_breakdown.confirmed_total_price + itinerary.itinerary_markup); 
    });
  }

  return (
    <div className="row cancel-policy-group">
      <div className="col">
        <p className="standard-text">
          <span className="text-bold">{t('common.cancellationPolicy.cancellationCost')} </span> 
          {currencySymbol(props.currency)}{cancelAmount.toFixed()}
        </p>
        <p className="standard-text">
          <span className="text-bold">{t('common.cancellationPolicy.changeCost')} </span> 
          {currencySymbol(props.currency)}{changeAmount.toFixed()} {t('common.cancellationPolicy.fareDifferences')}
        </p>
      </div>
    </div>
  );
}