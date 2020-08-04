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
  const viable: boolean = targetActives.every((segment: Segment) => !segment.filtered)
  return {
    "totalPrice": targetTotalPrice,
    "totalWeight": targetTotalWeight,
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
  // const totals: Array<number> = setTotals(resultsDetails.activeSegments);
  // const totalPrice: number = totals[0];
  // const totalWeight: number = totals[1];
  // console.log(JSON.parse(JSON.stringify(totalPrice)))
  // console.log(JSON.parse(JSON.stringify(totalWeight)))
  //
  // // needs distance here too
  // let minimumWeight: number = totalWeight;
  // let minimumPrice: number = totalPrice;
  let bestTrip: Array<string> = [...resultsDetails.activeSegments.values()].map(
    (segment: Segment) => segment.itinerary_id
  );
  // console.log(JSON.parse(JSON.stringify([...clonedResults.activeSegments.values()])))
  results.segments.forEach((segmentOptions: Array<Segment>, segmentPosition: number) => {
    const clonedResults = _.cloneDeep(resultsDetails);
    const clonedActives = [...clonedResults.activeSegments.values()]
    const totals: Array<number> = setTotals(resultsDetails.activeSegments);
    const totalPrice: number = totals[0];
    const totalWeight: number = totals[1];
    console.log(JSON.parse(JSON.stringify(totalPrice)))
    console.log(JSON.parse(JSON.stringify(totalWeight)))
    let minimumWeight: number = totalWeight;
    let minimumPrice: number = totalPrice;
    segmentOptions.forEach((segment: Segment, index: number) => {
      let targetActivesTotal = calculateTotalForTargetActives(clonedResults, segmentPosition, segment);
      if (sortBy === 'best') {
        if (targetActivesTotal.totalWeight < minimumWeight && targetActivesTotal.viable) {
          minimumWeight = targetActivesTotal.totalWeight;
          bestTrip = targetActivesTotal.itineraryIdList;
        }
      } else {
        if (targetActivesTotal.totalPrice < minimumPrice && targetActivesTotal.viable) {
          minimumPrice = targetActivesTotal.totalPrice;
          bestTrip = targetActivesTotal.itineraryIdList;
        }
      }
      segment.relativePrice = targetActivesTotal.totalPrice - totalPrice;
      segment.relativeWeight = targetActivesTotal.totalWeight - totalWeight;
    });
    updateActiveSegments(clonedResults, segmentPosition, clonedActives[segmentPosition].itinerary_id);
    if (setActivesInitial) {
      updateActiveSegments(clonedResults, segmentPosition, bestTrip[segmentPosition]);
      updateActiveSegments(resultsDetails, segmentPosition, bestTrip[segmentPosition]);
    }

    const selectedActives = [...resultsDetails.activeSegments.values()]
    let activeRelativePrice = selectedActives[segmentPosition].relativePrice!;
    let activeRelativeWeight = selectedActives[segmentPosition].relativeWeight!;
    console.log(segmentPosition)
    console.log("clonedActives:", clonedActives);
    console.log(clonedResults)
    console.log(activeRelativeWeight)
    segmentOptions.forEach((segment: Segment, index: number) => {
      segment.relativePrice = segment.relativePrice! - activeRelativePrice;
      segment.relativeWeight = segment.relativeWeight! - activeRelativeWeight;
    })

    return {...resultsDetails}


  });
}

function getActivesItineraryIds(activeSegment: Array<Segment>) {
  return activeSegment.map((segment: Segment) => segment.itinerary_id);
}

const setTotals = (activeSegments: any) => {
  const temporaryActives: Array<Segment> = [...activeSegments.values()];
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
