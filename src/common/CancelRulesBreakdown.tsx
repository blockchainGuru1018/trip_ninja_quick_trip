import React from 'react';
import CancellationPolicy from './CancellationPolicy';
import { Segment } from '../trip/results/ResultsInterfaces';
import { BookingItinerary } from "../bookings/BookingsInterfaces";
import { createItineraryPathSequenceString, createItineraryPathSequenceStringBooking } from '../helpers/PathSequenceHelper';

interface CancelRulesBreakdownProps {
  currency: string;
  price: number;
  segments?: Array<Segment>;
  itineraries?: Array<BookingItinerary>
  pathSequence?: Array<string>;
}

export default function CancelRulesBreakdown(props:  CancelRulesBreakdownProps) {
  const [expanded, setExpanded] = React.useState(false);
  console.log(props.itineraries);
  const setRulesDetails = () => {
    return props.segments ? setSegmentsRulesDetails() : setItinerariesRulesDetails();
  };

  const setSegmentsRulesDetails = () => {
    return(<div>
      {props.segments!.map((segment: Segment, index: number) => (
        <div key={index.toString()}>
          <span className="text-bold">{createItineraryPathSequenceString(segment, props.pathSequence!)}</span>
          <CancellationPolicy 
            currency={props.currency}
            price={props.price}
            segments={[segment]}
            tripTotal={false}
          />
        </div>))
      }
    </div>);
  };

  const setItinerariesRulesDetails = () => {
    return(<div>
      {props.itineraries!.map((itinerary: BookingItinerary, index: number) => (
        <div key={index.toString()}>
          <span className="text-bold">{createItineraryPathSequenceStringBooking(itinerary)}</span>
          <CancellationPolicy 
            currency={props.currency}
            price={props.price}
            itineraries={[itinerary]}
            tripTotal={false}
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
        />
      } 
    </div>
  );

}