export const formatNumber = (number: number): string => {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  const tier = (Math.log10(number) / 3) | 0;
  if (tier === 0) return number.toString();
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  return scaled.toFixed(1) + suffix;
};
