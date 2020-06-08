
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
}

export const dateFormats = {
  UK: 'dd/MM/yyyy',
  USA: 'MMM dd yyyy'
}
