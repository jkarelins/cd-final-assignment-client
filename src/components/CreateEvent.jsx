import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createEvent } from "../actions/event";

const initialState = {
  name: "",
  logo: "",
  eventDate: "2021-12-31",
  description: ""
};

class CreateEvent extends Component {
  state = initialState;

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewEvent = e => {
    e.preventDefault();
    this.props.createEvent(this.state);
    this.setState(initialState);
  };
  render() {
    if (this.props.user) {
      return (
        <div>
          <form onSubmit={this.submitNewEvent}>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              onChange={e => this.handleChange(e)}
              value={this.state.name}
            />
            <input
              type="text"
              name="logo"
              placeholder="Event Logo URL"
              onChange={e => this.handleChange(e)}
              value={this.state.logo}
            />
            <input
              type="date"
              name="eventDate"
              onChange={e => this.handleChange(e)}
              value={this.state.eventDate}
            />
            <textarea
              name="description"
              rows="4"
              cols="50"
              onChange={e => this.handleChange(e)}
              value={this.state.description}
              placeholder="Description of Event"
            ></textarea>
            <input type="submit" value="Add Event" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/">GO HOME</Link>
          <p>List of all events</p>
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

export default connect(mapStateToProps, { createEvent })(CreateEvent);
