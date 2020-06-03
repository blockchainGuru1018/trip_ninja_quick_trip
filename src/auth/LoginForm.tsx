import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import { login } from '../actions/AuthActions';
import  { Redirect } from 'react-router-dom'

interface LoginFormProps {
  login: typeof login,
  authenticated: boolean
}

const LoginTextField = styled(TextField)({
  margin: '10px 0px',
});

class LoginForm extends React.Component<LoginFormProps> {
  state = {
    'email': '',
    'password': ''
  }

  loginUser = () => {
    this.props.login(this.state.email, this.state.password)
    // set some sort of loading screen
    // this.props.login(this.state.email, this.state.password)
  }

  componentDidMount() {
    return this.props.authenticated
      ? <Redirect to='/search/' />
      : ''
  }

  render() {
    return (
      <div>
        {this.props.authenticated
          ? <Redirect to='/search/' />
          : <div className="login-form">
            <h1 className="text-center">Welcome Back!</h1>
            <div className="row">
              <div className="col-sm-10 offset-sm-1">
                <h4>Sign in</h4>
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
                  <div className="row login-button-row">
                    <div className="col-sm-6">
                      <a href="/" className="login-link">Forgot Password?</a>
                    </div>
                    <div className="col-sm-6">
                      <Button
                        variant="contained"
                        color="primary"
                        id="login-button"
                        size="large"
                        onClick={this.loginUser}>
                        Log in
                      </Button>
                    </div>
                  </div>
                </form>
                <hr/>
                <p>
                  Don't have an account yet?
                  <a href="https://www.tripninja.io/book-a-demo" className="login-link"> Start your free trial</a>
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default LoginForm;
