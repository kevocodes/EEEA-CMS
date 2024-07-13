export const formatTimeNumber = (time: number): string => {
  // Add 0 if time is less than 10
  if (time < 10) {
    return `0${time}`;
  }

  return `${time}`;
};
