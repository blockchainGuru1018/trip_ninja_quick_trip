import {FlightResult, Results, ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';

function resultsReducer(state: ResultsDetails = {} as any, action: any) {
  switch(action.type) {
    case 'SET_RESULTS':
      return {
        fareStructureResults: action.results.fare_structure,
        flexTripResults: action.results.flex_trip,
        errors: {errorFound: false},
        tripType: 'fareStructureResults',
        activeSegments: new Map()
      };

    case 'SET_ERROR_DETAILS':
      return {...state, errors: {errorFound: action.value}};

    case 'SET_TRIP_TYPE':
      return {...state, tripType: action.value};

    case 'SET_ACTIVE_SEGMENT':
      return setSegmentsAsActive(state);

    case 'UPDATE_ACTIVES':
      return updateActives(state, action);

    case 'SET_ALTERNATES':
      return setSegmentsAlternates(state);

    default:
      return state;
  }
}

function setSegmentsAsActive(state: ResultsDetails) {
  const trip = state[state.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentOptionsIndex: number) =>
    activateSegment(segmentOptions[0], state, segmentOptionsIndex)
  );
  return state;
}

function activateSegment(segment: Segment, state: ResultsDetails, segmentPosition: number) {
  segment.status = 'active';
  if(state.activeSegments.has(segmentPosition)) {
    state.activeSegments.get(segmentPosition)!.status = 'compatible';
  }

  state.activeSegments.set(segmentPosition, segment);
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
      setAlternatesStatus(state, activeSegment, segmentOptions);
    }
    else {
      // Make some sort of logging here
    }
  });
  return state;
}

function setAlternatesStatus(state: ResultsDetails, activeSegment: Segment, segmentOptions: Array<Segment>) {
  segmentOptions.forEach((segment: Segment) => {
    if(segment.status === 'active') {
      return;
    }
    else if(segment.itinerary_structure === activeSegment!.itinerary_structure) {
      identifyCompatibleSegments(state, activeSegment, segment);
    }
    else {
      segment.status = 'incompatible';
    }
  });
}

function identifyCompatibleSegments(state: ResultsDetails, activeSegment: Segment, segment: Segment) {
  if (segment.itinerary_type === 'ONE_WAY') {
    segment.status = 'compatible';
  }
  else {
    const otherPositionsInItineraryStructure: Array<number> = getOtherPositionsInItineraryStructure(segment);
    let status: string = 'compatible';
    otherPositionsInItineraryStructure.forEach((linkedSegmentPosition: number) => {
      // TODO: [Q for Kieran] why use trip and not get the information from state?
      const linkedSegment: Segment | undefined = getSegmentInItinerary(
        state[state.tripType].segments[linkedSegmentPosition], activeSegment!.itinerary_id
      );
      if(linkedSegment) {
        let activeSegmentInLinkPosition = state.activeSegments[linkedSegmentPosition];
        if (!segmentsAreCompatible(linkedSegment!, activeSegmentInLinkPosition)) {
          status = 'incompatible';
        }
      }
      else {
        // TODO some sort of error handling here
      }
    segment.status = status;
    });
  }
}

function segmentsAreCompatible(firstSegment: Segment, secondSegment: Segment) {
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
  return segmentOptions.find((potentialLinkedSegment: Segment) => potentialLinkedSegment.itinerary_id === itineraryId
  );
}

function updateActives(state: ResultsDetails, action: any) {
  // action.segmentOptionIndex, action.segmentIndex
  const trip: Results = state[state.tripType];
  const selectedSegment = trip.segments[action.segmentOptionIndex][action.segmentIndex]
  activateSegment(selectedSegment, state, action.optionIndex);

}

export default resultsReducer;