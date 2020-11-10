
export const calculateDistributedMarkup = (tripMarkup: number, segmentPrice: number, tripPrice: number) => {
  if (tripMarkup > 0) {
    return tripMarkup * segmentPrice/tripPrice;
  }

  return 0;
};

