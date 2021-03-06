import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <NavItem key={6}>
          <NavLink to="/signout" tag={Link}>
            Sign out
          </NavLink>
        </NavItem>,
          <NavItem key={7}>
              <NavLink to="/transaction" tag={Link}>
                  Transaction
              </NavLink>
          </NavItem>
      ];
    } else {
      return [
        <NavItem key={8}>
          <NavLink to="/signin" tag={Link}>
            Sign In
          </NavLink>
        </NavItem>,
        <NavItem key={9}>
          <NavLink to="/signup" tag={Link}>
            Sign Up
          </NavLink>
        </NavItem>
      ];
    }
  }
  render() {
    return (
      <div>
          <Navbar id = "navbar" color="faded" light expand="md">
              <img className="logo-image" src="/assets/logo.png" />
              <NavbarToggler onClick={this.toggle} />
              <NavbarBrand to="/" tag={Link}>
                CUSR
              </NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem key={1}>
                    <NavLink to="/search" tag={Link}>
                      Search
                    </NavLink>
                  </NavItem>
                  <NavItem key={2}>
                    <NavLink to="/admin" tag={Link}>
                      Admin
                    </NavLink>
                  </NavItem>
                  {this.renderLinks()}
                </Nav>
              </Collapse>
          </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);
