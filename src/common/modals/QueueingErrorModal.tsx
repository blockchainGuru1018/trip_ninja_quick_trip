import React from 'react';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';

interface QueueingErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function QueueingErrorModal(props: QueueingErrorModalProps) {
  const [ t ] = useTranslation('common');

  return (
    <div>
      <h2 id="transition-modal-title" className='modal-title'>{t('common.modals.queueingErrorModal.title')}</h2>
      <div className='modal-text-container'>
        <p>{t('common.modals.queueingErrorModal.body')}</p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'queueing'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          {t('common.modals.queueingErrorModal.return')}
        </Button>
      </div>
    </div>
  );
}