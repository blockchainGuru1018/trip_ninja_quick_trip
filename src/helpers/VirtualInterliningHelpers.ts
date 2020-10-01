
import { Results, Segment } from "../trip/results/ResultsInterfaces";

export function getFullTripWithVi(actives: Array<Segment>, trip: Results) {
  let fullTrip: Array<Segment> = [];
  actives.forEach((segment: Segment, segmentIndex: number) => {
    fullTrip.push(segment);
    if (segment.virtual_interline) {
      const vi_solution_id = segment.vi_solution_id;
      const vi_solution_segment: Segment | undefined = trip.segments[segmentIndex].find((segment: Segment) =>
        segment.virtual_interline &&
        segment.vi_solution_id === vi_solution_id &&
        segment.option_part === 1
      );
      if (vi_solution_segment) {
        fullTrip.push(vi_solution_segment);
      }
    }
  });
  return fullTrip;
}