import { Segment } from '../trip/results/ResultsInterfaces';

export const sortBySortOrder = (segments: Array<Segment>, sortOrder: string) => {
  let index = 0;
  console.log('running sort order')
  return segments.sort((a: Segment, b: Segment) => {
    switch (sortOrder) {
      case 'best':
        return a.relativeWeight! - b.relativeWeight!
      case 'cheapest':
        return a.relativePrice! - b.relativePrice!
      case 'fastest':
        return a.segment_time_w_connections - b.segment_time_w_connections;
      default:
        console.log('in the default')
        return 1;
    }
  });
}