import { Segment, Filter } from '../trip/results/ResultsInterfaces';
import { cloneDeep } from 'lodash';


const resetFilters = (segments: Array<Segment>) => {
  segments.forEach((segment: Segment) =>
    segment.filtered = false
  );
};

export const baggageFilter = (segment: Segment, filter: Filter) => {
  if (filter.value === 'Any'){
    return false;
  } else {
    return segment.baggage.number_of_pieces < filter.value ||
      (typeof(segment.baggage.number_of_pieces) === 'string' && filter.value > 1);
  }
};

export const numberOfStopsFilter = (segment: Segment, filter: Filter) => {
  if (filter.value === 'Any'){
    return false;
  } else {
    return segment.flights.length - 1 > filter.value;
  }
};

export const allianceFilter = (segment: Segment, filter: Filter) => {
  if (filter.value === 'Any'){
    return false;
  } else {
    return segment.alliance !== filter.value;
  }
};

export const checkFilteredLength = (segments: Array<Segment>) => {
  let length = segments.filter(function(item){
    return !item.filtered;
  }).length;
  return length;
};

export const filterSegments = (segments: Array<Segment>, filters: Array<Filter>) => {
  resetFilters(segments);
  const filterMap = {
    baggage: baggageFilter,
    noOfStops: numberOfStopsFilter,
    alliance: allianceFilter
  };

  filters.forEach((filter: Filter) => {
    const filterType = filterMap[filter.type];
    let segments_copy = cloneDeep(segments);
    segments.forEach((segment: Segment) => {
      if (!segment.filtered) {
        segment.filtered = filterType(segment, filter);
      }
    });
    if (checkFilteredLength(segments) === 0) {
      segments = segments_copy;
      filter.failed = true;
    } else {
      filter.failed = false;
    }
  });

  return segments;
};


export const filterItinerary = (segmentOptions: Array<Array<Segment>>, filters: Array<Filter>) => {
  segmentOptions.forEach((segments: Array<Segment>, index: number) =>
    segmentOptions[index] = filterSegments(segments, filters)
  );
};
