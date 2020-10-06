
import { Results, Segment } from "../trip/results/ResultsInterfaces";

export function getFullTripWithVi(actives: Array<Segment>, trip: Results) {
  let fullTrip: Array<Segment> = [];
  actives.forEach((activeSegment: Segment, segmentIndex: number) => {
    fullTrip.push(activeSegment);
    if (activeSegment.virtual_interline) {
      const viSolutionId = activeSegment.vi_solution_id;
      const viSolutionSegment: Segment | undefined = trip.segments[segmentIndex].find((segment: Segment) =>
        segment.virtual_interline &&
        segment.vi_solution_id === viSolutionId &&
        segment.itinerary_index === 1
      );
      if (viSolutionSegment) {
        fullTrip.push(viSolutionSegment);
      }
    }
  });
  return fullTrip;
}