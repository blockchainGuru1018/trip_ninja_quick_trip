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
import { updateFlightValue } from '../../actions/SearchActions';
import { Flight } from './Interfaces';

interface FlightInputProps {
  i: number
  flight: Flight
  updateFlightValue: typeof updateFlightValue
}

class FlightInput extends React.Component<FlightInputProps> {
  state = {
    destinations: DestinationList
  }

  render() {
    return (
      <div className="row flight-input">
        <div className="col-sm-4">
          <FormControl fullWidth>
            <Autocomplete
              id={"from-destination" + this.props.i}
              options={this.state.destinations}
              getOptionLabel={(option) => option.name}
              onChange={(_, values) => this.updateFlightType(values, 'origin')}
              defaultValue={this.getDestinationByName(this.props.flight.origin)}
              renderInput={(params) =>
                <TextField {...params}
                  variant="outlined"
                  placeholder="From"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoff color="primary"/>
                      </InputAdornment>
                    ),
                  }}
                />
              }
            />
          </FormControl>
        </div>
        <div className="col-sm-4">
          <FormControl fullWidth>
            <Autocomplete
              id={"to-destination" + this.props.i}
              options={this.state.destinations}
              getOptionLabel={(option) => option.name}
              onChange={(_, values) =>
                this.updateFlightType(values, 'destination')
              }
              defaultValue={this.getDestinationByName(this.props.flight.destination)}
              renderInput={(params) =>
                <TextField {...params}
                  variant="outlined"
                  placeholder="To"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLand color="primary"/>
                      </InputAdornment>
                    ),
                  }}
                />
              }
            />
          </FormControl>
        </div>
        <div className="col-sm-2">
          <DepartureDatePicker
            i={this.props.i}
            departureDate={this.props.flight.departureDate}
            updateFlightValue={this.props.updateFlightValue}/>
        </div>
        <div className="col-sm-2">
          <CabinSelect
            i={this.props.i}
            cabinClass={this.props.flight.cabinClass}
            updateFlightValue={this.props.updateFlightValue}/>
        </div>
      </div>
    )
  }

  getDestinationByName = (name: string) => {
    const destinationsList: Array<any> = this.state.destinations;
    const index: number = destinationsList.findIndex(
      (destination: any) => destination.name === name
    );
    return destinationsList[index];
  }

  updateFlightType = (values: any, flightType: string) =>
    values
      ? this.props.updateFlightValue(this.props.i, flightType, values.name)
      : '';
}

export default FlightInput;