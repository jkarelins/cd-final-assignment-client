import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import AppContent from "./components/AppContent";
import CreateEvent from "./components/CreateEvent";
import UpdateAndShowEvent from "./components/UpdateAndShowEvent";
import ShowTicket from "./components/ShowTicket";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/" exact component={AppContent} />
          <Route path="/create-event" exact component={CreateEvent} />
          <Route path="/event/:id" component={UpdateAndShowEvent} />
          <Route path="/ticket/:id" component={ShowTicket} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
