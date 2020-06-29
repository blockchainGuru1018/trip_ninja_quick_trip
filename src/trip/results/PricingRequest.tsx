import React from 'react';
import Button from '@material-ui/core/Button';
import { ResultsDetails, Results, Segment } from './ResultsInterfaces';
import { PricingPayload, Itineraries, FlightSegment, Flight, Credentials } from './PricingInterfaces';

interface PricingRequestProps{
  resultsDetails: ResultsDetails,
  currency: string,
  totalPrice: number
}


class PricingRequest extends React.Component<PricingRequestProps>{
  priceFlights = () => {
    const trip = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

      let selectedTrip: Array<Segment> = this.getActiveSegments(trip);

    console.log("trip:",trip)
    console.log("selected segments:", selectedTrip)
    console.log(this.submitPricingRequest(trip, selectedTrip));
  }

  submitPricingRequest = (trip: Results, selectedTrip: Array<Segment>) => {
    const pricingPayload: PricingPayload = {
      trip_id: trip.trip_id,
      trip_type: this.props.resultsDetails.tripType,
      traveller_list: trip.segments[0][0].priced_passengers, //TODO: Fix this.
      currency: this.props.currency,
      price: this.props.totalPrice,
      markup: 0,
      itineraries: this.createItinerariesPayload(selectedTrip),
    };

    return pricingPayload
  }

  createItinerariesPayload = (selectedTrip: Array<Segment>) => {
    var itinerariesPayload : Array<Itineraries> = [];
    var itineraries_counter = 1;
  
    selectedTrip.forEach(itinerary_element => {
      if (itinerary_element.segment_position == 0){ //Sends only first part of multi-segment itineraries
        itinerariesPayload.push({
          itinerary_reference: itineraries_counter,
          plating_carrier: "", //TODO: fix this once we have plating carriers returned.
          credentials: "creds", //TODO: change to an actual element
          itinerary_type: itinerary_element.itinerary_type,
          segments:"", //TODO: Change to an actual element.
        });
        itineraries_counter += 1
      };
    });

    return itinerariesPayload
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

  getActiveSegments = (trip: Results) => {
    return trip.segments.map((segments: Array<Segment>) => {return segments.find((object: Segment) => { return object.status === 'active'; }) || segments[0]});
  }

}

export default PricingRequest;

