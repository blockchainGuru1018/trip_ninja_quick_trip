import React from 'react';
import './Results.css';
import '../../index.css';
import PreResultsFlightSections from './PreResultsFlightSections';
import Button from '@material-ui/core/Button';
import history from '../../History';
import { ResultsDetails } from './ResultsInterfaces';

interface PreResultsProps {
  resultsDetails: ResultsDetails
}

class PreResults extends React.Component<PreResultsProps> {

  state = {
    flexPrice: 0,
    farePrice: 0
  }

  createPathSequence = (pathSequence: Array<string>) => {
    const path: Array<string> = pathSequence.map((path: string) => path.slice(0,3));
    path.push(pathSequence[0].slice(4));
  }

  componentDidMount() {
    const flexTripValidResult: boolean = this.compareFlexTripPrice();
    return flexTripValidResult
      ? ''
      : history.push('/results/itinerary/');
  }

  compareFlexTripPrice = () => {
    let flexTripValid: boolean =  false;
    const results: ResultsDetails = this.props.resultsDetails;
    if(results.flexTripResults && results.fareStructureResults) {
      const flexPrice: number = results.flexTripResults.segments.reduce((total, segment) =>
      {return total + segment[0].price;}, 0
      );
      const farePrice: number = results.fareStructureResults.segments.reduce((total, segment) =>
      {return total + segment[0].price;},0
      );
      flexTripValid = flexPrice <= farePrice;
      this.setState({
        farePrice: farePrice,
        flexPrice: flexPrice
      });
    }
    return flexTripValid;
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1" id="search-form">
          <h1 className="pre-results-title">Your Trip</h1>
          <div className="row">
            <div className="col-xl-4 offset-xl-1 col-md-8 offset-md-2 flight-option-container-fare">
              <div className="default-box-styles flight-option-box">
                <p className="pre-result-subtitle">Your Trip</p>
                <p className="standard-text">
                  {'From ' + this.state.farePrice + ' CAD'}
                </p>
                <p className="standard-text small-standard-text">
                  1 ADT, 2 CHD
                </p>
                <hr/>
                <PreResultsFlightSections />
              </div>
              <div className="flight-options-btn-container">
                <Button
                  variant="contained"
                  className="btn-flight-options"
                >See flight options</Button>
              </div>
            </div>
            <div className="col-xl-4 offset-xl-2 col-md-8 offset-md-2 flight-option-container-flex">
              <div className="default-box-styles flight-option-box">
                <p className="pre-result-subtitle">
                  Reorder destinations to save up to: $300
                </p>
                <p className="standard-text">
                  {'From ' + this.state.flexPrice + 'CAD'}
                </p>
                <p className='standard-text small-standard-text'>
                  1 ADT, 2 CHD
                </p>
                <hr/>
                <PreResultsFlightSections />
              </div>
              <div className="flight-options-btn-container">
                <Button
                  variant="contained"
                  className="btn-flight-options"
                >See flight options</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreResults;