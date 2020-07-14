import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PassengerCountrySelect from './PassengerCountrySelect';
import PassengerDateOfBirth from './PassengerDateOfBirth';
import PassengerPassportDate from './PassengerPassportDate';
import PassengerGenderSelect from './PassengerGenderSelect';
import { PassengerInfo } from './BookInterfaces';
import { updatePassengerInfo } from '../../actions/BookActions';


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
  passengers: Array<PassengerInfo>
  currentPassengerIndex: number
  updatePassengerInfo: typeof updatePassengerInfo
}

export default function PassengerDetailsModal(props: PassengerDetailsModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => setOpen(props.modalState), [props.modalState]);
  let passenger: PassengerInfo = props.passengers[props.currentPassengerIndex];
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
            <h3 id="transition-modal-title">Passenger Information</h3>
            <div className="row passenger-form-row">
              <div className="col-sm-3">
                <TextField 
                  id="passenger-first-name" 
                  label="First Name" 
                  variant="outlined" 
                  value={passenger.first_name}
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
                  value={passenger.last_name}
                  onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'last_name', event.target.value)}
                  fullWidth
                  required
                />
              </div>
              <div className="col-sm-3">
                <PassengerDateOfBirth 
                  dateOfBirth={passenger.date_of_birth}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
                />
              </div>
              <div className="col-sm-3">
                <PassengerGenderSelect 
                  gender={passenger.gender}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
                />
              </div>
            </div>
            <div className="row passenger-form-row">
              <div className="col-sm-3">
                <PassengerCountrySelect 
                  country={passenger.passport_country}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
                />               
              </div>
              <div className="col-sm-3">
                <TextField 
                  id="passport-number" 
                  label="Passport Number" 
                  variant="outlined" 
                  value={passenger.passport_number}
                  onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'passport_number', event.target.value)}
                  fullWidth/>                
              </div>
              <div className="col-sm-3">
                <PassengerPassportDate 
                  passportDate={passenger.passport_expiration}
                  index={props.currentPassengerIndex}
                  updatePassengerInfo={props.updatePassengerInfo}
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
                      value={passenger.email}
                      onChange={(event: any) => props.updatePassengerInfo(props.currentPassengerIndex, 'email', event.target.value)}
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-3">
                    <TextField 
                      id="primary-phone-number" 
                      label="Phone Number" 
                      variant="outlined"
                      value={passenger.phone_number}
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
                onClick={() => {setOpen(false);
                  props.updatePassengerInfo(props.currentPassengerIndex, 'updated', 'true');
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}