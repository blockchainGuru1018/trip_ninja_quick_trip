import 'date-fns';
import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import TodayIcon from '@material-ui/icons/Today';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { updateFlightValue } from '../../actions/SearchActions';
import i18n from '../../i18n';
import localeMap from '../../localeMap';


interface DepartureDatePickerProps {
  i: number;
  departureDate: string;
  updateFlightValue: typeof updateFlightValue;
  dateFormat: string
  previousDate?: string
}

export default function DepartureDatePicker(props: DepartureDatePickerProps) {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const validateDate = (departureDate: string) => {
      setErrorText((props.previousDate ? departureDate < props.previousDate : false) ? 'Invalid departure date' : '');
    };
    validateDate(props.departureDate);
  });
  

  const setDateChange = (dateEvent: any) => {
    return dateEvent
      ? isNaN(dateEvent.valueOf())
        ? ''
        : props.updateFlightValue(props.i, 'departureDate', dateEvent?.toISOString()!)
      : '';
  };

  return(
    <FormControl fullWidth>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[i18n.language]}>
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
