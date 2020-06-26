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
  const trip: Results = state[state.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentOptionsIndex: number) =>
    activateSegment(segmentOptions[0], state, segmentOptionsIndex)
  );
  return state;
}

function activateSegment(segment: Segment, state: ResultsDetails, segmentPosition: number) {
  segment.status = 'active';
  if(state.activeSegments.has(segmentPosition)) {
    state.activeSegments.get(segmentPosition).status = 'compatible';
  }
  state.activeSegments.set(segmentPosition, segment);
}

function getFlightDetailsString(segment: Segment): string {
  return segment.flights.reduce((total: string, flight: FlightResult) =>
    total += flight.flight_detail_ref, ''
  );
}

function setSegmentsAlternates(state: ResultsDetails) {
  const tripType = state.tripType;
  const trip: Results = state[tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, position: number) => {
    const activeSegment: Segment = state.activeSegments.get(position);
    setAlternatesStatus(state, activeSegment, segmentOptions);
  });
  return state;
}

function setAlternatesStatus(state: ResultsDetails, activeSegment: Segment, segmentOptions: Array<Segment>) {
  segmentOptions.forEach((segment: Segment) => {
    if(segment.status === 'active') {
      return;
    } else if(segment.itinerary_structure === activeSegment.itinerary_structure) {
      identifyCompatibleSegments(state, segment);
    } else {
      segment.status = 'incompatible';
    }
  });
}

function identifyCompatibleSegments(state: ResultsDetails, segment: Segment) {
  if (segment.itinerary_type === 'ONE_WAY') {
    segment.status = 'compatible';
  } else {
    const otherPositionsInItineraryStructure: Array<number> = getOtherPositionsInItineraryStructure(segment);
    let status: string = 'compatible';
    otherPositionsInItineraryStructure.forEach((linkedSegmentPosition: number) => {
      status = checkLinkedSegmentCompatibility(segment.itinerary_id, linkedSegmentPosition);
    });
    segment.status = status;
  }

  function checkLinkedSegmentCompatibility(itinerary_id: string, linkedSegmentPosition: number) {
    let linkedSegmentOptions: Array<Segment> = state[state.tripType].segments[linkedSegmentPosition];
    const linkedSegment: Segment | undefined = getSegmentInItinerary(linkedSegmentOptions, segment.itinerary_id);
    if (linkedSegment) {
      let activeSegmentInLinkPosition = state.activeSegments.get(linkedSegmentPosition);
      if (!segmentsAreCompatible(linkedSegment, activeSegmentInLinkPosition)) {
        return 'incompatible';
      }
    } else {
      throw `Linked segment with itinerary id ${segment.itinerary_id} not found in list of options at position ${linkedSegmentPosition}`;
    }
    return 'compatible';
  }
}

function segmentsAreCompatible(firstSegment: Segment, secondSegment: Segment) {
  return getFlightDetailsString(firstSegment) === getFlightDetailsString(secondSegment)
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

function activateLinkedSegments(selectedSegment: Segment, state: ResultsDetails) {
  if(selectedSegment.itinerary_type === 'OPEN_JAW'){
    const otherPositionsInItineraryStructure: Array<number> =  getOtherPositionsInItineraryStructure(selectedSegment);
    otherPositionsInItineraryStructure.forEach((linkedSegmentPosition: number) => {
      let linkedSegmentOptions: Array<Segment> = state[state.tripType].segments[linkedSegmentPosition];
      let linkedSegment: Segment | undefined = linkedSegmentOptions.find((segment: Segment) =>
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
    throw `No segment with ONE_WAY structure found at position ${segmentPosition}`;
  }
}

function updateActives(state: ResultsDetails, action: any) {
  const segmentOptions: Array<Segment> = state[state.tripType].segments[action.segmentOptionIndex];
  const selectedSegment: Segment | undefined = segmentOptions.find((segment: Segment) =>
    segment.itinerary_id === action.segmentItineraryRef
  );
  if (selectedSegment) {
    updateSegmentActivesAndAlternates(selectedSegment, state, action.segmentOptionIndex);
  } else {
    throw `Selected segment with itinerary id ${action.segmentItineraryRef} not found in list of options at position ${action.segmentOptionIndex}`;
  }
  return {...state};
}

function updateSegmentActivesAndAlternates(selectedSegment: Segment, state: ResultsDetails, segmentOptionIndex: number) {
  const isNotCompatible = selectedSegment.status !== 'compatible';
  const oldActiveSegments: Map<number, Segment> = new Map(state.activeSegments);
  const oldActiveSegment: Segment | undefined = oldActiveSegments.get(segmentOptionIndex);
  activateSegment(selectedSegment, state, segmentOptionIndex);
  activateLinkedSegments(selectedSegment, state);
  if (isNotCompatible && oldActiveSegment) {
    if (structureChanged(selectedSegment, oldActiveSegment)) {
      selectOneWaysForMissingPositions(selectedSegment, oldActiveSegment, oldActiveSegments, segmentOptionIndex);
    }
    setSegmentsAlternates(state);
  }

  function structureChanged(selectedSegment: Segment, oldActiveSegment: Segment) {
    return selectedSegment.itinerary_structure !== oldActiveSegment.itinerary_structure;
  }

  function selectOneWaysForMissingPositions(selectedSegment: Segment,
    oldActiveSegment: Segment, oldActiveSegments: Map<number, Segment>,
    segmentOptionIndex: number) {
    const activeSegmentStructure: Array<number> = JSON.parse(selectedSegment.itinerary_structure);
    const oldActiveSegmentStructure: Array<number> = JSON.parse(oldActiveSegment.itinerary_structure);
    const difference: Array<number> = getDifference(activeSegmentStructure,
      oldActiveSegmentStructure, oldActiveSegments, segmentOptionIndex);
    difference.forEach((positionIndex: number) => {
      let segmentOptions: Array<Segment> = state[state.tripType].segments[positionIndex];
      activateBestOneWay(segmentOptions, state, positionIndex);
    });
  }

  function getDifference(activeStructure: Array<number>,
    oldActiveStructure: Array<number>, oldActiveMap: Map<number, Segment>,
    segmentOptionIndex: number) {
    oldActiveStructure.splice(oldActiveStructure.indexOf(segmentOptionIndex))
    activeStructure.splice(activeStructure.indexOf(segmentOptionIndex))
    let segmentDifferencePositions: Array<number> = [];
    const structureDifferences: Array<number> = [...oldActiveStructure, ...activeStructure]
    structureDifferences.forEach(difference => {
      const oldActiveLinkedStructure = JSON.parse(oldActiveMap.get(difference)!.itinerary_structure)
      segmentDifferencePositions.push(...oldActiveLinkedStructure.filter((x: number) =>
        !activeStructure.includes(x))
      )
    });
    return segmentDifferencePositions;
  }
}

export default resultsReducer;