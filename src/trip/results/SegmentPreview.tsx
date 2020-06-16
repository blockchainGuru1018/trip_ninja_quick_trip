import React from 'react';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import '../../index.css';

interface SegmentPreviewProps {
  segments: Array<Segment>
  flightDetails: Array<FlightResultsDetails>
}

class SegmentPreview extends React.Component<SegmentPreviewProps> {

  render() {
    return (
      <div>
        {this.setSegmentsHTML()}
      </div>
    );
  }

  setFlightLogoHTML = (segment: Segment) => {
    const flights = segment.flights.map((flight: any) => {
      const filteredFlightDetails = this.props.flightDetails.filter(
        (flightDetails: FlightResultsDetails) => flight.flight_details_ref === flightDetails.reference);
      return filteredFlightDetails[0];
    });
    console.log(flights);
    return(
      <div className="col-sm-2 airline-logo-container">
        <div>
          <img
            className='img-airline-logo'
            src="https://www.aeroportdequebec.com/sites/default/files/2016-06/air-canada-picto_1.gif"
          ></img>
          <img
            className='img-airline-logo img-logo-top'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSCS9zvoNn_JxnpcuFv_kayJUF0Sl4PojhxmkUSVBO8rX2wX-GF&usqp=CAU"
          ></img>
        </div>
        <div>
          <p className="text-bold">UA1234</p>
          <p className="text-small">United</p>
        </div>
      </div>
    );
  }

  setSegmentsHTML = () => {
    return this.props.segments.map((segment: Segment, index: number) => (
      <div className="row segment-preview" key={index.toString()}>
        <div className="col-sm-2">
          <p className="origin-destination flight-preview-grey-border">{segment.origin}<span className="circle-divider">•</span>{segment.destination}</p>
          <p className="text-small flight-preview-grey-border">May 16</p>
        </div>
        {this.setFlightLogoHTML(segment)}
        <div className="col-sm-2">
          <p className="text-bold">15:00-16:00</p>
          <p className="text-small">1 h 20 m</p>
        </div>
        <div className="col-sm-2">
          <p className="text-bold">Direct</p>
        </div>
        <div className="col-sm-2">
          <p className="text-bold">{segment.fare_type}</p>
          <p className="text-small">X Class</p>
        </div>
        <div className="col-sm-1 baggage-icon-container">
          <CardTravelIcon
            color="primary"
            fontSize="large"
            className='card-travel-icon'
          />
          <p className='p-no-margin'>1 pc</p>
        </div>
        <div className="col-sm-1 icon-expand-preview">
          <ExpandMoreIcon color="secondary" fontSize="large"/>
        </div>
      </div>
    ));
  }
}

export default SegmentPreview;
