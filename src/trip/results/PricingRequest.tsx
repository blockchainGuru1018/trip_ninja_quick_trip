import React from 'react';
import Button from '@material-ui/core/Button';
import { ResultsDetails, Results, Segment, FlightResult} from './ResultsInterfaces';
import { PricingPayload, Itineraries, FlightSegment, Flight, Credentials } from './PricingInterfaces';

interface PricingRequestProps{
  resultsDetails: ResultsDetails,
  currency: string,
  totalPrice: number,
  selectedTrip: Array<any>,
}


class PricingRequest extends React.Component<PricingRequestProps>{
  priceFlights = () => {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    console.log("trip:",trip);
    console.log("selected segments:", this.props.selectedTrip);
    console.log(this.submitPricingRequest(trip));
  }

  submitPricingRequest = (trip: Results) => {
    const pricingPayload: PricingPayload = {
      trip_id: trip.trip_id,
      trip_type: this.props.resultsDetails.tripType,
      traveller_list: trip.segments[0][0].priced_passengers, //TODO: Fix this.
      currency: this.props.currency,
      price: this.props.totalPrice,
      markup: 0,
      itineraries: this.createItinerariesPayload(trip),
    };

    return pricingPayload
  }

  createItinerariesPayload = (trip: Results) => {
    var itinerariesPayload : Array<Itineraries> = [];
    var itineraries_counter = 1;
  
    this.props.selectedTrip.forEach(itinerary_element => {

      const itinerary_structure = JSON.parse(itinerary_element.itinerary_structure);

      if (itinerary_element.segment_position == itinerary_structure[0]){ //Sends only first part of multi-segment itineraries
        itinerariesPayload.push({
          itinerary_reference: itineraries_counter,
          plating_carrier: "", //TODO: fix this once we have plating carriers returned.
          credentials: "creds", //TODO: change to an actual element
          itinerary_type: itinerary_element.itinerary_type,
          segments: this.createSegmentsPayload(trip, itinerary_structure), //TODO: Change to an actual element.
        });
        itineraries_counter += 1
      };
    });

    return itinerariesPayload
  }

  createSegmentsPayload = (trip: Results, itinerary_structure:Array<any>) => {
    //TODO: Need to iterate through all segments tied to the itinerary_id
    var segmentsPayload: Array<FlightSegment> = [];

    itinerary_structure.forEach(segment_index => {
      segmentsPayload.push({
        segment_id: "123",
        flights: this.createFlightsPayload(trip, segment_index)
      });

    });
    return segmentsPayload
  }

  createFlightsPayload = (trip: Results, segment_index: any) => {    
    var flightsPayload : Array<Flight> = [];

    console.log("Selected segment:", segment_index);
    console.log("Selected segment flights:",this.props.selectedTrip[segment_index].flights);

    this.props.selectedTrip[segment_index].flights.forEach((flightResult: FlightResult) => {
      //console.log("flight:", flightResult)

      const flightDetail = trip.flight_details.find(flight => flight.reference == flightResult.flight_detail_ref)
      console.log("selected flight details", flightDetail)

      if (flightDetail){
        flightsPayload.push({
          key: flightResult.flight_detail_ref,
          origin: flightDetail.origin,
          destination: flightDetail.destination,
          booking_code: flightResult.booking_code,
          cabin_class: flightResult.cabin_class,
          carrier: flightDetail.carrier,
          flight_time: flightDetail.flight_time,
          flight_number: flightDetail.flight_number,  
          departure_time: flightDetail.departure_time,
          arrival_time: flightDetail.arrival_time,
          brand_identifier: "",
        })
      };
    });

    return flightsPayload
  }

  render() {
    return (
      <div className="float-right">
        <Button
          color="primary"
          variant="contained"
          onClick={this.priceFlights}>
          Continue to Price Confirm
        </Button>
      </div>
    );
  }

}

export default PricingRequest;

