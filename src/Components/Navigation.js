import React, { useState } from 'react';
import {NavLink} from "react-router-dom"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

import './Navigation.css'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar dark color="dark" expand="md">
        <NavbarBrand className="title">SeiyuuFinder</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="ml-md-5 mt-2">
              <NavLink to="/" className="link" >Home</NavLink>
            </NavItem>
            <NavItem className="ml-md-5 mt-2">
              <NavLink to="/search" className="link">Search</NavLink>
            </NavItem>
            <NavItem className="ml-md-5 mt-2">
              <NavLink to="airing" className="link">Top Airing Animes</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
