import { Segment } from '../trip/results/ResultsInterfaces';

export const firstLetterCapital = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const getTotal = (selectedSegments: Array<Segment>, totalType: string) =>
  selectedSegments.reduce((total: number, segment: Segment) => {
    if (segment.itinerary_type === 'ONE_WAY') {
      return total + segment[totalType];
    } else {
      return isFirstPositionInStructure(segment)
        ? total + segment[totalType]
        : total;
    }
  }, 0);

export const isFirstPositionInStructure = (segment: Segment) => {
  const itineraryStructure: Array<number> = JSON.parse(segment.itinerary_structure);
  return segment.segment_position === itineraryStructure[0];
};