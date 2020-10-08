
import { Results, Segment } from "../trip/results/ResultsInterfaces";

export function getFullTripWithVi(actives: Array<Segment>, trip: Results) {
  let fullTrip: Array<Segment> = [];
  actives.forEach((activeSegment: Segment, segmentIndex: number) => {
    fullTrip.push(activeSegment);
    const viSolutionSegment: Segment | undefined = getLinkedViSegment(activeSegment, segmentIndex, trip);
    if (viSolutionSegment) {
      fullTrip.push(viSolutionSegment);
    }
  });
  return fullTrip;
}

export function getLinkedViSegmentsForPricing(actives: Array<Segment>, trip: Results) {
  let fullTrip: Array<Segment> = [];
  actives.forEach((activeSegment: Segment, segmentIndex: number) => {
    const viSolutionSegment: Segment | undefined = getLinkedViSegment(activeSegment, segmentIndex, trip);
    if (viSolutionSegment) {
      fullTrip[viSolutionSegment.segment_position] = viSolutionSegment;
    }
  });
  return fullTrip;
}

export function getLinkedViSegment(activeSegment: Segment, segmentIndex: number, trip: Results) {
  if (activeSegment.virtual_interline) {
    const viSolutionId = activeSegment.vi_solution_id;
    const viLinkedSegment: Segment | undefined = trip.segments[segmentIndex].find((segment: Segment) =>
      segment.virtual_interline &&
      segment.vi_solution_id === viSolutionId &&
      segment.vi_position === 1
    );
    return viLinkedSegment;
  }
}