import { Segment, Filters } from '../trip/results/ResultsInterfaces';
import { cloneDeep } from 'lodash';

const resetFilters = (segments: Array<Segment>) =>
  segments.forEach((segment: Segment) =>
    segment.filtered = false
  );

export const baggageFilter = (segments: Array<Segment>, filterValue: number | undefined) => {
  let totalNotFiltered = 0;

  let segments_copy = cloneDeep(segments);

  segments.forEach((segment: Segment) => {
    if (!segment.filtered && filterValue! > 0) {
      segment.filtered = segment.baggage.number_of_pieces < filterValue!;
      if (!segment.filtered) {
        totalNotFiltered += 1;
      }
    }
  });

  if (totalNotFiltered === 0) {
    segments = cloneDeep(segments_copy);
  }
};

export const numberOfStopsFilter = (segments: Array<Segment>, filterValue: number | undefined) => {
  let totalNotFiltered = 0;

  let segments_copy = cloneDeep(segments);

  segments.forEach((segment: Segment) => {
    if (!segment.filtered) {
      segment.filtered = segment.flights.length - 1 > filterValue!;
      if (!segment.filtered) {
        totalNotFiltered += 1;
      }
    }
  });

  if (totalNotFiltered === 0) {
    segments = cloneDeep(segments_copy);
  }
<<<<<<< HEAD
};

export const filterSegments = (segments: Array<Segment>, filters: Filters) => {
  const filtersKeys = Object.keys(filters);
  resetFilters(segments);

  //if (filtersKeys.includes('baggage')) {
  //  baggageFilter(segments, filters.baggage);
  //}
  //if (filtersKeys.includes('numberOfStops')) {
  //  numberOfStopsFilter(segments, filters.numberOfStops);
  //}
=======

>>>>>>> develop

  return segments;
};

export const filterItinerary = (segmentOptions: Array<Array<Segment>>, filters: Filters) =>
  segmentOptions.forEach((segments: Array<Segment>) =>
    filterSegments(segments, filters)
  );