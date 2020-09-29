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
import Popper from '@material-ui/core/Popper';
import { updateFlightValue, removeFlight }
  from '../../actions/SearchActions';
import { Flight } from './SearchInterfaces';
import matchSorter from 'match-sorter';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FlightInputProps extends WithTranslation {
  i: number;
  updateFlightValue: typeof updateFlightValue;
  removeFlight: typeof removeFlight;
  flights: Array<Flight>;
  dateFormat: string;
}

class FlightInput extends React.Component<FlightInputProps> {
  state = {
    destinations: DestinationList,
    originOpen: false,
    destinationOpen: false
  }

  FlightInputPopper = function (props: any) {
    return (<Popper {...props} style={{ width: 'fit-content' }} placement='bottom-start' />);
  };

  render() {
    const flight = this.props.flights[this.props.i];
    const filterOptions = (options: any, { inputValue }: any) =>
      matchSorter(options, inputValue, {keys: [
        (item: any) => item.name
      ]}).slice(0,10);

    return (
      <div className="row flight-input">
        <div className="col-md-7 no-padding">
          <div className="row">
            <div className="col-md-6 search-input" ref={"flightInputRef"}>
              <FormControl fullWidth>
                <Autocomplete 
                  PopperComponent={this.FlightInputPopper}
                  autoHighlight
                  autoSelect
                  forcePopupIcon={false}
                  filterOptions={filterOptions}
                  id={"from-destination" + this.props.i}
                  options={this.state.destinations}
                  getOptionLabel={(option: any) => option.name}
                  onChange={(_, values) => {
                    this.setState({'originOpen': false});
                    this.updateFlightType(values, 'origin');
                  }}
                  open={this.state.originOpen}
                  value={this.getDestinationByName(flight.origin) || null}
                  renderInput={(params) =>
                    <TextField {...params}
                      variant="outlined"
                      placeholder={this.props.t("search.flightInput.origin")}
                      onChange={(e) => this.setState({'originOpen': e.target.value !== ''})}
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
            <div className="col-md-6 search-input">
              <FormControl fullWidth>
                <Autocomplete 
                  PopperComponent={this.FlightInputPopper}
                  autoHighlight
                  autoSelect
                  forcePopupIcon={false}
                  filterOptions={filterOptions}
                  id={"to-destination" + this.props.i}
                  options={this.state.destinations}
                  getOptionLabel={(option) => option.name}
                  open={this.state.destinationOpen}
                  onChange={(_, values) => {
                    this.setState({'destinationOpen': false});
                    this.updateFlightType(values, 'destination');
                  }}
                  value={this.getDestinationByName(flight.destination) || null}
                  renderInput={(params) =>
                    <TextField {...params}
                      variant="outlined"
                      placeholder={this.props.t("search.flightInput.destination")}
                      onChange={(e) => this.setState({'destinationOpen': e.target.value !== ''})}
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
          </div>
        </div>
        <div className="col-md-5 no-padding">
          <div className="row">
            <div className="col-md-6 search-input">
              <DepartureDatePicker
                i={this.props.i}
                departureDate={flight.departureDate}
                updateFlightValue={this.props.updateFlightValue}
                dateFormat={this.props.dateFormat}
                previousDate= {this.props.i > 0 ? this.props.flights[this.props.i-1].departureDate : ''}
              />
            </div>
            <div className="col-md-4 col-sm-10 search-input cabin-selector-container">
              <CabinSelect
                i={this.props.i}
                cabinClass={flight.cabinClass}
                updateFlightValue={this.props.updateFlightValue}/>
            </div>
            {this.props.flights.length > 1
              && <div className='col-md-2 col-sm-2 flight-remove-container'>
                <IconButton onClick={() => this.props.removeFlight(this.props.i)}>
                  <CloseIcon fontSize="large" color="secondary"/>
                </IconButton>
              </div>
            }
          </div>
        </div>
      </div>
    );
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
      ? this.props.updateFlightValue(this.props.i, flightType, values.name)
      : this.props.updateFlightValue(this.props.i, flightType, '');
  }
}

export default withTranslation('common')(FlightInput);

