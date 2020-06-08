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
  dateFormat: string
}

class DepartureDatePicker extends React.Component<DepartureDatePickerProps> {

  setDateChange = (dateEvent: any) => {
    return dateEvent
      ? isNaN(dateEvent.valueOf())
        ? ''
        : this.props.updateFlightValue(
          this.props.i, 'departureDate', dateEvent?.toISOString()!
        )
      : '';
  };

  render() {
    return(
      <FormControl fullWidth>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            disablePast
            variant="inline"
            inputVariant="outlined"
            format={this.props.dateFormat}
            margin="none"
            id={"departure-date"+this.props.i}
            value={new Date(this.props.departureDate)}
            onChange={e => this.setDateChange(e)}
            InputAdornmentProps={{ position: 'start'}}
            KeyboardButtonProps={{
              'aria-label': 'Without label',
            }}
            keyboardIcon={<TodayIcon color="primary"/>}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }
}

export default DepartureDatePicker;