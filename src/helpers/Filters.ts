import { Segment, Filters } from '../trip/results/ResultsInterfaces';
import { cloneDeep } from 'lodash';
import _ from 'lodash';

const resetFilters = (segments: Array<Segment>) => {
  segments.forEach((segment: Segment) =>
    segment.filtered = false
  );
}

export const baggageFilter = (segments: Array<Segment>, filterValue: number | undefined) => {
  let totalFiltered = 0;
  let segments_copy = _.cloneDeep(segments);

  segments.forEach((segment: Segment) => {
    if (!segment.filtered && filterValue! > 0) {
      segment.filtered = segment.baggage.number_of_pieces < filterValue! ||
        (typeof(segment.baggage.number_of_pieces) === 'string' && filterValue! > 1);
      if (!segment.filtered) {
        totalFiltered += 1;
      }
    }
  });

  if (totalFiltered === 0) {
    segments = segments_copy;
  }
  return segments;
};

export const numberOfStopsFilter = (segments: Array<Segment>, filterValue: number | undefined) => {
  let totalFiltered = 0;
  let segments_copy = cloneDeep(segments);

  segments.forEach((segment: Segment) => {
    if (!segment.filtered) {
      segment.filtered = segment.flights.length - 1 > filterValue!;
    }
    if (!segment.filtered) {
      totalFiltered += 1;
    }
  });

  if (totalFiltered === 0) {
    segments = segments_copy;
  }
  return segments;
};

export const allianceFilter = (segments: Array<Segment>, filterValue: string | undefined) => {
  if (filterValue === '') {
    return segments;
  }
  
  let totalNotFiltered = 0;
  let segments_copy = cloneDeep(segments);
  segments.forEach((segment: Segment) => {
    if (!segment.filtered) {
      segment.filtered = (segment.alliance !== filterValue!);
    }
    if (!segment.filtered) {
      totalNotFiltered += 1;
    }
  });

  if (totalNotFiltered === 0) {
    segments = cloneDeep(segments_copy);
  }
};

export const filterSegments = (segments: Array<Segment>, filters: Filters) => {
  const filtersKeys = Object.keys(filters);
  resetFilters(segments);

  if (filtersKeys.includes('baggage')) {
    segments = baggageFilter(segments, filters.baggage);
  }
  if (filtersKeys.includes('numberOfStops')) {
    numberOfStopsFilter(segments, filters.numberOfStops);
  }
  if (filtersKeys.includes('alliance')) {
    allianceFilter(segments, filters.alliance);
  }
  return segments;
};

export const filterItinerary = (segmentOptions: Array<Array<Segment>>, filters: Filters) =>
  segmentOptions.forEach((segments: Array<Segment>) =>
    filterSegments(segments, filters)
  );