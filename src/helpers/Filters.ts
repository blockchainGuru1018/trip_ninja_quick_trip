import { Segment, Filter } from '../trip/results/ResultsInterfaces';
import { cloneDeep } from 'lodash';
import _ from 'lodash';


const resetFilters = (segments: Array<Segment>) => {
  segments.forEach((segment: Segment) =>
    segment.filtered = false
  );
}

export const baggageFilter = (segments: Array<Segment>, filter: Filter) => {
  let totalFiltered = 0;
  let segments_copy = _.cloneDeep(segments);
  segments.forEach((segment: Segment) => {
    if (!segment.filtered && filter.value > 0) {
      segment.filtered = segment.baggage.number_of_pieces < filter.value ||
        (typeof(segment.baggage.number_of_pieces) === 'string' && filter.value > 1);
      if (!segment.filtered) {
        totalFiltered += 1;
      }
    }
  });

  if (totalFiltered === 0 && filter.value !== 0) {
    segments = segments_copy;
    filter.failed = true;
  } else {
    filter.failed = false;
  }
  return segments;
};

export const numberOfStopsFilter = (segments: Array<Segment>, filter: Filter) => {
  let totalFiltered = 0;
  let segments_copy = cloneDeep(segments);
  segments.forEach((segment: Segment) => {
    if (!segment.filtered) {
      segment.filtered = segment.flights.length - 1 > filter.value;
    }
    if (!segment.filtered) {
      totalFiltered += 1;
    }
  });

  if (totalFiltered === 0) {
    segments = segments_copy;
    filter.failed = true;
  } else {
    filter.failed = false
  }
  return segments;
};

export const filterSegments = (segments: Array<Segment>, filters: Array<Filter>) => {
  resetFilters(segments);
  const filterMap = {
    baggage: baggageFilter,
    noOfStops: numberOfStopsFilter
  }

  filters.forEach((filter: Filter) => {
    const filterType = filterMap[filter.type]
    segments = filterType(segments, filter)
  })
  return segments;
};

export const filterItinerary = (segmentOptions: Array<Array<Segment>>, filters: Array<Filter>) => {
  segmentOptions.forEach((segments: Array<Segment>, index: number) =>
    segmentOptions[index] = filterSegments(segments, filters)
  );
  return segmentOptions;
}