import React from 'react';
import NavBar from './common/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="row">
            <div className="col-lg">
              <h1>Welcome to QuickTrip</h1>
            </div>
        </div>      
      </div>
    </div>
    
  );
}

export default App;
