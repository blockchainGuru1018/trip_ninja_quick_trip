import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import TodayIcon from '@material-ui/icons/Today';
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
            id={"departure-date"+this.props.i}
            value={new Date(this.props.departureDate)}
            onChange={e =>
              this.props.updateFlightValue(
                this.props.i, 'departureDate', e?.toISOString()!
              )
            }
            InputAdornmentProps={{ position: 'start'}}
            KeyboardButtonProps={{
              'aria-label': 'Without label',
            }}
            keyboardIcon={<TodayIcon color="primary"/>}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    )
  }
}

export default DepartureDatePicker;