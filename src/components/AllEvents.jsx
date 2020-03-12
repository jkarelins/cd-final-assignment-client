import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../actions/event";
import { Link } from "react-router-dom";

const initialState = {
  offset: 0,
  limit: 3
};

class AllEvents extends Component {
  state = initialState;

  componentDidMount() {
    if (this.props.events.allEvents) {
      this.setState({
        ...this.state,
        offset: this.props.events.allEvents.length
      });
    } else {
      this.setState(initialState);
      this.props.fetchEvents(this.state.offset);
      this.setState({ offset: this.state.offset + this.state.limit });
    }
  }

  loadMore = () => {
    this.props.fetchEvents(this.state.offset);
    this.setState({ offset: this.state.offset + this.state.limit });
  };

  render() {
    if (this.props.events.allEvents) {
      return (
        <div className="container mt-3 mb-5">
          <div className="row">
            {this.props.events.allEvents.map((event, id) => (
              <div className="card col-10 col-md-6 col-lg-4 col-xl-4" key={id}>
                <img src={event.logo} alt={event.name} className="img-fluid" />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>

                  <Link to={`/event/${event.id}`} className="btn btn-primary">
                    SHOW TICKETS
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-3 mb-5">
            {this.props.events.eventsCount <= this.state.offset ? (
              <p className="text-danger">Sorry, no more events</p>
            ) : (
              <button className="btn btn-primary" onClick={this.loadMore}>
                Load More
              </button>
            )}
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
