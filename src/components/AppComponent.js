import React, {Component, useState, useContext, useEffect} from 'react';
import TimelineComponent from './TimelineComponent'
import SearchItem from "./SearchItem"
import { useAuth } from "../contexts/AuthContext"
import { auth, analytics } from "../firebase"

import CanvasJSReact from '../assets/canvasjs.react';

const base_url = 'http://localhost:5000/'

function AppComponent() {


    const [dates, setDates] = useState([
      {
        date: '2013-06-16',
        name: 'Referral date'
      },
      {
        date: '2015-02-16',
        name: 'Some rando date'
      },
      {
        date: '2015-02-16',
        name: 'Another thing'
      },
      {
        date: '2015-10-01',
        name: 'Current shipping date'
      }
    ])


    const [list, set_list] = useState([])
    const [selected_data, set_selected_data] = useState(null)
    const [selectedOption, set_selectedOption] = useState('drug')
    const [activeCompanyData, set_activeCompanyData] = useState(null)
    const [isLoaded, set_isLoaded] = useState(false)
    const {currentUser, setCurrentUser} = useAuth()
    const [companies_list, set_companies_list] = useState(null)
    const [company_dates_dict, set_company_dates_dict] = useState(null)
  


  
    function expandDetails(e) {
      e.preventDefault()
      console.log('expandDetails was clicked')
      console.log(e.target.id)

      const companies_url = `${base_url}/condition_timeline_companies?condition_name=${encodeURIComponent(e.target.id)}`
      const url = `${base_url}/condition_timelines?condition_name=${encodeURIComponent(e.target.id)}`
      //const url = '${base_url}/pipeline'
      fetch(url).then(res => res.json()).then((result) => {
        console.log(result)
        
        set_selected_data(result)

        fetch(companies_url).then(res => res.json()).then((company_result) => {
          console.log(company_result)
          
          set_companies_list(company_result)
          console.log(companies_list)
  
  
          var company_dates = {}
          for (var company of company_result) {
            const dates_array = []
            for (var entry of result) {
              var start_date = 'Study Start Date of: '
              var end_date = 'Study End Date of: '
              if (entry[7] == company) {
                if (entry[5] != null) {

                  dates_array.push({date: entry[8].toString(), name : start_date.concat(entry[4].toString()), phase: entry[5]})
                  dates_array.push({date: entry[9].toString(), name : end_date.concat(entry[4].toString()), phase: entry[5]})
                
                } else {
                  dates_array.push({date: entry[8].toString(), name : start_date.concat(entry[4].toString())})
                  dates_array.push({date: entry[9].toString(), name : end_date.concat(entry[4].toString())})
                }
              }
            }
            company_dates[company] = dates_array
          }
        console.log(company_dates)
        set_company_dates_dict(company_dates)
    
        }, (error) => {
          console.log('error')
          set_isLoaded(true)
        })
  
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
  
    
      var a = `${base_url}condition?search=${encodeURIComponent(e.target.value)}`
        //a = `${base_url}pipeline`

  
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
                  }} type="text" className="input" id="addInput" onChange={handleChange} placeholder={`Search for a condition`}/>
              </form>
            </div>
          </div>
  
          <div className="searchItems">
            <ul>
              {list.map(item => (<SearchItem itemName={item} key={item} onClick={expandDetails}/>))}
            </ul>
          </div>
      
      {selected_data != null && company_dates_dict != null && companies_list != null && <div>
        {companies_list.map(item => (
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-5">{item}</h4>
                {company_dates_dict[item] != null &&
                <TimelineComponent data={company_dates_dict[item] }/>}
            </div>
          </div>
        ))}
      </div>}
      </div>
      </div>
    )
  }

export default AppComponent