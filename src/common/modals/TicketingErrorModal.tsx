import React from 'react';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';

interface TicketingErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function TicketingErrorModal(props: TicketingErrorModalProps) {
  const [ t ] = useTranslation('common');

  return (
    <div>
      <h2 id="transition-modal-title" className='modal-title'>{t('common.modals.ticketingErrorModal.title')}</h2>
      <div className='modal-text-container'>
        <p>
          {t('common.modals.ticketingErrorModal.body')}
        </p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'ticketing'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          {t('common.modals.ticketingErrorModal.return')}
        </Button>
      </div>
    </div>
  );
}