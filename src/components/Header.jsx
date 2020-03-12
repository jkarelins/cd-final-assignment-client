import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { connect } from "react-redux";
import { logMeOut } from "../actions/user";

class Header extends Component {
  state = {
    login: true
  };

  loginToSignUp = () => {
    this.setState({ login: !this.state.login });
  };

  logOut = () => {
    this.props.logMeOut();
  };

  render() {
    if (this.props.user) {
      return (
        <nav className="navbar navbar-lg navbar-light bg-light d-flex flex-row justify-content-start">
          <p className="navbar-brand">
            <Link to="/">TicketSwap Clone</Link>
          </p>
          <h5 className="ml-auto">Welcome back: {this.props.user.username}</h5>
          <button
            className="ml-auto mr-3 btn btn-sm btn-outline-danger"
            onClick={this.logOut}
          >
            LOG OUT
          </button>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-lg navbar-light bg-light d-flex flex-row justify-content-start">
          <p className="navbar-brand">
            <Link to="/">TicketSwap Clone</Link>
          </p>
          {this.state.login ? <LoginForm /> : <SignUpForm />}
          {this.state.login ? (
            <button
              className="btn btn-sm btn-warning mx-3"
              onClick={this.loginToSignUp}
            >
              To Sign Up Form
            </button>
          ) : (
            <button
              className="btn btn-sm btn-success mx-3"
              onClick={this.loginToSignUp}
            >
              To Login Form
            </button>
          )}
          <ul className="navbar-nav ml-auto flex-row">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { logMeOut })(Header);
