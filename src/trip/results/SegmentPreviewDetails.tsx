import React from 'react';
import { Segment, FlightResultsDetails, Results } from './ResultsInterfaces';
import FareRulesPreview from '../../common/FareRulesPreview';
import FlightResultsPath from '../../common/FlightResultsPath';
import FareSelect from './FareSelect';
import Button from '@material-ui/core/Button';
import { updateActives, updateFareFamily, setBrandedFaresInfo } from '../../actions/ResultsActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { priceFlights } from '../../actions/PricingActions';
import { PricingRequestInterface } from './PricingInterfaces';
import { createItinerariesPayload } from '../../helpers/PricingPayloadHelper';
import { AuthDetails } from '../../auth/AuthInterfaces';


interface SegmentPreviewDetailsProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  segmentSelect: boolean;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  setBrandedFaresInfo?: typeof setBrandedFaresInfo;
  segmentOptionsIndex?: number;
  closeAllDropDowns?: () => void;
  totalPrice: number;
  priceFlights: typeof priceFlights;
  activeSegment?: Segment;
  authDetails: AuthDetails;
  trip: Results;
}

class SegmentPreviewDetails extends React.Component<SegmentPreviewDetailsProps> {

  state = {
    loadingBrands: true
  }

  componentDidMount() {
    if (this.props.segment.source === 'travelport' && !this.props.segment.brands) {
      this.setState({loadingBrands: true});
      this.getTravelportBrands();
    }
  }

  render() {
    const brands = this.props.segment.brands ? this.props.segment.brands : {};
    const segment_id = Object.keys(brands);
    return(
      <div className="col-md-12 segment-preview-details-container">
        <FlightResultsPath
          flightDetails={this.props.flightDetails}
        />
        <hr/>
        {!this.props.segmentSelect
        && <FareRulesPreview
          segment={this.props.segment}
          flightDetails={this.props.flightDetails}
          currency={this.props.currency}
        />
        }
        {this.state.loadingBrands &&
          <div className="text-center">
            <h6>Loading fare options...</h6>
            <CircularProgress />
          </div>
        }
        {this.props.segment.brands && this.props.segmentSelect && !this.state.loadingBrands
        && <FareSelect 
          brands={this.props.segment.brands![segment_id[0]]} 
          currency={this.props.currency} 
          segment={this.props.segment}
          activeSegment={this.props.activeSegment}
          updateFareFamily={this.props.updateFareFamily}
          updateActives={this.updateActives}
          totalPrice={this.props.totalPrice}
        /> 
        }
        {!this.props.segment.brands && this.props.updateActives && this.props.segment.status !== 'active'
          ? <div className='btn-segment-selection-container'>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() =>
                this.updateActives()
              } >
              Select segment
            </Button>
          </div>
          : ''
        }
      </div>
    );
  }

  updateActives = () => {
    this.props.updateActives!(this.props.segmentOptionsIndex!, this.props.segment.itinerary_id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.props.closeAllDropDowns!();
  }

  getTravelportBrands = () => {
    console.log(this.props.segment);
    const pricingPayload: PricingRequestInterface = {
      trip_id: this.props.trip.trip_id,
      trip_type: "fare_structure",
      currency: this.props.currency,
      price: this.props.totalPrice,
      markup: 0,
      itineraries: createItinerariesPayload(this.props.trip.flight_details, [this.props.segment], this.props.authDetails),
      pseudo_price_confirm: true
    };
    const pricingResult: any = this.props.priceFlights(pricingPayload, true);
    pricingResult.then((result: any) => this.setTravelportBrandedFares(result));
  }

  setTravelportBrandedFares = (result: any) => {
    this.setState({loadingBrands: false});
    this.props.setBrandedFaresInfo!(this.props.segment, result.data.brands);
  }
}

export default SegmentPreviewDetails;