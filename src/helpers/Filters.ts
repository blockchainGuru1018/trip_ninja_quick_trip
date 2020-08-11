import { Segment, Filters } from '../trip/results/ResultsInterfaces';

const resetFilters = (segments: Array<Segment>) =>
  segments.forEach((segment: Segment) =>
    segment.filtered = false
  );

export const filterSegments = (segments: Array<Segment>, filters: Filters) => {
  let totalFiltered = 0;

  segments.forEach((segment: Segment) => {
    segment.filtered =
      (segment.flights.length - 1 > filters.numberOfStops!) || // numberOfStops Filter
      (filters.baggage > 0 && segment.baggage.number_of_pieces < filters.baggage); //baggage Filter
    if (!segment.filtered) {
      totalFiltered += 1;
    }
  });
  if (totalFiltered === 0) {
    resetFilters(segments);
  }

  return segments;
};

export const filterItinerary = (segmentOptions: Array<Array<Segment>>, filters: Filters) =>
  segmentOptions.forEach((segments: Array<Segment>) =>
    filterSegments(segments, filters)
  );