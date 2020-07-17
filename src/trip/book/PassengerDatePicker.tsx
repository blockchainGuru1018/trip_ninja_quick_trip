import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { updatePassengerInfo } from '../../actions/BookActions';

interface PassengerDatePickerProps {
  index: number;
  updatePassengerInfo: typeof updatePassengerInfo;
  date?: string;
  fieldName: string;
  label: string;
  disablePast: boolean;
  dateFormat: string;
}

class PassengerDatePicker extends React.Component<PassengerDatePickerProps> {

  render() {   
    let dateValue = this.props.date ? new Date(this.props.date!) : new Date();
    return (
      <FormControl fullWidth>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            {...(this.props.disablePast ? {disablePast: true} : {disableFuture: true})}
            variant="inline"
            inputVariant="outlined"
            autoOk
            label={this.props.label}
            format={this.props.dateFormat}
            openTo="year"
            views={["year", "month", "date"]}
            margin="none"
            value={dateValue}
            onChange={(e: any) => this.setDateChange(e)}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }

  setDateChange = (dateEvent: any) => {
    return dateEvent
      ? isNaN(dateEvent.valueOf())
        ? ''
        : this.props.updatePassengerInfo(
          this.props.index, this.props.fieldName, dateEvent?.toISOString().slice(0,10)!
        )
      : '';
  };
 
}

export default PassengerDatePicker;