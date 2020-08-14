import { Segment, Filters } from '../trip/results/ResultsInterfaces';

export const baggageFilter = (segments: Array<Segment>, filterValue: number | undefined) => {
  let totalFiltered = 0
  segments.forEach((segment: Segment) => {
    if (!filterValue) {
      segment.filtered = false;
    } else {
      segment.filtered =
        segment.baggage.number_of_pieces < filterValue ||
        (typeof(segment.baggage.number_of_pieces) === 'string' && filterValue > 1)
      if (!segment.filtered) {
        totalFiltered += 1
      }
    }
  })
  if (totalFiltered === 0) {
    resetFilters(segments);
  }
}

const resetFilters = (segments: Array<Segment>) =>
  segments.forEach((segment: Segment) =>
    segment.filtered = false
  );

export const filterSegments = (segments: Array<Segment>, filters: Filters) => {
  const filtersKeys = Object.keys(filters)
  if (filtersKeys.includes('baggage')) {
    baggageFilter(segments, filters.baggage);
  }


  return segments;
}

export const filterItinerary = (segmentOptions: Array<Array<Segment>>, filters: Filters) =>
  segmentOptions.forEach((segments: Array<Segment>) =>
    filterSegments(segments, filters)
  )