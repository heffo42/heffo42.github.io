import React, {Component, useState, useContext, useEffect} from 'react';
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

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialSwitch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import BusinessIcon from '@material-ui/icons/Business'
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ColorizeIcon from '@material-ui/icons/Colorize';
import SearchBar from "material-ui-search-bar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import CanvasJSReact from '../assets/canvasjs.react';
import { ContactlessOutlined } from '@material-ui/icons';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


//const base_url = 'http://157.230.216.187:5000/'
//const base_url = 'http://localhost:5000/'
const base_url = 'https://bio-api.herokuapp.com/'


function Search() {
    

    const [list, set_list] = useState([])
    const [selected_data, set_selected_data] = useState(null)
    const [selectedOption, set_selectedOption] = useState('drug')
    const [activeCompanyData, set_activeCompanyData] = useState(null)
    const [isLoaded, set_isLoaded] = useState(false)
    const {currentUser, setCurrentUser} = useAuth()

    const [rows, set_rows] = useState(null)


    const breadStyles = makeStyles((theme) => ({
      link: {
        display: 'flex',
      },
      icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
      },
    }));

    const breadClasses = breadStyles();

    const [tickerData, setTickerData] = useState(null)



  
    function expandDetails(e) {
      e.preventDefault()
      console.log('expandDetails was clicked')
      console.log(e.target.id)

      //analytics.logEvent('expand_details')
  
      if (selectedOption == 'drug') {
        const url = `${base_url}/details?drug_name=${encodeURIComponent(e.target.id)}`
        //const url = '${base_url}/pipeline'
        fetch(url).then(res => res.json()).then((result) => {
          console.log(result)
        
          set_selected_data(result)
          var formatted_rows = []
          for (var row of result) {
            console.log(row)
            formatted_rows.push({id : row[0], company : row[1], title : row[2], interventions : row[4], phase : row[3], update : row[5], start : row[7], completion : row[6], recruitment : row[8]})
          }
          set_rows(formatted_rows)
          console.log(formatted_rows)
          
        })
      } if (selectedOption == 'company') {
  
        console.log('fetching company profile')
        const url = `${base_url}company_profile?name=${encodeURIComponent(e.target.id)}`
  
        fetch(url).then(res => res.json()).then((result) => {
          console.log(result)
          set_selected_data(result)
          var formatted_rows = []
          for (var row of result) {
            console.log(row)
            formatted_rows.push({id : row[0], company : row[1], title : row[2], interventions : row[4], phase : row[3], update : row[5], start : row[7], completion : row[6], recruitment : row[8]})
          }
          set_rows(formatted_rows)
          console.log(formatted_rows)
          //console.log(selected_data)
        })

        const fin_url = `${base_url}fin_chart?company=${encodeURIComponent(e.target.id)}`
        fetch(fin_url).then(res => res.json()).then((result) => {
          console.log(result.ticker)
          setTickerData(result)
  
        })
  
      } if (selectedOption == 'condition') {
        console.log('fetching condition profile')
        const url = `${base_url}condition_profile?name=${encodeURIComponent(e.target.id)}`
  
        fetch(url).then(res => res.json()).then((result) => {
          console.log(result)
          set_selected_data(result)
          var formatted_rows = []
          for (var row of result) {
            console.log(row)
            formatted_rows.push({id : row[0], company : row[1], title : row[2], interventions : row[4], phase : row[3], update : row[5], start : row[7], completion : row[6], recruitment : row[8]})
          }
          set_rows(formatted_rows)
          console.log(formatted_rows)
          //console.log(selected_data)
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
      console.log(e)
      var a = `${base_url}drug?search=${encodeURIComponent(e)}`
      if (selectedOption == 'drug') {
        a = `${base_url}drug?search=${encodeURIComponent(e)}`
        //a = `${base_url}pipeline`
      } else if (selectedOption == 'company') {
        a = `${base_url}company?search=${encodeURIComponent(e)}`
      } else if (selectedOption == 'condition') {
        a = `${base_url}condition?search=${encodeURIComponent(e)}`
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

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
    
    const headCells = [
      { id: 'id', numeric: false, disablePadding: true, label: 'NCT ID' },
      { id: 'company', numeric: true, disablePadding: false, label: 'Company' },
      { id: 'title', numeric: true, disablePadding: false, label: 'Title' },
      { id: 'interventions', numeric: true, disablePadding: false, label: 'Interventions' },
      { id: 'phase', numeric: true, disablePadding: false, label: 'Current Phase' },
      { id: 'update', numeric: true, disablePadding: false, label: 'Last Update' },
      { id: 'start', numeric: true, disablePadding: false, label: 'Start Date' },
      { id: 'completion', numeric: true, disablePadding: false, label: 'Completion Date' },
      { id: 'recruitment', numeric: true, disablePadding: false, label: 'Recruitment Status' },
    ];
    
    function EnhancedTableHead(props) {
      const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };
      return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }


    EnhancedTableHead.propTypes = {
      classes: PropTypes.object.isRequired,
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };
    
    const useToolbarStyles = makeStyles((theme) => ({
      root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      highlight:
        theme.palette.type === 'light'
          ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
          : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
            },
      title: {
        flex: '1 1 100%',
      },
    }));
    
    const EnhancedTableToolbar = (props) => {
      const classes = useToolbarStyles();
      const { numSelected } = props;
    
      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Results
            </Typography>
          )}
    
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      );
    };
    
    EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };
    
    const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 750,
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    }));
    
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = 0

    if (rows != null) {
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
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
          {selectedOption == 'drug' && <div className="searchItems">
          <ul>
              {list.map(item => (<SearchItem itemName={item} key={item} id={item} onClick={expandDetails}/>))}
            </ul>
          </div>}

          </div>



  
          <div className={classes.root}>
      {rows != null && <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.company}</TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.interventions}</TableCell>
                      <TableCell align="right">{row.phase}</TableCell>
                      <TableCell align="right">{row.update}</TableCell>
                      <TableCell align="right">{row.start}</TableCell>
                      <TableCell align="right">{row.completion}</TableCell>
                      <TableCell align="right">{row.recruitment}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>}
      <FormControlLabel
        control={<MaterialSwitch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>


          {(selectedOption === 'company' && tickerData !== null) && <div>
            {tickerData.ticker}
            <LineChart
      width={500}
      height={300}
      data={tickerData.candles}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="adjClose"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      
    </LineChart>
            </div>}


  
        </div>
      </div>
    );
}


    
  
export default Search;