export const setMidnight = (date: string) => {
  const preparedDate = new Date(date);
  preparedDate.setHours(0);

  return preparedDate;
};
