// import {FETCH_SEARCH, NEW_SEARCH} from './Types';

export function fetchSearch(tripDetails: object) {
  return {
    type: 'FETCH_SEARCH',
    tripDetails
  };
}

export function newSearch(searchDetails: object) {
  return {
    type: 'NEW_SEARCH',
    searchDetails
  }
}
