import moment from 'moment'

export function datesAreOnSameDayOrLater(first: Date, second: Date) {
  return first.getFullYear() > second.getFullYear()
    ? true
    : first.getFullYear() === second.getFullYear()
      ? first.getMonth() > second.getMonth()
        ? true
        : first.getMonth() === second.getMonth()
          ? first.getDate() >= second.getDate()
          : false
      : false;
}

export const dateFormats = {
  UK: 'dd/MM/yyyy',
  USA: 'MM/dd/yyyy'
};

export function getTimeDifference(first: Date, second: Date) {
  const timeDifference = moment(second).diff(moment(first), 'milliseconds');
  const hours = Math.floor(timeDifference / (1000*60*60))
  const minutes = Math.round(60 * (timeDifference / (1000*60*60) % 1))
  return hours + 'h ' + minutes + 'm';
}

export function numberOfDaysDifference(first: Date, second: Date): number {
  const differenceInTime = second.getTime() - first.getTime();
  return Math.round(differenceInTime / (1000 * 3600 * 24));
}

export function numberOfNightsDifference(first: Date, second: Date): number {
  const firstDate = moment(first);
  const secondDate = moment(second);
  let nDays = 0;
  let firstDateToMidnight = moment(first).add(24 - firstDate.hour(), 'hours');
  if (firstDateToMidnight.isBefore(secondDate)) {
    nDays += 1;
    nDays += secondDate.diff(firstDateToMidnight, 'days');
    return nDays;
  }
  return nDays;

}