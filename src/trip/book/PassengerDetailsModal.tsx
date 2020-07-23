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
import { updatePassengerInfo } from '../../actions/BookActions';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
  modalState: boolean,
  passenger: PassengerInfo
  currentPassengerIndex: number
  updatePassengerInfo: typeof updatePassengerInfo
  handleModalOpen: any
  dateFormat: string;
}


export default function PassengerDetailsModal(props: PassengerDetailsModalProps) {
  let state = { emailErrorText: 'Initial error!', emailError: false};

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [invalidPassenger, setInvalidPassenger] = React.useState(false);

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
            <h3 id="transition-modal-title">Passenger Information</h3>
            <div className="row passenger-form-row">
              <div className="col-sm-3">
                <TextField 
                  id="passenger-first-name" 
                  label="First Name" 
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
                  label="Last Name" 
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
                  label="Date of Birth"
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
                  label="Passport Number" 
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
                  label="Passport Expiration"
                  disablePast={true}
                  dateFormat={props.dateFormat}
                />
              </div>
            </div>
            <div className="row passenger-form-row">
              <p>This information must match the information on your travellers passport. Discrepancies could lead to denied boarding.</p>
            </div>
            <hr/>
            {props.currentPassengerIndex === 0 &&
              <div>
                <h5>Primary Passenger Contact</h5>
                <div className="row passenger-form-row">
                  <div className="col-sm-4">
                    <TextField 
                      id="primary-email" 
                      label="Email" 
                      variant="outlined"
                      type="email"
                      value={props.passenger.email}
                      helperText= {props.passenger.email ? validateEmail(props.passenger.email) : ''}
                      onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'email', event.target.value)}
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <TextField 
                      id="primary-phone-number" 
                      label="Phone Number" 
                      variant="outlined"
                      type="tel"
                      value={props.passenger.phone_number}
                      helperText= {props.passenger.phone_number ? validatePhoneNumber(props.passenger.phone_number) : ''}
                      onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'phone_number', event.target.value)}
                      fullWidth
                    />
                  </div>
                </div>
                <hr/>
              </div>
            }
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
                Save
              </Button>
            </div>
            {invalidPassenger &&
            <Alert severity="error" className="invalid-passenger-alert">Ensure all required fields are completed!</Alert>
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
      && /^(\d+-?)+\d+$/.test(passenger.phone_number)) {
      valid = true;
    }
  }
  return valid;
};

const validatePhoneNumber = (phoneNumber: string) => {
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  let validation = re.test(phoneNumber);

  if (validation && phoneNumber.length > 6){
    return '';
  } else {
    return 'Invalid phone number';
  }
};


const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validation = re.test(email);

  if (validation){
    return '';
  } else {
    return 'Invalid email address';
  }
};
