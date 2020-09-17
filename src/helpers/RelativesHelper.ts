import {Results, ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import { updateActiveSegments, updateSegmentActivesAndAlternates } from './CompatibilityHelpers';
import { getTotal } from './MiscHelpers';

export function identifyAndSetInitialActives(resultsDetails: ResultsDetails, sortBy: string) {
  setIndex0AsActives(resultsDetails);
  setRelativesAndUpdateActives(resultsDetails, true, sortBy);
  return resultsDetails;
}

function calculateTotalForTargetActives(clonedResults: ResultsDetails, segmentPosition: number, actives: Array<Segment>, segment: Segment) {
  actives.forEach((activeSegment: Segment, index: number) => updateActiveSegments(clonedResults, index, activeSegment.itinerary_id));
  updateActiveSegments(clonedResults, segmentPosition, segment.itinerary_id);
  const targetActives: Array<Segment> = [...clonedResults.activeSegments.values()];
  const targetTotalPrice: number = getTotal(targetActives, 'price');
  const targetTotalWeight: number = getTotal(targetActives, 'weight');
  const targetTotalTime: number = targetActives.reduce((total: number, targetActiveSegment: Segment) => total += targetActiveSegment.segment_time_w_connections, 0);
  const targetItineraryIdList = getActivesItineraryIds(targetActives);
  const viable: boolean = targetActives.every((viableSegment: Segment) => !viableSegment.filtered);
  return {
    "totalPrice": targetTotalPrice,
    "totalWeight": targetTotalWeight,
    "totalTime": targetTotalTime,
    "itineraryIdList": targetItineraryIdList,
    viable
  };
}

export function setRelativesAndUpdateActives(resultsDetails: ResultsDetails, setActivesInitial: boolean = false, sortBy: string = 'best') {
  const results: Results = resultsDetails[resultsDetails.tripType];
  let actives = [...resultsDetails.activeSegments.values()];
  let clonedResults = _.cloneDeep(resultsDetails);
  let totals: Array<number> = setTotals(resultsDetails.activeSegments);
  let totalPrice: number = totals[0];
  let totalWeight: number = totals[1];
  let totalTime: number = totals[2];
  let minimumWeight: any = totalWeight;
  let minimumPrice: any = totalPrice;
  let minimumTime: number = totalTime;
  let bestTrip: any = actives.map(
    (segment: Segment) => segment.itinerary_id
  );

  function compareBestTripByBest(targetActivesTotal: any) {
    if (targetActivesTotal.totalWeight <= minimumWeight && targetActivesTotal.viable) {
      if (targetActivesTotal.totalWeight === minimumWeight && targetActivesTotal.totalPrice < minimumPrice) {
        setMinPriceAndWeight(targetActivesTotal, true, true)
      } else {
        setMinPriceAndWeight(targetActivesTotal, false, true)
      }
    }
  }

  function compareBestTripByCheapest(targetActivesTotal: any) {
    if (targetActivesTotal.totalPrice < minimumPrice && targetActivesTotal.viable) {
      if (targetActivesTotal.totalPrice === minimumPrice && targetActivesTotal.totalWeight < minimumWeight) {
        setMinPriceAndWeight(targetActivesTotal, true, true)
      } else {
        setMinPriceAndWeight(targetActivesTotal, true, false)
      }
    }
  }

  function setMinPriceAndWeight(targetActivesTotal: any, price: boolean, weight: boolean) {
    minimumPrice = price ? targetActivesTotal.totalPrice : minimumPrice
    minimumWeight = weight ? targetActivesTotal.totalWeight : minimumWeight
    bestTrip = targetActivesTotal.itineraryIdList
  }

  results.segments.forEach((segmentOptions: Array<Segment>, segmentPosition: number) => {
    segmentOptions.forEach((segment: Segment, index: number) => {
      let targetActivesTotal = calculateTotalForTargetActives(clonedResults, segmentPosition, actives, segment);
      if (sortBy === 'best') {
       compareBestTripByBest(targetActivesTotal)
      } else if (sortBy === 'cheapest') {
        compareBestTripByCheapest(targetActivesTotal)
      } else {
        if (targetActivesTotal.totalTime < minimumTime && targetActivesTotal.viable) {
          minimumTime = targetActivesTotal.totalTime;
          bestTrip = targetActivesTotal.itineraryIdList;
        }
      }
      segment.relativePrice = targetActivesTotal.totalPrice - totalPrice;
      segment.relativeWeight = targetActivesTotal.totalWeight - totalWeight;
      segment.relativeTime = targetActivesTotal.totalTime - totalTime;
    });
    if (setActivesInitial) {
      bestTrip.forEach((segmentPosition: string, index: number) =>  updateActiveSegments(resultsDetails, index, segmentPosition))
      actives = [...resultsDetails.activeSegments.values()];
      totals = setTotals(resultsDetails.activeSegments);
      totalPrice = totals[0];
      totalWeight = totals[1];
      totalTime = totals[2];
    }
    actives.forEach((segment: Segment, index: number) => updateActiveSegments(clonedResults, index, segment.itinerary_id));
  });
  actives.forEach((segment: Segment) => segment.status = 'active')
}

function getActivesItineraryIds(activeSegment: Array<Segment>) {
  return activeSegment.map((segment: Segment) => segment.itinerary_id);
}

const setTotals = (activeSegments: any) => {
  const temporaryActives: Array<Segment> = [...activeSegments.values()];
  const weight: number = getTotal(temporaryActives, 'weight');
  const price: number =  getTotal(temporaryActives, 'price');
  const time: number = temporaryActives.reduce((total: number, segment: Segment) => total += segment.segment_time_w_connections, 0);
  return [price, weight, time];
};

export function setIndex0AsActives(state: ResultsDetails) {
  const trip: Results = state[state.tripType];
  resetSegmentsStatus(trip.segments)
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentPositionIndex: number) => {
    segmentOptions.sort((a: Segment, b: Segment) => a.weight - b.weight);
    const segmentToChange = segmentOptions.find((segment: Segment) => !segment.filtered) || segmentOptions[0];
    if (segmentToChange!.status !== 'active') {
      updateSegmentActivesAndAlternates(segmentToChange!, state, segmentPositionIndex, true);
    }
    return segmentOptions
  });
  return state;
}

function resetSegmentsStatus(segments: Array<Array<Segment>>) {
  segments.forEach((segmentOptions: Array<Segment>) =>
    segmentOptions.forEach((segment: Segment) => segment.status = '')
  )
}
