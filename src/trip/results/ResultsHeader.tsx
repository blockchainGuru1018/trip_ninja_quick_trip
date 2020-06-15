import React from 'react';
import './ItineraryResult.css';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { dateFormatMonthDay } from '../../helpers/DateHelpers';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';

const ChangeSearchButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: '#45565E',
  border: 'solid 2px #45565E',
  '&:hover': {
    backgroundColor: '#45565E',
    color: '#ffffff',
  }
});

interface ResultsHeaderProps {
  tripInfo: any
  flights: any
}

class ResultsHeader extends React.Component<ResultsHeaderProps> {

  render() {
    const segmentPath = this.props.tripInfo.map((segment: Segment, index: number) => (
      <span key={index.toString()}>
        {segment.origin}-{segment.destination}•{this.getDepartureDate(segment.flights[0].flight_detail_ref)}
        {index < this.props.tripInfo.length-1 && <span> | </span>}
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
                href="/search">
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
    const firstFlight: FlightResultsDetails = this.props.flights.filter((flight: FlightResultsDetails) => { return flight.reference === flightDetailRef; });
    return <span>{dateFormatMonthDay(new Date(firstFlight[0].departure_time))}</span>;
  }
}

export default ResultsHeader;
