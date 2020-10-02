import React from 'react';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';

interface CancellingErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function CancellingErrorModal(props: CancellingErrorModalProps) {
  const [ t ] = useTranslation('common');

  return (
    <div>
      <h2 id="transition-modal-title" className='modal-title'>{t('common.modals.cancellingErrorModal.title')}</h2>
      <div className='modal-text-container'>
        <p>{t('common.modals.cancellingErrorModal.body')}
        </p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'cancelling'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          {t('common.modals.cancellingErrorModal.return')}
        </Button>
      </div>
    </div>
  );
}