import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../actions/event";
import { Link } from "react-router-dom";

class AllEvents extends Component {
  state = {
    page: 1
  };

  componentDidMount() {
    this.props.fetchEvents(this.state.page);
    this.setState({ page: this.state.page + 1 });
  }

  render() {
    if (this.props.events.allEvents) {
      return (
        <div className="container mt-3">
          <div className="row">
            {this.props.events.allEvents.map((event, id) => (
              <div className="card col-10 col-md-6 col-lg-4 col-xl-4" key={id}>
                <img src={event.logo} alt={event.name} />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>

                  <Link to={`/event/${event.id}`} className="btn btn-primary">
                    SHOW TICKETS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4>
            Sorry, no events found yet. But You can be first to add new one.
          </h4>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    events: state.eventReducer
  };
}

export default connect(mapStateToProps, { fetchEvents })(AllEvents);
