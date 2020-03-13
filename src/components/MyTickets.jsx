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
          <div className="row">
            {this.props.userTickets.map((ticket, i) => (
              <div className="col-4" key={i}>
                <div className="card mt-3">
                  <img
                    className="card-img-top"
                    src={ticket.event.logo}
                    alt={ticket.event.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {ticket.event.name.substring(0, 20)}
                    </h5>

                    <h6 className="card-subtitle mb-2 text-muted">
                      {ticket.price} EUR
                    </h6>
                    <p className="card-text">
                      {ticket.ticketDescription.substring(0, 70)}
                    </p>
                    <Link to={`/ticket/${ticket.id}`} className="card-link">
                      Show Ticket
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
