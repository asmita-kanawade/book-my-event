import React, { Component } from 'react';
import Axios from 'axios';
import '../BookedEvents/BookedEvents.css'
import PrimarySearchAppBar from '../searchAppBar/searchAppBar';
import moment from 'moment';
import Paper  from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';


export default class BookedEvents extends Component {
  constructor(props) {
    // const red = props.location.state;
    super(props);
    this.state = {
      events: [],
      isLoggedIn:false
    }
  }
  

  componentDidMount() {

    Axios({
      method: `POST`,
     // url: `http://localhost:3002/search-booked-events`,
      url: `https://book-my-events.herokuapp.com/search-booked-events`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }

    })
      .then(res => {
        this.setState({ events: res.data });
        // console.log(`[Home.js] events: ${JSON.stringify(res.data)}`);
        //console.log(`[BookedEvents.js] events: ${this.state.events.length}`);
      });

      if (sessionStorage.getItem('token')){ 
        this.setState({ isLoggedIn:true })
     }


  }


  getEventTimings = (event) => {
    let dateAndTime = '';

    if (event.to_date === event.from_date) {
      // dateAndTime = event.to_date;
      dateAndTime = moment(event.to_date, "YYYYMMDD").format(`MMM Do`);

      if (event.from_time === event.to_time)
        dateAndTime += ' | ' + moment(event.to_time, "HHmmss").format(`HH:mm`);
      else
        dateAndTime += ' | ' + moment(event.from_time, "HHmmss").format(`HH:mm`) + "-" + moment(event.to_time, "HHmmss").format(`HH:mm`);

    }
    else {
      dateAndTime = moment(event.from_date, "YYYYMMDD").format(`MMM Do`) + " to " + moment(event.to_date, "YYYYMMDD").format(`MMM Do`);

      if (event.from_time === event.to_time)
        dateAndTime += ' | ' + moment(event.to_time, "HHmmss").format(`HH:mm`);
      else
        dateAndTime += ' | ' + moment(event.from_time, "HHmmss").format(`HH:mm`) + "-" + moment(event.to_time, "HHmmss").format(`HH:mm`);

    }

    return dateAndTime;
  }


  render() {
    
      return(
        <>
          <PrimarySearchAppBar login={this.state.isLoggedIn} history={this.props.history}/>
          <h1 id="id-ttl">My events</h1>
          <Paper className="evt-paper" elevation={3}>
          <Grid container spacing={3} className="evt-grid">
            {this.state.events.map((event, index) => {
              return <>
               
              <Grid item xs={4}>
                <div className="event-card">
                  <img src={event.imageUrl} id="booked-event-img" />
                  <div className='booked-event-tags-container'>
                    <p className='booked-event-tags ttl'>{event.title}</p>
                    <p className='booked-event-tags'>{event.city}</p>
                    <p className='booked-event-tags'>{this.getEventTimings(event)}</p>
                    <p className='booked-event-tags'>₹ {event.price}</p>
                  </div>
                </div>
              </Grid>
             
              </>
            })
          }
           </Grid>
          </Paper>
        </>
      )
  }
}




