
export const itineraryTypeMap = (itinerary: string) => {
  const typesMap = {"ONE_WAY": "One-way", "OPEN_JAW": "Open Jaw", "MULTI_PNR": "Multi-PNR"};
  return typesMap[itinerary];
};