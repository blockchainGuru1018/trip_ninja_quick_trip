import React from 'react';
import DefaultModal from './DefaultModal';
import './Modals.css';
import { useTranslation } from 'react-i18next';

interface DefaultLoadingModalProps {
  loading: boolean
}

export default function DefaultLoadingModal(props: DefaultLoadingModalProps) {
  const [ t ] = useTranslation('common');
  return (
    <div>
      <DefaultModal
        loading={props.loading}
        primaryText={t('common.modals.defaultResultsLoadingModal.primaryText')}
      />
    </div>
  );
}