import { Results, Segment } from '../trip/results/ResultsInterfaces';

export function getActiveSegments(trip: Results) {
  return trip.segments.map((segments: Array<Segment>) =>
    segments.find((object: Segment) => object.status === 'active') || segments[0]
  );
}