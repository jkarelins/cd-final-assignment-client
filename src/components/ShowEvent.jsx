import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { createTicket } from "../actions/event";
import { Link } from "react-router-dom";

const initialState = {
  addTicket: false,
  ticketDescription: "",
  price: 10,
  image: "",
  error: ""
};

class ShowEvent extends Component {
  state = initialState;

  addTicket = () => {
    if (this.props.user) {
      this.setState({ ...this.state, addTicket: true });
    } else {
      this.setState({
        ...this.state,
        error: "Login or SignUp first, to add ticket!"
      });
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

  cancelNewTicket = e => {
    e.preventDefault();
    this.setState({ ...this.state, addTicket: false });
  };

  componentDidUpdate = () => {
    if (this.props.user && this.state.error) {
      this.setState({
        ...this.state,
        error: "",
        addTicket: true
      });
    } else if (!this.props.user && this.state.addTicket) {
      this.setState({
        ...this.state,
        addTicket: false
      });
    }
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
          {!this.props.user && this.state.error ? (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          ) : (
            ""
          )}

          <div className="card">
            <img
              src={this.props.event.logo}
              alt={this.props.event.name}
              className="img-fluid"
            />
            <div className="card-body">
              <h5 className="card-title">{this.props.event.name}</h5>
              <p>
                Event date: {""}
                <u className="font-italic">{this.props.event.eventDate}</u>
              </p>
            </div>
          </div>
          <div className="card mt-3">
            <button onClick={this.addTicket} className="btn btn-success">
              Add New Ticket
            </button>
            {this.state.addTicket ? (
              <form onSubmit={e => this.submitNewTicket(e)}>
                <div className="form-group mt-3">
                  <label htmlFor="newTicketDescription">
                    New Ticket Description
                  </label>
                  <textarea
                    name="ticketDescription"
                    cols="30"
                    rows="10"
                    placeholder="Description"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.ticketDescription}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Price">Price</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    min="1"
                    max="1000"
                    step="0"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.price}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imageURL">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.image}
                  />
                </div>
                <div className="form-group text-center">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="PUBLISH TICKET"
                  />
                  <button
                    type="button"
                    className="ml-3 btn btn-danger"
                    onClick={e => this.cancelNewTicket(e)}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12 col-lg-8 col-xl-8 mt-3">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Seller</th>
                <th scope="col">Price EUR</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {this.props.event.tickets.length === 0 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Sorry, no tickets added yet</td>
                </tr>
              ) : (
                this.props.event.tickets
                  .sort((a, b) => a.risk - b.risk)
                  .map((ticket, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{ticket.user.username}</td>
                      <td>
                        <Link to={`/ticket/${ticket.id}`}>{ticket.price}</Link>
                      </td>
                      <td
                        className={
                          ticket.risk < 33
                            ? `text-success`
                            : ticket.risk < 66
                            ? "text-warning"
                            : "text-danger"
                        }
                      >
                        {ticket.ticketDescription.substring(0, 20)}
                      </td>
                    </tr>
                  ))
              )}
              {}
            </tbody>
          </table>
          <h4>Event Description:</h4>
          <p>{this.props.event.description}</p>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { createTicket })(ShowEvent);
