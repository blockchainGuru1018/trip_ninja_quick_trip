import React from 'react';
import { currencySymbol } from '../helpers/CurrencySymbolHelper';
import { Segment } from '../trip/results/ResultsInterfaces';

interface CancellationPolicyProps {
  currency: string;
  price: number;
  segments: Array<Segment>;
}

export default function CancellationPolicy(props: CancellationPolicyProps) {
  const convertPercentageToAmount = (percent: number, segmentPrice: number) => {
    return percent/100 * segmentPrice;
  };

  const calculateRefundAmount = (cancelCost: number, price: number) => {
    return price - cancelCost;
  };
  
  let cancelAmount: number = 0;
  let changeAmount: number = 0;
  
  props.segments.forEach((segment: Segment) => {
    cancelAmount += segment.additional_details.cancel_penalty.percentage 
      ? convertPercentageToAmount(segment.additional_details.cancel_penalty.percentage, segment.price) 
      : segment.additional_details.cancel_penalty.amount!;
    
    changeAmount += segment.additional_details.change_penalty.percentage 
      ? convertPercentageToAmount(segment.additional_details.change_penalty.percentage, segment.price) 
      : segment.additional_details.change_penalty.amount!;

  });

  let refundAmount: number = calculateRefundAmount(cancelAmount, props.price);

  return (
    <div className="row">
      <div className="col">
        <p className="standard-text">Cancellation Cost: {currencySymbol("CAD")}{cancelAmount.toFixed()}, refund of {currencySymbol("CAD")}{refundAmount.toFixed()}.</p>
        <p className="standard-text">Change Cost: {currencySymbol("CAD")}{changeAmount.toFixed()} + fare differences.</p>
      </div>
    </div>
  );

}