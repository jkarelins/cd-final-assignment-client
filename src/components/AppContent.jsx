import React, { Component } from "react";
import { connect } from "react-redux";
import UserPage from "./UserPage";
import AllEvents from "./AllEvents";

class App extends Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <UserPage />
        </div>
      );
    } else {
      return (
        <div>
          <h5 className="text-center">
            To add new event, You should Log In or Sign Up
          </h5>
          <AllEvents />
        </div>
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
