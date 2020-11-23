
import {testingBookingItinerary, testingBookingSegment } from "./TestingObjectHelpers";
import {sortItineraryList, sortSegmentList} from "./BookingsHelpers";

let segment1 = JSON.parse(JSON.stringify(testingBookingSegment));
let segment2 = JSON.parse(JSON.stringify(testingBookingSegment));
let segment3 = JSON.parse(JSON.stringify(testingBookingSegment));
let segment4 = JSON.parse(JSON.stringify(testingBookingSegment));
let segment5 = JSON.parse(JSON.stringify(testingBookingSegment));

segment1 = {...segment1, segment_id: 2, itinerary_index: '1'};
segment2 = {...segment2, segment_id: 0, virtual_interline: true, vi_position: 1, itinerary_index: '2'};
segment3 = {...segment3, segment_id: 0, virtual_interline: true, vi_position: 0, itinerary_index: '3'};
segment4 = {...segment4, segment_id: 1, itinerary_index: '1'};
segment5 = {...segment5, segment_id: 3, itinerary_index: '4'};
const orderedSegments = [segment3, segment2, segment4, segment1, segment5];


test('testSortSegmentList', () => {

  const unorderedSegments = [segment1, segment2, segment3, segment4, segment5];
  expect(sortSegmentList(unorderedSegments)).toStrictEqual(orderedSegments);
});


test('testSortItineraryList', () => {
  let itinerary1 = {...testingBookingItinerary, itinerary_reference: "1"};
  let itinerary2 = {...testingBookingItinerary, itinerary_reference: "2"};
  let itinerary3 = {...testingBookingItinerary, itinerary_reference: "3"};
  let itinerary4 = {...testingBookingItinerary, itinerary_reference: "4"};

  const unorderedItineraries = [itinerary1, itinerary2, itinerary3, itinerary4];
  const orderedItineraries = [itinerary3, itinerary2, itinerary1, itinerary4];
  expect(sortItineraryList(orderedSegments, unorderedItineraries)).toStrictEqual(orderedItineraries);
});