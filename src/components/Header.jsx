import React, { Component } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    login: true
  };
  loginToSignUp = () => {
    this.setState({ login: !this.state.login });
  };
  render() {
    if (this.props.user) {
      return (
        <div>
          <p>Welcome back: {this.props.user.username}</p>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.login ? <LoginForm /> : <SignUpForm />}
          <button onClick={this.loginToSignUp}>
            {this.state.login ? `To Sign Up` : `To Login`}
          </button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps)(Header);
