import React, { Component } from "react";

export default class EventForm extends Component {
  render() {
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
  }
}
