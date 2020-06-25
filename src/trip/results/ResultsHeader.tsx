import React from 'react';
import Moment from 'react-moment';
import './ItineraryResult.css';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import history from '../../History';

const ChangeSearchButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: 'var(--primary-dark)',
  border: 'solid 2px var(--primary-dark)',
  '&:hover': {
    backgroundColor: 'var(--primary-dark)',
    color: '#ffffff',
  }
});

interface ResultsHeaderProps {
  segments: Array<Segment>
  flights: Array<FlightResultsDetails>
}

class ResultsHeader extends React.Component<ResultsHeaderProps> {

  render() {
    const segmentPath = this.props.segments.map((segment: Segment, index: number) => (
      <span key={index.toString()} className="itinerary-path-text">
        {segment.origin}-{segment.destination}•{this.getDepartureDate(segment.flights[0].flight_detail_ref)}
        {index < this.props.segments.length-1 && <span> | </span>}
      </span>
    ));

    return (
      <div>
        <div className="row">
          <div className="col-xl-10 col-lg-9">
            <div className="float-right itinerary-path">
              <p>{segmentPath}</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3">
            <div className="float-right">
              <ChangeSearchButton
                variant="contained"
                onClick={() => history.push('/search/')}>
                Change Search
              </ChangeSearchButton>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }

  getDepartureDate = (flightDetailRef: number) => {
    const firstFlight: FlightResultsDetails[] = this.props.flights.filter((flight: FlightResultsDetails) => { return flight.reference === flightDetailRef; });
    return <span><Moment format="MMM DD">{firstFlight[0].departure_time}</Moment></span>;
  }
}

export default ResultsHeader;
