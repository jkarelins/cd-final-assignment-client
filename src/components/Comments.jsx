import React, { Component } from "react";
import { sendNewComment } from "../actions/event";
import { connect } from "react-redux";

const initialState = {
  text: "",
  ticketId: 0
};

class Comments extends Component {
  state = initialState;
  newComment = e => {
    e.preventDefault();
    this.props.sendNewComment(this.state);
    this.setState(initialState);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.setState({ ...this.state, ticketId: this.props.ticketId });
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <form onSubmit={this.newComment}>
            <input
              type="text"
              name="text"
              placeholder="Comment Text"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <input type="submit" value="Post Comment" />
          </form>
        ) : (
          <h4>You should Log In or Sign Up to comment on Tickets</h4>
        )}

        <h4>Comments:</h4>
        {this.props.comments.length !== 0 ? (
          <ul>
            {this.props.comments.map((comment, i) => (
              <li key={i}>{comment.text}</li>
            ))}
          </ul>
        ) : (
          <h4>Sorry. This ticket has no comments yet. You can be first:</h4>
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

export default connect(mapStateToProps, { sendNewComment })(Comments);
