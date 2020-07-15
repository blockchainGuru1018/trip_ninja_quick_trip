import {Results, ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import {
  activateLinkedSegments,
  activateSegment,
  getOtherPositionsInItineraryStructure,
  setAlternatesStatus,
  updateActiveSegments
} from './CompatibilityHelpers';
import {getTotal, isFirstPositionInStructure} from './MiscHelpers';

export function identifyAndSetInitialActives(resultsDetails: ResultsDetails) {
  // set actives
  setIndex0AsActives(resultsDetails);
  // set relative prices with intial = true
  setRelativesAndUpdateActives(resultsDetails, true);
  return resultsDetails;
}

function calculateTotalForTargetActives(clonedResults: ResultsDetails, segmentPosition: number, segment: Segment) {
  updateActiveSegments(clonedResults, segmentPosition, segment.itinerary_id);
  const targetActives: Array<Segment> = [...clonedResults.activeSegments.values()];
  const targetTotalPrice: number = getTotal(targetActives, 'price');
  const targetTotalWeight: number = getTotal(targetActives, 'weight');
  const targetItineraryIdList = getActivesItineraryIds(targetActives);
  return {
    "totalPrice": targetTotalPrice,
    "totalWeight": targetTotalWeight,
    "itineraryIdList": targetItineraryIdList
  };
}

export function setRelativesAndUpdateActives(resultsDetails: ResultsDetails, setActivesInitial: boolean = false) {
  const clonedResults = _.cloneDeep(resultsDetails);
  const results: Results = resultsDetails[resultsDetails.tripType];
  const totals: Array<number> = setTotals(results);
  const totalPrice: number = totals[0];
  const totalWeight: number = totals[1];
  let minimumWeight: number = totalWeight;
  let bestTrip: Array<string> = [...clonedResults.activeSegments.values()].map(
    (segment: Segment) => segment.itinerary_id
  );
  results.segments.forEach((segmentOptions: Array<Segment>, segmentPosition: number) => {
    segmentOptions.forEach((segment: Segment) => {
      let targetActivesTotal = calculateTotalForTargetActives(clonedResults, segmentPosition, segment);
      if (targetActivesTotal.totalWeight < minimumWeight) {
        minimumWeight = targetActivesTotal.totalWeight;
        bestTrip = targetActivesTotal.itineraryIdList;
      }
      segment.relativePrice = targetActivesTotal.totalPrice - totalPrice;
      segment.relativeWeight = targetActivesTotal.totalWeight - totalWeight;
    });
    // following should also reset relative price and weight
    updateActiveSegments(clonedResults, segmentPosition, bestTrip[segmentPosition]); // update active segment to cheapest calculate rest of the relatives against
    if (setActivesInitial) {
      updateActiveSegments(resultsDetails, segmentPosition, bestTrip[segmentPosition]); // update state active segment for this segment position (can also do this after all is Done, but we can prevent a further loop by doing it here?)
    }
  });
}

function getActivesItineraryIds(activeSegment: Array<Segment>) {
  return activeSegment.map((segment: Segment) => segment.itinerary_id);
}

const setTotals = (results: Results) => {
  const temporaryActives: Array<Segment> = results.segments.map((segmentArray: Array<Segment>) =>
    segmentArray[0]
  );
  const weight: number = getTotal(temporaryActives, 'weight');
  const price: number =  getTotal(temporaryActives, 'price');
  return [price, weight];
};

function setIndex0AsActives(state: ResultsDetails) {
  const trip: Results = state[state.tripType];
  let skipPositions: Array<number> = [];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentPositionIndex: number) => {
    console.log(`Position ${segmentPositionIndex} activation started`);
    if (!skipPositions.includes(segmentPositionIndex)){
      console.log(`skipPositions ${skipPositions} does not include ${segmentPositionIndex}`);
      activateFirstOption(segmentOptions, segmentPositionIndex, state, skipPositions);
    }else{
      console.log(`skipPositions ${skipPositions} includes! ${segmentPositionIndex}`);
    }
  });

  function activateFirstOption(segmentOptions: Array<Segment>, segmentPositionIndex: number, state: ResultsDetails, skipPositions: Array<number>) {
    let segment = segmentOptions[0];
    console.log(`selected segment ${JSON.stringify(segment)}`);
    activateSegment(segment, state, segmentPositionIndex, true);
    console.log(`activated segment ${JSON.stringify(segment)}`);
    if (segment.itinerary_type === 'OPEN_JAW' && isFirstPositionInStructure(segment)) {
      console.log('OPEN_JAW ', segment.segment_position);
      const otherPositionsInItineraryStructure: Array<number> = activateLinkedSegments(segment, state, true);
      skipPositions.push(...otherPositionsInItineraryStructure);
      console.log('skipPositions ', skipPositions);
    }
  }
}