import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-form">
        <h1 className="text-center">Welcome Back!</h1>
        <h4>Sign in</h4>
        <TextField id="login-email" 
          label="Email" 
          variant="outlined" 
          required />
        <TextField id="login-password" 
          label="Password" 
          variant="outlined" 
          type="password"
          required />
        <div className="row">
          <div className="col-sm-8">
            <a href="/">Forgot Password?</a>
          </div>
          <div className="col-sm-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </div>
        </div>
        <hr/>
        <p>
          Don't have an account yet? 
          <a href="/"> Start your free trial</a>
        </p>    
      </div>

    )
  }
}

export default LoginForm;
