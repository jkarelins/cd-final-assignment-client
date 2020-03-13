import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createEvent } from "../actions/event";
import AllEvents from "./AllEvents";

const initialState = {
  name: "",
  logo: "",
  eventDate: "2021-12-31",
  eventEndDate: "",
  description: "",
  warning: "",
  hideEndDate: true
};

class CreateEvent extends Component {
  state = initialState;

  handleChange = e => {
    e.preventDefault();
    this.checkDate(this.state.eventDate);
    this.checkStartIsBeforeEnd();
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
    if (date - tomorrow < 0) {
      this.setState({
        ...this.state,
        warning:
          "Start date of event can not be in the past! If You add Event from the past, it is not going to be available in event List."
      });
    } else {
      this.setState({
        ...this.state,
        warning: ""
      });
    }
  };

  checkStartIsBeforeEnd = (
    startDateString = this.state.eventDate,
    endDateString = this.state.eventEndDate
  ) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    if (startDate - endDate > 0) {
      this.setState({
        ...this.state,
        warning: "End date should be after start date."
      });
    }
  };

  showEndDate = () => {
    console.log(this.state.hideEndDate);
    if (this.state.hideEndDate) {
      this.setState({
        ...this.state,
        eventEndDate: this.state.eventDate,
        hideEndDate: !this.state.hideEndDate
      });
    } else {
      this.setState({
        ...this.state,
        hideEndDate: !this.state.hideEndDate
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
                <label htmlFor="eventDate">Event Start Date</label>
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
              {this.state.hideEndDate ? (
                ""
              ) : (
                <div className="form-group">
                  <label htmlFor="eventDate">Event End Date</label>
                  <input
                    type="date"
                    name="eventEndDate"
                    onChange={e => this.handleChange(e)}
                    value={this.state.eventEndDate}
                    className="form-control"
                  />
                </div>
              )}
              {this.state.hideEndDate ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.showEndDate}
                >
                  Show End Date
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={this.showEndDate}
                >
                  Hide End Date
                </button>
              )}
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
