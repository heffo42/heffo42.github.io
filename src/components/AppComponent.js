import React, {Component, useState, useContext, useEffect} from 'react';
import TimelineComponent from './TimelineComponent'
import SearchItem from "./SearchItem"
import { useAuth } from "../contexts/AuthContext"
import { auth, analytics } from "../firebase"
import SearchField from 'react-search-field'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import BusinessIcon from '@material-ui/icons/Business'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ColorizeIcon from '@material-ui/icons/Colorize';
import SearchBar from "material-ui-search-bar"


import CanvasJSReact from '../assets/canvasjs.react';

const base_url = 'https://bio-api.herokuapp.com/'
//const base_url = 'http://localhost:5000/'

function AppComponent() {




    const [list, set_list] = useState([])
    const [selected_data, set_selected_data] = useState(null)
    const [selectedOption, set_selectedOption] = useState('drug')
    const [activeCompanyData, set_activeCompanyData] = useState(null)
    const [isLoaded, set_isLoaded] = useState(false)
    const {currentUser, setCurrentUser} = useAuth()
    const [companies_list, set_companies_list] = useState(null)
    const [company_dates_dict, set_company_dates_dict] = useState(null)
    const [interventions_list, set_interventions_list] = useState(null)
    const [intervention_dates_dict, set_intervention_dates_dict] = useState(null)
    const [search_bar, set_search_bar] = useState(null)
  
    const useStyles = makeStyles((theme) => ({
      link: {
        display: 'flex',
      },
      icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
      },
    }));

    const classes = useStyles();
    
   
    function expandDetails(e) {
      e.preventDefault()
      console.log('expandDetails was clicked')
      console.log(e.target.id)

      var other_url = `${base_url}/condition_timeline_companies?condition_name=${encodeURIComponent(e.target.id)}`
      var url = `${base_url}/condition_timelines?condition_name=${encodeURIComponent(e.target.id)}`
      //const url = '${base_url}/pipeline'
      var company_to_indicationsDict = {}
      var company_indications = {}

      //find the minimum start date and the maximum end date
      var minDate = "2100-01-01"
      var maxDate = "1900-01-01"
      if (selectedOption == 'company') {
        url = `${base_url}/company_timelines?company_name=${encodeURIComponent(e.target.id)}`
        other_url = `${base_url}/company_timeline_drugs?company_name=${encodeURIComponent(e.target.id)}`
      }

      fetch(url).then(res => res.json()).then((result) => {
        console.log(result)
        
        set_selected_data(result)
        
        if (selectedOption == 'condition') {
          fetch(other_url).then(res => res.json()).then((company_result) => {
            console.log(company_result)
            
            set_companies_list(company_result)
    
            for (var entry of result) {
              if (entry[9] > maxDate){
                maxDate = entry[9]
              }
              if (entry[8] < minDate) {
                minDate = entry[8]
              }
            }

            for (var company of company_result) {
              const indications_array = []
              for (var entry of result) {
                if (entry[7] == company) {
                  if(entry[10] != null) {
                    indications_array.push(entry[10])
                  }
                }
              }
              company_indications[company] = indications_array    
            }
            for (var company of company_result) {
              var indication_dates = {}
              console.log(company_indications[company])
              for (var indication of company_indications[company])
                var dates_array = []
                for (var entry of result) {
                  var start_date = 'Study Start Date of: '
                  var end_date = 'Study End Date of: '
                  if (entry[7] == company) {
                    if (entry[10] == indication) {
                      if (entry[4] != null) {
                        entry[4] = entry[4].toString()
                      }
                      if (entry[8]  != null){
                        entry[8] = entry[8].toString()
                      }

                      if(entry[9] != null) {
                        entry[9] = entry[9].toString()
                      }

                      if (entry[5] != null) {

                        dates_array.push({date: entry[8], name : start_date.concat(entry[4]), phase: entry[5]})
                        dates_array.push({date: entry[9], name : end_date.concat(entry[4]), phase: entry[5]})
                      
                      } else {
                        dates_array.push({date: entry[8], name : start_date.concat(entry[4])})
                        dates_array.push({date: entry[9], name : end_date.concat(entry[4])})
                      }
                    }
                  }
                dates_array.push({date: minDate, name: "Start"})
                dates_array.push({date: maxDate, name: "End"})
                indication_dates[indication] = dates_array
                }
              company_to_indicationsDict[company] = indication_dates
            }
          console.log(company_to_indicationsDict)
          set_company_dates_dict(company_to_indicationsDict)
          console.log(company_dates_dict)
      
          }, (error) => {
            console.log('error')
            set_isLoaded(true)
          })
        }

        if (selectedOption == 'company') {
          console.log(other_url)
          fetch(other_url).then(res => res.json()).then((intervention_result) => {
            console.log(intervention_result)
            
            set_interventions_list(intervention_result)
            console.log(interventions_list)
    
            for (var entry of result) {
              if (entry[9] > maxDate){
                maxDate = entry[9]
              }
              if (entry[8] < minDate) {
                minDate = entry[8]
              }
            }

            var intervention_dates = {}
            for (var intervention of intervention_result) {
              var dates_array = []
              dates_array.push({date: minDate, name: "Start", phase : "Start"})
              dates_array.push({date: maxDate, name: "End", phase : "End"})
              for (var entry of result) {
                var start_date = 'Study Start Date of: '
                var end_date = 'Study End Date of: '
                if (entry[10] == intervention) {
                  if (entry[4] != null) {
                    entry[4] = entry[4].toString()
                  }
                  if (entry[8]  != null){
                    entry[8] = entry[8].toString()
                  }

                  if(entry[9] != null) {
                    entry[9] = entry[9].toString()
                  }

                  if (entry[5] != null) {

                    dates_array.push({date: entry[8], name : start_date.concat(entry[4]), phase: entry[5]})
                    dates_array.push({date: entry[9], name : end_date.concat(entry[4]), phase: entry[5]})
                      
                  } else {
                    dates_array.push({date: entry[8], name : start_date.concat(entry[4])})
                    dates_array.push({date: entry[9], name : end_date.concat(entry[4])})
                  }
                }
              }
              intervention_dates[intervention] = dates_array
            }
          set_intervention_dates_dict(intervention_dates)
      
          }, (error) => {
            console.log('error')
            set_isLoaded(true)
          })

        }
  
      }, (error) => {
        console.log('error')
        set_isLoaded(true)
      })
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
  
      console.log(e)
      set_search_bar(e)
      var a = `${base_url}condition?search=${encodeURIComponent(e)}`
        //a = `${base_url}pipeline`

  
      //console.log(currentUser.email)
      //console.log(currentUser)

      if (selectedOption == 'company') {
        a = `${base_url}company?search=${encodeURIComponent(e)}`
      }

      console.log(a)

      fetch(a, {
        method: 'GET',
      }).then(res => res.json()).then((result) => {
        console.log('Watch Below:')
        console.log(result)
        set_list(result)
      }, (error) => {
        console.log('error')
        set_isLoaded(true)
      })
  
    }
  
    function onChangeValue(event) {
      var value = event.target.getAttribute('value')
      set_selectedOption(event.target.getAttribute('value'))
      event.target.style.color = "#000000"
      if (value == 'condition') {
        document.getElementById('drugLink').style.color = 'inherit'
        document.getElementById('companyLink').style.color = 'inherit'
      }

      if (value == 'drug') {
        document.getElementById('conditionLink').style.color = 'inherit'
        document.getElementById('companyLink').style.color = 'inherit'

      }

      if (value == 'company') {
        document.getElementById('conditionLink').style.color = 'inherit'
        document.getElementById('drugLink').style.color = 'inherit'

      }


      
    }


    

    return (
      <div className="content">
  
        <div className="container">
  
          <div className="flex-container">
  
            <div className="flex-child">
              
               <SearchBar id="addInput" onChange={handleChange} placeholder={`Search for a ${selectedOption}`}/>
              
            </div>
            <div className="d-flex align-items-center justify-content-center" onChange={onChangeValue}>
              
            <Breadcrumbs aria-label="breadcrumb" alignItems = "center" justifyContent = "center">
                <Link color="inherit" id = 'conditionLink' onClick={onChangeValue} className={classes.link} value="condition">
                  <LocalHospitalIcon className={classes.icon}/>
                    Condition
                </Link>
                <Link color="inherit" id ='companyLink' onClick={onChangeValue} className={classes.link} value="company">
                  <BusinessIcon className={classes.icon} />
                    Company
                </Link>
                <Link color="inherit" id = 'drugLink' onClick={onChangeValue} className={classes.link} value="drug">
                  <ColorizeIcon className={classes.icon} />
                    Drug
                </Link>
              </Breadcrumbs>
            </div>
          </div>
  
          {selectedOption == 'condition' && <div className="searchItems">
            <ul> 
              {list.map(item => (<SearchItem itemName={item[0].toString().concat(' - Company: ').concat(item[2].toString())} key={item} id={item[1]} onClick={expandDetails}/>))}
            </ul>
          </div>}
          {selectedOption == 'company' && <div className="searchItems">
          <ul>
              {list.map(item => (<SearchItem itemName={item} key={item} id={item} onClick={expandDetails}/>))}
            </ul>
          </div>}
      
      {selectedOption == 'condition' && selected_data != null && company_dates_dict != null && companies_list != null && <div>
        {companies_list.map(item => (
          <Card>
            <CardContent>
              <h4 class="card-title mb-5">{item}</h4>
                {company_dates_dict[item] != null && 
                <div>
                  {Object.keys(company_dates_dict[item]).map(indication => (
                    <div>
                      <h6 class="card-title mb-5">{indication}</h6>
                      <TimelineComponent data={company_dates_dict[item][indication]}/>
                    </div>
                  ))}
                </div>}
            </CardContent>
        </Card>))}
      </div>}

      {selectedOption == 'company' && selected_data != null && intervention_dates_dict != null && interventions_list != null && <div>
        {interventions_list.map(item => (
          <Card>
            <CardContent>
              <h4 class="card-title mb-5">{item}</h4>
                {intervention_dates_dict[item] != null && 
                  <div>
                    <TimelineComponent data={intervention_dates_dict[item]}/>
                  </div>}
            </CardContent>
        </Card>))}
      </div>}

      </div>
      </div>
    )
  }

export default AppComponent