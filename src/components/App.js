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
import TimelineCreator from "./TimelineCreator"
import AppComponent from "./AppComponent"

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//const base_url = 'http://157.230.216.187:5000/'
const base_url = 'http://localhost:5000/'

function App() { 
  return (
    <div className = "App">
      <Router>
        <AuthProvider>
          <NavBar />
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "1000px" }}>
                  <Switch>
                    <PrivateRoute exact path="/" component={Search} />
                    <PrivateRoute path="/update-profile" component={UpdateProfile} />
                    <PrivateRoute path ="/timeline" component = {AppComponent} />
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

/*
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
      ],
      selected_data: null,
      selectedOption: 'drug',
      activeCompanyData: null
    }

    this.addItem = this.addItem.bind(this)
    this.expandDetails = this.expandDetails.bind(this)
    // this.handleChange = this.handleChange.bind(this)

    this.onChangeValue = this.onChangeValue.bind(this)

  }

  expandDetails(e) {
    e.preventDefault()

    console.log('expandDetails was clicked')
    console.log(e.target.id)

    if (this.state.selectedOption == 'drug') {
      const url = `${base_url}/details?drug_name=${encodeURIComponent(e.target.id)}`
      //const url = '${base_url}/pipeline'
      fetch(url).then(res => res.json()).then((result) => {
        console.log(result)

        this.setState({selected_data: result})
      })
    } else {

      console.log('fetching company profile')
      const url = `${base_url}company_profile?name=${encodeURIComponent(e.target.id)}`

      fetch(url).then(res => res.json()).then((result) => {
        console.log(result)
        this.setState({selected_data: result})
        console.log(this.state.selected_data)
      })

    }

  }

  addItem(e) {
    e.preventDefault()

    let list = this.state.list
    const newItem = document.getElementById('addInput')
    const form = document.getElementById("addItemForm")

    if (newItem.value != "") {
      list.push(newItem.value)

      this.setState({list: list})

      newItem.classList.remove('is-danger')
      form.reset()

      console.log('the button has been click')

    } else {
      newItem.classList.add('is-danger')
    }

  }

  handleChange(e) {

    let a;
    if (this.state.selectedOption == 'drug') {
      a = `${base_url}drug?search=${encodeURIComponent(e.target.value)}`
      //a = `${base_url}pipeline`
    } else {
      a = `${base_url}company?search=${encodeURIComponent(e.target.value)}`

    }

    console.log(a)
    fetch(a, {
      method: 'GET',
    }).then(res => res.json()).then((result) => {
      console.log(result)
      this.setState({list: result})
    }, (error) => {
      console.log('error')
      this.setState({isLoaded: true, error});
    })

  }

  onChangeValue(event) {
    console.log(event.target.value)
    this.setState({selectedOption: event.target.value})
  }

  render() {

    const hasDetails = this.state.selected_data != null

    let details;
    if (hasDetails) {

      if (this.state.selectedOption == 'drug') {

        details = (<Table striped="striped" bordered="bordered" hover="hover">
        <thead>
          <tr>
            <th>NCT ID</th>
            <th>Title</th>
            <th>Interventions</th>
            <th>Current Phase</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.selected_data.map(item => (<tr>
              <td>{item[0]}</td>
              <td>{item[2]}</td>
              <td>{item[4]}</td>
              <td>{item[3]}</td>
              <td>{item[5]}</td>
            </tr>))
          }
        </tbody>
      </Table>)

      } else {

        //diplay chart here
        // const options = {
        //   title: {
        //     text: "Theraputic Areas"
        //   },
        //   data: [
        //     {
        //       type: "column",
        //       dataPoints: this.state.selected_data.chart
        //     }
        //   ]
        // }
        //
        // console.log(options.data.dataPoints)
        //
        // details = (<div style={{
        //     width: "50%"
        //   }}><CanvasJSChart options={options}/></div>)

        details = (<Table striped="striped" bordered="bordered" hover="hover">
          <thead>
            <tr>
              <th>NCT ID</th>
              <th>Title</th>
              <th>Interventions</th>
              <th>Current Phase</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.selected_data.map(item => (<tr>
                <td>{item[0]}</td>
                <td>{item[2]}</td>
                <td>{item[4]}</td>
                <td>{item[3]}</td>
                <td>{item[5]}</td>
              </tr>))
            }
          </tbody>
        </Table>)

      }
    } else {
      details = (<div>does not have details</div >)
    }

    return (<div className="content">

      <div className="container">

        <div className="flex-container">

          <div className="flex-child">
            <form className="form" id="addItemForm">
              <input style={{
                  width: "100%"
                }} type="text" className="input" id="addInput" onChange={this.handleChange.bind(this)} placeholder={`Search for a ${this.state.selectedOption}`}/>
            </form>
          </div>

          <div className="flex-child" onChange={this.onChangeValue}>
            <input type="radio" value="drug" name="search_type" defaultChecked="true"/>
            Drug
            <input type="radio" value="company" name="search_type"/>
            Company
          </div>

        </div>

        <div className="searchItems">
          <ul>
            {this.state.list.map(item => (<SearchItem itemName={item} key={item} onClick={this.expandDetails}/>))}
          </ul>
        </div>

        <hr/> {details}
      </div>
    </div>)
  }
}

export default App;
*/
