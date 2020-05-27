import {FETCH_SEARCH, NEW_SEARCH} from './Types';

export function fetchSearch(tripDetails: object) {
  return {
    type: FETCH_SEARCH,
    tripDetails
  };
}
