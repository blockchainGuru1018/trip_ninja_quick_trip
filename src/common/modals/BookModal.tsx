import React from 'react';
import DefaultModal from './DefaultModal';
import './Modals.css';
import { useTranslation } from 'react-i18next';

interface BookModalProps {
  loading: boolean
}

export default function BookModal(props: BookModalProps) {
  const [ t ] = useTranslation('common');
  
  return (
    <div>
      <DefaultModal 
        loading={props.loading}
        primaryText={t('common.modals.bookModal.primaryText')}
      />
    </div>
  );
}