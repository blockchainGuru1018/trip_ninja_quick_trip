import {FlightResult, ResultsDetails, Segment } from '../trip/results/ResultsInterfaces';

function activateSegment(segment: Segment, state: ResultsDetails, segmentPosition: number) {
  const isNotCompatible = segment.status !== 'compatible';
  const oldActiveSegment: Segment | undefined = state.activeSegments.get(segmentPosition);
  const segmentOptions: Array<Segment> = state[state.tripType].segments[segmentPosition];
  segment.status = 'active';
  if (state.activeSegments.has(segmentPosition)) {
    state.activeSegments.get(segmentPosition).status = 'compatible';
  }
  state.activeSegments.set(segmentPosition, segment);
  if (isNotCompatible) {
    if (structureChanged(segment, oldActiveSegment)) {
      selectOneWaysForMissingPositions(segment, oldActiveSegment, state);
    }
    setAlternatesStatus(state, segment, segmentOptions);
  }
}

function getFlightDetailsString(segment: Segment): string {
  return segment.flights.reduce((total: string, flight: FlightResult) =>
    total += flight.flight_detail_ref, ''
  );
}

export function setAlternatesStatus(state: ResultsDetails, activeSegment: Segment, segmentOptions: Array<Segment>) {
  segmentOptions.forEach((segment: Segment) => {
    if (segment.status === 'active') {
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

export function getOtherPositionsInItineraryStructure(segment: Segment) {
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
  if (selectedSegment.itinerary_type === 'OPEN_JAW') {
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
    bestOneWay.status = 'compatible';
    setAlternatesStatus(state, bestOneWay, segmentOptions);
    activateSegment(bestOneWay, state, segmentPosition);
  } else {
    throw `No segment with ONE_WAY structure found at position ${segmentPosition}`;
  }
}

export function updateActiveSegments(state: ResultsDetails, action: any) {
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

function structureChanged(selectedSegment: Segment, oldActiveSegment: Segment) {
  return selectedSegment.itinerary_structure !== oldActiveSegment.itinerary_structure;
}

function selectOneWaysForMissingPositions(selectedSegment: Segment,
  oldActiveSegment: Segment, state: ResultsDetails) {
  const activeSegmentStructure: Array<number> = JSON.parse(selectedSegment.itinerary_structure);
  const oldActiveSegmentStructure: Array<number> = JSON.parse(oldActiveSegment.itinerary_structure);
  const difference: Array<number> = oldActiveSegmentStructure.filter(x => !activeSegmentStructure.includes(x));
  difference.forEach((positionIndex: number) => {
    const segmentOptions = state[state.tripType].segments[positionIndex];
    // TODO:  what if there is no oneWay. ex. transition from single PNR to a oneway and an openjaw
    activateBestOneWay(segmentOptions, state, positionIndex);
  });
}

function updateSegmentActivesAndAlternates(selectedSegment: Segment, state: ResultsDetails, segmentOptionIndex: number) {
  activateSegment(selectedSegment, state, segmentOptionIndex);
  activateLinkedSegments(selectedSegment, state);
}

