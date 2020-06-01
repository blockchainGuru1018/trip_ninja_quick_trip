import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';


class LoginForm extends React.Component {
  render() {
    const LoginTextField = styled(TextField)({
      margin: '10px 0px',
    });

    return (
      <div>
        <h1 className="text-center">Welcome Back!</h1>
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <h4>Sign in</h4>
            <LoginTextField 
              id="login-email" 
              label="Email"
              variant="outlined"
              fullWidth
              required /> 
            <LoginTextField 
              id="login-password" 
              label="Password"
              variant="outlined" 
              type="password"
              fullWidth
              required /> 
            <div className="row login-button-row">
              <div className="col-sm-8">
                <a href="/" className="login-link">Forgot Password?</a>
              </div>
              <div className="col-sm-4">
                <Button
                  variant="contained"
                  color="primary"
                  id="login-button"
                  size="large">
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
        </div>         
      </div>

    )
  }
}

export default LoginForm;
