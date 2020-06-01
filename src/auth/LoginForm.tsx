import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Welcome Back!</h1>
        <h4>Sign in</h4>
        <div className="row">
          <TextField id="login-email" 
            label="Email" 
            variant="outlined"
            fullWidth
            required />       
        </div>
        <div className="row">
          <TextField id="login-password" 
            label="Password" 
            variant="outlined" 
            type="password"
            fullWidth
            required />          
        </div>
        <div className="row">
          <div className="col-sm-8">
            <a href="/" className="login-link">Forgot Password?</a>
          </div>
          <div className="col-sm-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
            >
              Log in
            </Button>
          </div>
        </div>
        <hr/>
        <p>
          Don't have an account yet? 
          <a href="/" className="login-link"> Start your free trial</a>
        </p>    
      </div>

    )
  }
}

export default LoginForm;
