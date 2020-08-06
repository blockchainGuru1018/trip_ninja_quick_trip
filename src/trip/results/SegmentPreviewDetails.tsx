import React from 'react';
import { Segment, FlightResultsDetails } from './ResultsInterfaces';
import FareRulesPreview from '../../common/FareRulesPreview';
import FlightResultsPath from '../../common/FlightResultsPath';
import FareSelect from './FareSelect';
import Button from '@material-ui/core/Button';
import { updateActives, updateFareFamily } from '../../actions/ResultsActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { priceFlights } from '../../actions/PricingActions';


interface SegmentPreviewDetailsProps {
  segment: Segment;
  flightDetails: Array<FlightResultsDetails>;
  currency: string;
  segmentSelect: boolean;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  segmentOptionsIndex?: number;
  closeAllDropDowns?: () => void;
  totalPrice: number;
  priceFlights: typeof priceFlights;
  activeSegment?: Segment;
}

class SegmentPreviewDetails extends React.Component<SegmentPreviewDetailsProps> {

  state = {
    loadingBrands: true
  }

  componentDidMount() {
    console.log("mounting");
    if (this.props.segment.source === 'travelport') {
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
    // create pricing payload
    // send pricing requesdt
    // parse brands out of response
    // update
    //const pricingResult: any = this.props.priceFlights(pricingPayload);
    //pricingResult.then((result: any) => this.handlePricingResult(result));

    
  }
}

export default SegmentPreviewDetails;