import {Results, ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import { updateActiveSegments, updateSegmentActivesAndAlternates } from './CompatibilityHelpers';
import { getTotal } from './MiscHelpers';

export function identifyAndSetInitialActives(resultsDetails: ResultsDetails, sortBy: string) {
  setIndex0AsActives(resultsDetails);
  // set relative prices with intial = true
  console.log(JSON.parse(JSON.stringify([...resultsDetails.activeSegments.values()])))
  setRelativesAndUpdateActives(resultsDetails, true, sortBy);
  return resultsDetails;
}

function calculateTotalForTargetActives(clonedResults: ResultsDetails, segmentPosition: number, segment: Segment) {
  updateActiveSegments(clonedResults, segmentPosition, segment.itinerary_id);
  const targetActives: Array<Segment> = [...clonedResults.activeSegments.values()];
  const targetTotalPrice: number = getTotal(targetActives, 'price');
  const targetTotalWeight: number = getTotal(targetActives, 'weight');
  const targetTotalTime: number = targetActives.reduce((total: number, segment: Segment) => total += segment.segment_time_w_connections, 0);
  const targetItineraryIdList = getActivesItineraryIds(targetActives);
  const viable: boolean = targetActives.every((segment: Segment) => !segment.filtered)
  return {
    "totalPrice": targetTotalPrice,
    "totalWeight": targetTotalWeight,
    "totalTime": targetTotalTime,
    "itineraryIdList": targetItineraryIdList,
    viable
  };
}

export function setFilteredRelatives(resultsDetails: ResultsDetails) {
  const results: Results = resultsDetails[resultsDetails.tripType]
  results.segments.forEach((segmentOptions: Array<Segment>, segmentOptionsIndex: number) => {
    const firstFilteredSegment: Segment | undefined = segmentOptions.find((segment: Segment) => !segment.filtered)
    updateActiveSegments(resultsDetails, segmentOptionsIndex, firstFilteredSegment ? firstFilteredSegment.itinerary_id : segmentOptions[0].itinerary_id)
  })
}

export function setRelativesAndUpdateActives(resultsDetails: ResultsDetails, setActivesInitial: boolean = false, sortBy: string = 'best') {
  const results: Results = resultsDetails[resultsDetails.tripType];
  let actives = [...resultsDetails.activeSegments.values()];
  console.log('pre pre active', JSON.parse(JSON.stringify(actives)))
  let clonedResults = _.cloneDeep(resultsDetails);
  let totals: Array<number> = setTotals(resultsDetails.activeSegments);
  let totalPrice: number = totals[0];
  let totalWeight: number = totals[1];
  let totalTime: number = totals[2]
  let minimumWeight: number = totalWeight;
  let minimumPrice: number = totalPrice;
  let minimumTime: number = totalTime;
  let bestTrip: Array<string> = actives.map(
    (segment: Segment) => segment.itinerary_id
  );
  results.segments.forEach((segmentOptions: Array<Segment>, segmentPosition: number) => {

    segmentOptions.forEach((segment: Segment, index: number) => {
      let targetActivesTotal = calculateTotalForTargetActives(clonedResults, segmentPosition, segment);
      if (sortBy === 'best') {
        if (targetActivesTotal.totalWeight < minimumWeight && targetActivesTotal.viable) {
          minimumWeight = targetActivesTotal.totalWeight; // this is wrong when changing back to best
          bestTrip = targetActivesTotal.itineraryIdList;
        }
      } else if (sortBy === 'cheapest') {
        if (targetActivesTotal.totalPrice < minimumPrice && targetActivesTotal.viable) {
          minimumPrice = targetActivesTotal.totalPrice; // this is wrong when changing back to best
          bestTrip = targetActivesTotal.itineraryIdList;
        }
      } else {
        if (targetActivesTotal.totalTime < minimumTime && targetActivesTotal.viable) {
          minimumTime = targetActivesTotal.totalTime; // this is wrong when changing back to best
          bestTrip = targetActivesTotal.itineraryIdList;
        }
      }
      segment.relativePrice = targetActivesTotal.totalPrice - totalPrice;
      segment.relativeWeight = targetActivesTotal.totalWeight - totalWeight;
      segment.relativeTime = targetActivesTotal.totalTime - totalTime;
    });
    if (setActivesInitial) {
      updateActiveSegments(resultsDetails, segmentPosition, bestTrip[segmentPosition]);
      actives = [...resultsDetails.activeSegments.values()];
      totals = setTotals(resultsDetails.activeSegments);
      totalPrice = totals[0];
      totalWeight = totals[1];
      totalTime = totals[2];
    }
    console.log('pre active', JSON.parse(JSON.stringify(actives)))
    actives.forEach((segment: Segment, index: number) => updateActiveSegments(clonedResults, index, segment.itinerary_id));
    console.log('post active', JSON.parse(JSON.stringify(actives)))
    // clonedResults = _.cloneDeep(resultsDetails)

  });
}

function getActivesItineraryIds(activeSegment: Array<Segment>) {
  return activeSegment.map((segment: Segment) => segment.itinerary_id);
}

const setTotals = (activeSegments: any) => {
  const temporaryActives: Array<Segment> = [...activeSegments.values()];
  const weight: number = getTotal(temporaryActives, 'weight');
  const price: number =  getTotal(temporaryActives, 'price');
  const time: number = temporaryActives.reduce((total: number, segment: Segment) => total += segment.segment_time_w_connections, 0)
  return [price, weight, time];
};

function setIndex0AsActives(state: ResultsDetails) {
  const trip: Results = state[state.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentPositionIndex: number) => {
    const sortedSegment = segmentOptions.sort((a: Segment, b: Segment) => a.weight - b.weight)
    const segmentToChange = sortedSegment.find((segment: Segment) => !segment.filtered)
    console.log(JSON.parse(JSON.stringify(sortedSegment)))
    console.log(JSON.parse(JSON.stringify(segmentToChange)))
    updateSegmentActivesAndAlternates(segmentToChange!, state, segmentPositionIndex, true)
  });
}
