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
  console.log('current clone actives', JSON.parse(JSON.stringify([...clonedResults.activeSegments.values()])));
  updateActiveSegments(clonedResults, segmentPosition, segment.itinerary_id);
  const targetActives: Array<Segment> = [...clonedResults.activeSegments.values()];
  console.log('target actives', JSON.parse(JSON.stringify(targetActives)));
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
  let actives = [...clonedResults.activeSegments.values()];
  let bestTrip: Array<string> = actives.map(
    (segment: Segment) => segment.itinerary_id
  );
  console.log('initial actives', JSON.parse(JSON.stringify(actives)));
  results.segments.forEach((segmentOptions: Array<Segment>, segmentPosition: number) => {
    segmentOptions.forEach((segment: Segment) => {
      console.log(`position ${segmentPosition}, compatibility: ${segment.status}, itinerary: ${segment.itinerary_id}, structure: ${segment.itinerary_structure}`);
      let targetActivesTotal = calculateTotalForTargetActives(clonedResults, segmentPosition, segment);
      console.log(`total price ${targetActivesTotal.totalPrice}`);
      console.log(`total weight ${targetActivesTotal.totalWeight}`);
      if (targetActivesTotal.totalWeight < minimumWeight) {
        minimumWeight = targetActivesTotal.totalWeight ;
        bestTrip = targetActivesTotal.itineraryIdList;
      }
      segment.relativePrice = targetActivesTotal.totalPrice - totalPrice;
      segment.relativeWeight = targetActivesTotal.totalWeight - totalWeight;
      console.log(`relativePrice ${segment.relativePrice}`);
      console.log(`relativeWeight ${segment.relativeWeight}`);

    });
    if (setActivesInitial) {
      updateActiveSegments(clonedResults, segmentPosition, bestTrip[segmentPosition]);
      updateActiveSegments(resultsDetails, segmentPosition, bestTrip[segmentPosition]);
      console.log(`activated itinerary ${bestTrip[segmentPosition]}`);
    }else{
      let previously_active_segment_id: string = resultsDetails.activeSegments.get(segmentPosition).itinerary_id;
      updateActiveSegments(clonedResults, segmentPosition, previously_active_segment_id);

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
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentPositionIndex: number) => {
    updateSegmentActivesAndAlternates(segmentOptions[0], state, segmentPositionIndex, true)
  });
}
