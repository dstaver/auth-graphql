import React, { Component } from 'react';
import './App.scss';
import { RegisterUser } from './Components/Auth/RegisterUser';
import { Login } from './Pages/Login';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ProfileComponent } from './generated/components';
import { Logout } from './Components/Auth/Logout';
import { RegistrationForm } from './Components/Auth/RegistrationForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register user</NavLink>
            <NavLink to="/register2">Register user 2</NavLink>
            <NavLink to="/logout">Log out</NavLink>
            <ProfileComponent>
              {({ data }) => {
                if (data && data.currentUser) {
                  return (
                    <span>
                      {data.currentUser.firstName} {data.currentUser.lastName}
                    </span>
                  );
                }
                return <span>Anonymous</span>;
              }}
            </ProfileComponent>
          </nav>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={RegisterUser} />
            <Route exact={true} path="/logout" component={Logout} />
            <Route
              exact={true}
              path="/register2"
              component={RegistrationForm}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
