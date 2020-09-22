import React from 'react';
import DefaultModal from './DefaultModal';
import './Modals.css';
import { useTranslation } from 'react-i18next';

interface PricingModalProps {
  loading: boolean
}

export default function PricingModal(props: PricingModalProps) {
  const [ t ] = useTranslation('common');
  return (
    <div>
      <DefaultModal 
        loading={props.loading}
        primaryText={t('common.modals.pricingModal.primaryText')}
      />
    </div>
  );
}