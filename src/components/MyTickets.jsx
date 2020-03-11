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
        return <h4>Sorry, You are not selling tickets.</h4>;
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
