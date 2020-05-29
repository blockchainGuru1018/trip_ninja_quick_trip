import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { updateFlightValue } from '../../actions/SearchActions';

interface DepartureDatePickerProps {
  i: number;
  departureDate: string;
  updateFlightValue: typeof updateFlightValue;
}

class DepartureDatePicker extends React.Component<DepartureDatePickerProps> {
  render() {

    return(
      <FormControl fullWidth>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            disablePast
            variant="inline"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            margin="none"
            id="departure-date"
            value={
              this.props.departureDate === ''
                ? new Date()
                : this.props.departureDate
            }
            onChange={e =>
              this.props.updateFlightValue(
                this.props.i, 'departureDate', e?.toISOString()!
              )
            }
            InputAdornmentProps={{ position: "start" }}
            KeyboardButtonProps={{
              'aria-label': 'Without label',
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    )
  }

  setDate = (date: Date | null) => {
    console.log(date)
    console.log(typeof(date))
    console.log(date?.toISOString())
  }
}

export default DepartureDatePicker;