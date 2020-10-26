import React from 'react';
import { Segment, FlightResultsDetails, Results } from './ResultsInterfaces';
import FareRulesPreview from '../../common/FareRulesPreview';
import FlightResultsPath from '../../common/FlightResultsPath';
import FareSelect from './FareSelect';
import Button from '@material-ui/core/Button';
import { updateActives, updateFareFamily, getTravelportBrands } from '../../actions/ResultsActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PricingRequestInterface } from './PricingInterfaces';
import { createItinerariesPayload } from '../../helpers/PricingPayloadHelper';
import { getOtherPositionsInItineraryStructure } from '../../helpers/CompatibilityHelpers';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SegmentPreviewDetailsProps extends WithTranslation {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  segmentSelect: boolean;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  getTravelportBrands?: typeof getTravelportBrands;
  segmentOptionsIndex?: number;
  closeAllDropDowns?: () => void;
  totalPrice: number;
  activeSegment?: Segment;
  trip: Results;
  viParent?: boolean;
}

class SegmentPreviewDetails extends React.Component<SegmentPreviewDetailsProps> {

  state = {
    loadingBrands: false
  }

  componentDidMount() {
    if (this.props.segment.source === 'travelport'
      && this.props.segmentSelect 
      && !this.props.segment.brands
      && !this.props.viParent) {
      this.setState({loadingBrands: true});
      this.getTravelportBrandedFares();
    }
  }

  render() {
    const brands = this.props.segment.brands ? this.props.segment.brands : {};
    const segment_id = Object.keys(brands);
    return(
      <div className="col-md-12 segment-preview-details-container">
        {((this.props.viParent && this.props.segment.status === 'active') || (!this.props.viParent && this.props.segmentSelect)) && 
          <div>
            <FlightResultsPath
              flightDetails={this.props.flightDetails}
            />
            {(!this.props.viParent && this.props.segmentSelect) && <hr/>}
          </div>
        }
        {this.props.viParent && this.props.segmentSelect && this.props.segment.status !== 'active' &&
          <div className="row">
            <div className="col-xl-10">
              <FlightResultsPath
                flightDetails={this.props.flightDetails}
              />
            </div>
            <div className="col-xl-2 my-auto">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disableElevation
                onClick={() =>
                  this.updateActives()
                } >
                {this.props.t("results.segmentPreviewDetails.selectSegment")}
              </Button>
            </div>
          </div>
        }
        {!this.props.segmentSelect && !this.props.viParent
        && <FareRulesPreview
          segment={this.props.segment}
          flightDetails={this.props.flightDetails}
          currency={this.props.currency}
        />
        }
        {this.state.loadingBrands &&
          <div className="text-center">
            <h6>{this.props.t("results.segmentPreviewDetails.loading")}</h6>
            <CircularProgress />
          </div>
        }
        {this.props.segment.brands && this.props.segmentSelect && !this.state.loadingBrands && !this.props.viParent
        && <FareSelect 
          brands={this.props.segment.source === 'travelport' ? this.props.segment.brands! : this.props.segment.brands![segment_id[0]]} 
          currency={this.props.currency} 
          segment={this.props.segment}
          activeSegment={this.props.activeSegment}
          updateFareFamily={this.props.updateFareFamily}
          updateActives={this.updateActives}
          totalPrice={this.props.totalPrice}
        /> 
        }
        {!this.props.segment.brands && this.props.updateActives && this.props.segment.status !== 'active' && !this.props.viParent
          ? <div className='btn-segment-selection-container'>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              size="large"
              onClick={() =>
                this.updateActives()
              } >
              {this.props.t("results.segmentPreviewDetails.selectSegment")}
            </Button>
          </div>
          : ''
        }
      </div>
    );
  }

  updateActives = () => {
    this.props.updateActives!(
      this.props.segmentOptionsIndex!,
      this.props.segment.virtual_interline ? this.props.segment.vi_solution_id! : this.props.segment.itinerary_id,
      undefined, undefined, this.props.segment.virtual_interline
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.props.closeAllDropDowns!();
  }

  getTravelportBrandedFares = () => {
    const pricingPayload: PricingRequestInterface = {
      trip_id: this.props.trip.trip_id,
      trip_type: "fare_structure",
      currency: this.props.currency,
      price: this.props.totalPrice,
      markup: 0,
      itineraries: createItinerariesPayload(this.props.trip.flight_details, this.getLinkedSegments(), this.props.trip),
      pseudo_price_confirm: true
    };
    const pricingResult: any = this.props.getTravelportBrands!(pricingPayload, this.props.segment);
    pricingResult.then((result: any) => this.setTravelportBrandedFares(result));
  }

  getLinkedSegments = () => {
    let linkedSegments = [];
    linkedSegments[this.props.segment.segment_position] = this.props.segment;
    if (this.props.segment.itinerary_type === 'OPEN_JAW') {
      const relatedSegmentPositions: Array<number> = getOtherPositionsInItineraryStructure(this.props.segment);
      relatedSegmentPositions.forEach((linkedSegmentPosition: number) => {
        let linkedSegmentOptions: Array<Segment> = this.props.trip.segments[linkedSegmentPosition];
        let linkedSegment: Segment | undefined = linkedSegmentOptions.find((segment: Segment) =>
          segment.itinerary_id === this.props.segment.itinerary_id
        );
        if (linkedSegment) {
          linkedSegments[linkedSegment.segment_position] = linkedSegment;
        }
      });
    }
    return linkedSegments;
  }

  setTravelportBrandedFares = (result: any) => {
    this.setState({loadingBrands: false});
  }
}

export default withTranslation('common')(SegmentPreviewDetails);