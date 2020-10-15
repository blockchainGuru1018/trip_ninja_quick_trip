import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { updatePassengerInfo } from '../../actions/BookActions';
import moment from 'moment';
import i18n from '../../i18n';
import { dateLocaleMap } from '../../localeMap';

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
    return (
      <FormControl fullWidth>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocaleMap[i18n.language]}>
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
            value={moment(this.props.date).format()}
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
          this.props.index, this.props.fieldName, moment(dateEvent).format().slice(0,10)!
        )
      : '';
  };
 
}

export default PassengerDatePicker;