// Production ranges for wine and spirits industry
export const PRODUCTION_RANGES = [
  { value: '25k-50k', label: '25.000 – 50.000' },
  { value: '50k-100k', label: '50.000 – 100.000' },
  { value: '100k-250k', label: '100.000 – 250.000' },
  { value: '250k-500k', label: '250.000 – 500.000' },
  { value: '500k+', label: '500.000 +' }
];

// Helper function to get production ranges
export const getProductionRanges = () => {
  return PRODUCTION_RANGES;
};

// Helper function to get label by value
export const getProductionRangeLabel = (value: string): string => {
  const range = PRODUCTION_RANGES.find(r => r.value === value);
  return range?.label || '';
};

// Helper function to validate production range value
export const isValidProductionRange = (value: string): boolean => {
  return PRODUCTION_RANGES.some(range => range.value === value);
};
