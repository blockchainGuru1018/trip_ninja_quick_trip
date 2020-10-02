import React from 'react';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';
import history from '../../History';
import { useTranslation } from 'react-i18next';

interface BookingErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function BookingErrorModal(props: BookingErrorModalProps) {
  const [ t ] = useTranslation('common');

  const bookingErrorButton = () => {
    props.setErrorDetails(false, 'booking');
    history.push('/results/itinerary/');
  };

  return (
    <div>
      <h2 id="transition-modal-title" className='modal-title'>{t('common.modals.bookingErrorModal.title')}</h2>
      <div className='modal-text-container'>
        <p>{t('common.modals.bookingErrorModal.body')}</p>
        <Button
          onClick={() => bookingErrorButton()}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          {t('common.modals.bookingErrorModal.return')}
        </Button>
      </div>
    </div>
  );
}
