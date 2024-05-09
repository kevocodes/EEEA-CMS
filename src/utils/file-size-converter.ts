export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const sizeInBytes = (sizeInMB: number) => {
  return sizeInMB * 1024 * 1024;
};