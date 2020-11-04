import { ResultsDetails } from '../trip/results/ResultsInterfaces';
import _ from "lodash";
import { getTotal } from "./MiscHelpers";
import { identifyAndSetInitialActives } from "./RelativesHelper";

export const invalidFlexTripResult = (results: ResultsDetails) => {
  if (results.flexTripResults && results.fareStructureResults) {
    return compareFlexTripPrice(results) ||
      compareFlexTripRoute(results.fareStructureResults.path_sequence, results.flexTripResults.path_sequence);
  } else {
    return true;
  }
};

export const compareFlexTripRoute = (fareStructureRoute: Array<string>, flexTripRoute: Array<string>) => {
  const flexTripPath = JSON.stringify(flexTripRoute);
  const fareStructurePath = JSON.stringify(fareStructureRoute);
  return flexTripPath === fareStructurePath;
};

export const compareFlexTripPrice = (resultsDetails: ResultsDetails) => {
  const fareStructureTripPrice: number = getTripPrice(resultsDetails, 'fareStructureResults');
  const flexTripPrice: number = getTripPrice(resultsDetails, 'flexTripResults');
  return flexTripPrice >= fareStructureTripPrice;
};

export const getTripPrice = (resultsDetails: ResultsDetails, tripType: string) => {
  let clonedResultsDetails: ResultsDetails = _.cloneDeep(resultsDetails);
  clonedResultsDetails.tripType = tripType;
  const priceState: ResultsDetails = identifyAndSetInitialActives(clonedResultsDetails, 'best');
  return getTotal([...priceState.activeSegments.values()], 'price');
};

