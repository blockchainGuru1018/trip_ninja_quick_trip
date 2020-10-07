import React from 'react';
import Button from '@material-ui/core/Button';
import { ResultsDetails, Segment, Results } from './ResultsInterfaces';
import { PricingRequestInterface } from './PricingInterfaces';
import { priceFlights } from '../../actions/PricingActions';
import history from '../../History';
import { createItinerariesPayload } from '../../helpers/PricingPayloadHelper';
import { withTranslation, WithTranslation } from 'react-i18next';

interface PricingRequestProps extends WithTranslation {
  resultsDetails: ResultsDetails,
  currency: string,
  totalPrice: number,
  selectedTrip: Array<Segment>,
  priceFlights: typeof priceFlights,
}


class PricingRequest extends React.Component<PricingRequestProps>{

  submitPricingRequest = () => {
    const trip: Results = this.props.resultsDetails.tripType === 'flexTripResults'
      ? this.props.resultsDetails.flexTripResults! : this.props.resultsDetails.fareStructureResults!;

    const pricingPayload: PricingRequestInterface = {
      trip_id: trip.trip_id,
      trip_type: this.props.resultsDetails.tripType === "fareStructureResults" ? "fare_structure" : "flex_trip",
      currency: this.props.currency,
      price: this.props.totalPrice,
      markup: 0,
      itineraries: createItinerariesPayload(trip.flight_details, [...this.props.resultsDetails.activeSegments.values()], trip)
    };
    console.log(pricingPayload);
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
          disableElevation
          color="primary"
          variant="contained"
          onClick={this.submitPricingRequest}
        >
          {this.props.t("results.pricingRequest.callToAction")}
        </Button>
      </div>
    );
  }

}

export default withTranslation('common')(PricingRequest);
