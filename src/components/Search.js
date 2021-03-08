import React, {Component, useState, useContext, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
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
import SearchItem from "./SearchItem"
import { useAuth } from "../contexts/AuthContext"
import { auth, analytics } from "../firebase"

import CanvasJSReact from '../assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//const base_url = 'http://157.230.216.187:5000/'
// const base_url = 'http://localhost:5000/'
const base_url = 'https://bio-api.herokuapp.com/'

function Search() {
    

    const [list, set_list] = useState([])
    const [selected_data, set_selected_data] = useState(null)
    const [selectedOption, set_selectedOption] = useState('drug')
    const [activeCompanyData, set_activeCompanyData] = useState(null)
    const [isLoaded, set_isLoaded] = useState(false)
    const {currentUser, setCurrentUser} = useAuth()


  
    function expandDetails(e) {
      e.preventDefault()
      console.log('expandDetails was clicked')
      console.log(e.target.id)

      analytics.logEvent('expand_details')
  
      if (selectedOption == 'drug') {
        const url = `${base_url}/details?drug_name=${encodeURIComponent(e.target.id)}`
        //const url = '${base_url}/pipeline'
        fetch(url).then(res => res.json()).then((result) => {
          console.log(result)
        
          set_selected_data(result)
        })
      } else {
  
        console.log('fetching company profile')
        const url = `${base_url}company_profile?name=${encodeURIComponent(e.target.id)}`
  
        fetch(url).then(res => res.json()).then((result) => {
          console.log(result)
          set_selected_data(result)
          console.log(selected_data)
        })
  
      }
  
    }
  
    function addItem(e) {
      e.preventDefault()
  
      let list = list
      const newItem = document.getElementById('addInput')
      const form = document.getElementById("addItemForm")
  
      if (newItem.value != "") {
        list.push(newItem.value)
  
        set_list(list)
  
        newItem.classList.remove('is-danger')
        form.reset()
  
        console.log('the button has been click')
  
      } else {
        newItem.classList.add('is-danger')
      }
  
    }
  
    function handleChange(e) {
  
      let a;
      if (selectedOption == 'drug') {
        a = `${base_url}drug?search=${encodeURIComponent(e.target.value)}`
        //a = `${base_url}pipeline`
      } else {
        a = `${base_url}company?search=${encodeURIComponent(e.target.value)}`
  
      }

  
      console.log(a)
      //console.log(currentUser.email)
      //console.log(currentUser)
      fetch(a, {
        method: 'GET',
      }).then(res => res.json()).then((result) => {
        console.log(result)
        set_list(result)
      }, (error) => {
        console.log('error')
        set_isLoaded(true)
      })
  
    }
  
    function onChangeValue(event) {
      console.log(event.target.value)
      set_selectedOption(event.target.value)
    }


    
    return (
    
      <div className="content">
  
        <div className="container">
  
          <div className="flex-container">
  
            <div className="flex-child">
              <form className="form" id="addItemForm">
                <input style={{
                    width: "100%"
                  }} type="text" className="input" id="addInput" onChange={handleChange} placeholder={`Search for a ${selectedOption}`}/>
              </form>
            </div>
  
            <div className="flex-child" onChange={onChangeValue}>
              <input type="radio" value="drug" name="search_type" defaultChecked="true"/>
              Drug
              <input type="radio" value="company" name="search_type"/>
              Company
            </div>
  
          </div>
  
          <div className="searchItems">
            <ul>
              {list.map(item => (<SearchItem itemName={item} key={item} onClick={expandDetails}/>))}
            </ul>
          </div>
  
          <hr/> {<Table striped="striped" bordered="bordered" hover="hover">
          <thead>
            <tr>
              <th>NCT ID</th>
              <th>Title</th>
              <th>Interventions</th>
              <th>Current Phase</th>
              <th>Last Update</th>
            </tr>
          </thead>
          {selected_data != null &&
          <tbody>
            {
              selected_data.map(item => (<tr>
                <td>{item[0]}</td>
                <td>{item[2]}</td>
                <td>{item[4]}</td>
                <td>{item[3]}</td>
                <td>{item[5]}</td>
              </tr>))
            }
          </tbody>}
        </Table>}
        </div>
      </div>
    );
}
    
  
export default Search;