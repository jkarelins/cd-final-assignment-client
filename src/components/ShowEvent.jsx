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

  submitNewTicket = e => {
    e.preventDefault();
    this.props.createTicket(this.props.event.id, this.state);
    this.setState(initialState);
  };

  render() {
    if (this.props.event.tickets) {
      const { tickets } = this.props.event;
      const average =
        tickets.reduce((a, b) => {
          return a + b.price;
        }, 0) / tickets.length;

      tickets.forEach(ticket => {
        let risk = ticket.risk;
        risk = ticket.comments.length <= 3 ? risk : risk + 5;
        const diff = -Math.round((ticket.price / average - 1) * 100);
        risk = diff <= -10 ? (risk = risk - 10) : (risk = risk + diff);
        risk = Math.max(5, risk);
        ticket.risk = Math.min(95, risk);
      });
    }
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
            </Link>
          </div>
        ))}
        <button onClick={this.addTicket}>Add New Ticket</button>
        {this.state.addTicket ? (
          <form onSubmit={e => this.submitNewTicket(e)}>
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

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { createTicket })(ShowEvent);
