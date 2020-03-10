import React, { Component } from "react";
import { Link } from "react-router-dom";
import AllEvents from "./AllEvents";

class UserPage extends Component {
  render() {
    return (
      <div>
        Only for users
        <Link to="/create-event">Create Event</Link>
        <p>List of all events</p>
        <AllEvents />
        <p>List of my tickets for events</p>
        <p>All events</p>
      </div>
    );
  }
}

export default UserPage;
