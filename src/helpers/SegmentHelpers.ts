import { Segment } from "../trip/results/ResultsInterfaces";


export const isSecondPartOfOpenJaw = (segment: Segment) => {
  const segment_structure: Array<number> = JSON.parse(segment.itinerary_structure);
  return segment.itinerary_type === 'OPEN_JAW' &&
    segment.segment_position !== segment_structure[0];
}