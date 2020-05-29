import React from 'react';
import Search from './Search';
import ReactDOM from 'react-dom';
import renderer from 'jest'
import { SearchProps } from './Interfaces'
import { shallow } from 'enzyme';


// it('renders search', () => {
//   const div: HTMLDivElement = document.createElement("div");
//   ReactDOM.render(<Search />, div);
// });

test('onAddFlight', () => {
  const searchDetails = {
    'flights': [{
      'origin': '',
      'destination': '',
      'departureDate': '',
      'cabinClass': ''
    }]
  }
  const props = {
    searchDetails: searchDetails,
    setValue: null,
    addFlight: null,
    updateFlightValue: null
  }
  const tree = shallow(
    <Search />
  )
  // to get and test method -> tree.instance().onAddFlight()
})
