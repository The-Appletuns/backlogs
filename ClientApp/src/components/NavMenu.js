import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HomeIcon from '@mui/icons-material/Home';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  userLoggedIn() {
    // Checks if user is logged in, if logged in, return Profile link, else return login link
    const token = localStorage.getItem('token');

    if (token != null) {
      return (
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/profile"><PersonIcon/></NavLink>
        </NavItem>
      );
    } else {
      return (
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
        </NavItem>
      )
    }
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">VG BackLogs</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/"><HomeIcon/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/search-game"><SearchIcon/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/search-user"><PersonSearchIcon/></NavLink>
              </NavItem>
              {this.userLoggedIn()}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
