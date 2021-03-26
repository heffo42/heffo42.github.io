import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import styled from 'styled-components'


import CanvasJSReact from '../assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//const base_url = 'http://157.230.216.187:5000/'
const base_url = 'http://localhost:5000/'

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 14px;
  padding: 1px 3px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
`;

class SearchItem extends Component {
    render() {
      return (<li key={this.props.itemName}>{this.props.itemName}
        <Button id={this.props.id} onClick={this.props.onClick}>Select</Button>
      </li>
      )
      
    }
  }
export default SearchItem
