import React, { Component, Fragment } from "react";
import { createUser } from "../actions/user";
import { connect } from "react-redux";

const initialState = {
  username: "",
  password: ""
};

class SignUpForm extends Component {
  state = initialState;

  signUp = e => {
    e.preventDefault();
    this.props.createUser(this.state);
    this.setState(initialState);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.signUp}>
          <div className="form-row">
            <div className="col-auto">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="form-control"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="col-auto">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-control"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="col-auto">
              <input
                type="submit"
                value="SIGN UP"
                className="btn btn-md btn-success"
              />
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default connect(null, { createUser })(SignUpForm);
