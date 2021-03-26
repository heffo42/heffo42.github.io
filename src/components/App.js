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
        <AuthProvider>
          <NavBar />
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Switch>
                    <PrivateRoute exact path="/" component={Search} />
                    <PrivateRoute path="/update-profile" component={UpdateProfile} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                  </Switch>
                </div>
              </Container>
            </AuthProvider>
        </Router>
    </div>
  )

}

export default App

