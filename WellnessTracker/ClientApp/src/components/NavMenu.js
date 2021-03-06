import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, NavLink as RRDNavLink } from 'react-router-dom';
import { isLoggedIn } from '../utility/operations';
import '../css/nav-menu.css';

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


    render() {
        if (!isLoggedIn()) {
            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/" className="mainlogo">WellnessTracker</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow hover-mod">
                                    <NavItem>
                                        <NavLink  tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/" exact>Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/Login">Login</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            );
        }
        // Shows full menu if user is logged in
        else {

            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">WellnessTracker</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow hover-mod">
                                    <NavItem>
                                        <NavLink tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/" exact>Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/Today">Today</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/Summary">Summary</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/MakeEntry">Make Entry</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/Notebook">My Notebook</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRDNavLink} className="text-dark" activeClassName="active-link" to="/Logout">Logout</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
                );
            }
        }  
}
