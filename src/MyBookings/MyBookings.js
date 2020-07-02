import React, { Component } from 'react';
import Axios from 'axios';
import './MyBookings.css'
import MainAppBar from '../AppBar/AppBar';
import moment from 'moment';
import Paper  from '@material-ui/core/Paper';
import { Grid, CircularProgress, Backdrop, Card } from '@material-ui/core';
import { getEventTimings } from '../Services/services';

export default class MyBookings extends Component {
  constructor(props) {
    // const red = props.location.state;
    super(props);
    this.state = {
      events: [],
      isLoggedIn:false,
      showLoading : true
    }
  }
  

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    if(token){
        
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
        this.setState({showLoading: false});
        //console.log(`[MyBookings.js] events: ${this.state.events.length}`);
      });

      if (sessionStorage.getItem('token')){ 
        this.setState({ isLoggedIn:true })
     }

    }
    else 
    {
      this.redirectToLogin();
    }


  }

  redirectToLogin = () => {
    this.props.history.push({
      pathname:`/login` })

   }

  render() {
      return(
        <>
          
          <MainAppBar history={this.props.history}/>
          <div className="my-bookings-container">
          { !this.state.showLoading ? (
                <>
                <h2 id="id-ttl">My Bookings</h2>
              <Paper className="evt-paper" elevation={3}>
                <div className="evt-grid">
                
                  {this.state.events.map((event, index) => {
                    let date;
                    if(event.booking_date != undefined){
                      date = event.booking_date.substring(0,10);
                    }
                                          
                    return <div key={index}  className="event-cards-container">
                      <Card key={index}  className="event-cards">
                        <div>
                        <p className='booked-event-tags'><b>Booking Date:</b> {date}</p>
                        <p className='booked-event-tags'><b>Booking ID:</b> {event.id}</p>
                        <p className='booked-event-tags'><b>Payment ID:</b> {event.payment_id}</p>
                        </div>
                        <img src={event.imageUrl} id="booked-event-img" />
                        <div className='booked-event-tags-container'>
                          <p className='booked-event-tags ttl'>{event.title.length >=28 ?event.title.substring(0, 25)+ "..." : event.title.substring(0, event.title.length)}</p>
                          <p className='booked-event-tags'>{event.city}</p>
                          <p className='booked-event-tags'>{getEventTimings(event)}</p>
                          <p className='booked-event-tags'>₹ {event.price}</p>
                        </div>
                      </Card>
                    </div>
                  })
                }
                {
                  this.state.events.length === 0 ? (
                    <div className='booked-event-tags-container'>
                          <p className='booked-event-tags ttl'>No bookings yet!</p>
                    </div>      
                  ) : ""
                }
                </div> 
                </Paper>
                </>
            )
            : (
              <Backdrop style={{color: '#eee'}} open={true} >
                 <h2>Redirecting to your bookings...</h2>
                  <CircularProgress color="inherit" /> 
              </Backdrop> 
              ) 
            }
          </div>
        </>
      )
  }
}




