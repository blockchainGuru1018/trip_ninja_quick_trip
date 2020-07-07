export const baggageLabel = (baggageCount: number | string) => {
  return baggageCount + (typeof baggageCount === 'string' ? '' : baggageCount > 1 ? 'pcs' : 'pc');
};