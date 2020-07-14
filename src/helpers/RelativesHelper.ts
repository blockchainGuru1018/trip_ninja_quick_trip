import {Results, ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import {
  getOtherPositionsInItineraryStructure,
  setAlternatesStatus,
  updateActiveSegments,
  updateActiveSegmentsFromAction
} from './CompatibilityHelpers';
import {getTotal} from './MiscHelpers';

export function identifyAndSetInitialActives(resultsDetails: ResultsDetails) {
  // set actives
  setIndex0AsActives(resultsDetails);
  console.log('setIndex0AsActives ');
  console.log(resultsDetails);
  // set relative prices
  setRelativesAndUpdateActives(resultsDetails, true);
  console.log('setRelativesAndUpdateActives ');
  console.log(resultsDetails);
  // set new actives - done in setRelativesAndUpdateActives
  // setActivesFromCheapest(cheapestTrip, resultsDetails);
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
  // setActives(clonedResults);
  const results: Results = resultsDetails[resultsDetails.tripType];
  const totals: Array<number> = setTotals(results);
  const totalPrice: number = totals[0];
  const totalWeight: number = totals[1];
  let minimumPrice: number = totalPrice;
  let cheapestTrip: Array<string> = [...clonedResults.activeSegments.values()].map(
    (segment: Segment) => segment.itinerary_id
  );
  results.segments.forEach((segmentOptions: Array<Segment>, segmentPosition: number) => {
    segmentOptions.forEach((segment: Segment) => {
      let targetActivesTotal = calculateTotalForTargetActives(clonedResults, segmentPosition, segment);
      if (targetActivesTotal.totalPrice < minimumPrice) {
        minimumPrice = targetActivesTotal.totalPrice;
        cheapestTrip = targetActivesTotal.itineraryIdList;
      }
      segment.relativePrice = targetActivesTotal.totalPrice - totalPrice;
      segment.relativeWeight = targetActivesTotal.totalWeight - totalWeight;
    });
    // following should also reset relative price and weight
    updateActiveSegments(clonedResults, segmentPosition, cheapestTrip[segmentPosition]); // update active segment to cheapest calculate rest of the relatives against
    if (setActivesInitial) {
      updateActiveSegments(resultsDetails, segmentPosition, cheapestTrip[segmentPosition]); // update state active segment for this segment position (can also do this after all is Done, but we can prevent a further loop by doing it here?)
    }
  });
}

function setActivesFromCheapest(cheapestTrip: Array<string>, resultsDetails: ResultsDetails) {
  const trip: Results = resultsDetails[resultsDetails.tripType];
  cheapestTrip.forEach((id: string, index: number) => {
    const cheapestSegment: Segment | undefined = getSegmentByItineraryId(trip.segments[index], id);
    console.log('cheapest segment', cheapestSegment);
    if (cheapestSegment) {
      console.log(cheapestSegment);
      setInitialActiveAndAlternates(cheapestSegment, resultsDetails, trip.segments[index], index);
    }
    else {
      throw `Improper linked segment for itinerary with id ${id} at segment position ${index}`;
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

const setActives = (resultsDetails: ResultsDetails) => {
  const linkedSegmentMap = {};
  const trip: Results = resultsDetails[resultsDetails.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentIndex: number) => {
    console.log(linkedSegmentMap);
    if (linkedSegmentMap[segmentIndex]) {
      console.log('in the if');
      setInitialActiveAndAlternates(linkedSegmentMap[segmentIndex], resultsDetails,
        segmentOptions, segmentIndex);
    } else {
      let segment = segmentOptions[0];
      if (segment.itinerary_type === 'OPEN_JAW') {
        const linkedSegmentPosition: Array<number> = getOtherPositionsInItineraryStructure(segment);
        if (linkedSegmentPosition.length > 1) {
          // deal with single pnr
        }
        else {
          linkedSegmentMap[linkedSegmentPosition[0]] = getSegmentByItineraryId(segmentOptions, segment.itinerary_id);
        }
      }
      setInitialActiveAndAlternates(segment, resultsDetails,
        segmentOptions, segmentIndex);
    }
  });
};

const setInitialActiveAndAlternates = (segmentToActivate: Segment, state: ResultsDetails,
  segmentOptions: Array<Segment>, segmentOptionsIndex: number) => {
  segmentToActivate.status = 'active';
  state.activeSegments.set(segmentOptionsIndex, segmentToActivate);
  // Doesn't work with open jaws
  // setAlternatesStatus(state, segmentToActivate, segmentOptions);
  // if (segmentOptionsIndex === 2) {
  //   console.log(segmentToActivate)
  //   console.log(state.activeSegments.get(2))
  // }
};

const getSegmentByItineraryId = (segments: Array<Segment>, segment_id: string) =>
  segments.find(
    (potentialLinkedSegment: Segment) =>
      segment_id === potentialLinkedSegment.itinerary_id
  );

function setIndex0AsActives(state: ResultsDetails) {
  const trip: Results = state[state.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentOptionsIndex: number) => {
    let segment = segmentOptions[0];  // TODO: change this to find the first oneway
    segment.status = 'active';
    state.activeSegments.set(segmentOptionsIndex, segment);
    setAlternatesStatus(state, segment, segmentOptions);
  });
}