import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import PassengerCountrySelect from './PassengerCountrySelect';

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
      width: '1000px',
      height: 'auto'
    },
    backDrop: {
      height: '100vh'
    }
  }),
);

interface PassengerDetailsModalProps {
  loading: boolean
}

export default function PassengerDetailsModal(props: PassengerDetailsModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => setOpen(props.loading), [props.loading]);
 
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={() => <Backdrop open={open} className={classes.backDrop} />}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">Passenger Information</h3>
            <div className="row">
              <div className="col-sm-3">
                <TextField id="passenger-first-name" label="First Name" variant="outlined" fullWidth/>
              </div>
              <div className="col-sm-3">
                <TextField id="passenger-last-name" label="Last Name" variant="outlined" fullWidth />
              </div>
              <div className="col-sm-3">
                <FormControl fullWidth>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      disablePast
                      variant="inline"
                      inputVariant="outlined"
                      format="yyyy-mm-dd"
                      margin="none"
                      id="passenger-dob"
                      value={new Date()}
                      onChange={(e: any) => {}}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </div>
              <div className="col-sm-3">
                <FormControl fullWidth>
                  <Select
                    id="gender"
                    value=""
                    variant="outlined"
                  >
                    <MenuItem value="F">Female</MenuItem>
                    <MenuItem value="M">Male</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <PassengerCountrySelect />               
              </div>
              <div className="col-sm-3">
                <FormControl fullWidth>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      disablePast
                      variant="inline"
                      inputVariant="outlined"
                      format="yyyy-mm-dd"
                      margin="none"
                      id="passport-number"
                      value={new Date()}
                      onChange={(e: any) => {}}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </div>
              <div className="col-sm-3">
                <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth/>
              </div>
            </div>
            <hr/>
            <h5>Primary Passenger Contact</h5>
            <div className="row">
              <div className="col-sm-4">
                <TextField id="primary-email" label="Email" variant="outlined" fullWidth/>
              </div>
              <div className="col-sm-2">
                <TextField id="primary-area-code" label="Area Code" variant="outlined" fullWidth/>
              </div>
              <div className="col-sm-3">
                <TextField id="primary-phone-number" label="Phone Number" variant="outlined" fullWidth/>
              </div>
            </div>
            <hr/>
            <Button
              color="secondary"
              variant="contained"
            >
              Save
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}