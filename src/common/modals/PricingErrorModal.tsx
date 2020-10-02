import React from 'react';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';

interface PricingErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function PricingErrorModal(props: PricingErrorModalProps) {
  const [ t ] = useTranslation('common');
  
  return (
    <div>
      <h2 id="transition-modal-title" className='modal-title'>{t('common.modals.pricingErrorModal.title')}</h2>
      <div className='modal-text-container'>
        <p>{t('common.modals.pricingErrorModal.body')}</p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'pricing'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          {t('common.modals.pricingErrorModal.return')}
        </Button>
      </div>
    </div>
  );
}