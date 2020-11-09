import { Segment } from '../trip/results/ResultsInterfaces';
import { numberOfItineraries } from './MiscHelpers';

export const calculateDistributedMarkup = (tripMarkup: number, segments: Array<Segment>) => {
  const itineraryCount: number = numberOfItineraries(segments);
  if (tripMarkup > 0) {
    return tripMarkup/itineraryCount;
  }
  return 0;
};

