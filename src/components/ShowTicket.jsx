import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTicket, updateTicket } from "../actions/event";
import { Link } from "react-router-dom";
import Comments from "./Comments";

const initialState = {
  id: 0,
  image: "",
  price: 0,
  ticketDescription: "",
  editMode: false
};

class ShowTicket extends Component {
  state = initialState;

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchTicket(id);
  }

  editTicket = () => {
    const { id, image, price, ticketDescription } = this.props.ticket;
    this.setState({
      id,
      image,
      ticketDescription,
      price,
      editMode: true
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  goBack = () => {
    this.setState({ editMode: false });
  };

  submitEditedTicket = e => {
    e.preventDefault();
    this.props.updateTicket(this.state);
    this.setState({ editMode: false });
  };

  render() {
    if (this.props.ticket) {
      if (this.state.editMode) {
        return (
          <div>
            <form onSubmit={e => this.submitEditedTicket(e)}>
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
              <input type="submit" value="Save Changes" />
            </form>
            <button onClick={this.goBack}>Go Back</button>
          </div>
        );
      } else {
        let risk = this.props.ticket.risk;
        risk = this.props.ticket.comments.length <= 3 ? risk : risk + 5;
        const diff = -Math.round(
          (this.props.ticket.price / this.props.average - 1) * 100
        );
        risk = diff <= -10 ? (risk = risk - 10) : (risk = risk + diff);
        risk = Math.max(5, risk);
        risk = Math.min(95, risk);

        return (
          <div className="container mb-5">
            <Link to="/" className="btn btn-info">
              Go Home
            </Link>
            <div className="card p-3 mt-3">
              <div className="card-header">
                <h4 className="">
                  Ticket from: {this.props.ticket.user.username}
                </h4>
                <h5>Fraud risk: {risk}%</h5>
              </div>
              <div className="card-body">
                <h2 className="card-title">
                  Price: EUR {this.props.ticket.price}
                </h2>
                <img
                  src={this.props.ticket.image}
                  alt={`Ticket for ${this.props.ticket.event.name}`}
                />
                <p className="card-text mt-3">
                  {this.props.ticket.ticketDescription}
                </p>
                <div>
                  {this.props.user ? (
                    this.props.user.id === this.props.ticket.user.id ? (
                      <div>
                        <p>This is your Ticket</p>
                        <button
                          onClick={this.editTicket}
                          className="btn btn-primary"
                        >
                          Edit Ticket
                        </button>
                      </div>
                    ) : (
                      <p>You can edit your tickets.</p>
                    )
                  ) : (
                    <p>You can edit your tickets.</p>
                  )}
                </div>
              </div>
              <Comments
                comments={this.props.ticket.comments}
                ticketId={this.props.ticket.id}
              />
            </div>
          </div>
        );
      }
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

function mapStateToProps(state) {
  if (state.eventReducer.selectedTicket) {
    const rest = state.eventReducer.selectedTicket.restTickets;
    return {
      ticket: state.eventReducer.selectedTicket.ticket,
      //CALCULATES AVERAGE PRICE
      average:
        rest.reduce((a, b) => {
          return a + b.price;
        }, 0) / rest.length,
      user: state.userReducer
    };
  } else {
    return {
      user: state.userReducer
    };
  }
}

export default connect(mapStateToProps, { fetchTicket, updateTicket })(
  ShowTicket
);
