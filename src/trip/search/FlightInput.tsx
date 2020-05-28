import React from 'react';
import CabinSelect from './CabinSelect';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import DestinationList from '../../assets/data/airports.json';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


class FlightInput extends React.Component {
  render() {
    const destinations = DestinationList
   

    return (
      <div className="row flight-input">
        <div className="col-sm-3">
          <FormControl>
            <Autocomplete
              id="from-destination"
              options={destinations}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="From" variant="standard" InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightTakeoff />
                  </InputAdornment>
                ),
              }}  />}
            />
          </FormControl>
        </div>
        <div className="col-sm-3">
          <FormControl>
            <Autocomplete
              id="to-destination"
              options={destinations}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="To" variant="standard" InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightLand />
                  </InputAdornment>
                ),
              }}  />}
            />
          </FormControl>
        </div>
        <div className="col-sm-3">
         
        </div>
        <div className="col-sm-3">
          <CabinSelect />
        </div>
      </div>
    )
  }
}

export default FlightInput;