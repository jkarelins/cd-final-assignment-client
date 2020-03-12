import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserTickets } from "../actions/user";
import { Link } from "react-router-dom";

class MyEvents extends Component {
  componentDidMount() {
    this.props.fetchUserTickets(this.props.user.id);
  }

  render() {
    if (this.props.userTickets) {
      if (this.props.userTickets.length !== 0) {
        return (
          <div>
            <ul>
              {this.props.userTickets.map((ticket, i) => (
                <li key={i}>
                  <Link to={`/ticket/${ticket.id}`}>
                    {ticket.price} EUR -> {ticket.eventId} - Event ID
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        return (
          <h5 className="mt-3">
            Sorry, You have not posted tickets before. Add You first tiket now!{" "}
            <span
              className="btn btn-info my-3"
              onClick={this.props.switchContent}
            >
              Choose event
            </span>{" "}
            or{" "}
            <Link to="/create-event" className="btn btn-info my-3">
              Add new event
            </Link>{" "}
          </h5>
        );
      }
    } else {
      return <h4>Loading..</h4>;
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    userTickets: state.eventReducer.userTickets
  };
}

export default connect(mapStateToProps, { fetchUserTickets })(MyEvents);
