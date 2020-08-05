import { Segment } from '../trip/results/ResultsInterfaces';

export const sortBySortOrder = (segments: Array<Segment>, sortOrder: string) => {
  return segments.sort((a: Segment, b: Segment) => {
    switch (sortOrder) {
      case 'best':
        return a.relativeWeight! - b.relativeWeight!
      case 'cheapest':
        return a.relativePrice! - b.relativePrice!
      case 'fastest':
        return a.relativeTime! - b.relativeTime!;
      default:
        return 1;
    }
  });
}