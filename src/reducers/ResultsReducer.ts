import {FlightResult, Results, ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';

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

function setSegmentsAsActive(state: ResultsDetails) {
  const trip = state[state.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, position: number) =>
    segmentOptions.forEach((segment: Segment, index: number) => {
      if(index === 0){
        activateSegment(segment, state, position);
      }else {
        segment.status = 'inactive'; //Can we do this by setting a default to all Segment type variables?
      }
    })
  );
  return state;
}

function activateSegment(segment: Segment, state: ResultsDetails, segmentPosition: number) {
  // This should be used anywhere segment status is set to active
  segment.status = 'active';
  state.activeSegments[segmentPosition] = segment;
}

function setSegmentStatus(state: any, action: any) {
  const segments = state[state.tripType].segments[action.itineraryIndex];
  segments.map((segment: Segment) => {return segment.status = 'inactive';});
  segments[action.segmentIndex].status = 'active';
  return {...state};
}

function getFlightDetailsArray(segment: Segment): Array<number> {
  return segment.flights.map((flight: FlightResult) => flight.flight_detail_ref);
}

function setSegmentsAlternates(state: ResultsDetails) {
  const tripType = state.tripType;
  const trip = state[tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, position: number) => {
    const activeSegment: Segment | undefined = state.activeSegments.get(position);
    if (activeSegment) {
      setAlternatesStatus(state, activeSegment, segmentOptions, trip);
    }
    else {
      // TODO deal with error
    }
  });
}

function setAlternatesStatus(state: ResultsDetails, activeSegment: Segment, segmentOptions: Array<Segment>, trip: Results) {
  segmentOptions.forEach((segment: Segment) => {
    if(segment.status === 'active') {
      return;
    }
    else if(segment.itinerary_structure === activeSegment!.itinerary_structure) {
      identifyCompatibleSegments(state, activeSegment, segment, trip);
    } else {
      segment.status = 'incompatible';
    }
  });
}

function identifyCompatibleSegments(state: ResultsDetails, activeSegment: Segment, segment: Segment, trip: Results) {
  if (segment.itinerary_type === 'ONE_WAY') {
    segment.status = 'compatible';
  } else {
    const otherPositionsInItineraryStructure: Array<number> = getOtherPositionsInItineraryStructure(segment);
    let status: string = 'compatible';
    otherPositionsInItineraryStructure.forEach((linkedSegmentPosition: number) => {
      // TODO: [Q for Kieran] why use trip and not get the information from state?
      const linkedSegment: Segment | undefined = getSegmentInItinerary(trip.segments[linkedSegmentPosition], activeSegment!.itinerary_id);
      let activeSegmentInLinkPosition = state.activeSegments[linkedSegmentPosition];
      if (!segmentsAreCompatible(linkedSegment!, activeSegmentInLinkPosition)) {
        status = 'incompatible'; // TODO: [Note to Kieran] I don't think we'll need a break here since status is not being reset to 'compatible' in the loop
      }
      segment.status = status;
    });
  }
}

function segmentsAreCompatible(firstSegment: Segment, secondSegment: Segment) {
  // TODO: [Note to Kieran] fare_basis_code is already inside flightDetails, so if they have the same flight_detail_ref that's the same
  return getFlightDetailsArray(firstSegment) === getFlightDetailsArray(secondSegment)
      && firstSegment.baggage.number_of_pieces === secondSegment.baggage.number_of_pieces;
}

function getOtherPositionsInItineraryStructure(segment: Segment) {
  const itineraryStructure: Array<number> = JSON.parse(segment.itinerary_structure);
  const segmentPositionIndex: number = itineraryStructure.indexOf(segment.segment_position);
  itineraryStructure.splice(segmentPositionIndex, 1);
  return itineraryStructure;
}

function getSegmentInItinerary(segmentOptions: Array<Segment>, itineraryId: string) {
  // TODO: [Q for Kieran] should we raise an error if segment is not found?
  // this can be put to a utility for general usage
  return segmentOptions.find((potentialLinkedSegment: Segment) => potentialLinkedSegment.itinerary_id === itineraryId
  );
}

export default resultsReducer;