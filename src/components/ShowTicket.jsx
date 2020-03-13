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

  componentDidUpdate() {
    if (!this.props.user && this.state.editMode) {
      this.setState({
        ...this.state,
        editMode: false
      });
    }
  }

  convertToDate = seqDate => {
    const newDate = new Date(seqDate);
    const dateAndTime = {
      date: newDate.toDateString(),
      hours: newDate.getHours(),
      minutes: newDate.getMinutes()
    };
    return `${dateAndTime.date}, @${dateAndTime.hours}:${dateAndTime.minutes}`;
  };

  render() {
    if (this.props.ticket) {
      console.log(this.props.ticket.risk);
      if (this.state.editMode) {
        return (
          <div className="container">
            <div className="card p-5 mt-3">
              <form onSubmit={e => this.submitEditedTicket(e)}>
                <div className="form-group">
                  <label htmlFor="ticketDescription">Ticket Description</label>
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
                  <label htmlFor="ticketPrice">Price</label>
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
                    className="form-control"
                    placeholder="Image of ticket"
                    onChange={this.handleChange}
                    value={this.state.image}
                  />
                </div>
                <input
                  type="submit"
                  value="Save Changes"
                  className="btn btn-success"
                />
                <button onClick={this.goBack} className="btn btn-danger ml-3">
                  Go Back
                </button>
              </form>
            </div>
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
            <div className="row mt-3 ml-1">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={`/event/${this.props.ticket.event.id}`}>
                      {this.props.ticket.event.name.substring(0, 25)}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {this.props.ticket.ticketDescription.substring(0, 30)}
                  </li>
                </ol>
              </nav>
            </div>
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
                  <small>
                    Posted on: {this.convertToDate(this.props.ticket.createdAt)}
                  </small>
                  <br />
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
                      <p>You can edit your tickets ONLY.</p>
                    )
                  ) : (
                    <p>
                      To edit Ticket <Link to="/login">Login</Link> or{" "}
                      <Link to="/register">SignUp</Link>
                    </p>
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
