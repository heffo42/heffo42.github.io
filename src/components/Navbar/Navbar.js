import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { auth, analytics } from "../../firebase"




const NavBar = () => {
    const {currentUser, setCurrentUser} = useAuth()
    
    return(
        <div className="App">
    <ReactBootStrap.Navbar collapseOnSelect expand="xl">
  <ReactBootStrap.Navbar.Brand href="#home">BioDiligence.ai</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto"> 
    <Link to="/">
    <ReactBootStrap.Nav.Link href="#features">Search</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/pricing">
    <ReactBootStrap.Nav.Link href="#pricing">Pricing</ReactBootStrap.Nav.Link>
    </Link>
      <ReactBootStrap.NavDropdown title="Features" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item href="#action/3.1">Drug Search</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.2">Company Search</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.3">Timeline Comparison</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item href="#action/3.4">Transcript Analysis</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
    <Link to="/deets">
        {currentUser != null &&
        <ReactBootStrap.Nav.Link href="#deets">Hi {currentUser.email}</ReactBootStrap.Nav.Link>}
    </Link>
    <Link to="/signup">
    <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
        Sign Up
      </ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/logout">
    <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
        Log Out
      </ReactBootStrap.Nav.Link>
    </Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;