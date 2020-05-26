import React from 'react';
import './login.css';

class Login extends React.Component {
  add(x: number, y: number) {
    return x + y
  }

  addString(x: number, y: number) {
    return '$' + this.add(x, y);
  }

  render() {
    return (
      <h3>search</h3>
    )
  }
}

export default Login
