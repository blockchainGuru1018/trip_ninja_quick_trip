import React from 'react';
import './Results.css';
import '../../index.css';
import PreResultsFlightSections from './PreResultsFlightSections';
import Button from '@material-ui/core/Button';
import history from '../../History';
import { ResultsDetails } from './ResultsInterfaces';
import { createPassengersString } from '../../helpers/PassengersListHelper';
import { setTripType } from '../../actions/ResultsActions';


interface PreResultsProps {
  resultsDetails: ResultsDetails;
  currency: string
  setTripType: typeof setTripType

}

class PreResults extends React.Component<PreResultsProps> {

  state = {
    flexPrice: 0,
    farePrice: 0,
    fareStructurePassengersString: '',
    flexTripPassengersString: ''
  }

  componentDidMount() {
    this.compareFlexTripPrice();
    return this.props.resultsDetails.fareStructureResults
      ? this.setState({
        fareStructurePassengersString: createPassengersString(
          this.props.resultsDetails.fareStructureResults.segments[0]
        ),
        flexTripPassengersString: createPassengersString(
          this.props.resultsDetails.flexTripResults?.segments[0]
        )
      })
      : '';
  }

  render() {
    const results = this.props.resultsDetails;

    return (
      <div className="row">
        <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 default-form" id="pre-results-form">
          <h1 className="pre-results-title">Your Trip</h1>
          <div className="row">
            <div className="col-xl-4 offset-xl-1 col-md-4 offset-md-4 col-sm-6 offset-sm-3 flight-option-container-fare" id='fare-structure-pre-result'>
              <div className="default-box-styles flight-option-box">
                <p className="pre-result-subtitle">Your Trip</p>
                <p className="standard-text">
                  {'From: ' + this.state.farePrice + ' ' + this.props.currency}
                </p>
                <p className="standard-text small-standard-text">
                  {this.state.fareStructurePassengersString}
                </p>
                <hr/>
                {results
                  && <PreResultsFlightSections resultsDetails={results.fareStructureResults}/>
                }
              </div>
              <div className="flight-options-btn-container">
                <Button
                  variant="contained"
                  className="btn-flight-options"

                  onClick={() => {this.props.setTripType('fareStructureResults'); history.push('/results/itinerary/');}}
                >See flight options</Button>
              </div>
            </div>
            <div className="col-xl-4 offset-xl-2 col-md-4 offset-md-4 flight-option-container-flex col-sm-6 offset-sm-3" id='flex-trip-pre-result'>
              <div className="default-box-styles flight-option-box">
                <p className="pre-result-subtitle">
                  {'Reorder destinations to save up to: $' + (this.state.farePrice - this.state.flexPrice)}
                </p>
                <p className="standard-text">
                  {'From: ' + this.state.flexPrice + ' ' + this.props.currency}
                </p>
                <p className='standard-text small-standard-text'>
                  {this.state.flexTripPassengersString}
                </p>
                <hr/>
                {results
                  && <PreResultsFlightSections resultsDetails={results.flexTripResults}/>
                }
              </div>
              <div className="flight-options-btn-container">
                <Button
                  variant="contained"
                  className="btn-flight-options"
                  onClick={() => {this.props.setTripType('flexTripResults'); history.push('/results/itinerary/');}}
                >See flight options</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  compareFlexTripPrice = () => {
    const results: ResultsDetails = this.props.resultsDetails;
    if (results.flexTripResults && results.fareStructureResults) {
      const flexPrice: number = results.flexTripResults.segments.reduce((total, segment) =>
      {return total + segment[0].price;}, 0
      );
      const farePrice: number = results.fareStructureResults.segments.reduce((total, segment) =>
      {return total + segment[0].price;},0
      );
      this.setState({
        farePrice: Math.round(farePrice),
        flexPrice: Math.round(flexPrice)
      });
      return flexPrice >= farePrice ? history.push('/results/itinerary/') : '';
    } else {
      return history.push('/results/itinerary/');
    }
  }
}

export default PreResults;