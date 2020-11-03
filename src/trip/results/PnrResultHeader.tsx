import React from 'react';
import { useTranslation } from 'react-i18next';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { itineraryTypeMap } from '../../helpers/ItineraryTypeHelper';


interface PnrResultHeaderProps {
  itineraryNumber: number;
  price: number;
  currency: string;
  segmentType: string;
  segmentCount: number;
  structure: Array<number>;
  segmentIsVi: boolean;
}

export default function PnrResultHeader(props: PnrResultHeaderProps) {
  const [ t ] = useTranslation('common');

  const segmentIndicators = () => {
    let indicatorGroup = [];
    for (let i=0; i<props.segmentCount; i++) {
      indicatorGroup.push(<div key={i.toString()} className={'col ' + (props.structure.includes(i) ? 'current-segment-indicator' : 'segment-indicator')}></div>);    
    }
    return indicatorGroup;
  };

  return (
    <div className="row pnr-result-header">
      <div className="col">
        <h2>
          <span className="text-bold">{t('commonWords.ticket')} {props.itineraryNumber}</span> | {currencySymbol(props.currency)}{Math.round(props.price)}
        </h2>
        <p>{itineraryTypeMap(props.segmentType)} {props.segmentIsVi ? '- ' + t('search.tripOptions.virtualInterlining') : ''}</p>
        <div className="row indicator-row">
          {segmentIndicators()}
        </div>
      </div>
    </div>
  );
}