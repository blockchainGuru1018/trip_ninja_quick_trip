import React from 'react';
import CabinSelect from './CabinSelect';
import DepartureDatePicker from './DepartureDatePicker';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import DestinationList from '../../assets/data/airports.json';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



class FlightInput extends React.Component {
  render() {
    const destinations = DestinationList

    return (
      <div className="row flight-input">
        <div className="col-sm-4">
          <FormControl fullWidth>
            <Autocomplete
              id="from-destination"
              options={destinations}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="From" variant="outlined" InputProps={{
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
        <div className="col-sm-4">
          <FormControl fullWidth>
            <Autocomplete
              id="to-destination"
              options={destinations}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="To" variant="outlined" InputProps={{
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
        <div className="col-sm-2">
          <DepartureDatePicker />
        </div>
        <div className="col-sm-2">
          <CabinSelect />
        </div>
      </div>
    )
  }
}

export default FlightInput;