import React from 'react';
import FlightPath from '../../trip/search/TripPath';
import { Flight } from '../../trip/search/SearchInterfaces';
import DefaultModal from './DefaultModal';
import './Modals.css';
import { useTranslation } from 'react-i18next';

interface SearchModalProps {
  loading: boolean
  flights: Array<Flight>
}

export default function SearchModal(props: SearchModalProps) {
  const [ t ] = useTranslation('common');
  const secondaryText = <FlightPath flights={props.flights}/>;
  return (
    <div>
      <DefaultModal 
        loading={props.loading}
        primaryText={t('common.modals.searchModal.primaryText')}
        secondaryText={secondaryText}
      />
    </div>
  );
}