import React from 'react';
import DefaultModal from './DefaultModal';
import './Modals.css';


interface BookModalProps {
  loading: boolean
}

export default function BookModal(props: BookModalProps) {
  const primaryText = "Booking your trip";
  return (
    <div>
      <DefaultModal 
        loading={props.loading}
        primaryText={primaryText}
      />
    </div>
  );
}