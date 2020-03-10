import React, { Component } from "react";
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
      <div>
        <h4>Sign Up:</h4>
        <form onSubmit={this.signUp}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" value="SignUp" />
        </form>
      </div>
    );
  }
}

export default connect(null, { createUser })(SignUpForm);
