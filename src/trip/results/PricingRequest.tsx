import React from 'react';
import Button from '@material-ui/core/Button';
import { ResultsDetails, Results, Segment, FlightResult} from './ResultsInterfaces';
import { PricingRequestItinerary, FlightSegment, Flight, Credentials, PricingRequestInterface } from './PricingInterfaces';
import { priceFlights } from '../../actions/PricingActions';
import history from '../../History';
import { AuthDetails } from '../../auth/AuthInterfaces';
import moment from 'moment';

interface PricingRequestProps{
  resultsDetails: ResultsDetails,
  currency: string,
  totalPrice: number,
  selectedTrip: Array<Segment>,
  priceFlights: typeof priceFlights,
  authDetails: AuthDetails
}


class PricingRequest extends React.Component<PricingRequestProps>{

  submitPricingRequest = () => {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    const pricingPayload: PricingRequestInterface = {
      trip_id: trip.trip_id,
      trip_type: this.props.resultsDetails.tripType === "fareStructureResults" ? "fare_structure" : "flex_trip" ,
      currency: this.props.currency,
      price: this.props.totalPrice,
      markup: 0,
      source: 'amadeus',
      itineraries: this.createItinerariesPayload(trip)
    };
    const pricingResult: any = this.props.priceFlights(pricingPayload);
    pricingResult.then((result: any) => this.handlePricingResult(result));
  }

  handlePricingResult = (result: any) =>
    result.success
      ? history.push('/book/')
      : history.push('/results/itinerary/');

  createItinerariesPayload = (trip: Results) => {
    let itinerariesPayload : Array<PricingRequestItinerary> = [];
    let itinerariesCounter = 1;

    this.props.selectedTrip.forEach((itineraryElement: Segment) => {
      const itineraryStructure = JSON.parse(itineraryElement.itinerary_structure);

      if (itineraryElement.segment_position === itineraryStructure[0]) {
        itinerariesPayload.push({
          itinerary_reference: itinerariesCounter,
          traveller_list: itineraryElement.priced_passengers,
          plating_carrier: "", //TODO: fix this once we have plating carriers returned in response.
          credentials: this.createCredentialsPayload(itineraryElement),
          itinerary_type: itineraryElement.itinerary_type.toLowerCase(),
          segments: this.createSegmentsPayload(trip, itineraryStructure),
        });
        itinerariesCounter += 1;
      }
    });

    return itinerariesPayload;
  }

  createSegmentsPayload = (trip: Results, itineraryStructure:Array<any>) => {
    let segmentsPayload: Array<FlightSegment> = itineraryStructure.map(segment_index =>
      ({
        segment_id: segment_index,
        flights: this.createFlightsPayload(trip, segment_index)
      }));
    return segmentsPayload;
  }

  createFlightsPayload = (trip: Results, segment_index: any) => {
    let flightsPayload : Array<Flight> = [];
    this.props.selectedTrip[segment_index].flights.forEach((flightResult: FlightResult) => {
      const flightDetail = trip.flight_details.find(flight => flight.reference === flightResult.flight_detail_ref);
      if (flightDetail) {
        flightsPayload.push({
          key: flightResult.flight_detail_ref,
          origin: flightDetail.origin,
          destination: flightDetail.destination,
          booking_code: flightResult.booking_code,
          cabin_class: flightResult.cabin_class,
          carrier: flightDetail.carrier,
          flight_time: flightDetail.flight_time,
          flight_number: flightDetail.flight_number,
          departure_time: moment(flightDetail.departure_time).format('YYYY-MM-DDTHH:mm:ss'),
          arrival_time: moment(flightDetail.arrival_time).format('YYYY-MM-DDTHH:mm:ss'),
          brand_identifier: "",
        });
      }
    });

    return flightsPayload;
  }

  createCredentialsPayload = (itineraryElement: any) => {
    const authDetails: AuthDetails = this.props.authDetails;
    const credentialsPayload: Credentials = {
      data_source: itineraryElement.source,
      provider: authDetails.provider,
      pcc: authDetails.pcc
    };
    return credentialsPayload;
  }

  render() {
    return (
      <div className="float-right">
        <Button
          color="primary"
          variant="contained"
          onClick={this.submitPricingRequest}>
          Continue to Price Confirm
        </Button>
      </div>
    );
  }

}

export default PricingRequest;
