import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import UserPage from "./UserPage";
import AllEvents from "./AllEvents";

class App extends Component {
  render() {
    if (this.props.user) {
      return (
        <Fragment>
          <UserPage />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <AllEvents />
        </Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps)(App);
