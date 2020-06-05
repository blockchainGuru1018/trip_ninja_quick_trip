
export function datesAreOnSameDayOrLater(first: Date, second: Date) {
  return first.getFullYear() > second.getFullYear()
    ? true
    : first.getFullYear() === second.getFullYear()
      ? first.getMonth() > second.getMonth()
        ? true
        : first.getMonth() === second.getMonth()
          ? first.getDate() >= second.getDate()
          : false
      : false
};
