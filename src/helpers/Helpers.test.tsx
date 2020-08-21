import React from 'react';
import { baggageLabel } from './BaggageHelper';
import { cityName } from './CityNameHelper';
import iataCodeHelper from './IataCodeHelper';
import { currencySymbol } from './CurrencySymbolHelper';
import { datesAreOnSameDayOrLater, getTimeDifference, numberOfDaysDifference, numberOfNightsDifference } from './DateHelpers';
import { firstLetterCapital } from './MiscHelpers';

test('testBaggageLabelMultiple', () => {
  const baggageLabelOutput: string = baggageLabel(2);
  expect(baggageLabelOutput).toStrictEqual('2pcs');
});

test('testBaggageLabelSingle', () => {
  const baggageLabelOutput: string = baggageLabel(1);
  expect(baggageLabelOutput).toStrictEqual('1pc');
});

test('testCityName', () => {
  const cityNameOutput: string = cityName('Toronto, ON, Canada');
  expect(cityNameOutput).toStrictEqual('Toronto');
});

test('testIataCode', () => {
  const iataCodeOutput: string = iataCodeHelper('AKL | Auckland, New Zealand');
  expect(iataCodeOutput).toStrictEqual('AKL');
});

test('testCurrencySymbol', () => {
  const currencySymbolOutput: string | undefined = currencySymbol('USD');
  expect(currencySymbolOutput).toStrictEqual('$');
});

test('datesAreOnSameDayOrLaterTrue', () => {
  const firstDate: Date = new Date('2020-10-02');
  const secondDate: Date = new Date('2020-10-01');
  const datesValidOutput: boolean = datesAreOnSameDayOrLater(firstDate, secondDate);
  expect(datesValidOutput).toStrictEqual(true);
});

test('datesAreOnSameDayOrLaterFalse', () => {
  const firstDate: Date = new Date('2020-10-01');
  const secondDate: Date = new Date('2020-10-02');
  const datesValidOutput: boolean = datesAreOnSameDayOrLater(firstDate, secondDate);
  expect(datesValidOutput).toStrictEqual(false);
});

test('getTimeDifference', () => {
  const firstDate: Date = new Date('2020-10-11T12:00:00Z');
  const secondDate: Date = new Date('2020-10-11T13:10:00Z');
  const timeDifferenceOutput: string = getTimeDifference(firstDate, secondDate);
  expect(timeDifferenceOutput).toStrictEqual('1h 10m');
});

test('numberOfDaysDifference', () => {
  const firstDate: Date = new Date('2020-10-10T12:00:00Z');
  const secondDate: Date = new Date('2020-10-13T12:00:00Z');
  const daysDifferenceOutput: number = numberOfDaysDifference(firstDate, secondDate);
  expect(daysDifferenceOutput).toStrictEqual(3);
});

test('numberOfNightsDifference', () => {
  const firstDate: string = '2020-10-10T12:00:00Z';
  const secondDate: string = '2020-10-12T13:10:00Z';
  const nightsDifferenceOutput: number = numberOfNightsDifference(firstDate, secondDate);
  expect(nightsDifferenceOutput).toStrictEqual(2);
});

test('firstLetterCapital', () => {
  const capitalizedString: string = firstLetterCapital("miami");
  expect(capitalizedString).toStrictEqual("Miami");
});

