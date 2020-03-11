import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTicket } from "../actions/event";
import { Link } from "react-router-dom";
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

  submitEditedTicket = (e, ticketId) => {
    e.preventDefault();
    console.log("ticket id:", ticketId);
  };

  render() {
    if (this.props.ticket) {
      if (this.state.editMode) {
        return (
          <div>
            <form onSubmit={e => this.submitEditedTicket(e, this.state.id)}>
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
        return (
          <div>
            <Link to="/">Go Home</Link>
            <h4>{this.props.ticket.price} EUR</h4>
            <img
              src={this.props.ticket.image}
              alt={`Ticket for ${this.props.ticket.event.name}`}
            />
            <h5>Description of Ticket</h5>
            <div>
              {this.props.user ? (
                this.props.user.id === this.props.ticket.user.id ? (
                  <div>
                    <p>This is your Ticket</p>
                    <button onClick={this.editTicket}>Edit Ticket</button>
                  </div>
                ) : (
                  <p>Ticket is sold by: {this.props.ticket.user.username}</p>
                )
              ) : (
                <p>Ticket is sold by: {this.props.ticket.user.username}</p>
              )}
            </div>
            <p>{this.props.ticket.ticketDescription}</p>
            Comments going to be here
          </div>
        );
      }
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

function mapStateToProps(state) {
  return {
    ticket: state.eventReducer.selectedTicket,
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { fetchTicket })(ShowTicket);
