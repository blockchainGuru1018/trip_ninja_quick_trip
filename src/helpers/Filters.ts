
import { Segment, Filter } from '../trip/results/ResultsInterfaces';
import { cloneDeep } from 'lodash';
import { getLinkedViSegment } from "./VirtualInterliningHelpers";

const resetFilters = (segments: Array<Segment>) => {
  segments.forEach((segment: Segment) =>
    segment.filtered = false
  );
};

const setSegmentFilterStatus = (filterType: any, filter: Filter, segments: Array<Segment>) => {
  segments.forEach((segment: Segment) => {
    if (!segment.filtered) {
      segment.filtered = filterType(segment, filter);
    }
    if (segment.virtual_interline) {
      const linkedViSegment: Segment | undefined = getLinkedViSegment(segment, segments);
      segment.filtered = filter.type === 'noOfStops'
        ? segment.filtered || filterType([], filter, [segment, linkedViSegment])
        : segment.filtered || filterType(linkedViSegment, filter);
      linkedViSegment!.filtered = segment.filtered;
    }
  });
  return segments;
};

export const baggageFilter = (segment: Segment, filter: Filter) => {
  if (filter.value === 'Any' || filter.failed) {
    return false;
  } else {
    return segment.baggage.number_of_pieces < filter.value ||
      (typeof(segment.baggage.number_of_pieces) === 'string' && filter.value > 1);
  }
};

export const numberOfStopsFilter = (segment: Segment, filter: Filter, viSegments: Array<Segment> = []) => {
  if (filter.value === 'Any' || filter.failed) {
    return false;
  } else if (viSegments.length) {
    const nFlights = viSegments.reduce((total: number, viSegment: Segment) => total += viSegment.flights.length, 0);
    return nFlights - 1 > filter.value;
  } else {
    return segment.flights.length - 1 > filter.value;
  }
};

export const allianceFilter = (segment: Segment, filter: Filter) => {
  if (filter.value === 'Any' || filter.failed) {
    return false;
  } else {
    return segment.alliance !== filter.value;
  }
};

export const checkFilteredLength = (segments: Array<Segment>) => 
  segments.filter((segment: Segment) => !segment.filtered).length;

export const filterSegments = (segments: Array<Segment>, filters: Array<Filter>, segmentLevelFilter: boolean = false) => {
  resetFilters(segments);
  const filterMap = {
    baggage: baggageFilter,
    noOfStops: numberOfStopsFilter,
    alliance: allianceFilter
  };

  filters.forEach((filter: Filter) => {
    const filterType = filterMap[filter.type];
    let segments_copy = cloneDeep(segments);
    setSegmentFilterStatus(filterType, filter, segments);
    if ((filter.failed || checkFilteredLength(segments) === 0) && !segmentLevelFilter) {
      filter.failed = true;
      segments = segments_copy;
      setSegmentFilterStatus(filterType, filter, segments);
    } else {
      filter.failed = false;
    }
  });
  return segments;
};

export const filterItinerary = (segmentOptions: Array<Array<Segment>>, filters: Array<Filter>) => {
  filters.forEach((filter: Filter) => filter.failed = false);
  segmentOptions.forEach((segments: Array<Segment>) => {
    filterSegments(segments, filters);
    if (filters.some((filter: Filter) => filter.failed)) {
      filterSegments(segments, filters);
    }
  });
};
