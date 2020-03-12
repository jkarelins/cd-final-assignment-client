import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyTickets from "./MyTickets";
import AllEvents from "./AllEvents";

class UserPage extends Component {
  state = {
    allEvents: true
  };

  switchContent = () => {
    this.setState({ allEvents: !this.state.allEvents });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-3 mt-3">
            <ul className="list-group">
              <li className="list-group-item btn">
                <Link to="/create-event">Create New Event</Link>
              </li>
              <li className="list-group-item btn" onClick={this.switchContent}>
                {this.state.allEvents ? "Show My Tickets" : "Show All Events"}
              </li>
            </ul>
          </div>
          <div className="col-7">
            {this.state.allEvents ? (
              <AllEvents />
            ) : (
              <MyTickets switchContent={this.switchContent} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
