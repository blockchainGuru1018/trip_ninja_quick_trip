import React from 'react';
import CancellationPolicy from './CancellationPolicy';
import { Segment } from '../trip/results/ResultsInterfaces';
import { BookingItinerary } from "../bookings/BookingsInterfaces";
import { createItineraryPathSequenceString, createItineraryPathSequenceStringBooking } from '../helpers/PathSequenceHelper';
import { isFirstPositionInStructure } from '../helpers/MiscHelpers';
import { getOrderedSegmentsFromItinerary, sortItineraryList } from "../helpers/BookingsHelpers";

interface CancelRulesBreakdownProps {
  currency: string;
  price: number;
  segments?: Array<Segment>;
  itineraries?: Array<BookingItinerary>
  pathSequence?: Array<string>;
  tripMarkup: number;
}

export default function CancelRulesBreakdown(props:  CancelRulesBreakdownProps) {
  const [expanded, setExpanded] = React.useState(false);

  const setRulesDetails = () => {
    return props.segments ? setSegmentsRulesDetails() : setItinerariesRulesDetails();
  };

  const setSegmentsRulesDetails = () => {
    return(<div>
      {props.segments!.map((segment: Segment, index: number) => {
        return(isFirstPositionInStructure(segment) &&
        <div key={index.toString()}>
          <span className="text-bold">{createItineraryPathSequenceString(segment, props.pathSequence!)}</span>
          <CancellationPolicy 
            currency={props.currency}
            price={segment.vi_segment_base_price ? (segment.vi_segment_base_price + segment.vi_segment_taxes! + segment.vi_segment_fees!) : segment.price}
            segments={[segment]}
            tripTotal={false}
            tripMarkup={props.tripMarkup}
          />
        </div>);
      }
      )}
    </div>);
  };

  const setItinerariesRulesDetails = () => {
    const sortedSegments = getOrderedSegmentsFromItinerary(props.itineraries!);
    const sortedItineraries: Array<any> = sortItineraryList(sortedSegments, props.itineraries!);
    return(<div>
      {sortedItineraries.map((itinerary: BookingItinerary, index: number) => (
        <div key={index.toString()}>
          <span className="text-bold">{createItineraryPathSequenceStringBooking(itinerary)}</span>
          <CancellationPolicy 
            currency={props.currency}
            price={itinerary.price_breakdown.confirmed_total_price}
            itineraries={[itinerary]}
            tripTotal={false}
            tripMarkup={props.tripMarkup}
          />
        </div>))
      }
    </div>);
  };

  return (
    <div>
      <div className="row">
        <div className="col no-pad-left">
          <h5>Rules</h5>
        </div>        
        <div onClick={() => setExpanded(!expanded)} className="col btn-breakdown-details">
          {`Show ${expanded ? 'less' : 'more'} details`}
        </div>
      </div>
      {expanded &&
        setRulesDetails()
      }
      {!expanded &&
        <CancellationPolicy
          currency={props.currency}
          price={props.price}
          segments={props.segments ? props.segments : undefined}
          itineraries={props.itineraries ? props.itineraries : undefined}
          tripTotal={true}
          tripMarkup={props.tripMarkup}
        />
      } 
    </div>
  );

}