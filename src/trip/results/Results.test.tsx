import React from 'react';
import { render } from '@testing-library/react';
import FlexTripResult from './FlexTripResult';
import ItineraryResult from './ItineraryResult';
import SegmentSelection from './SegmentSelection';


test('itinerary results link renders', () => {
  const { getByText } = render(
	  <ItineraryResult/>
  );

  expect(getByText(/itinerary/i)).toBeInTheDocument();
});

test('flextrip results link renders', () => {
  const { getByText } = render(
	  <FlexTripResult/>
  );

  expect(getByText(/flextrip/i)).toBeInTheDocument();
});

test('segment selection link renders', () => {
  const { getByText } = render(
	  <SegmentSelection/>
  );

  expect(getByText(/segments/i)).toBeInTheDocument();
});
