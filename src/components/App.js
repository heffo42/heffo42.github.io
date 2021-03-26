import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import Logout from "./Logout"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import CanvasJSReact from '../assets/canvasjs.react';
import Search from './Search'
import NavBar from "./Navbar/Navbar"
import AppComponent from "./AppComponent"
import LandingPage from "./antFrontEnd/landingPage"

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const base_url = 'http://157.230.216.187:5000/'
// const base_url = 'http://localhost:5000/'
const base_url = 'https://bio-api.herokuapp.com/'

function App() { 
  return (
    <div className = "App">
      <Router>
      <Route path = "/home" component = {LandingPage} />
        <AuthProvider>
          <NavBar />
            <Container fluid>
                  <Switch>
                    <PrivateRoute exact path="/" component={Search} />
                    <PrivateRoute path="/update-profile" component={UpdateProfile} />
                    <PrivateRoute path ="/timeline" component = {AppComponent} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                  </Switch>
              </Container>
            </AuthProvider>
        </Router>
    </div>
  )

}

export default App

