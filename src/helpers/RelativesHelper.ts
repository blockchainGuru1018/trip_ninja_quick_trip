import { ResultsDetails, Results, Segment } from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import { updateActiveSegments } from './CompatibilityHelpers';
import { getTotal } from './MiscHelpers';
import { sortBySortOrder } from './SortHelper';

export function setRelatives(resultsDetails: ResultsDetails) {
  const clonedResults = _.cloneDeep(resultsDetails)
  setActives(clonedResults)
  const results: Results = resultsDetails[resultsDetails.tripType]
  const totals: Array<number> = setTotals(results);
  const totalPrice: number = totals[0];
  const totalWeight: number = totals[1];
  return results.segments.forEach((segmentOptions: Array<Segment>, segmentOptionsIndex: number) => {
    segmentOptions.forEach((segment: Segment) => {
      const dummyActives: ResultsDetails = updateActiveSegments(
        clonedResults, {segmentOptionIndex: segmentOptionsIndex, segmentItineraryRef: segment.itinerary_id}
      );
      segment.relativePrice = getTotal([...dummyActives.activeSegments.values()], 'price') - totalPrice;
      segment.relativeWeight = getTotal([...dummyActives.activeSegments.values()], 'weight') - totalWeight;
    })
    sortBySortOrder(segmentOptions, 'best')
  })
}

const setTotals = (results: Results) => {
  const temporaryActives: Array<Segment> = results.segments.map((segmentArray: Array<Segment>) =>
    segmentArray[0]
  );
  const weight: number = getTotal(temporaryActives, 'weight');
  const price: number =  getTotal(temporaryActives, 'price');
  return [price, weight];
}

const setActives = (resultsDetails: ResultsDetails) => {
  resultsDetails[resultsDetails.tripType].segments.forEach((segments: Array<Segment>, segmentIndex: number) =>
    resultsDetails.activeSegments.set(segmentIndex, segments[0])
  );
};