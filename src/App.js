import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import NewBookPage from './components/pages/NewBookPage';
import SignupPage from './components/pages/SignupPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';
import TopNavigation from './components/navigation/TopNavigation';
import {connect} from 'react-redux';

const App = ({location, isAuthenticated}) => {
    return (
      <div className="ui container">
          {isAuthenticated && <TopNavigation />}
          <Route location={location} path="/" exact component={HomePage} />
          <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
          <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
          <GuestRoute location={location} path="/login" exact component={LoginPage} />
          <GuestRoute location={location} path="/signup" exact component={SignupPage} />
          <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage}/>
          <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
          <UserRoute location={location} path="/books/new" exact component={NewBookPage} />
      </div>
    );

};

App.propTypes={
    location: PropTypes.shape({
        pathname:PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state)=>{
    return {isAuthenticated: !!state.user.email};
}

export default connect(mapStateToProps, null)(App);
