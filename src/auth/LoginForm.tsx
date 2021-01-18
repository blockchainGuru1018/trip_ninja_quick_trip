import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import { login } from '../actions/AuthActions';
import  { Redirect } from 'react-router-dom';
import { getAdminUrl } from '../helpers/AdminUrlHelper';
import Alert from '@material-ui/lab/Alert';
import { withTranslation, WithTranslation } from 'react-i18next';
import { AuthDetails } from './AuthInterfaces';

interface LoginFormProps extends WithTranslation {
  login: typeof login;
  authenticated: boolean;
  invalidAuth: boolean;
  authDetails: AuthDetails;
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
            <h1 className="text-center login-welcome-message">{this.props.t("auth.loginForm.welcomeMessage")}</h1>
            <div className="row">
              <div className="col-sm-10 offset-sm-1">
                <h4>{this.props.t("auth.loginForm.signIn")}</h4>
                <form>
                  <LoginTextField
                    id="login-email"
                    label={this.props.t("commonWords.email")}
                    variant="outlined"
                    fullWidth
                    required
                    value={this.state.email}
                    onChange={e => this.setState({'email': e.target.value})}/>
                  <LoginTextField
                    id="login-password"
                    label={this.props.t("commonWords.password")}
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={this.state.password}
                    onChange={e => this.setState({'password': e.target.value})}/>
                  {this.props.invalidAuth && <Alert severity="error">{this.props.t("auth.loginForm.loginFail")}</Alert>}
                  <div className="row login-button-row">
                    <div className="col-sm-7 no-pad-left">
                      <a href={getAdminUrl()} className="login-link">{this.props.t("auth.loginForm.forgotPassword")}</a>
                    </div>
                    <div className="col-sm-5 login-button-col">
                      <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        id="login-button"
                        size="large"
                        type="submit"
                        onClick={this.loginUser}>
                        {this.props.t("auth.loginForm.loginButton")}
                      </Button>
                    </div>
                  </div>
                </form>
                <hr className="login-form-horizontal-line"/>
                <p>
                  {this.props.t("auth.loginForm.signUp")}
                  <a href="https://www.tripninja.io/book-a-demo" className="login-link"> {this.props.t("auth.loginForm.freeTrial")}</a>
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withTranslation('common')(LoginForm);
