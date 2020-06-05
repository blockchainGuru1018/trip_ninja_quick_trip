import { datesAreOnSameDayOrLater } from '../../helpers/DateHelpers';

test('datesAreOnSameDayOrLater', () => {
  const today: Date = new Date();
  let tomorrow: Date = new Date();
  tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
  expect(datesAreOnSameDayOrLater(today, today)).toBeTruthy();
  expect(datesAreOnSameDayOrLater(tomorrow, today)).toBeTruthy();
  expect(datesAreOnSameDayOrLater(today, tomorrow)).toBeFalsy();
});