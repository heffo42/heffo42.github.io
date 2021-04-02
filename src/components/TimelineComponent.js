import React from 'react'
import {Text, StyleSheet} from 'react-native'
require('./TimelineComponent.css')




var moment = require('moment')
var _ = require('lodash')

const SVG_WIDTH = 1000
const SVG_HEIGHT = 50
const SVG_VERTICAL_PADDING = 40
const SVG_WORKING_WIDTH = SVG_WIDTH - (SVG_VERTICAL_PADDING * 2)

function dateToLabel(date) {
  return moment(date).format('MMM DD YYYY').toUpperCase()
}

function sortDataByDates(dates) {
  return _.sortBy(dates,'date')
}

function diffMonthsBetweenDates(firstDate,lastDate) {
  return moment(lastDate).diff(moment(firstDate),'months')
}

function transformTranslate(x,y) {
  return `translate(${x},${y})`
}

function labelGroupPos(dataArray,groupIndex) {

  let widthInterval = SVG_WORKING_WIDTH / diffMonthsBetweenDates(dataArray[0].date, dataArray[dataArray.length - 1].date)

  if (dataArray[groupIndex - 1] === undefined) {
    return -26
  } else {
    let totalMonthsSoFar = diffMonthsBetweenDates(dataArray[0].date, dataArray[groupIndex-1].date)
    let monthsBetweenThisDateAndLast = diffMonthsBetweenDates(dataArray[groupIndex-1].date, dataArray[groupIndex].date)
    return ((totalMonthsSoFar + monthsBetweenThisDateAndLast) * widthInterval) - 26
  }
}

const Circle = ({x,y, fillColor}) =>
  <path transform={ transformTranslate(x,y) } d="M7 12c2.76 0 5-2.24 5-5S9.76 2 7 2 2 4.24 2 7s2.24 5 5 5z" 
  strokeOpacity=".492" stroke="#2A2A2A" strokeWidth=".5" fill= {fillColor} fillRule="evenodd"/>

Circle.props = {
  x: 0,
  y: 0
}

  

const textStyles = StyleSheet.create

export default class TimelineComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingPopover: false
    }
  }

  showPopover(index) {
    this.setState({
      showingPopover: index
    })
  }

  hidePopover() {
    this.setState({
      showingPopover: false
    })
  }

  render() {

    let sortedData = sortDataByDates(this.props.data)
    let sortedDataUniqByDate = _.uniq(sortedData,'date')
    console.log(sortedDataUniqByDate)

    function translateX(x) {
      return `translate(${x},0)`
    }

    let monthMarkers = []
    let monthsBetweenExtremes = diffMonthsBetweenDates(sortedData[0].date, sortedData[sortedData.length - 1].date)
    for (var i = -1; i < monthsBetweenExtremes; i++) {
      if (monthsBetweenExtremes != 0) {
        monthMarkers.push(
          <rect width={ 1 } height={ 5 } y={ 0 } fill={ '#000000' } 
            x={ (SVG_WORKING_WIDTH / monthsBetweenExtremes) * (i+1) }
            key={ i } />
        )
      }
    }

    return (
      <div style={ {position: 'relative', height: '90px' } }>
        <svg width={ SVG_WIDTH } height={ SVG_HEIGHT }>
          <g transform={ translateX( SVG_VERTICAL_PADDING )}>
            <rect width={ SVG_WORKING_WIDTH } height={ 1 } />
            { sortedDataUniqByDate.map( (date, index) => {
                return(
                  <g transform={ translateX( labelGroupPos(sortedDataUniqByDate,index) ) } 
                     key={ index } 
                     onMouseOver={ this.showPopover.bind(this, index) } 
                     onMouseOut={ this.hidePopover.bind(this) }
                     style={ { cursor: 'pointer' } }>
                    {date.phase == "Phase 1/Phase 2" && <Circle x={ 20 } y={ 4 }  fillColor = {'#ffa500'}/>}
                    {date.phase == "Phase 1" && <Circle x={ 20 } y={ 4 }  fillColor = {'#ff0000'}/>}
                    {date.phase == "Phase 2" && <Circle x={ 20 } y={ 4 }  fillColor = {'#ffff00'}/>}
                    {date.phase == "Phase 3" && <Circle x={ 20 } y={ 4 }  fillColor = {'#00ff00'}/>}
                    {date.phase == null && <Circle x={ 20 } y={ 4 } fillColor = {'#000000'}/>}
                    {date.phase == "N/A" && <Circle x={ 20 } y={ 4 } fillColor = {'#000000'}/>}
                    {date.phase == "Start" && <Circle x={ 20 } y={ 4 } fillColor = {'#ffffff'}/>}
                    {date.phase == "End" && <Circle x={ 20 } y={ 4 } fillColor = {'#ffffff'}/>}
                    {date.phase == "Phase 2/Phase 3" && <Circle x={ 20 } y={ 4 } fillColor = {'#90EE90'}/>}
                    {date.phase == "Phase 4" && <Circle x={ 20 } y={ 4 } fillColor = {'#00ff00'}/>}
                    {date.phase == "Early Phase 1" && <Circle x={ 20 } y={ 4 } fillColor = {'#8b0000'}/>}
                    <text class = "text-orientation" x={ 0 } y={ 10 } fontFamily="Helvetica" fontSize="7" width="100%">
                      { dateToLabel(date.date) }
                    </text>
                  </g>
                )
              }
            )}
            { monthMarkers }
          </g>
        </svg>

        <Popovers data={ sortedData } showingPopover={ this.state.showingPopover } />

      </div>
    )
  }

}

class Popovers extends React.Component {

  render() {

    const { data,showingPopover } = this.props

    let style = { 
      fontFamily: 'sans-serif', 
      font: 'caption', 
      fontWeight: 400, 
      fontSize: 11, 
      position: 'relative', 
      left: `${SVG_VERTICAL_PADDING - 25}px` 
    }

    return (
      <div style={ style }>
        { _.uniq(data,'date').map( (date, index) =>
          <Popover 
            data={ data }
            date={ date } 
            offset={ index } 
            visible={ showingPopover === index } 
            key={ index } />
        )}
      </div>
    )
  }

}

class Popover extends React.Component {

  render() {

    const { showingPopover,offset,data,date } = this.props

    let styles = { 
      position: 'absolute', 
      left: (labelGroupPos(_.uniq(data,'date'),offset) - 4) + 'px', 
      border: '2px solid #979797', 
      backgroundColor: 'white', 
      padding: '.5em', 
      borderRadius: '6px',
      width: '100px',
      minHeight: '2em',
      display: this.props.visible ? 'block' : 'none',
      zIndex: 1
    }
    return(
      <div className='timelineComponentPopover' style={ styles }>
        {
          _.filter(data, { date: date.date }).map( (item,itemIndex) => {
            var textStyles = {
              margin: '0 0 .5em 0',
            }
            return(
              <div style={ textStyles } key={ itemIndex }>
                { item.name }
              </div>
            )
          })
        }
      </div>
    )
  }

}