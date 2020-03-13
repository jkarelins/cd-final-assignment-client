import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvent } from "../actions/event";
import ShowEvent from "./ShowEvent";

class UpdateAndShowEvent extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchEvent(id);
    }
  }

  render() {
    if (this.props.event.selectedEvent) {
      console.log(this.props.event.selectedEvent.tickets);
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
