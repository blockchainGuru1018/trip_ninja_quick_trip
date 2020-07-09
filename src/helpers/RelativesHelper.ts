import { ResultsDetails, Results, Segment } from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import { updateActiveSegments } from './CompatibilityHelpers';
import { getTotal } from './MiscHelpers';

export function setRelatives(resultsDetails: ResultsDetails) {
  const clonedResults = _.cloneDeep(resultsDetails)
  setActives(clonedResults)
  const results: Results = resultsDetails[resultsDetails.tripType]
  const totals: Array<number> = setTotals(results);
  const totalPrice: number = totals[0];
  const totalWeight: number = totals[1];
  return results.segments.forEach((result: Array<Segment>, segmentOptionsIndex: number) => {
    result.forEach((segment: Segment, segmentIndex: number) => {
      console.log(clonedResults, segmentOptionsIndex, segment.itinerary_id)
      const dummyActives: ResultsDetails = updateActiveSegments(
        clonedResults, {segmentOptionIndex: segmentOptionsIndex, segmentItineraryRef: segment.itinerary_id}
      );
      console.log(dummyActives)
      if(segmentIndex === 0) {
        console.log(getTotalFromActives(dummyActives.activeSegments, 'price'))
        console.log(dummyActives.activeSegments)
      }
      segment.relativePrice = getTotalFromActives(dummyActives.activeSegments, 'price') - totalPrice;
      segment.relativeWeight = getTotalFromActives(dummyActives.activeSegments, 'weight') - totalWeight;
    })
  })
}

const getTotalFromActives = (actives: Map<number, Segment>, value: string) =>
  Array.from(actives).reduce((total: number, activeSegment: any) =>
    total += activeSegment[1][value], 0
  )

const setTotals = (results: Results) => {
  const temporaryActives: Array<Segment> = results.segments.map((segmentArray: Array<Segment>) =>
    segmentArray[0]
  );
  const weight: number = getTotal(temporaryActives, 'weight');
  const price: number =  getTotal(temporaryActives, 'price');
  return [price, weight];
}

const setActives = (resultsDetails: ResultsDetails) => {
  resultsDetails[resultsDetails.tripType].segments.forEach((segments: Array<Segment>, segmentIndex: number) => {
    console.log(segments[0], segmentIndex)
    resultsDetails.activeSegments.set(segmentIndex, segments[0])
  });
};