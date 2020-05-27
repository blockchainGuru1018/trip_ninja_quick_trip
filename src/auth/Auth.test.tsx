import React from 'react';
import Login from './Login';
import ReactDOM from 'react-dom';

const loginComponent = Login.prototype

test('add', () => {
  const total: number = loginComponent.add(2, 4);
  expect(total).toBe(6);
});

test('addString', () => {
  const totalString: string = loginComponent.addString(2, 5);
  expect(totalString).toBe('$7');
})

it('renders login', () => {
  const div: HTMLDivElement = document.createElement("div");
  ReactDOM.render(<Login />, div);
});
