import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import { login } from '../actions/AuthActions';
import  { Redirect } from 'react-router-dom';
import { getAdminUrl } from '../helpers/AdminUrlHelper';
import Alert from '@material-ui/lab/Alert';

interface LoginFormProps {
  login: typeof login,
  authenticated: boolean
  invalidAuth: boolean
}

const LoginTextField = styled(TextField)({
  margin: '10px 0px',
});

class LoginForm extends React.Component<LoginFormProps> {
  state = {
    'email': '',
    'password': ''
  }

  loginUser = (event: any) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        {this.props.authenticated
          ? <Redirect to='/search/' />
          : <div className="login-form">
            <h1 className="text-center login-welcome-message">Welcome Back!</h1>
            <div className="row">
              <div className="col-sm-10 offset-sm-1">
                <h4>Sign In</h4>
                <form>
                  <LoginTextField
                    id="login-email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={this.state.email}
                    onChange={e => this.setState({'email': e.target.value})}/>
                  <LoginTextField
                    id="login-password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={this.state.password}
                    onChange={e => this.setState({'password': e.target.value})}/>
                  {this.props.invalidAuth && <Alert severity="error">Unable to login - check your password and try again!</Alert>}
                  <div className="row login-button-row">
                    <div className="col-sm-6">
                      <a href={getAdminUrl()} className="login-link">Forgot Password?</a>
                    </div>
                    <div className="col-sm-6">
                      <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        id="login-button"
                        size="large"
                        type="submit"
                        onClick={this.loginUser}>
                        Log in
                      </Button>
                    </div>
                  </div>
                </form>
                <hr className="login-form-horizontal-line"/>
                <p>
                  Don't have an account yet?
                  <a href="https://www.tripninja.io/book-a-demo" className="login-link"> Start your free trial</a>
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default LoginForm;
