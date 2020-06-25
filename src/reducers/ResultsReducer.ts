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
    else if(segment.itinerary_structure === activeSegment.itinerary_structure) {
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
        state[state.tripType].segments[linkedSegmentPosition], activeSegment.itinerary_id
      );
      if(linkedSegment) {
        let activeSegmentInLinkPosition = state.activeSegments.get(linkedSegmentPosition);
        if (!segmentsAreCompatible(linkedSegment, activeSegmentInLinkPosition!)) {
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
  return segmentOptions.find((potentialLinkedSegment: Segment) =>
    potentialLinkedSegment.itinerary_id === itineraryId
  );
}

function activateLinkedSegments(selectedSegment: Segment, state: ResultsDetails, trip: Results) {
  if(selectedSegment.itinerary_type === 'OPEN_JAW'){
    const otherPositionsInItineraryStructure: Array<number> =  getOtherPositionsInItineraryStructure(selectedSegment);
    otherPositionsInItineraryStructure.forEach((linkedSegmentPosition: number) => {
      let linkedSegment: Segment | undefined = trip.segments[linkedSegmentPosition].find((segment: Segment) =>
        segment.itinerary_id === selectedSegment.itinerary_id
      );
      activateSegment(linkedSegment!, state, linkedSegmentPosition);
    });
  }
}

function activateBestOneWay(segmentOptions: Array<Segment>, state: ResultsDetails, segmentPosition: number) {
  let bestOneWay: Segment | undefined = segmentOptions.find((segment: Segment) => segment.itinerary_type === 'ONE_WAY');
  if (bestOneWay) {
    activateSegment(bestOneWay, state, segmentPosition);
  } else {
    // possible?
  }
}

function updateActives(state: ResultsDetails, action: any) {
  // action.segmentOptionIndex, action.segmentIndex
  const trip: Results = state[state.tripType];
  const selectedSegment: Segment | undefined = trip.segments[action.segmentOptionIndex].find((segment: Segment) =>
    segment.itinerary_id === action.segmentItineraryRef
  );
  if (selectedSegment) {
    updateSegmentActivesAndAlternates(selectedSegment, state, action.segmentOptionIndex, trip)
  }
  else {
    // Complete some sort of logging here
  }
  return {...state};
}

function updateSegmentActivesAndAlternates(selectedSegment: Segment, state: ResultsDetails, segmentOptionIndex: number, trip: Results) {
  const isCompatible = selectedSegment.status === 'compatible';
  const oldActiveSegment = {...state.activeSegments.get(segmentOptionIndex)!};
  // if its compatible just update the actives
  activateSegment(selectedSegment, state, segmentOptionIndex);
  activateLinkedSegments(selectedSegment, state, trip);
  if (!isCompatible) {
    // if incompatible - always reset the statuses
    if (selectedSegment.itinerary_structure !== oldActiveSegment.itinerary_structure) {
      const activeSegmentStructure: Array<number> = JSON.parse(selectedSegment.itinerary_structure);
      const oldActiveSegmentStructure: Array<number> = JSON.parse(oldActiveSegment.itinerary_structure);
      const difference: Array<number> = oldActiveSegmentStructure.filter(x => !activeSegmentStructure.includes(x));
      difference.forEach((positionIndex: number) => {
        activateBestOneWay(trip.segments[positionIndex], state, positionIndex);
      });
    }
    setAlternatesStatus(state, selectedSegment, trip.segments[segmentOptionIndex]);
  }
}


export default resultsReducer;