import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/user";

const initialState = {
  username: "",
  password: ""
};

class LoginForm extends Component {
  state = initialState;

  login = e => {
    e.preventDefault();
    this.props.loginUser(this.state);
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
        <h4>Login: </h4>
        <form onSubmit={this.login}>
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
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default connect(null, { loginUser })(LoginForm);
