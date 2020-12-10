import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PassengerCountrySelect from './PassengerCountrySelect';
import PassengerDatePicker from './PassengerDatePicker';
import PassengerGenderSelect from './PassengerGenderSelect';
import { PassengerInfo } from './BookInterfaces';
import { updateFrequentFlyerCards, updatePassengerInfo } from '../../actions/BookActions';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import FrequentFlyerDetails from "./FrequentFlyerDetails";
import {FlightResultsDetails, ResultsDetails, Segment} from "../results/ResultsInterfaces";
import Book from "./Book";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    paper: {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      border: '1px solid #ECEEEF',
      outlineColor: '#ffffff',
      borderRadius: '5px',
      top: '142px',
      left: '130px',
      width: '1000px',
      height: 'auto',
      padding: '25px'
    },
    backDrop: {
      height: '100vh'
    }
  }),
);

interface PassengerDetailsModalProps {
  modalState: boolean;
  passenger: PassengerInfo;
  currentPassengerIndex: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  handleModalOpen: any;
  dateFormat: string;
  bookingSegments: Array<Segment>
  pathSequence: Array<string>
  flights: Array<FlightResultsDetails>
  updateFrequentFlyerCards: typeof updateFrequentFlyerCards;
}


export default function PassengerDetailsModal(props: PassengerDetailsModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [invalidPassenger, setInvalidPassenger] = React.useState(false);
  const [ t ] = useTranslation('common');

  useEffect(() => setOpen(props.modalState), [props.modalState]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        hideBackdrop
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton aria-label="close-passenger-modal" className="float-right" onClick={() => (props.handleModalOpen(props.currentPassengerIndex))}>
              <CloseIcon />
            </IconButton>
            <h3 id="transition-modal-title">{t('book.passengerDetailsModal.title')}</h3>
            <div className="row passenger-form-row">
              <div className="col-sm-3">
                <TextField 
                  id="passenger-first-name" 
                  label={t('book.passengerDetailsModal.firstName')}
                  variant="outlined" 
                  value={props.passenger.first_name}
                  onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'first_name', event.target.value)}
                  fullWidth
                  required
                />
              </div>
              <div className="col-sm-3">
                <TextField 
                  id="passenger-last-name" 
                  label={t('book.passengerDetailsModal.lastName')}
                  variant="outlined" 
                  value={props.passenger.last_name}
                  onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'last_name', event.target.value)}
                  fullWidth
                  required
                />
              </div>
              <div className="col-sm-3">
                <PassengerDatePicker 
                  date={props.passenger.date_of_birth}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
                  fieldName="date_of_birth"
                  label={t('book.passengerDetailsModal.dateOfBirth')}
                  disablePast={false}
                  dateFormat={props.dateFormat}
                />
              </div>
              <div className="col-sm-3">
                <PassengerGenderSelect 
                  gender={props.passenger.gender}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
                />
              </div>
            </div>
            <div className="row passenger-form-row">
              <div className="col-sm-3">
                <PassengerCountrySelect 
                  country={props.passenger.passport_country}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
                />               
              </div>
              <div className="col-sm-3">
                <TextField 
                  id="passport-number" 
                  label={t('book.passengerDetailsModal.passportNumber')}
                  variant="outlined" 
                  value={props.passenger.passport_number}
                  onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'passport_number', event.target.value)}
                  fullWidth/>                
              </div>
              <div className="col-sm-3">
                <PassengerDatePicker 
                  date={props.passenger.passport_expiration}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
                  fieldName="passport_expiration"
                  label={t('book.passengerDetailsModal.passportExpiration')}
                  disablePast={true}
                  dateFormat={props.dateFormat}
                />
              </div>
            </div>
            <div className="row passenger-form-row">
              <p>{t('book.passengerDetailsModal.warning')}</p>
            </div>
            <hr/>
            {props.currentPassengerIndex === 0 &&
              <div>
                <h5>Primary Passenger Contact</h5>
                <div className="row passenger-form-row">
                  <div className="col-sm-4">
                    <TextField 
                      id="primary-email" 
                      label={t('book.passengerDetailsModal.email')}
                      variant="outlined"
                      type="email"
                      value={props.passenger.email}
                      helperText= {props.passenger.email ? validateEmail(props.passenger.email, t) : ''}
                      onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'email', event.target.value)}
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <TextField 
                      id="primary-phone-number" 
                      label={t('book.passengerDetailsModal.phoneNumber')}
                      variant="outlined"
                      type="tel"
                      value={props.passenger.phone_number}
                      helperText= {props.passenger.phone_number ? validatePhoneNumber(props.passenger.phone_number, t) : ''}
                      onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'phone_number', event.target.value)}
                      fullWidth
                    />
                  </div>
                </div>
                <hr/>
              </div>
            }
            <FrequentFlyerDetails
              bookingSegments={props.bookingSegments}
              pathSequence={props.pathSequence}
              flights={props.flights}
              currentPassengerIndex={props.currentPassengerIndex}
              updateFrequentFlyerCards={props.updateFrequentFlyerCards}
              passenger={props.passenger}
            />
            <div className="text-center">
              <Button
                color="secondary"
                variant="contained"
                size="large"
                disableElevation
                onClick={() => {
                  return validatePassengerInput(props.passenger, props.currentPassengerIndex) 
                    ? (
                      props.updatePassengerInfo(props.currentPassengerIndex, 'updated', 'true'),
                      props.handleModalOpen(props.currentPassengerIndex),
                      setInvalidPassenger(false)
                    )
                    : setInvalidPassenger(true);
                }}
              >
                {t('book.passengerDetailsModal.save')}
              </Button>
            </div>
            {invalidPassenger &&
            <Alert severity="error" className="invalid-passenger-alert">{t('book.passengerDetailsModal.invalidInputWarning')}</Alert>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const validatePassengerInput = (passenger: PassengerInfo, index: number) => {
  let valid: boolean = false;
  if (passenger.first_name.length > 0
    && passenger.last_name.length > 0
    && passenger.gender !== '') {
    valid = true;
  } 
  if (index === 0 && valid) {
    valid = validateContactInput(passenger);
  }
  return valid;
};

const validateContactInput = (passenger: PassengerInfo) => {
  let valid: boolean = false;
  if (passenger.email && passenger.phone_number) {
    if (passenger.email.length > 0
      && passenger.email.length < 50 
      && passenger.phone_number.length > 0
      && passenger.phone_number.length < 20
      && /^[+]*[ |-\s./0-9]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ |-\s./0-9]*$/.test(passenger.phone_number)) {
      valid = true;
    }
  }
  return valid;
};

const validatePhoneNumber = (phoneNumber: string, t: any) => {
  const re = /^[+]*[ |-\s./0-9]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ |-\s./0-9]*$/;
  return re.test(phoneNumber) ? '' : t('book.passengerDetailsModal.invalidPhoneNumber');
};


const validateEmail = (email: string, t: any) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) ? '' : t('book.passengerDetailsModal.invalidEmailAddress');
};
