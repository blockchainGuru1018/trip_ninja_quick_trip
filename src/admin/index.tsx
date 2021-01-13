import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";

import {
  BasicInfo,
  GeneralInfo,
  ContentSources,
  SearchBookingDetail,
  BillingAccountManagement,
  Users,
  Teams,
  AgencyAccounts,
  NotFound,
} from "./pages";
import { SideMenu } from './components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import "./styles.css";

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('authInfo') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('authInfo') ? (
        <Redirect
          to={{
            pathname: '/admin/',
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const index: React.FC = () => {
  const authInfo = localStorage.getItem('authInfo');
  let user = null;
  if (authInfo) {
    user = JSON.parse(authInfo);
  }

  return (
    <BrowserRouter>
      <Switch>
        {/*<PublicRoute path="/admin/login" exact component={Login} />*/}

        <React.Fragment>
          {/*<Header />*/}

          <div className="main-Content">
            <div className="page-Header">
              Settings
            </div>

            <div className="page-Content"
            >
              <SideMenu />

              <Container maxWidth="lg" className="container">
                <Switch>
                  <PrivateRoute path="/admin" exact component={BasicInfo} />
                  {user && user.user && !user.user.is_agent && (
                    <>
                      <PrivateRoute path="/admin/general-info" exact component={GeneralInfo} />
                      <PrivateRoute path="/admin/content-sources" exact component={ContentSources} />
                      <PrivateRoute path="/admin/search-booking-detail" exact component={SearchBookingDetail} />
                      <PrivateRoute path="/admin/billing-account-management" exact component={BillingAccountManagement} />
                      <PrivateRoute path="/admin/users" exact component={Users} />
                      <PrivateRoute path="/admin/teams" exact component={Teams} />
                      <PrivateRoute path="/admin/agency-accounts" exact component={AgencyAccounts} />
                    </>
                  )}
                  <PrivateRoute path="" component={NotFound} />
                </Switch>
              </Container>
            </div>
          </div>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  );
};

export default index;
