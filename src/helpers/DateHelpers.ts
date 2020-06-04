
export function datesAreOnSameDayOrLater(first: Date, second: Date) {
  console.log(first.getFullYear(), second.getFullYear());
  console.log(first.getMonth(), second.getMonth());
  console.log(first.getDate(), second.getDate());
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
