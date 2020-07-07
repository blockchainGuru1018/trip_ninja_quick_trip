import React from 'react';
import DefaultModal from './DefaultModal';
import './Modals.css';


interface PricingModalProps {
  loading: boolean
}

export default function PricingModal(props: PricingModalProps) {
  const primaryText = "Confirming your flights";
  return (
    <div>
      <DefaultModal 
        loading={props.loading}
        primaryText={primaryText}
      />
    </div>
  );
}