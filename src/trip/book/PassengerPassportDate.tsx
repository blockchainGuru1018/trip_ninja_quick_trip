import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { updatePassengerInfo } from '../../actions/BookActions';

interface PassengerPassportNumberProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  passportDate?: string;
}

class PassengerPassportNumber extends React.Component<PassengerPassportNumberProps> {

  render() {
   
    return (
      <FormControl fullWidth>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            disablePast
            variant="inline"
            inputVariant="outlined"
            label="Passport Expiration"
            format="dd/mm/yyyy"
            margin="none"
            id="passport-date"
            value={new Date()}
            onChange={(e: any) => {}}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }
 
}

export default PassengerPassportNumber;