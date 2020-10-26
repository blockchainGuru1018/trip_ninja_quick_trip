import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { Errors } from '../../trip/results/ResultsInterfaces';
import './Modals.css';
import { setErrorDetails } from '../../actions/ResultsActions';
import { useTranslation } from 'react-i18next';
import history from '../../History';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    },
    paper: {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      border: '1px solid #ECEEEF',
      borderRadius: '5px',
      top: '142px',
      left: '130px',
      width: '640px',
      paddingBottom: '30px'
    }
  }),
);

interface DefaultErrorModalProps {
  errors: Errors;
  setErrorDetails: typeof setErrorDetails;
}

export default function DefaultErrorModal(props: DefaultErrorModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ t ] = useTranslation('common');
  useEffect(() => setOpen(props.errors.errorFound), [props.errors.errorFound]);

  const errorModalBody = props.errors.errorType === 'search' 
    ? <div>
      <p>{t('common.modals.searchErrorModal.body')}</p>
      <p>
        {t('common.modals.searchErrorModal.body2')}
        <a href="https://help.tripninja.io/" style={{color: '#00B4C3'}}> {t('common.modals.searchErrorModal.knowledgeBase')}</a>
        {t('common.modals.searchErrorModal.supportTeam')}
      </p>
    </div>
    : <p>{t('common.modals.'+props.errors.errorType+'ErrorModal.body')}</p>;

  const handleClick = () => {
    props.setErrorDetails(false, props.errors.errorType);
    if (props.errors.errorType === 'booking') {
      history.push('/results/itinerary/');
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => props.setErrorDetails(false, props.errors.errorType)}
      >
        <div className={classes.paper + ' centered-container'}>
          <h2 id="transition-modal-title" className='modal-title'>{t('common.modals.'+props.errors.errorType+'ErrorModal.title')}</h2>
          <div className='modal-text-container'>
            {errorModalBody}            
            <Button
              disableElevation
              onClick={() => handleClick()}
              color='secondary'
              variant="contained"
              style={{display: 'grid', margin: 'auto'}}>
              {t('common.modals.'+props.errors.errorType+'ErrorModal.return')}
            </Button>
          </div>
        </div>        
      </Modal>
    </div>
  );
}