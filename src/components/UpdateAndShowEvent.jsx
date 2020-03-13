import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvent } from "../actions/event";
import ShowEvent from "./ShowEvent";

const initialState = {
  name: "",
  logo: "",
  eventDate: "2021-12-31",
  description: ""
};

class UpdateAndShowEvent extends Component {
  state = initialState;

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewEvent = e => {
    e.preventDefault();
    this.props.createEvent(this.state);
    this.setState(initialState);
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchEvent(id);
    }
  }

  showToEdit = (state = this.state) => {
    this.setState({ state, updateEvent: !this.state.updateEvent });
  };

  render() {
    if (this.props.event.selectedEvent) {
      return (
        <div className="container">
          <div className="col mt-3">
            <div className="row ml-1">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {this.props.event.selectedEvent.name.substring(0, 25)}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <ShowEvent
                event={this.props.event.selectedEvent}
                user={this.props.user}
                showToEdit={this.showToEdit}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    event: state.eventReducer
  };
}

export default connect(mapStateToProps, { fetchEvent })(UpdateAndShowEvent);
