import 'date-fns';
import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import TodayIcon from '@material-ui/icons/Today';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getPriceGraph, updateFlightValue } from '../../actions/SearchActions';
import i18n from '../../i18n';
import { dateLocaleMap } from '../../localeMap';
import { currencySymbol } from '../../helpers/CurrencySymbolHelper';
import { priceParser } from "../../helpers/MiscHelpers";
import { PriceGraphPayload } from "./SearchInterfaces";

interface DepartureDatePickerProps {
  i: number;
  departureDate: string;
  updateFlightValue: typeof updateFlightValue;
  dateFormat: string
  previousDate?: string
  origin:string
  destination:string
  currency: string
  cabinClass: string
  priceGraph: any
  getPriceGraph: typeof getPriceGraph
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
        : props.updateFlightValue(props.i, 'departureDate', dateEvent.toISOString()!)
      : '';
  };

  const renderDayInPicker = (day: any, selectedDate: any, dayInCurrentMonth: any, dayComponent:any) => {
    let price = props.priceGraph[day.toISOString().slice(0,10)]
      ? currencySymbol(props.currency) + priceParser(props.priceGraph[day.toISOString().slice(0,10)]) : '';
    return (
      <div className='date-price-container'>
        {dayComponent}
        <span className='price-graph-label'>{price}</span>
      </div>
    );
  };

  const onPickerViewChange = (date: any) => {
    let priceGraphPayload: PriceGraphPayload = {
      'origin': props.origin,
      'destination': props.destination,
      'year':date.getFullYear(),
      'month':date.getMonth() + 1,
      'currency':props.currency,
      'cabin_class':props.cabinClass,
    };
    props.getPriceGraph(priceGraphPayload);
  };

  const onOpenPicker = () => {
    onPickerViewChange(new Date(props.departureDate));
  };

  return(
    <FormControl fullWidth>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocaleMap[i18n.language]}>
        <KeyboardDatePicker
          autoOk
          disableToolbar
          disablePast
          variant="inline"
          inputVariant="outlined"
          renderDay={renderDayInPicker}
          format={props.dateFormat}
          margin="none"
          id={"departure-date" + props.i}
          value={new Date(props.departureDate)}
          onChange={(e: any) => setDateChange(e)}
          onMonthChange={onPickerViewChange}
          onYearChange={onPickerViewChange}
          onOpen={onOpenPicker}
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
