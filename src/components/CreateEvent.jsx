import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createEvent } from "../actions/event";
import AllEvents from "./AllEvents";

const initialState = {
  name: "",
  logo: "",
  eventDate: "2021-12-31",
  description: "",
  warning: ""
};

class CreateEvent extends Component {
  state = initialState;

  handleChange = e => {
    e.preventDefault();
    this.checkDate(this.state.eventDate);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewEvent = e => {
    e.preventDefault();
    this.props.createEvent(this.state);
    this.props.history.push(`/`);
  };

  checkDate = dateString => {
    const date = new Date(dateString);
    let tomorrow = new Date();
    tomorrow = new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate() + 1
    );
    // console.log(date - tomorrow, tomorrow);
    if (date - tomorrow < 0) {
      this.setState({
        ...this.state,
        warning:
          "Date of event can not be in the past! If You add Event from the past, it is not going to be available in event List."
      });
    } else {
      this.setState({
        ...this.state,
        warning: ""
      });
    }
  };

  render() {
    if (this.props.user) {
      return (
        <div className="container">
          <Link to="/" className="btn btn-info">
            Go Home
          </Link>
          <div className="card p-5 mt-3">
            <form onSubmit={this.submitNewEvent}>
              <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Event Name"
                  onChange={e => this.handleChange(e)}
                  value={this.state.name}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventLogoURL">Event Logo URL</label>
                <input
                  type="text"
                  name="logo"
                  placeholder="Event Logo URL"
                  onChange={e => this.handleChange(e)}
                  value={this.state.logo}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  onChange={e => this.handleChange(e)}
                  value={this.state.eventDate}
                  className="form-control"
                  required
                />
                <small className="text-danger">
                  {this.state.warning ? this.state.warning : ""}
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="eventDescription">Event Description</label>
                <textarea
                  name="description"
                  rows="8"
                  onChange={e => this.handleChange(e)}
                  value={this.state.description}
                  placeholder="Description of Event"
                  className="form-control"
                  required
                ></textarea>
              </div>
              <input
                type="submit"
                value="Add Event"
                className="btn btn-success"
              />
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <Link to="/" className="btn btn-info">
            Go Home
          </Link>
          <div className="alert alert-danger mt-3" role="alert">
            To Add New event You should login or sign up first.
          </div>
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

export default connect(mapStateToProps, { createEvent })(CreateEvent);
