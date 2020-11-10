import { Segment } from '../trip/results/ResultsInterfaces';
import { numberOfItineraries } from './MiscHelpers';

export const calculateDistributedMarkup = (tripMarkup: number, segments: Array<Segment>) => {
  const itineraryCount: number = numberOfItineraries(segments);
  const segmentPrice: number = 50;
  const tripPrice: number = 100;
  if (tripMarkup > 0) {
    return tripMarkup * segmentPrice/tripPrice;
  }

  return 0;
};

