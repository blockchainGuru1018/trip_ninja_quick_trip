import {ResultsDetails, Segment} from '../trip/results/ResultsInterfaces';
import _ from "lodash";
import { getTotal } from "./MiscHelpers";
import { identifyAndSetInitialActives } from "./RelativesHelper";

export const invalidFlexTripResult = (results: ResultsDetails, updateStateValue?: any) => {
  if (results.flexTripResults && results.fareStructureResults) {
    return compareFlexTripPrice(results, updateStateValue) ||
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

export const compareFlexTripPrice = (resultsDetails: ResultsDetails, updateStateValue?: any) => {
  if (resultsDetails.fareStructureResultsPrice === 0 && updateStateValue) {
    getAndSetTripPrice(resultsDetails, 'fareStructureResults', updateStateValue);
    getAndSetTripPrice(resultsDetails, 'flexTripResults', updateStateValue);
  }
  return resultsDetails.flexTripResultsPrice >= resultsDetails.fareStructureResultsPrice;
};

export const getAndSetTripPrice = (resultsDetails: ResultsDetails, tripType: string, updateStateValue: any) => {
  let clonedResultsDetails: ResultsDetails = _.cloneDeep(resultsDetails);
  clonedResultsDetails.tripType = tripType;
  const priceState: ResultsDetails = identifyAndSetInitialActives(clonedResultsDetails, 'best');
  const tripMarkup: number = clonedResultsDetails[tripType].markup;
  const clonedActives: Array<Segment> = [...priceState.activeSegments.values()];
  const markup: number = tripMarkup !== 0 ? tripMarkup : getTotal(clonedActives, 'itinerary_markup');
  const total: number = getTotal(clonedActives, 'price') + markup;
  updateStateValue(`${tripType}Price`, Math.round(total));
};

