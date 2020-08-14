import React from 'react';
import FlightPath from '../../trip/search/TripPath';
import { Flight } from '../../trip/search/SearchInterfaces';
import DefaultModal from './DefaultModal';
import './Modals.css';


interface SearchModalProps {
  loading: boolean
  flights: Array<Flight>
}

export default function SearchModal(props: SearchModalProps) {
  const primaryText = "Finding the best route and flight options";
  const secondaryText = <FlightPath flights={props.flights}/>;
  return (
    <div>
      <DefaultModal 
        loading={props.loading}
        primaryText={primaryText}
        secondaryText={secondaryText}
      />
    </div>
  );
}