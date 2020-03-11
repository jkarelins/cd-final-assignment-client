import React, { Component, Fragment } from "react";
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
      <Fragment>
        <div className="col-12 col-lg-4 col-xl-4 mt-3">
          <div className="card">
            <img src={this.props.event.logo} alt={this.props.event.name} />
            <div className="card-body">
              <h5 className="card-title">{this.props.event.name}</h5>
            </div>
          </div>
          <div className="card mt-3">
            <button onClick={this.addTicket} className="btn btn-success">
              Add New Ticket
            </button>
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
        </div>
        <div className="col-12 col-lg-6 col-xl-6 mt-3">
          <h5>Tickets in sale:</h5>
          {this.props.event.tickets
            .sort((a, b) => a.risk - b.risk)
            .map((ticket, i) => (
              <div key={i}>
                <Link to={`/ticket/${ticket.id}`}>
                  <h5
                    className={
                      ticket.risk < 33
                        ? `text-success`
                        : ticket.risk < 66
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {ticket.price} EUR
                  </h5>
                </Link>
              </div>
            ))}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { createTicket })(ShowEvent);
