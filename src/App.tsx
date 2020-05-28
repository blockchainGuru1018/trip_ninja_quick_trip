import React from 'react';
import './App.css';
import API from './api'


class App extends React.Component {
  componentDidMount() {
    console.log('the component mounted')
    API.get('get_all_users/')
      .then((response: JSON) => console.log(response))
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <h1>Welcome to QuickTrip</h1>
              <h2>Something else</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
