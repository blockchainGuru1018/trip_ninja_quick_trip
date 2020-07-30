import {Results, ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import { updateActiveSegments, updateSegmentActivesAndAlternates } from './CompatibilityHelpers';
import { getTotal } from './MiscHelpers';

export function identifyAndSetInitialActives(resultsDetails: ResultsDetails) {
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
        minimumWeight = targetActivesTotal.totalWeight ;
        bestTrip = targetActivesTotal.itineraryIdList;
      }
      segment.relativePrice = targetActivesTotal.totalPrice - totalPrice;
      segment.relativeWeight = targetActivesTotal.totalWeight - totalWeight;
    });
    updateActiveSegments(clonedResults, segmentPosition, bestTrip[segmentPosition]);
    if (setActivesInitial) {
      updateActiveSegments(resultsDetails, segmentPosition, bestTrip[segmentPosition]);
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
  console.log('running this')
  const trip: Results = state[state.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentPositionIndex: number) => {
    const segmentSelected: Segment | undefined = segmentOptions.find((segmentPossibility: Segment) => !segmentPossibility.filtered)
    updateSegmentActivesAndAlternates(
      segmentSelected ? segmentSelected : segmentOptions[0],
      state, segmentPositionIndex, true)
  });
}
