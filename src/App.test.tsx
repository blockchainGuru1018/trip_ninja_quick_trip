import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

it('renders app', () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
