import React, { Component } from 'react';
import Axios from 'axios';
import { Paper, Button, Tooltip } from '@material-ui/core';

import '../EventList/EventList.css';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import MainAppBar from '../AppBar/AppBar';
import { Search } from '../Search/Search';
import { getEventTimings } from '../Services/services';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Grid, CircularProgress, Backdrop, Card, AppBar } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default class EventsList extends Component {

  state = {
    events: [],
    eventsCopy: [],
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    if(!token){
      this.redirectToLogin();
    }
    else
    this.getEvents();
  }

  getEvents = () => {
    Axios.post(`https://book-my-events.herokuapp.com/api/search-event`)
      .then(res => {
        this.setState({ events: res.data });
        this.setState({ eventsCopy: res.data });
        console.log(`[Home.js] events: ${this.state.events.length}`);
      });
  }


  redirectToAddNewEvent = () => {
    this.props.history.push({
      pathname: `/add-new-event`,
    });
  }

  redirectToLogin = () => {
    this.props.history.push({
      pathname: `/login`,
    });
  }

  // search events handler
  searchEvents = (event) => {
    let searchString = event.target.value;

    let events = [...this.state.eventsCopy];

    let searchResult = events.filter((evnt) => {
      return evnt.title.toLowerCase().includes(searchString.toLowerCase())
        || evnt.city.toLowerCase().includes(searchString.toLowerCase())
        || evnt.category.toLowerCase().includes(searchString.toLowerCase())
        || (evnt.description.about == null ? "" : evnt.description.about).toLowerCase().includes(searchString.toLowerCase())
        || (evnt.description.venue == null ? "" : evnt.description.venue).toLowerCase().includes(searchString.toLowerCase())
        ;
    })

    this.setState({ events: searchResult })
  }


  editEvent = (event) => {
    console.log(`event with id : ${event._id} and title ${event.title} is going to be edited`);
    this.props.history.push({
      pathname: `/edit-event`,
      state: event
    });

  }

  confirmDelete = (eventID) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this event?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                this.handleClickDelete(eventID);
                onClose();
              }}
            >
              Yes, Delete it!
              </button>
          </div>
        );
      }
    });
  }

  handleClickDelete = (eventID) => {
    // console.log("deleting event with id :" +eventID);
    this.deleteEvent(eventID);
  }

  deleteEvent = (eventID) => {

    Axios({
      url: "https://book-my-events.herokuapp.com/delete-event",
      // url: "http://localhost:2001/api/delete-blog",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ _id: eventID }),
    }).then(response => {

      this.getEvents();

    }).catch(error => {
      console.log(`delete event error: ${error}`);
    });
  }

  render() {
    return (

      <div>

        <MainAppBar
          history={this.props.history}
        />
        <Paper className="heading-event-list">
          <div className="published-event-topbox">
            <b>List of Published Events</b>
            <div className="search-box">
              <Search
                changed={(event) => this.searchEvents(event)}
              />
            </div>
            <div className="addIcon">
              <Tooltip title="Add New Event">
                <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={this.redirectToAddNewEvent}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
          </div>


        </Paper>
        {this.state.events.length > 0 ?
          <div>
            {this.state.events.map((event, index) => {
              return <div key={index}>
                <Paper className="event-list-paper" elevation={3}>
                  <div className="list">
                    <div className="event-list-cards">
                      <img src={event.imageUrl} className="event-image" /><div
                        className='booked-event-tags-container'>
                        <p className='booked-event-tags ttl'>{event.title}</p>
                        <p className='booked-event-tags'>{event.city}</p>
                        <p className='booked-event-tags'>{getEventTimings(event)}</p>
                        <p className='booked-event-tags'>₹ {event.price}</p>
                      </div><div
                        className='event-list-buttons'>
                        <Tooltip title="Edit">
                          <CreateIcon
                            id={event._id}
                            onClick={this.editEvent.bind(this, event)} />
                        </Tooltip>

                        <Tooltip title="Delete">
                          <DeleteIcon
                            //onClick={this.deleteEvent.bind(this, event._id)}/>
                            onClick={this.confirmDelete.bind(this, event._id)} />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            })
            }
          </div>
          : (
            <Backdrop style={{ color: '#eee' }} open={true} >
              <CircularProgress color="inherit" />
            </Backdrop>
          )
        }
      </div>
    );
  }
}
