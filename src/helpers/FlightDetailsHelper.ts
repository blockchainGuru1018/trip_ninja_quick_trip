import { Segment, FlightResultsDetails} from '../trip/results/ResultsInterfaces';

export function getFlightDetailsBySegment(segment: Segment, flightDetails: Array<FlightResultsDetails>){
  return segment.flights.map((flight: any) => {
    const filteredFlightDetails = flightDetails.filter(
      (flightDetails: FlightResultsDetails) =>
        flight.flight_detail_ref === flightDetails.reference
    );
    return filteredFlightDetails[0];
  }
  );
}
