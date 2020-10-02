import React from 'react';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';

interface SearchErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function SearchErrorModal(props: SearchErrorModalProps) {
  const [ t ] = useTranslation('common');

  return (
    <div>
      <h2 id="transition-modal-title" className='modal-title'>{t('common.modals.searchErrorModal.title')}</h2>
      <div className='modal-text-container'>
        <p>
          {t('common.modals.searchErrorModal.body')}
        </p>
        <p>
          {t('common.modals.searchErrorModal.body2')}
          <a href="https://help.tripninja.io/" style={{color: '#00B4C3'}}> {t('common.modals.searchErrorModal.knowledgeBase')}</a>
          {t('common.modals.searchErrorModal.supportTeam')}
        </p>
        <Button
          onClick={() => (props.setErrorDetails(false, 'search'))}
          color='secondary'
          variant="contained"
          style={{display: 'grid', margin: 'auto'}}>
          {t('common.modals.searchErrorModal.return')}
        </Button>
      </div>
    </div>
  );
}