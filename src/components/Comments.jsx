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
    this.setState({ ...initialState, ticketId: this.state.ticketId });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  convertToDate = seqDate => {
    const newDate = new Date(seqDate);
    return newDate.toDateString();
  };

  componentDidMount() {
    this.setState({ ...this.state, ticketId: this.props.ticketId });
  }

  render() {
    return (
      <div className="container">
        <hr />
        <h5>
          <u>Comments:</u>
        </h5>
        {this.props.user ? (
          <form onSubmit={this.newComment}>
            <div className="row">
              <div className="col-9">
                <input
                  type="text"
                  name="text"
                  placeholder="Comment Text"
                  className="form-control"
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-3">
                <input
                  type="submit"
                  value="Post Comment"
                  className="btn btn-success"
                />
              </div>
            </div>
          </form>
        ) : (
          <div>
            <p>You should Log In or Sign Up to comment on Tickets</p>
          </div>
        )}

        {this.props.comments.length !== 0 ? (
          <ul>
            {this.props.comments.map((comment, i) => (
              <div className="media mt-3" key={i}>
                <div className="media-body">
                  <small>
                    Posted on: {this.convertToDate(comment.createdAt)}, by:{" "}
                    {comment.user.username}
                  </small>
                  <p>{comment.text}</p>
                </div>
                <hr />
              </div>
            ))}
          </ul>
        ) : (
          <div>
            <h4 className="mt-3">
              Sorry. This ticket has no comments yet. Be first, comment now.
            </h4>
          </div>
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
