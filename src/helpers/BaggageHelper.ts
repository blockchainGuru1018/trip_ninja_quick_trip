export const baggageLabel = (baggageCount: number) => {
  return baggageCount + (baggageCount > 1 ? 'pcs' : 'pc');
};