import React from 'react';
import Moment from 'react-moment';
import './ItineraryResult.css';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import history from '../../History';
import { withTranslation, WithTranslation } from 'react-i18next';

const ChangeSearchButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: 'var(--secondary)',
  border: 'solid 2px var(--secondary)',
  '&:hover': {
    backgroundColor: 'var(--secondary)',
    color: '#ffffff',
  }
});

const BackToFlexTripButton = styled(Button)({
  color: 'var(--tertiary)',
});

interface ResultsHeaderProps extends WithTranslation {
  segments: Array<Segment>
  pathSequence: Array<string>
  flights: Array<FlightResultsDetails>
  flexTripResults: boolean
}

class ResultsHeader extends React.Component<ResultsHeaderProps> {

  render() {
    const segmentPath = this.props.segments.map((segment: Segment, index: number) => (
      <span key={index.toString()} className="itinerary-path-text">
        {this.props.pathSequence[index]}•{this.getDepartureDate(segment.flights[0].flight_detail_ref)}
        {index < this.props.segments.length-1 && <span> | </span>}
      </span>
    ));

    return (
      <div>
        <div className="row">
          { this.props.flexTripResults &&
          <div className="col-xl-2 col-lg-3">
            <div className="float-left">
              <BackToFlexTripButton
                startIcon={<KeyboardBackspaceIcon />}
                onClick={() => history.push('/results/pre-results/')}>
                {this.props.t("results.resultsHeader.backToFlexTrip")}
              </BackToFlexTripButton>
            </div>
          </div>
          }
          <div className={this.props.flexTripResults ? 'col-xl-8 col-lg-6' : 'col-xl-10 col-lg-9'}>
            <div className="float-right itinerary-path">
              <p>{segmentPath}</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3">
            <div className="float-right">
              <ChangeSearchButton
                variant="contained"
                onClick={() => history.push('/search/')}
                disableElevation
              >
                {this.props.t("results.resultsHeader.changeSearch")}
              </ChangeSearchButton>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }

  getDepartureDate = (flightDetailRef: string) => {
    const firstFlight: FlightResultsDetails[] = this.props.flights.filter((flight: FlightResultsDetails) => { return flight.reference === flightDetailRef; });
    return <span><Moment format="MMM DD">{firstFlight[0].departure_time}</Moment></span>;
  }
}

export default withTranslation('common')(ResultsHeader);
