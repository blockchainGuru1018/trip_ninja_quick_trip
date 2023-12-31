import moment from 'moment';
import {FlightResultsDetails} from "../trip/results/ResultsInterfaces";

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
  const hours = Math.floor(timeDifference / (1000*60*60));
  const minutes = Math.round(60 * (timeDifference / (1000*60*60) % 1));
  return hours + 'h ' + minutes + 'm';
}

export const getLayoverTime = (firstFlight: FlightResultsDetails, secondFlight: FlightResultsDetails) => {
  const arrivingFlightTime: Date = new Date(firstFlight.arrival_time);
  const departingFlightTime: Date = new Date(secondFlight.departure_time);
  return getTimeDifference(arrivingFlightTime, departingFlightTime);
};

export function numberOfDaysDifference(first: Date, second: Date): number {
  const differenceInTime = second.getTime() - first.getTime();
  return Math.round(differenceInTime / (1000 * 3600 * 24));
}

export function numberOfNightsDifference(first: string, second: string): number {
  const firstDate = moment(first.slice(0, 19));
  const secondDate = moment(second.slice(0, 19));
  let nDays = 0;
  let firstDateToMidnight = moment(first.slice(0, 19)).add(24 - firstDate.hour(), 'hours');
  if (firstDateToMidnight.isBefore(secondDate)) {
    nDays += 1;
    nDays += secondDate.diff(firstDateToMidnight, 'days');
    return nDays;
  }
  return nDays;
}

export function getTodaysDate(hours: boolean) {
  const date = new Date().toISOString();
  return hours
    ? date.slice(0, 16).replace("T", " ")
    : date.slice(0, 10);
}

export function noTimeZoneOffsetDate(departureDate: string) {
  return departureDate.slice(0, 10)+'T00:00:00.000';
}