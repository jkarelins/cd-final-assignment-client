import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import AppContent from "./components/AppContent";
import CreateEvent from "./components/CreateEvent";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/" exact component={AppContent} />
          <Route path="/create-event" exact component={CreateEvent} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
