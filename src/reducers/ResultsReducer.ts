import { ResultsDetails, Segment, FlightResult, Results } from '../trip/results/ResultsInterfaces';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false},
        tripType: 'fareStructureResults'
      };

    case 'SET_ERROR_DETAILS':
      return {...state, errors: {errorFound: action.value}};

    case 'SET_TRIP_TYPE':
      return {...state, tripType: action.value};

    case 'SET_ACTIVE_SEGMENT':
      return setSegmentsAsActive(state);

    case 'SET_ALTERNATES':
      return setSegmentsAlternates(state);

    default:
      return state;
  }
}

function setSegmentsAsActive(state: any) {
  const trip = state[state.tripType];
  trip.segments.map((segmentOptions: Array<Segment>) =>
    segmentOptions.map((segment: Segment, index: number) =>
      segment.status = index === 0 ? 'active' : 'inactive'
    )
  );
  //  Look in here Niloo
  return state
}

function setSegmentStatus(state: any, action: any) {
  const segments = state[state.tripType].segments[action.itineraryIndex];
  segments.map((segment: Segment) => {return segment.status = 'inactive'});
  segments[action.segmentIndex].status = 'active';
  return {...state};
}

function getFlightDetailsArray(segment: Segment): Array<number> {
  return segment.flights.map((flight: FlightResult) => flight.flight_detail_ref)
}

function setSegmentsAlternates(state: any) {
  const tripType = state.tripType;
  const trip = state[tripType];
  trip.segments.map((segmentOptions: Array<Segment>) => {
    const activeSegment: Segment | undefined = segmentOptions.find((potentialActiveSegment: Segment) =>
      potentialActiveSegment.status === 'active');
    if (activeSegment) {
      setAlternatesStatus(activeSegment, segmentOptions, trip);
    }
    else {
      // deal with error
    }
  });
}

function setAlternatesStatus(activeSegment: Segment, segmentOptions: Array<Segment>, trip: Results) {
  segmentOptions.map((segment: Segment) => {
    const itineraryStructure: Array<number> = JSON.parse(segment.itinerary_structure);
    if(segment.status === 'active') {
      return;
    }
    else if(segment.itinerary_structure === activeSegment!.itinerary_structure) {
      identifyCompatibleSegments(activeSegment, itineraryStructure, segment, trip)
    } else {
      segment.status = 'incompatible';
    }

  })
}

function identifyCompatibleSegments(activeSegment: Segment, itineraryStructure: Array<number>, segment: Segment, trip: Results) {
  if(itineraryStructure.length === 1) {
    segment.status = 'compatible';
  } else {
    const segmentPositionIndex: number = itineraryStructure.indexOf(segment.segment_position)
    itineraryStructure.splice(segmentPositionIndex, 1);
    // active segments set in store prior
    let status: string = 'compatible';
    itineraryStructure.map((structureIndex: number) => {
      const linkedSegment: Segment | undefined = trip.segments[structureIndex].find((potentialLinkedSegment: Segment) =>
        potentialLinkedSegment.itinerary_id === activeSegment!.itinerary_id
      )
      // active segment here needs updating to linked active
      if(getFlightDetailsArray(linkedSegment!) !== getFlightDetailsArray(activeSegment!)) {
        status = 'incompatible';
        // needs a break here
        return
      }
    })
    segment.status = status;
  }
}

function getLinkedSegment(itineraryStructure: Array<number>) {
  
}

export default resultsReducer;