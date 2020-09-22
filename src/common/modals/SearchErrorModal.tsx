import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import './Modals.css';
import Button from '@material-ui/core/Button';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      border: '1px solid #ECEEEF',
      borderRadius: '5px',
      top: '142px',
      left: '130px',
      width: '640px',
      height: '336px'
    }
  }),
);

interface SearchErrorModalProps {
  setErrorDetails: typeof setErrorDetails;
}

export default function SearchErrorModal(props: SearchErrorModalProps) {
  const classes = useStyles();
  const [ t ] = useTranslation('common');

  return (
    <div className={classes.paper + ' centered-container'}>
      <h2 id="transition-modal-title" className='search-modal-title'>{t('common.modals.searchErrorModal.title')}</h2>
      <div className='search-modal-text-container'>
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