
import React from 'react';
import './Search.css';
import FlightInput from './FlightInput';
import PassengerSelect from './PassengerSelect';
import CurrencySelect from './CurrencySelect';
import TripPath from './TripPath';
import TripOptions from './TripOptions';
import SearchButton from './SearchButton';
import { setValue } from '../../actions/SearchActions';

interface ISearchProps {
  searchDetails: SearchDetails,
  setValue: typeof setValue;
}

interface SearchDetails {
  flights: Array<any>
}

class Search extends React.Component<ISearchProps> {
  state = {
    numberFlights: 1
  }

  componentDidMount() {
    console.log(this.props.searchDetails.flights);
    // this.props.setValue('randomThing', '12')
  }

  render() {
    const flights = [];

    for (let i = 0; i < this.state.numberFlights; i += 1) {
      flights.push(<FlightInput key={i} />);
    };

    return (
      <div id="search-form">
        <div className="row">
          <div className="col-lg">
            <h1>Flight Search</h1>
          </div>
        </div>
        {flights}
        <div className="row">
          <button className="btn btn-add-flights" onClick={this.onAddFlight}>Add Flight</button>
        </div>
        <hr/>
        <div className="row">
          <div className="col-lg">
            <h4>Additional Details</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <PassengerSelect />
          </div>
          <div className="col-sm-3">
            <CurrencySelect />
          </div>
          <div className="col-sm-6">
            <TripOptions />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-lg-9 col-md-8">
            <TripPath />
          </div>
          <div className="col-lg-3 col-md-4">
            <SearchButton />
          </div>
        </div>
      </div>
    )
  }

  onAddFlight = () => {
    this.setState({
      numberFlights: this.state.numberFlights + 1
    });
  }

  onRemoveFlight = () => {
    this.setState({
      numberFlights: this.state.numberFlights - 1
    });
  }
}

export default Search;
