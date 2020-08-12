import React from 'react';
import Button from '@material-ui/core/Button';
import { ResultsDetails, Segment } from './ResultsInterfaces';
import { PricingRequestInterface } from './PricingInterfaces';
import { priceFlights } from '../../actions/PricingActions';
import history from '../../History';
import { AuthDetails } from '../../auth/AuthInterfaces';
import { createItinerariesPayload } from '../../helpers/PricingPayloadHelper';

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
      trip_type: this.props.resultsDetails.tripType === "fareStructureResults" ? "fare_structure" : "flex_trip",
      currency: this.props.currency,
      price: this.props.totalPrice,
      markup: 0,
      itineraries: createItinerariesPayload(trip.flight_details, this.props.selectedTrip, this.props.authDetails)
    };
    const pricingResult: any = this.props.priceFlights(pricingPayload);
    pricingResult.then((result: any) => this.handlePricingResult(result));
  }

  handlePricingResult = (result: any) =>
    result.success
      ? history.push('/book/')
      : history.push('/results/itinerary/');

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
