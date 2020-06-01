import React from 'react';
import CabinSelect from './CabinSelect';
import DepartureDatePicker from './DepartureDatePicker';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FlightLand from '@material-ui/icons/FlightLand';
import DestinationList from '../../assets/data/airports.json';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { updateFlightValue, updateFlightOriginDestination, removeFlight }
  from '../../actions/SearchActions';
import { Flight } from './Interfaces';

interface FlightInputProps {
  i: number;
  updateFlightValue: typeof updateFlightValue;
  updateFlightOriginDestination: typeof updateFlightOriginDestination;
  removeFlight: typeof removeFlight;
  flights: Array<Flight>;
}

class FlightInput extends React.Component<FlightInputProps> {
  state = {
    destinations: DestinationList
  }

  render() {
    const flight = this.props.flights[this.props.i];

    return (
      <div className="row flight-input">
        <div className="col-sm-3">
          <FormControl fullWidth>
            <Autocomplete
              id={"from-destination" + this.props.i}
              options={this.state.destinations}
              getOptionLabel={(option) => option.name}
              onChange={(_, values) => this.updateFlightType(values, 'origin')}
              defaultValue={this.getDestinationByName(flight.origin)}
              renderInput={(params) =>
                <TextField {...params}
                  variant="outlined"
                  placeholder="From"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoff />
                      </InputAdornment>
                    ),
                  }}
                />
              }
            />
          </FormControl>
        </div>
        <div className="col-sm-3">
          <FormControl fullWidth>
            <Autocomplete
              id={"to-destination" + this.props.i}
              options={this.state.destinations}
              getOptionLabel={(option) => option.name}
              onChange={(_, values) =>
                this.updateFlightType(values, 'destination')
              }
              defaultValue={this.getDestinationByName(flight.destination)}
              renderInput={(params) =>
                <TextField {...params}
                  variant="outlined"
                  placeholder="To"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLand />
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
            departureDate={flight.departureDate}
            updateFlightValue={this.props.updateFlightValue}/>
        </div>
        <div className="col-sm-2">
          <CabinSelect
            i={this.props.i}
            cabinClass={flight.cabinClass}
            updateFlightValue={this.props.updateFlightValue}/>
        </div>
        {this.props.flights.length > 1
          ? <div className='col-sm-2 flight-remove-container'>
            <IconButton onClick={() => this.props.removeFlight(this.props.i)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          : ''
        }
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

  updateFlightType = (values: any, flightType: string) => {
    return values
      ? this.props.updateFlightOriginDestination(this.props.i, flightType, values.name)
      : '';
  }
}

export default FlightInput;