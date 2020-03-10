import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../actions/event";

class App extends Component {
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
        <div>
          <ul>
            {this.props.events.allEvents.map((event, id) => (
              <li key={id}>{event.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <h4>
          Sorry, no events found yet. But You can be first to add new one.
        </h4>
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

export default connect(mapStateToProps, { fetchEvents })(App);
