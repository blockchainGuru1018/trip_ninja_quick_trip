import React from 'react';
import { useTranslation } from 'react-i18next';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { itineraryTypeMap } from '../../helpers/ItineraryTypeHelper';
import Itinerary from '../book/Itinerary';

interface PnrResultHeaderProps {
  itineraryNumber: number;
  price: number;
  currency: string;
  segmentType: string;
  segmentCount: number;
}

export default function PnrResultHeader(props: PnrResultHeaderProps) {
  const [ t ] = useTranslation('common');

  const segmentIndicators = () => {
    let indicatorGroup = "";
    for (let i=1; i++; i<=props.segmentCount) {
      indicatorGroup += <span className={i === props.itineraryNumber ? 'current-segment-indicator' : 'segment-indicator'}></span>;    
    }
    return indicatorGroup;
  };

  return (
    <div className="row">
      <div className="col">
        <h5>Ticket {props.itineraryNumber} | {currencySymbol(props.currency)}{Math.round(props.price)}</h5>
        <p>{itineraryTypeMap(props.segmentType)}</p>
        <span>{props.itineraryNumber}/{props.segmentCount}</span>
        <div className="row">
        </div>
      </div>
    </div>
  );
}