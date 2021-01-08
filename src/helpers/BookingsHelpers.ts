import { BookingItinerary, BookingSegment} from "../bookings/BookingsInterfaces";

export const getOrderedSegmentsFromItinerary = (itineraries: Array<BookingItinerary>) => {
  const segmentsFromItinerary: Array<BookingSegment> = getSegmentsFromBookingItinerary(itineraries);
  return sortSegmentList(segmentsFromItinerary);
};

export const getSegmentsFromBookingItinerary = (itineraries: Array<BookingItinerary>) => {
  let segmentList: Array<BookingSegment> = [];
  itineraries.forEach((bookedItinerary: BookingItinerary) => bookedItinerary.segments.forEach(
    (bookedSegment: BookingSegment) => segmentList.push(bookedSegment)
  ));
  return segmentList;
};

export const sortSegmentList = (segments: Array<BookingSegment>) => {
  let viSegments: Array<string> = [];
  let viCount: number = 0;
  let sortedSegments: Array<BookingSegment> = [];
  segments.forEach((_: BookingSegment) => {
    const segmentsAtNthPosition: Array<BookingSegment> = segments.filter(
      (potentialSegment: BookingSegment) => potentialSegment.segment_id === viCount
    );
    let nextSegmentInLine: BookingSegment | undefined;
    if(segmentsAtNthPosition!.length > 1) {
      if(viSegments.includes(segmentsAtNthPosition[0].vi_solution_id)) {
        nextSegmentInLine = segmentsAtNthPosition.find((viSegment: BookingSegment) => viSegment.vi_position === 1);
        viCount += 1;
      } else {
        nextSegmentInLine = segmentsAtNthPosition.find((viSegment: BookingSegment) => viSegment.vi_position === 0);
        viSegments.push(segmentsAtNthPosition[0].vi_solution_id);
      }
    } else {
      nextSegmentInLine = segmentsAtNthPosition[0];
      viCount += 1;
    }
    sortedSegments.push(nextSegmentInLine!);
  });
  return sortedSegments;
};


export const sortItineraryList = ((sortedSegments: Array<BookingSegment>, itineraries: Array<BookingItinerary>) => {
  const sortedSegmentsItineraryIndexes = sortedSegments.map((sortedSegment: BookingSegment) => sortedSegment.itinerary_index);
  const setOfItineraryIndexes = [...new Set(sortedSegmentsItineraryIndexes)];
  const sortedItineraryList: Array<BookingItinerary | undefined> = [];
  setOfItineraryIndexes.forEach((itineraryIndex: any) => {
    sortedItineraryList.push(itineraries.find(
      (potentialItinerary: BookingItinerary) => potentialItinerary.itinerary_reference === itineraryIndex)
    );
  });
  return sortedItineraryList;
});

