import { ResultsDetails, Results, Segment } from '../trip/results/ResultsInterfaces';
import _ from 'lodash';
import { updateActiveSegments, updateSegmentActivesAndAlternates, setAlternatesStatus,
  getOtherPositionsInItineraryStructure} from './CompatibilityHelpers';
import { getTotal } from './MiscHelpers';

export function setSegmentsAsActive(resultsDetails: ResultsDetails) {
  const cheapestTrip = setRelativesGetCheapest(resultsDetails);
  console.log(cheapestTrip)
  setActivesFromCheapest(cheapestTrip, resultsDetails);
  console.log(resultsDetails)
  return resultsDetails;
}

function setRelativesGetCheapest(resultsDetails: ResultsDetails) {
  const clonedResults = _.cloneDeep(resultsDetails)
  setActives(clonedResults)
  const results: Results = resultsDetails[resultsDetails.tripType]
  const totals: Array<number> = setTotals(results);
  const totalPrice: number = totals[0];
  const totalWeight: number = totals[1];
  let minimumPrice: number = totalPrice;
  let cheapestTrip: Array<string> = [...clonedResults.activeSegments.values()].map(
    (segment: Segment) => segment.itinerary_id
  );
  console.log('cheapest trip', cheapestTrip)
  results.segments.forEach((segmentOptions: Array<Segment>, segmentOptionsIndex: number) => {
    segmentOptions.forEach((segment: Segment, index: number) => {
      updateActiveSegments(
        clonedResults, {segmentOptionIndex: segmentOptionsIndex, segmentItineraryRef: segment.itinerary_id}
      );
      const clonedActives: Array<Segment> = [...clonedResults.activeSegments.values()];
      const clonedTotalPrice: number = getTotal(clonedActives, 'price');
      if (clonedTotalPrice < minimumPrice) {
        minimumPrice = clonedTotalPrice;
        cheapestTrip = getActivesItineraryIds(clonedActives);
      }
      segment.relativePrice = clonedTotalPrice - totalPrice;
      segment.relativeWeight = getTotal(clonedActives, 'weight') - totalWeight;
    });
    const cheapestSegment: Segment | undefined = getSegmentByItineraryId(clonedResults[clonedResults.tripType].segments[segmentOptionsIndex], cheapestTrip[segmentOptionsIndex])
    console.log(cheapestSegment)
    setInitialActiveAndAlternates(cheapestSegment!, clonedResults, segmentOptions, segmentOptionsIndex);
  })
  return cheapestTrip;
}

function setActivesFromCheapest(cheapestTrip: Array<string>, resultsDetails: ResultsDetails) {
  const trip: Results = resultsDetails[resultsDetails.tripType];
  cheapestTrip.forEach((id: string, index: number) => {
    const cheapestSegment: Segment | undefined = getSegmentByItineraryId(trip.segments[index], id)
    console.log('cheapest segment', cheapestSegment);
    if (cheapestSegment) {
      console.log(cheapestSegment)
      setInitialActiveAndAlternates(cheapestSegment, resultsDetails, trip.segments[index], index);
    }
    else {
      throw `Improper linked segment for itinerary with id ${id} at segment position ${index}`;
    }
  })
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
}

const setActives = (resultsDetails: ResultsDetails) => {
  const linkedSegmentMap = {}
  const trip: Results = resultsDetails[resultsDetails.tripType];
  trip.segments.forEach((segmentOptions: Array<Segment>, segmentIndex: number) => {
    console.log(linkedSegmentMap)
    if (linkedSegmentMap[segmentIndex]) {
      console.log('in the if')
      setInitialActiveAndAlternates(linkedSegmentMap[segmentIndex], resultsDetails,
        segmentOptions, segmentIndex)
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
        segmentOptions, segmentIndex)
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
}

const getSegmentByItineraryId = (segments: Array<Segment>, segment_id: string) =>
  segments.find(
    (potentialLinkedSegment: Segment) =>
      segment_id === potentialLinkedSegment.itinerary_id
  );