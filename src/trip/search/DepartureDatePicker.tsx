import 'date-fns';
import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import TodayIcon from '@material-ui/icons/Today';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { updateFlightValue } from '../../actions/SearchActions';

interface DepartureDatePickerProps {
  i: number;
  departureDate: string;
  updateFlightValue: typeof updateFlightValue;
  dateFormat: string
  previousDate?: string
}

export default function DepartureDatePicker(props: DepartureDatePickerProps) {
  const [errorText, setErrorText] = useState('');
  
  const validateDate = (departureDate: string) => {
    return (props.previousDate ? departureDate < props.previousDate : false) ? 'Invalid departure date' : '';
  };

  useEffect(() =>
    setErrorText(validateDate(props.departureDate)), 
  [validateDate, props.departureDate]);

  

  const setDateChange = (dateEvent: any) => {
    if (dateEvent && !isNaN(dateEvent.valueOf())) {
      validateDate(dateEvent.toISOString());
    }

    return dateEvent
      ? isNaN(dateEvent.valueOf())
        ? ''
        : props.updateFlightValue(props.i, 'departureDate', dateEvent?.toISOString()!)
      : '';
  };

  return(
    <FormControl fullWidth>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          disablePast
          variant="inline"
          inputVariant="outlined"
          format={props.dateFormat}
          margin="none"
          id={"departure-date" + props.i}
          value={new Date(props.departureDate)}
          onChange={(e: any) => setDateChange(e)}
          InputAdornmentProps={{ position: 'start'}}
          helperText= {errorText}
          KeyboardButtonProps={{
            'aria-label': 'Without label',
          }}
          keyboardIcon={<TodayIcon color="primary"/>}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}