import React, {useEffect} from 'react';
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
  const [cancelInfoAvailable, setCancelInfoAvailable] = React.useState(true);
  const [changeInfoAvailable, setChangeInfoAvailable] = React.useState(true);
  const [cancelAmount, setCancelAmount] = React.useState(0);
  const [changeAmount, setChangeAmount] = React.useState(0);
  
  const convertPercentageToAmount = (percent: number, segmentPrice: number) => {
    return percent > 0 ? (percent/100 * segmentPrice) : 0;
  };
  
  const noPenaltiesExist = (penalty: Penalty) =>
    penalty.percentage == null &&
    penalty.amount == null;

  const getCancelAmount = (cancelPenalty: Penalty, price: number) => {
    if (noPenaltiesExist(cancelPenalty)) {
      setCancelInfoAvailable(false);
    }
    return cancelPenalty.percentage != null
      ? convertPercentageToAmount(Number(cancelPenalty.percentage), price)
      : Number(cancelPenalty.amount!);
  };

  const getChangeAmount = (changePenalty: Penalty, price: number) => {
    if (noPenaltiesExist(changePenalty)) {
      setChangeInfoAvailable(false);
    }
    return changePenalty.percentage != null
      ? convertPercentageToAmount(Number(changePenalty.percentage), price)
      : Number(changePenalty.amount!);
  };

  const setCancellationDetails = () => {
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
          if (segment.additional_details) {
            setCancelAmount(cancelAmount + getCancelAmount(segment.additional_details.cancel_penalty, price + markup));
            setChangeAmount(changeAmount + getChangeAmount(segment.additional_details.change_penalty, price + markup));
          } else {
            setChangeInfoAvailable(false);
            setCancelInfoAvailable(false);
          }
        }
      });
    }

    if (props.itineraries) {
      props.itineraries.forEach((itinerary: BookingItinerary) => {
        if (itinerary.segments[0].additional_details) {
          setCancelAmount(cancelAmount + getCancelAmount(itinerary.segments[0].additional_details.cancel_penalty, itinerary.price_breakdown.confirmed_total_price + itinerary.itinerary_markup));
          setChangeAmount(changeAmount + getChangeAmount(itinerary.segments[0].additional_details.change_penalty, itinerary.price_breakdown.confirmed_total_price + itinerary.itinerary_markup));
        } else {
          setChangeInfoAvailable(false);
          setCancelInfoAvailable(false);
        }
      });
    }
  };

  useEffect(() => setCancellationDetails(), []);

  return (
    <div className="row cancel-policy-group">
      {changeInfoAvailable || cancelInfoAvailable
        ? <div className="col">
          {cancelInfoAvailable
            ? <p className="standard-text">
              <span className="text-bold">{t('common.cancellationPolicy.cancellationCost')} </span>
              {currencySymbol(props.currency)}{cancelAmount.toFixed()}
            </p>
            : <p className="standard-text">{t('common.cancellationPolicy.cancellationInfoMissing')}</p>}
          {changeInfoAvailable
            ? <p className="standard-text">
              <span className="text-bold">{t('common.cancellationPolicy.changeCost')} </span>
              {currencySymbol(props.currency)}{changeAmount.toFixed()} {t('common.cancellationPolicy.fareDifferences')}
            </p>
            : <p className="standard-text">{t('common.cancellationPolicy.changeInfoMissing')}</p>}
        </div>
        : <p className='standard-text'>{t('common.cancellationPolicy.refundInfoMissing')}</p>
      }
    </div>
  );
}