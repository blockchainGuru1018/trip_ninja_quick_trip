import { Segment } from '../trip/results/ResultsInterfaces';

export const sortBySortOrder = (segments: Array<Segment>, sortOrder: string) => {
  return segments.sort((a: Segment, b: Segment) => {
    switch (sortOrder) {
      case 'best':
        return a.relativeWeight && b.relativeWeight
          ? a.relativeWeight - b.relativeWeight
          : a.weight - b.weight;
      case 'cheapest':
        return a.relativePrice && b.relativePrice
          ? a.relativePrice - b.relativePrice
          : a.price - b.price;
      case 'fastest':
        return a.segment_time_w_connections - b.segment_time_w_connections;
      default:
        return -1;
    }
  });
}