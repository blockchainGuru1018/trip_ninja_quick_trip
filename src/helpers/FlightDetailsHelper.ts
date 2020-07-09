import { Segment, FlightResultsDetails} from '../trip/results/ResultsInterfaces';

export function getFlightDetailsBySegment(segment: Segment, flightDetails: Array<FlightResultsDetails>){
  return segment.flights.map((flight: any) => {
    const filteredFlightDetails = flightDetails.filter(
      (flightResultsDetails: FlightResultsDetails) =>
        flight.flight_detail_ref === flightResultsDetails.reference
    );
    return filteredFlightDetails[0];
  }
  );
}
