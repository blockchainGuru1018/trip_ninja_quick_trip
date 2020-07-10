import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface PassengerDateOfBirthProps {
  dateOfBirth?: string;
}

class PassengerDateOfBirth extends React.Component<PassengerDateOfBirthProps> {

  render() {
   
    return (
      <FormControl fullWidth>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            disableFuture
            variant="inline"
            inputVariant="outlined"
            format="dd/mm/yyyy"
            margin="none"
            id="passenger-dob"
            value={new Date()}
            onChange={(e: any) => {}}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }
 
}

export default PassengerDateOfBirth;