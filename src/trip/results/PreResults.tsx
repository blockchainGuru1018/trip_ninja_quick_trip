import React from 'react';
import './Results.css';
import '../../index.css';
import PreResultsFlightSections from './PreResultsFlightSections';
import Button from '@material-ui/core/Button';
import history from '../../History';
import { ResultsDetails } from './ResultsInterfaces';
import { createPassengersString } from '../../helpers/PassengersListHelper';
import { invalidFlexTripResult } from '../../helpers/FlexTripResultHelper';
import { setActiveSegments, setTripType, updateStateValue } from '../../actions/ResultsActions';
import { withTranslation, WithTranslation } from 'react-i18next';

interface PreResultsProps extends WithTranslation {
  resultsDetails: ResultsDetails;
  currency: string;
  setTripType: typeof setTripType;
  setActiveSegments: typeof setActiveSegments;
  updateStateValue: typeof updateStateValue;
}

export class PreResults extends React.Component<PreResultsProps> {
  state = {
    fareStructurePassengersString: '',
    flexTripPassengersString: ''
  }

  componentDidMount() {
    this.validateFlexTripResult();
    return this.props.resultsDetails.fareStructureResults
      ? this.setState({
        fareStructurePassengersString: createPassengersString(
          this.props.resultsDetails.fareStructureResults.segments[0]
        ),
        flexTripPassengersString: createPassengersString(
          this.props.resultsDetails.flexTripResults!.segments[0]
        )
      })
      : '';
  }

  componentDidUpdate() {
    this.validateFlexTripResult();
  }

  render() {
    const results = this.props.resultsDetails;

    return (
      <div className="row">
        <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 default-form" id="pre-results-form">
          <h1 className="pre-results-title">{this.props.t("results.preResults.yourTrip")}</h1>
          <div className="row">
            <div className="col-xl-4 offset-xl-1 col-md-4 offset-md-4 col-sm-6 offset-sm-3 flight-option-container-fare" id='fare-structure-pre-result'>
              <div className="default-box-styles flight-option-box">
                <p className="pre-result-subtitle">{this.props.t("results.preResults.yourTrip")}</p>
                <p className="standard-text">
                  {this.props.t("results.preResults.from") + ': ' + this.props.resultsDetails.fareStructureResultsPrice + ' ' + this.props.currency}
                </p>
                <p className="standard-text text-small">
                  {this.state.fareStructurePassengersString}
                </p>
                <hr/>
                {results
                  && <PreResultsFlightSections resultsDetails={results.fareStructureResults}/>
                }
              </div>
              <div className="flight-options-btn-container">
                <Button
                  disableElevation
                  variant="contained"
                  className="btn-flight-options"
                  onClick={() => {
                    this.props.setTripType('fareStructureResults');
                    this.props.setActiveSegments();
                    history.push('/results/itinerary/');
                  }}>
                  {this.props.t("results.preResults.seeFlightOptions")}
                </Button>
              </div>
            </div>
            <div className="col-xl-4 offset-xl-2 col-md-4 offset-md-4 flight-option-container-flex col-sm-6 offset-sm-3" id='flex-trip-pre-result'>
              <div className="default-box-styles flight-option-box">
                <p className="pre-result-subtitle">
                  {this.props.t("results.preResults.reorderDestinationsPrompt") + (this.props.resultsDetails.fareStructureResultsPrice - this.props.resultsDetails.flexTripResultsPrice)}
                </p>
                <p className="standard-text">
                  {this.props.t("results.preResults.from") + ': ' + this.props.resultsDetails.flexTripResultsPrice + ' ' + this.props.currency}
                </p>
                <p className='standard-text text-small'>
                  {this.state.flexTripPassengersString}
                </p>
                <hr/>
                {results
                  && <PreResultsFlightSections resultsDetails={results.flexTripResults}/>
                }
              </div>
              <div className="flight-options-btn-container">
                <Button
                  disableElevation
                  variant="contained"
                  className="btn-flight-options"
                  onClick={() => {
                    this.props.setTripType('flexTripResults');
                    this.props.setActiveSegments();
                    history.push('/results/itinerary/');
                  }}>
                  {this.props.t("results.preResults.seeFlightOptions")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  validateFlexTripResult = () => {
    const results: ResultsDetails = this.props.resultsDetails;
    if (results.flexTripResults && results.fareStructureResults) {
      return invalidFlexTripResult(results, this.props.updateStateValue) ? history.push('/results/itinerary/') : '';
    }
  };
}

export default withTranslation('common')(PreResults);
