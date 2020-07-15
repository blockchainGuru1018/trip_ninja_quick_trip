import {FlightResult, ResultsDetails, Segment } from '../trip/results/ResultsInterfaces';
import {setRelativesAndUpdateActives} from "./RelativesHelper";

function resetOldActiveStatusAndPotentialMissingPositions(newActiveSegment: Segment, state: ResultsDetails, oldActiveSegment: Segment, isNotCompatible: boolean) {
  resetOldActiveStatus(oldActiveSegment, isNotCompatible);
  if (isNotCompatible) {
    searchForMissingPositions(newActiveSegment, oldActiveSegment, state, isNotCompatible);
  }

  function resetOldActiveStatus(oldActiveSegment: Segment, isNotCompatible: boolean) {
    if (oldActiveSegment) {
      oldActiveSegment.status = isNotCompatible? 'incompatible' : 'compatible';
    }
  }

  function searchForMissingPositions(newActiveSegment: Segment, oldActiveSegment: Segment, state: ResultsDetails, isNotCompatible: boolean) {
    if (structureChanged(newActiveSegment, oldActiveSegment)) {
      selectOneWaysForMissingPositions(newActiveSegment, oldActiveSegment, state);
    }
  }
}

export function activateSegment(segment: Segment, state: ResultsDetails, segmentPosition: number, isInitialActivation: boolean = false) {
  const isNotCompatible = segment.status !== 'compatible';
  const oldActiveSegment: Segment | undefined = state.activeSegments.getIfExist(segmentPosition);
  const segmentOptions: Array<Segment> = state[state.tripType].segments[segmentPosition];
  segment.status = 'active';
  state.activeSegments.set(segmentPosition, segment);
  if(!isInitialActivation){
    resetOldActiveStatusAndPotentialMissingPositions(segment, state, oldActiveSegment!, isNotCompatible); // oldActiveSegment should exist at this point
  }
  if (isInitialActivation || isNotCompatible){
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
      let activeSegmentInLinkPosition = state.activeSegments.getIfExist(linkedSegmentPosition);
      if (activeSegmentInLinkPosition && !segmentsAreCompatible(linkedSegment, activeSegmentInLinkPosition)) {
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

export function activateLinkedSegments(selectedSegment: Segment, state: ResultsDetails, isInitialActivation: boolean = false) {
  const otherPositionsInItineraryStructure: Array<number> =  getOtherPositionsInItineraryStructure(selectedSegment);
  otherPositionsInItineraryStructure.forEach((linkedSegmentPosition: number) => {
    let linkedSegmentOptions: Array<Segment> = state[state.tripType].segments[linkedSegmentPosition];
    let linkedSegment: Segment | undefined = linkedSegmentOptions.find((segment: Segment) =>
      segment.itinerary_id === selectedSegment.itinerary_id
    );
    activateSegment(linkedSegment!, state, linkedSegmentPosition, isInitialActivation);
  });
  return otherPositionsInItineraryStructure;
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

export function updateActiveSegmentsFromAction(state: ResultsDetails, action: any) {
  const segmentOptionIndex: number = action.segmentOptionIndex;
  const segmentItineraryRef: string = action.segmentItineraryRef;
  const updateState = updateActiveSegments(state, segmentOptionIndex, segmentItineraryRef);
  setRelativesAndUpdateActives(updateState);
  return updateState;
}

export function updateActiveSegments(state: ResultsDetails, segmentOptionIndex: number, segmentItineraryRef: string) {
  const segmentOptions: Array<Segment> = state[state.tripType].segments[segmentOptionIndex];
  const selectedSegment: Segment | undefined = segmentOptions.find((segment: Segment) =>
    segment.itinerary_id === segmentItineraryRef
  );
  if (selectedSegment && selectedSegment.status === 'active'){
    return {...state};
  } else if (selectedSegment) {
    updateSegmentActivesAndAlternates(selectedSegment, state, segmentOptionIndex);
    return {...state};
  } else {
    throw `Selected segment with itinerary id ${segmentItineraryRef} not found in list of options at position ${segmentOptionIndex}`;
  }
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
    activateBestOneWay(segmentOptions, state, positionIndex);
  });
}

export function updateSegmentActivesAndAlternates(selectedSegment: Segment, state: ResultsDetails, segmentOptionIndex: number) {
  activateSegment(selectedSegment, state, segmentOptionIndex);
  if (selectedSegment.itinerary_type === 'OPEN_JAW') {
    activateLinkedSegments(selectedSegment, state);
  }
}

