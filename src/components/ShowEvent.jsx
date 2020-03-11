import React, { Component } from "react";
import { connect } from "react-redux";
import { createTicket } from "../actions/event";
import { Link } from "react-router-dom";

const initialState = {
  addTicket: false,
  ticketDescription: "",
  price: 0,
  image: ""
};

class ShowEvent extends Component {
  state = initialState;

  addTicket = () => {
    if (this.props.user) {
      this.setState({ addTicket: true });
    }
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewTicket = (e, id) => {
    e.preventDefault();
    this.props.createTicket(id, this.state);
  };

  render() {
    return (
      <div>
        <h1>Single Event Show Page:</h1>
        <img src={this.props.event.logo} alt={this.props.event.name} />
        <h4>{this.props.event.name}</h4>
        <h5>Tickets in sale:</h5>
        {this.props.event.tickets.map((ticket, i) => (
          <div key={i}>
            <Link to={`/ticket/${ticket.id}`}>
              <h5>{ticket.price} EUR</h5>
              <img src={ticket.image} alt="Ticket for event" />
            </Link>
          </div>
        ))}
        <button onClick={this.addTicket}>Add New Ticket</button>
        {this.state.addTicket ? (
          <form onSubmit={e => this.submitNewTicket(e, this.props.event.id)}>
            <h4>Add new Ticket:</h4>
            <textarea
              name="ticketDescription"
              cols="30"
              rows="10"
              placeholder="Description"
              onChange={this.handleChange}
              value={this.state.ticketDescription}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              min="1"
              max="1000"
              step="0"
              onChange={this.handleChange}
              value={this.state.price}
            />
            <input
              type="text"
              name="image"
              placeholder="Image of ticket"
              onChange={this.handleChange}
              value={this.state.image}
            />
            <input type="submit" value="Add Ticket" />
          </form>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(null, { createTicket })(ShowEvent);
