import React from 'react';

class SearchButton extends React.Component {
  render() {
    return (
      <div className="float-right">
        <button className="btn btn-primary">Search Flights</button>   
      </div>
    )
  }
}

export default SearchButton;