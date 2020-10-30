import { invalid } from 'moment';
import { Results, ResultsDetails } from '../trip/results/ResultsInterfaces';

export const invalidFlexTripResult = (results: ResultsDetails) => {
  if (results.flexTripResults && results.fareStructureResults) {
    return compareFlexTripPrice(results.fareStructureResults, results.flexTripResults) ||
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

export const compareFlexTripPrice = (fareStructureResults: Results, flexTripResults: Results) => {
  const farePrice: number = getTripPrice(fareStructureResults);
  const flexPrice: number = getTripPrice(flexTripResults);
  return flexPrice >= farePrice;
};

export const getTripPrice = (results: Results) => {
  return results.segments.reduce((total, segment) =>
  {return total + segment[0].price;}, 0
  );
};

