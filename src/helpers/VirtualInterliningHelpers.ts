
import { Results, Segment } from "../trip/results/ResultsInterfaces";

export function getFullTripWithVi(actives: Array<Segment>, trip: Results) {
  let fullTrip: Array<Segment> = [];
  actives.forEach((activeSegment: Segment, segmentIndex: number) => {
    fullTrip.push(activeSegment);
    const viSolutionSegment: Segment | undefined = getLinkedViSegment(activeSegment, trip.segments[segmentIndex]);
    if (viSolutionSegment) {
      fullTrip.push(viSolutionSegment);
    }
  });
  return fullTrip;
}

export function getLinkedViSegmentsForPricing(actives: Array<Segment>, trip: Results) {
  let fullTrip: Array<Segment> = [];
  actives.forEach((activeSegment: Segment, segmentIndex: number) => {
    const viSolutionSegment: Segment | undefined = getLinkedViSegment(activeSegment, trip.segments[segmentIndex]);
    if (viSolutionSegment) {
      fullTrip[viSolutionSegment.segment_position] = viSolutionSegment;
    }
  });
  return fullTrip;
}

export function getLinkedViSegment(segment: Segment, segments: Array<Segment>) {
  if (segment.virtual_interline) {
    const viSolutionId = segment.vi_solution_id;
    return segments.find((potentialLinkedSegment: Segment) =>
      potentialLinkedSegment.virtual_interline &&
      potentialLinkedSegment.vi_solution_id === viSolutionId &&
      potentialLinkedSegment.vi_position !== segment.vi_position
    );
  }
}