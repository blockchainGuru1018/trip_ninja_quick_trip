import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DepartureDatePicker() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <FormControl fullWidth>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          disablePast
          variant="inline"
          inputVariant="outlined"
          format="MM/dd/yyyy"
          margin="none"
          id="date-picker-inline"
          value={selectedDate}
          onChange={handleDateChange}
          InputAdornmentProps={{ position: "start" }}
          KeyboardButtonProps={{
            'aria-label': 'Without label',
          }}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}
